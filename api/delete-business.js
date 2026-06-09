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
    body.includes("column") && body.includes("business_id")
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

    const childTables = [
      "appointments",
      "blocked_days",
      "barber_services",
      "services",
      "barbers",
      "admin_accounts",
      "clients",
      "customers",
      "schedules",
      "horarios",
      "business_settings",
    ];

    for (const table of childTables) {
      await deleteByBusinessId(table, businessId);
    }

    await deleteBusinessRow(businessId);
    const stillExists = await getBusiness(businessId);
    if (stillExists) {
      json(res, 500, { ok: false, error: "Supabase no elimino el negocio principal.", step: "verify:businesses" });
      return;
    }

    await Promise.allSettled([
      removeStoragePrefix("logos-negocios", businessId),
      removeStoragePrefix("fondos-negocios", businessId),
      removeStoragePrefix("videos-negocios", businessId),
      removeStoragePrefix("barberos", businessId),
      removeStoragePrefix("entornos", businessId),
    ]);

    json(res, 200, { ok: true });
  } catch (error) {
    json(res, 500, {
      ok: false,
      step: error.step || "delete-business",
      error: error.message || "No fue posible eliminar la barberia.",
    });
  }
};
