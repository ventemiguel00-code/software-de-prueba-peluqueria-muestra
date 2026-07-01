const { timingSafeEqual } = require("node:crypto");

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_KEY ||
  process.env.SUPABASE_SERVICE_ROLE ||
  process.env.SERVICE_ROLE_KEY ||
  "";
const SUPER_ADMIN_USER = process.env.SUPER_ADMIN_USER || "SDMcompany";
const SUPER_ADMIN_PASSWORD_HASH =
  process.env.SUPER_ADMIN_PASSWORD_HASH || "9c92c00e241ec0c78798834456113f123762afcb4ef84e337eafbcf7d372f2fc";
const DEFAULT_BUSINESS_ID = "business_principal";

const json = (res, status, body) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
};

const safeEqual = (left = "", right = "") => {
  const leftBuffer = Buffer.from(String(left));
  const rightBuffer = Buffer.from(String(right));
  if (leftBuffer.length !== rightBuffer.length) return false;
  return timingSafeEqual(leftBuffer, rightBuffer);
};

const supabaseFetch = async (path, options = {}) => {
  const response = await fetch(`${SUPABASE_URL}${path}`, {
    ...options,
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      Accept: "application/json",
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.headers || {}),
    },
  });
  const text = await response.text().catch(() => "");
  if (!response.ok) {
    const invalidKey = /invalid api key/i.test(text || "");
    const error = new Error(
      invalidKey
        ? "La variable SUPABASE_SERVICE_ROLE_KEY de Vercel no es una service_role valida. Copia la service_role key real desde Supabase > Project Settings > API."
        : text || `Supabase ${response.status}`
    );
    error.status = response.status;
    error.body = text;
    throw error;
  }
  return text ? JSON.parse(text) : null;
};

const isOptionalSchemaError = (error) => {
  const body = String(error?.body || error?.message || "").toLowerCase();
  return (
    error?.status === 404 ||
    body.includes("does not exist") ||
    body.includes("schema cache") ||
    body.includes("could not find the table") ||
    body.includes("could not find the 'business_id' column") ||
    body.includes("could not find the 'source_business_id' column") ||
    body.includes("column") && (body.includes("business_id") || body.includes("source_business_id"))
  );
};

const getBusiness = async (businessId) => {
  const params = new URLSearchParams({
    select: "id,business_name,slug",
    id: `eq.${businessId}`,
    limit: "1",
  });
  const rows = await supabaseFetch(`/rest/v1/businesses?${params}`);
  return rows?.[0] || null;
};

const countByColumn = async (table, column, businessId) => {
  const params = new URLSearchParams({
    select: "id",
    [column]: `eq.${businessId}`,
  });
  try {
    const rows = await supabaseFetch(`/rest/v1/${table}?${params}`);
    return Array.isArray(rows) ? rows.length : 0;
  } catch (error) {
    if (isOptionalSchemaError(error)) return 0;
    error.step = `count:${table}:${column}`;
    throw error;
  }
};

const deleteByBusinessId = async (table, businessId) => {
  const params = new URLSearchParams({ business_id: `eq.${businessId}` });
  try {
    await supabaseFetch(`/rest/v1/${table}?${params}`, {
      method: "DELETE",
      headers: { Prefer: "return=minimal" },
    });
    return true;
  } catch (error) {
    if (isOptionalSchemaError(error)) return false;
    error.step = `delete:${table}`;
    throw error;
  }
};

const deleteBySourceBusinessId = async (table, businessId) => {
  const params = new URLSearchParams({ source_business_id: `eq.${businessId}` });
  try {
    await supabaseFetch(`/rest/v1/${table}?${params}`, {
      method: "DELETE",
      headers: { Prefer: "return=minimal" },
    });
    return true;
  } catch (error) {
    if (isOptionalSchemaError(error)) return false;
    error.step = `delete:${table}:source_business_id`;
    throw error;
  }
};

const deleteBusinessRow = async (businessId) => {
  const params = new URLSearchParams({ id: `eq.${businessId}` });
  try {
    await supabaseFetch(`/rest/v1/businesses?${params}`, {
      method: "DELETE",
      headers: { Prefer: "return=minimal" },
    });
  } catch (error) {
    error.step = "delete:businesses";
    throw error;
  }
};

const listStoragePrefix = async (bucket, prefix) => {
  try {
    return await supabaseFetch(`/storage/v1/object/list/${bucket}`, {
      method: "POST",
      body: JSON.stringify({ prefix, limit: 1000, offset: 0 }),
    });
  } catch {
    return [];
  }
};

const removeStorageObjects = async (bucket, prefixes) => {
  if (!prefixes.length) return true;
  try {
    await supabaseFetch(`/storage/v1/object/${bucket}`, {
      method: "DELETE",
      body: JSON.stringify({ prefixes }),
    });
    return true;
  } catch {
    return false;
  }
};

const removeStoragePrefix = async (bucket, prefix) => {
  const collect = async (currentPrefix) => {
    const items = await listStoragePrefix(bucket, currentPrefix);
    const paths = [];
    for (const item of items || []) {
      const itemPath = `${currentPrefix.replace(/\/+$/, "")}/${item.name}`.replace(/^\/+/, "");
      if (item.metadata === null) {
        paths.push(...(await collect(itemPath)));
      } else {
        paths.push(itemPath);
      }
    }
    return paths;
  };
  const files = await collect(prefix);
  return removeStorageObjects(bucket, files);
};

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    json(res, 405, { ok: false, error: "Metodo no permitido." });
    return;
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    json(res, 503, { ok: false, error: "Backend de borrado no configurado." });
    return;
  }

  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const body = JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
    const businessId = String(body.businessId || "").trim();
    const confirmation = String(body.confirmation || "").trim();
    const user = String(body.superAdminUser || "").trim();
    const passwordHash = String(body.superAdminPasswordHash || "").trim();

    if (user !== SUPER_ADMIN_USER || !safeEqual(passwordHash, SUPER_ADMIN_PASSWORD_HASH)) {
      json(res, 403, { ok: false, error: "No autorizado." });
      return;
    }

    if (!businessId || businessId === DEFAULT_BUSINESS_ID) {
      json(res, 400, { ok: false, error: "No es posible eliminar esta barberia." });
      return;
    }

    const business = await getBusiness(businessId);
    if (!business) {
      json(res, 200, { ok: true, alreadyDeleted: true });
      return;
    }

    if (confirmation !== business.slug && confirmation !== business.business_name) {
      json(res, 400, { ok: false, error: "La confirmacion no coincide." });
      return;
    }

    // Borrado completo, aislado y exacto: nunca se elimina por slug/nombre ni sin business_id.
    // El orden evita relaciones colgantes y mantiene cada operacion limitada al negocio objetivo.
    const businessScopedTables = [
      { table: "appointments", key: "deleted_appointments" },
      { table: "blocked_days", key: "deleted_blocked_days" },
      { table: "barber_services", key: "deleted_barber_services" },
      { table: "services", key: "deleted_services" },
      { table: "barbers", key: "deleted_barbers" },
      { table: "admin_accounts", key: "deleted_admin_accounts" },
      { table: "active_sessions", key: "deleted_active_sessions" },
      { table: "clients", key: "deleted_clients" },
      { table: "customers", key: "deleted_customers" },
      { table: "schedules", key: "deleted_schedules" },
      { table: "horarios", key: "deleted_horarios" },
      { table: "business_settings", key: "deleted_business_settings" },
      { table: "business_admin_passwords", key: "deleted_business_admin_passwords" },
    ];
    const deletionSummary = {
      business_id: businessId,
      deleted_businesses: 0,
      deleted_business_audit_log: 0,
    };

    for (const { table, key } of businessScopedTables) {
      const beforeCount = await countByColumn(table, "business_id", businessId);
      if (beforeCount > 0) {
        await deleteByBusinessId(table, businessId);
      }
      deletionSummary[key] = beforeCount;
    }

    const auditLogCount = await countByColumn("business_audit_log", "source_business_id", businessId);
    if (auditLogCount > 0) {
      await deleteBySourceBusinessId("business_audit_log", businessId);
    }
    deletionSummary.deleted_business_audit_log = auditLogCount;
    await Promise.allSettled([
      removeStoragePrefix("logos-negocios", businessId),
      removeStoragePrefix("fondos-negocios", businessId),
      removeStoragePrefix("videos-negocios", businessId),
      removeStoragePrefix("barberos", businessId),
      removeStoragePrefix("entornos", businessId),
    ]);
    await deleteBusinessRow(businessId);
    deletionSummary.deleted_businesses = 1;

    const stillExists = await getBusiness(businessId);
    if (stillExists) {
      json(res, 409, {
        ok: false,
        step: "verify:businesses",
        error: "La barberia no se elimino completamente. Revisa restricciones o politicas de Supabase.",
      });
      return;
    }

    const leftoverChecks = [
      ["business_settings", "business_id"],
      ["admin_accounts", "business_id"],
      ["barbers", "business_id"],
      ["services", "business_id"],
      ["barber_services", "business_id"],
      ["appointments", "business_id"],
      ["blocked_days", "business_id"],
      ["active_sessions", "business_id"],
      ["business_audit_log", "source_business_id"],
    ];
    const leftovers = {};
    for (const [table, column] of leftoverChecks) {
      leftovers[table] = await countByColumn(table, column, businessId);
    }
    const remainingEntries = Object.entries(leftovers).filter(([, count]) => Number(count) > 0);
    if (remainingEntries.length) {
      json(res, 409, {
        ok: false,
        step: "verify:related-records",
        error: "Quedaron registros asociados al negocio eliminado.",
        summary: deletionSummary,
        leftovers,
      });
      return;
    }

    json(res, 200, { ok: true, deleted: true, businessId, summary: deletionSummary, leftovers });
  } catch (error) {
    json(res, 500, {
      ok: false,
      step: error.step || "delete-business",
      error: error.message || "No fue posible eliminar la barberia.",
    });
  }
};
