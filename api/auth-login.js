const { createHash, timingSafeEqual } = require("node:crypto");

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_KEY ||
  process.env.SUPABASE_SERVICE_ROLE ||
  process.env.SERVICE_ROLE_KEY ||
  "";

const json = (res, status, body) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
};

const sha256 = (value = "") => createHash("sha256").update(String(value)).digest("hex");

const safeEqual = (left = "", right = "") => {
  const leftBuffer = Buffer.from(String(left));
  const rightBuffer = Buffer.from(String(right));
  if (leftBuffer.length !== rightBuffer.length) return false;
  return timingSafeEqual(leftBuffer, rightBuffer);
};

const supabaseRest = async (path, params = {}) => {
  const query = new URLSearchParams(params);
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}?${query}`, {
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      Accept: "application/json",
    },
  });
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(text || `Supabase REST ${response.status}`);
  }
  return response.json();
};

const firstBySlug = async (slug) => {
  const rows = await supabaseRest("businesses", {
    select: "id,business_name,slug,active",
    slug: `eq.${slug}`,
    limit: "1",
  });
  return rows?.[0] || null;
};

const authenticateAccount = (accounts, password) => {
  const passwordHash = sha256(password);
  return (
    accounts.find((account) => account.password_hash && safeEqual(account.password_hash, passwordHash)) ||
    accounts.find((account) => account.password && safeEqual(account.password, password)) ||
    null
  );
};

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    json(res, 405, { ok: false, error: "Metodo no permitido." });
    return;
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    json(res, 503, { ok: false, fallback: true, error: "Auth backend no configurado." });
    return;
  }

  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const body = JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
    const role = String(body.role || "").trim().toLowerCase();
    const businessSlug = String(body.businessSlug || "").trim().toLowerCase();
    const user = String(body.user || "").trim();
    const password = String(body.password || "");

    if (!["admin", "barber"].includes(role) || !businessSlug || !user || !password) {
      json(res, 400, { ok: false, error: "Solicitud incompleta." });
      return;
    }

    const business = await firstBySlug(businessSlug);
    if (!business || business.active === false) {
      json(res, 403, { ok: false, error: "Negocio no disponible." });
      return;
    }

    if (role === "admin") {
      const accounts = await supabaseRest("admin_accounts", {
        select: "id,business_id,admin_name,admin_user,password_hash,password,role,active",
        business_id: `eq.${business.id}`,
        admin_user: `eq.${user}`,
        active: "eq.true",
      });
      const account = authenticateAccount(accounts || [], password);
      if (!account) {
        json(res, 401, { ok: false, error: "Credenciales invalidas." });
        return;
      }
      json(res, 200, {
        ok: true,
        role: "admin",
        account: {
          id: account.id,
          user: account.admin_user,
          name: account.admin_name,
          role: account.role || "admin_negocio",
          businessId: business.id,
          businessSlug: business.slug,
        },
      });
      return;
    }

    const barbers = await supabaseRest("barbers", {
      select: "id,business_id,name,user,password_hash,password,active",
      business_id: `eq.${business.id}`,
      user: `eq.${user}`,
      active: "eq.true",
    });
    const barber = authenticateAccount(barbers || [], password);
    if (!barber) {
      json(res, 401, { ok: false, error: "Credenciales invalidas." });
      return;
    }
    json(res, 200, {
      ok: true,
      role: "barber",
      barber: {
        id: barber.id,
        user: barber.user,
        name: barber.name,
        businessId: business.id,
        businessSlug: business.slug,
      },
    });
  } catch (error) {
    json(res, 500, { ok: false, fallback: true, error: error.message || "Error de autenticacion." });
  }
};
