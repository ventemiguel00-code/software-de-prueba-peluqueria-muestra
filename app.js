const APP_KEY = "noxora-studioos-state-v1";
const CHANNEL = "noxora-studioos-realtime";
const SUPABASE_URL = window.__SUPABASE_URL || "";
const SUPABASE_ANON_KEY = window.__SUPABASE_ANON_KEY || "";
const hasSupabaseBrowserClient =
  Boolean(SUPABASE_URL) &&
  Boolean(SUPABASE_ANON_KEY) &&
  Boolean(window.supabase?.createClient);

const STATUS = {
  available: { label: "Disponible", short: "Libre", tone: "available" },
  reserved: { label: "Ocupado", short: "Ocupado", tone: "reserved" },
  fixed: { label: "Cita fija", short: "Fija", tone: "fixed" },
  blocked: { label: "Bloqueado", short: "Bloq.", tone: "blocked" },
};
const VISIT_STATE_META = {
  arrived: { label: "Cliente llego", tone: "arrived" },
  service: { label: "En servicio", tone: "service" },
  done: { label: "Realizada", tone: "done" },
  no_show: { label: "No asistio", tone: "no-show" },
};
const COUNTABLE_STATUSES = new Set(["reserved", "fixed"]);
const PERF_LOG_KEY = "barber-delux-perf-logs";
const PERF_QUERY_LOG_ENABLED_KEY = "barber-delux-query-metrics-enabled";
const PERF_QUERY_METRICS_KEY = "barber-delux-query-metrics-v1";
const PERF_SYNC_METRICS_KEY = "barber-delux-sync-metrics-v1";
const PERF_SUBSCRIBE_METRICS_KEY = "barber-delux-subscribe-metrics-v1";
const THEME_CACHE_PREFIX = "theme_cache_";
const BUSINESS_IDENTITY_CACHE_KEY = "barber-delux-business-identity-v1";
const PUBLIC_SERVICES_LOCAL_CACHE_KEY = "barber-delux-public-services-v1";
const PUBLIC_SERVICE_ICONS_LOCAL_CACHE_KEY = "barber-delux-public-service-icons-v1";
const REMOTE_SYNC_DEBOUNCE_MS = 650;
const REMOTE_SCOPE_CACHE_TTL_MS = 4 * 60 * 1000;
const SUPER_ADMIN_CACHE_TTL_MS = 3 * 60 * 1000;
const ADMIN_ACCOUNTS_CACHE_TTL_MS = 90 * 1000;
const BUSINESS_IDENTITY_CACHE_TTL_MS = 5 * 60 * 1000;
const STABLE_BUSINESS_CACHE_TTL_MS = 10 * 60 * 1000;
const PUBLIC_SERVICES_CACHE_TTL_MS = 3 * 60 * 1000;
const DUPLICATE_SYNC_GUARD_MS = 8 * 1000;

const dayNames = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
const longDayNames = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
const DEFAULT_OPENING_TIME = "08:00";
const DEFAULT_CLOSING_TIME = "20:00";
const DEFAULT_SLOT_DURATION_MINUTES = 60;
const ALLOWED_SLOT_DURATIONS = [30, 45, 60];
// Historical identifiers for the canonical Vision Barber tenant.
// They are kept for compatibility with existing routes, records and sessions,
// not as a signal that Vision Barber should behave like a privileged runtime.
const DEFAULT_BUSINESS_ID = "business_principal";
const DEFAULT_BUSINESS_SLUG = "barberia-principal";
const PRODUCTION_BASE_URL = "https://software-de-prueba-peluqueria-muest.vercel.app";
const BUSINESS_TIMEZONE = "America/Bogota";
const SUPER_ADMIN_USER = "SDMcompany";
const SUPER_ADMIN_PASSWORD_HASH = "9c92c00e241ec0c78798834456113f123762afcb4ef84e337eafbcf7d372f2fc";
const BUSINESS_SELECT_COLUMNS =
  "id,business_name,slug,logo_url,theme,primary_color,secondary_color,background_url,active,created_at,updated_at";
const BUSINESS_SETTINGS_SELECT_COLUMNS =
  "business_id,environment_archive_meta,theme_override,environment_archive_url,environment_archive_name,public_path,custom_domain,notes,created_at";
const BUSINESS_SETTINGS_LIGHT_SELECT_COLUMNS =
  "business_id,environment_archive_meta,theme_override,created_at";
const BARBER_SELECT_COLUMNS =
  "id,business_id,name,user,password,password_hash,whatsapp,active,photo,gradient,specialty,created_at";
const PUBLIC_BARBER_SELECT_COLUMNS =
  "id,business_id,name,active,photo,gradient,specialty,created_at";
const APPOINTMENT_SELECT_COLUMNS =
  "id,business_id,barber_id,date,time,status,client_name,whatsapp,source,week_key,block_origin,visit_state,notes";
const PUBLIC_APPOINTMENT_SELECT_COLUMNS =
  "id,business_id,barber_id,date,time,status,week_key,block_origin";
const BLOCKED_DAY_SELECT_COLUMNS = "id,business_id,barber_id,date";
const SERVICE_SELECT_COLUMNS =
  "id,business_id,service_name,service_value,admin_percentage,barber_percentage,service_icon_id,active,created_at";
const PUBLIC_SERVICE_SELECT_COLUMNS =
  "id,business_id,service_name,service_value,service_icon_id,active,created_at";
const SERVICE_ICON_SELECT_COLUMNS =
  "id,name,image_data,mime_type,active,created_at";
const BARBER_SERVICE_SELECT_COLUMNS = "id,business_id,barber_id,service_id,active,created_at";
const ADMIN_ACCOUNT_SELECT_COLUMNS =
  "id,business_id,admin_name,admin_user,password,password_hash,role,active,created_at,updated_at";
const ADMIN_ACCOUNT_SELECT_COLUMNS_LEGACY =
  "id,business_id,admin_name,admin_user,password_hash,role,active,created_at,updated_at";

const avatarGradients = [
  "linear-gradient(145deg, #0f2f38, #c7d0d2)",
  "linear-gradient(145deg, #191b1d, #447381)",
  "linear-gradient(145deg, #324044, #f1f5f4)",
  "linear-gradient(145deg, #0b1519, #8ca2a7)",
];
const DEFAULT_BUSINESS_THEME_KEY = "urban-neon";
const FORCE_GLOBAL_VISUAL_THEME = true;
const GLOBAL_VISUAL_THEME_KEY = "urban-neon";
const BUSINESS_THEME_ALIASES = {
  gold_black: "gold-prestige",
  blue_black: "urban-neon",
  red_black: "royal-red",
  green_black: "emerald-luxury",
  purple_black: "urban-neon",
  white_black: "gold-prestige",
  gray_black: "gold-prestige",
  orange_black: "gold-prestige",
};
const LOADING_BUSINESS_PALETTE = {
  primary: "#7DD3FC",
  secondary: "#101418",
    background: "~",
  card: "#141A20",
  text: "#F8FAFC",
  textSecondary: "#B6C2CC",
  title: "#F8FAFC",
  subtitle: "#D8E2EA",
  button: "#24313B",
  buttonHover: "#314454",
  border: "#334452",
  icon: "#9EDDFB",
  badge: "#9EDDFB",
};
const BOGOTA_DATE_PARTS_FORMATTER = new Intl.DateTimeFormat("en-CA", {
  timeZone: BUSINESS_TIMEZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});
const BOGOTA_WEEKDAY_FORMATTER = new Intl.DateTimeFormat("en-US", {
  timeZone: BUSINESS_TIMEZONE,
  weekday: "short",
});
const BOGOTA_LONG_DATE_FORMATTER = new Intl.DateTimeFormat("es-CO", {
  timeZone: BUSINESS_TIMEZONE,
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});
const BOGOTA_TIME_FORMATTER = new Intl.DateTimeFormat("es-CO", {
  timeZone: BUSINESS_TIMEZONE,
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});
const BOGOTA_WEEKDAY_INDEX = {
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6,
};
const themeMemoryCache = new Map();
let lastAppliedThemeSignature = "";
const BUSINESS_THEMES = {
  "gold-prestige": {
    label: "Gold Prestige",
    primary: "#D4AF37",
    secondary: "#111111",
    background: "#0A0A0A",
    card: "#1A1A1A",
    text: "#FFFFFF",
    textSecondary: "#BDBDBD",
    title: "#D4AF37",
    subtitle: "#FFFFFF",
    button: "#D4AF37",
    buttonHover: "#E5C158",
    border: "#D4AF37",
    icon: "#D4AF37",
    badge: "#D4AF37",
  },
  "urban-neon": {
    label: "Urban Neon",
    primary: "#00BFFF",
    secondary: "#111111",
    background: "#0B0B0B",
    card: "#171717",
    text: "#FFFFFF",
    textSecondary: "#B0BEC5",
    title: "#00BFFF",
    subtitle: "#FFFFFF",
    button: "#00BFFF",
    buttonHover: "#35CFFF",
    border: "#00BFFF",
    icon: "#00BFFF",
    badge: "#00BFFF",
  },
  "royal-red": {
    label: "Royal Red",
    primary: "#E53935",
    secondary: "#111111",
    background: "#0A0A0A",
    card: "#1C1C1C",
    text: "#FFFFFF",
    textSecondary: "#CFCFCF",
    title: "#E53935",
    subtitle: "#FFFFFF",
    button: "#E53935",
    buttonHover: "#F44336",
    border: "#E53935",
    icon: "#E53935",
    badge: "#E53935",
  },
  "emerald-luxury": {
    label: "Emerald Luxury",
    primary: "#00A86B",
    secondary: "#111111",
    background: "#0A0A0A",
    card: "#161616",
    text: "#FFFFFF",
    textSecondary: "#C0C0C0",
    title: "#00A86B",
    subtitle: "#FFFFFF",
    button: "#00A86B",
    buttonHover: "#00C57D",
    border: "#00A86B",
    icon: "#00A86B",
    badge: "#00A86B",
  },
};

function uid(prefix = "id") {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

function uuidId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  const bytes = window.crypto?.getRandomValues
    ? window.crypto.getRandomValues(new Uint8Array(16))
    : Uint8Array.from({ length: 16 }, () => Math.floor(Math.random() * 256));
  bytes[6] = (bytes[6] & 15) | 64;
  bytes[8] = (bytes[8] & 63) | 128;
  const hex = [...bytes].map((value) => value.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function bogotaNowParts(date = new Date()) {
  const parts = Object.fromEntries(
    BOGOTA_DATE_PARTS_FORMATTER
      .formatToParts(date)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value])
  );
  return {
    year: Number(parts.year || 0),
    month: Number(parts.month || 0),
    day: Number(parts.day || 0),
    hour: Number(parts.hour || 0),
    minute: Number(parts.minute || 0),
  };
}

function parseISODateParts(date) {
  const match = String(date || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    return { year: 0, month: 0, day: 0 };
  }
  return {
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3]),
  };
}

function isoFromDateParts({ year, month, day }) {
  return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function addDaysISO(date, days) {
  const { year, month, day } = parseISODateParts(date);
  const shifted = new Date(Date.UTC(year, month - 1, day + days, 12, 0, 0));
  return isoFromDateParts({
    year: shifted.getUTCFullYear(),
    month: shifted.getUTCMonth() + 1,
    day: shifted.getUTCDate(),
  });
}

function weekdayIndexForISODate(date) {
  const normalized = String(date || "").slice(0, 10);
  if (!normalized) return 0;
  const weekdayKey = BOGOTA_WEEKDAY_FORMATTER.format(new Date(`${normalized}T12:00:00-05:00`)).toLowerCase();
  return BOGOTA_WEEKDAY_INDEX[weekdayKey] ?? 0;
}

function dayNameForISODate(date, long = false) {
  const index = weekdayIndexForISODate(date);
  return long ? longDayNames[index] : dayNames[index];
}

function dayNumberForISODate(date) {
  return String(parseISODateParts(date).day || 0).padStart(2, "0");
}

function todayISO() {
  const { year, month, day } = bogotaNowParts();
  return isoFromDateParts({ year, month, day });
}

function nowMinutes() {
  const { hour, minute } = bogotaNowParts();
  return hour * 60 + minute;
}

function getBogotaNow() {
  return bogotaNowParts();
}

function getBogotaDateKey(date = new Date()) {
  if (typeof date === "string") return String(date).slice(0, 10);
  const { year, month, day } = bogotaNowParts(date instanceof Date ? date : new Date(date));
  return isoFromDateParts({ year, month, day });
}

function compareBogotaDateKeys(left, right) {
  return String(left || "").localeCompare(String(right || ""));
}

function isPastDateInBogota(date) {
  const dateKey = getBogotaDateKey(date);
  if (!dateKey) return false;
  return compareBogotaDateKeys(dateKey, getBogotaDateKey()) < 0;
}

function isFutureDateInBogota(date) {
  const dateKey = getBogotaDateKey(date);
  if (!dateKey) return false;
  return compareBogotaDateKeys(dateKey, getBogotaDateKey()) > 0;
}

function isTodayInBogota(date) {
  const dateKey = getBogotaDateKey(date);
  if (!dateKey) return false;
  return compareBogotaDateKeys(dateKey, getBogotaDateKey()) === 0;
}

function isPastTimeSlotInBogota(date, time) {
  if (!isTodayInBogota(date)) return false;
  const start = parseSlotTime(time);
  return start.hour * 60 + start.minute <= nowMinutes();
}

function toISO(date) {
  return getBogotaDateKey(date);
}

function getWeekKey(date = new Date()) {
  const anchor = toISO(date);
  const { year, month, day: monthDay } = parseISODateParts(anchor);
  const d = new Date(Date.UTC(year, month - 1, monthDay, 12, 0, 0));
  const isoWeekday = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - isoWeekday);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
}

function getWeekDates(anchor = new Date()) {
  const anchorISO = toISO(anchor);
  const weekdayIndex = weekdayIndexForISODate(anchorISO);
  const mondayOffset = weekdayIndex === 0 ? -6 : 1 - weekdayIndex;
  const monday = addDaysISO(anchorISO, mondayOffset);
  return Array.from({ length: 7 }, (_, index) => addDaysISO(monday, index));
}

const agendaMemo = {
  stateRef: null,
  weekDates: new Map(),
  slotRows: new Map(),
  publicDateAvailability: new Map(),
};

function currentAgendaTimeBucket() {
  return `${todayISO()}:${Math.floor(nowMinutes() / 10)}`;
}

function ensureAgendaMemoFresh() {
  if (agendaMemo.stateRef === store.state) return;
  agendaMemo.stateRef = store.state;
  agendaMemo.weekDates.clear();
  agendaMemo.slotRows.clear();
  agendaMemo.publicDateAvailability.clear();
}

function getWeekDatesMemo(anchor = new Date()) {
  ensureAgendaMemoFresh();
  const date = anchor instanceof Date ? anchor : new Date(anchor);
  const key = toISO(date);
  if (!agendaMemo.weekDates.has(key)) {
    agendaMemo.weekDates.set(key, getWeekDates(date));
  }
  return agendaMemo.weekDates.get(key);
}

function slotRowsForBarberDate(barberId, date, businessId = currentBusinessId()) {
  ensureAgendaMemoFresh();
  const key = `${businessId || "global"}:${businessScheduleSignature(businessId)}:${barberId || "sin-barbero"}:${date}`;
  if (!agendaMemo.slotRows.has(key)) {
    agendaMemo.slotRows.set(
      key,
      slotsForBusiness(businessId).map((time) => ({ time, ...statusFor(barberId, date, time, businessId) }))
    );
  }
  return agendaMemo.slotRows.get(key);
}

function publicDateAvailableMemo(barberId, date, businessId = currentBusinessId()) {
  ensureAgendaMemoFresh();
  const key = `${businessId || "global"}:${barberId || "sin-barbero"}:${date}:${currentAgendaTimeBucket()}`;
  if (!agendaMemo.publicDateAvailability.has(key)) {
    agendaMemo.publicDateAvailability.set(key, isPublicDateAvailable(barberId, date, businessId));
  }
  return agendaMemo.publicDateAvailability.get(key);
}

function moneylessPhone(raw) {
  const digits = String(raw || "").replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("57")) return digits;
  return `57${digits}`;
}

function displayPhone(raw) {
  const digits = moneylessPhone(raw);
  if (!digits) return "Sin WhatsApp";
  return `+${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
}

function slugify(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeAssetUrl(value = "") {
  const cleanValue = String(value || "").trim();
  if (!cleanValue) return "";
  if (cleanValue.startsWith("./assets/")) return cleanValue.replace("./assets/", "/assets/");
  if (cleanValue.startsWith("assets/")) return `/${cleanValue}`;
  return cleanValue;
}

function parseSlotTime(time) {
  const [hour, minute] = String(time).split(":").map(Number);
  return { hour: hour || 0, minute: minute || 0 };
}

function slotTimeToMinutes(time) {
  const parsed = parseSlotTime(time);
  return parsed.hour * 60 + parsed.minute;
}

function minutesToSlotTime(minutes) {
  const normalized = Math.max(0, Math.min(24 * 60, Number(minutes) || 0));
  const hour = Math.floor(normalized / 60);
  const minute = normalized % 60;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function normalizeScheduleTime(value, fallback) {
  const clean = String(value || "").trim();
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(clean) ? clean : fallback;
}

function normalizeSlotDuration(value) {
  const duration = Number(value);
  return ALLOWED_SLOT_DURATIONS.includes(duration) ? duration : DEFAULT_SLOT_DURATION_MINUTES;
}

function normalizeBusinessScheduleConfig(source = {}) {
  const openingTime = normalizeScheduleTime(
    source.openingTime ?? source.opening_time,
    DEFAULT_OPENING_TIME
  );
  const closingTime = normalizeScheduleTime(
    source.closingTime ?? source.closing_time,
    DEFAULT_CLOSING_TIME
  );
  const slotDurationMinutes = normalizeSlotDuration(
    source.slotDurationMinutes ?? source.slot_duration_minutes
  );
  const opensAt = slotTimeToMinutes(openingTime);
  const closesAt = slotTimeToMinutes(closingTime);
  if (closesAt <= opensAt || closesAt - opensAt < slotDurationMinutes) {
    return {
      openingTime: DEFAULT_OPENING_TIME,
      closingTime: DEFAULT_CLOSING_TIME,
      slotDurationMinutes: DEFAULT_SLOT_DURATION_MINUTES,
    };
  }
  return { openingTime, closingTime, slotDurationMinutes };
}

function buildBusinessSlots(config = {}) {
  const normalized = normalizeBusinessScheduleConfig(config);
  const startsAt = slotTimeToMinutes(normalized.openingTime);
  const endsAt = slotTimeToMinutes(normalized.closingTime);
  const slots = [];
  for (let current = startsAt; current + normalized.slotDurationMinutes <= endsAt; current += normalized.slotDurationMinutes) {
    slots.push(minutesToSlotTime(current));
  }
  return slots.length ? slots : [DEFAULT_OPENING_TIME];
}

function businessScheduleConfig(businessId = currentBusinessId()) {
  return store.businessSettingsForBusiness(businessId).schedule;
}

function businessScheduleSignature(businessId = currentBusinessId()) {
  const schedule = businessScheduleConfig(businessId);
  return `${schedule.openingTime}-${schedule.closingTime}-${schedule.slotDurationMinutes}`;
}

function slotsForBusiness(businessId = currentBusinessId()) {
  return buildBusinessSlots(businessScheduleConfig(businessId));
}

function formatAmPm(hour, minute = 0) {
  const suffix = hour >= 12 ? "PM" : "AM";
  const normalized = hour % 12 || 12;
  return `${String(normalized).padStart(2, "0")}:${String(minute).padStart(2, "0")} ${suffix}`;
}

function addMinutesToSlot(time, minutesToAdd) {
  const parsed = parseSlotTime(time);
  const total = parsed.hour * 60 + parsed.minute + minutesToAdd;
  return { hour: Math.floor(total / 60), minute: total % 60 };
}

function slotRange(time, businessId = currentBusinessId()) {
  const start = parseSlotTime(time);
  const end = addMinutesToSlot(time, businessScheduleConfig(businessId).slotDurationMinutes);
  return `${formatAmPm(start.hour, start.minute)} - ${formatAmPm(end.hour, end.minute)}`;
}

function perfLogsEnabled() {
  return localStorage.getItem(PERF_LOG_KEY) === "1";
}

function perfMark(label) {
  return { label, start: performance.now() };
}

function perfEnd(mark, extra = "") {
  if (!perfLogsEnabled() || !mark) return;
  const elapsed = Math.round((performance.now() - mark.start) * 10) / 10;
  console.debug(`[perf] ${mark.label}: ${elapsed}ms${extra ? ` ${extra}` : ""}`);
}

function perfStep(label, mark, extra = "") {
  if (!perfLogsEnabled() || !mark) return;
  const elapsed = Math.round((performance.now() - mark.start) * 10) / 10;
  console.debug(`[perf] ${label}: ${elapsed}ms${extra ? ` ${extra}` : ""}`);
}

function estimatePayloadKb(data) {
  try {
    return Math.round((new Blob([JSON.stringify(data ?? null)]).size / 1024) * 10) / 10;
  } catch {
    return 0;
  }
}

function queryMetricsEnabled() {
  return perfLogsEnabled() && localStorage.getItem(PERF_QUERY_LOG_ENABLED_KEY) === "1";
}

function loadQueryMetricRows() {
  try {
    const parsed = JSON.parse(localStorage.getItem(PERF_QUERY_METRICS_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function loadSyncMetricRows() {
  try {
    const parsed = JSON.parse(localStorage.getItem(PERF_SYNC_METRICS_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function loadSubscribeMetricRows() {
  try {
    const parsed = JSON.parse(localStorage.getItem(PERF_SUBSCRIBE_METRICS_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function simplifiedStack() {
  try {
    return (new Error().stack || "")
      .split("\n")
      .slice(3, 8)
      .map((line) => line.trim().replace(location.origin, ""))
      .join(" <- ");
  } catch {
    return "";
  }
}

function recordSyncMetric(metric) {
  if (!queryMetricsEnabled()) return;
  const current = loadSyncMetricRows();
  current.push({
    ...metric,
    at: new Date().toISOString(),
  });
  localStorage.setItem(PERF_SYNC_METRICS_KEY, JSON.stringify(current.slice(-120)));
}

function recordSubscribeMetric(metric) {
  if (!queryMetricsEnabled()) return;
  const current = loadSubscribeMetricRows();
  current.push({
    ...metric,
    at: new Date().toISOString(),
  });
  localStorage.setItem(PERF_SUBSCRIBE_METRICS_KEY, JSON.stringify(current.slice(-120)));
}

function recordQueryMetric(metric) {
  if (!queryMetricsEnabled()) return;
  const entry = {
    ...metric,
    at: new Date().toISOString(),
  };
  const current = loadQueryMetricRows();
  current.push(entry);
  const trimmed = current.slice(-160);
  localStorage.setItem(PERF_QUERY_METRICS_KEY, JSON.stringify(trimmed));
  console.debug(
    `[egress] ${entry.scope} ${entry.label}: ${entry.kb}KB ${entry.ms}ms ${entry.rows ?? 0} filas`
  );
}

function disableTemporaryPerformanceDiagnostics() {
  try {
    localStorage.removeItem(PERF_QUERY_LOG_ENABLED_KEY);
    localStorage.removeItem(PERF_QUERY_METRICS_KEY);
    localStorage.removeItem(PERF_SYNC_METRICS_KEY);
    localStorage.removeItem(PERF_SUBSCRIBE_METRICS_KEY);
  } catch {
    // Ignore storage restrictions; diagnostics are optional and should never block the UI.
  }
}

function summarizeQueryMetrics() {
  const rows = loadQueryMetricRows();
  return rows.reduce((summary, row) => {
    const key = row.scope || "global";
    summary[key] ||= { queries: 0, kb: 0, ms: 0 };
    summary[key].queries += 1;
    summary[key].kb = Math.round((summary[key].kb + (Number(row.kb) || 0)) * 10) / 10;
    summary[key].ms = Math.round((summary[key].ms + (Number(row.ms) || 0)) * 10) / 10;
    return summary;
  }, {});
}

function normalizeMetricView(scope = "") {
  const normalized = String(scope || "").toLowerCase();
  if (normalized.includes("super-admin")) return "Super Admin";
  if (normalized.includes("public") || normalized.includes("business-test")) return "Agenda publica";
  if (normalized.includes("admin-accounts")) return "Panel Admin";
  if (normalized.startsWith("admin:") || normalized.includes("internal:")) return "Panel Admin";
  if (normalized.startsWith("barber:")) return "Panel Barbero";
  return "Otras vistas";
}

function metricStageFromLabel(label = "") {
  const normalized = String(label || "").toLowerCase();
  if (normalized.includes("businesses")) return "business";
  if (normalized.includes("business_settings")) return "theme";
  if (normalized.includes("services")) return "services";
  if (normalized.includes("barbers")) return "barbers";
  if (normalized.includes("appointments")) return "appointments";
  if (normalized.includes("admin_accounts")) return "admins";
  if (normalized.includes("blocked_days") || normalized.includes("barber_services")) return "agenda";
  return "other";
}

function buildPerformanceDiagnostics() {
  const metricRows = loadQueryMetricRows();
  const views = ["Super Admin", "Agenda publica", "Panel Admin", "Panel Barbero"];
  const base = Object.fromEntries(
    views.map((view) => [
      view,
      {
        view,
        queries: 0,
        kb: 0,
        ms: 0,
        businessMs: 0,
        themeMs: 0,
        logoMs: 0,
        servicesMs: 0,
        barbersMs: 0,
        appointmentsMs: 0,
        adminsMs: 0,
        agendaMs: 0,
      },
    ])
  );

  const querySummary = new Map();
  metricRows.forEach((row) => {
    const view = normalizeMetricView(row.scope);
    if (!base[view]) return;
    const queryKey = `${view}|${row.label || "consulta"}`;
    const queryItem = querySummary.get(queryKey) || {
      view,
      label: row.label || "consulta",
      component: row.component || "StudioStore",
      reason: row.reason || "supabase_read",
      source: row.source || "supabase",
      executions: 0,
      kb: 0,
      totalMs: 0,
      avgMs: 0,
    };
    queryItem.executions += 1;
    queryItem.kb = Math.round((queryItem.kb + (Number(row.kb) || 0)) * 10) / 10;
    queryItem.totalMs = Math.round((queryItem.totalMs + (Number(row.ms) || 0)) * 10) / 10;
    queryItem.avgMs = Math.round((queryItem.totalMs / queryItem.executions) * 10) / 10;
    querySummary.set(queryKey, queryItem);

    const target = base[view];
    const ms = Number(row.ms) || 0;
    target.queries += 1;
    target.kb = Math.round((target.kb + (Number(row.kb) || 0)) * 10) / 10;
    target.ms = Math.round((target.ms + ms) * 10) / 10;
    const stage = metricStageFromLabel(row.label);
    if (stage === "business") {
      target.businessMs += ms;
      target.logoMs += ms;
    } else if (stage === "theme") {
      target.themeMs += ms;
    } else if (stage === "services") {
      target.servicesMs += ms;
    } else if (stage === "barbers") {
      target.barbersMs += ms;
    } else if (stage === "appointments") {
      target.appointmentsMs += ms;
      target.agendaMs += ms;
    } else if (stage === "admins") {
      target.adminsMs += ms;
    } else if (stage === "agenda") {
      target.agendaMs += ms;
    }
  });

  const rows = Object.values(base).map((item) => ({
    ...item,
    businessMs: Math.round(item.businessMs * 10) / 10,
    themeMs: Math.round(item.themeMs * 10) / 10,
    logoMs: Math.round(item.logoMs * 10) / 10,
    servicesMs: Math.round(item.servicesMs * 10) / 10,
    barbersMs: Math.round(item.barbersMs * 10) / 10,
    appointmentsMs: Math.round(item.appointmentsMs * 10) / 10,
    adminsMs: Math.round(item.adminsMs * 10) / 10,
    agendaMs: Math.round(item.agendaMs * 10) / 10,
  }));

  const pick = (field) =>
    rows.reduce((winner, item) => ((Number(item[field]) || 0) > (Number(winner?.[field]) || 0) ? item : winner), null);

  const lastMetricAt = metricRows.length ? metricRows[metricRows.length - 1].at : "";
  return {
    rows,
    queryRows: [...querySummary.values()].sort((a, b) =>
      b.executions - a.executions || b.kb - a.kb || b.totalMs - a.totalMs
    ),
    syncRows: loadSyncMetricRows().slice(-30).reverse(),
    subscribeRows: loadSubscribeMetricRows().slice(-30).reverse(),
    slowest: pick("ms"),
    mostQueries: pick("queries"),
    mostKb: pick("kb"),
    measuredAt: lastMetricAt ? new Date(lastMetricAt).toLocaleString("es-CO") : "Sin mediciones todavia",
  };
}

function emptyBusinessBucket() {
  return {
    barbers: [],
    activeBarbers: [],
    services: [],
    activeServices: [],
    appointments: [],
    blockedDays: [],
    barberServices: [],
    appointmentBySlot: new Map(),
    blockedDayKeys: new Set(),
    servicesById: new Map(),
    barbersById: new Map(),
    appointmentsById: new Map(),
    barberServicesByBarber: new Map(),
    barberServicesByService: new Map(),
  };
}

const derivedBusinessCache = {
  stateRef: null,
  buckets: new Map(),
};

function invalidateDerivedBusinessCache() {
  derivedBusinessCache.stateRef = null;
  derivedBusinessCache.buckets = new Map();
}

function indexByBusiness(items = []) {
  const map = new Map();
  items.forEach((item) => {
    const businessId = item.negocioId || DEFAULT_BUSINESS_ID;
    if (!map.has(businessId)) map.set(businessId, []);
    map.get(businessId).push(item);
  });
  return map;
}

function buildBusinessBucketFromState(state, businessId) {
  const id = businessId || DEFAULT_BUSINESS_ID;
  const barbersByBusiness = indexByBusiness(state.barbers);
  const servicesByBusiness = indexByBusiness(state.services);
  const appointmentsByBusiness = indexByBusiness(state.appointments);
  const blockedDaysByBusiness = indexByBusiness(state.blockedDays);
  const barberServicesByBusiness = indexByBusiness(state.barberServices);
  const bucket = emptyBusinessBucket();
  bucket.barbers = barbersByBusiness.get(id) || [];
  bucket.activeBarbers = bucket.barbers.filter((barber) => barber.active);
  bucket.services = servicesByBusiness.get(id) || [];
  bucket.activeServices = bucket.services.filter((service) => service.active);
  bucket.appointments = appointmentsByBusiness.get(id) || [];
  bucket.blockedDays = blockedDaysByBusiness.get(id) || [];
  bucket.barberServices = barberServicesByBusiness.get(id) || [];
  bucket.barbersById = new Map(bucket.barbers.map((barber) => [barber.id, barber]));
  bucket.servicesById = new Map(bucket.services.map((service) => [service.id, service]));
  bucket.appointmentsById = new Map(bucket.appointments.map((appointment) => [appointment.id, appointment]));
  bucket.appointments.forEach((appointment) => {
    bucket.appointmentBySlot.set(`${appointment.barberId}|${appointment.date}|${appointment.time}`, appointment);
  });
  bucket.blockedDays.forEach((blockedDay) => {
    bucket.blockedDayKeys.add(`${blockedDay.barberId}|${blockedDay.date}`);
  });
  bucket.barberServices.forEach((relation) => {
    if (!bucket.barberServicesByBarber.has(relation.barberId)) {
      bucket.barberServicesByBarber.set(relation.barberId, []);
    }
    if (!bucket.barberServicesByService.has(relation.serviceId)) {
      bucket.barberServicesByService.set(relation.serviceId, []);
    }
    bucket.barberServicesByBarber.get(relation.barberId).push(relation);
    bucket.barberServicesByService.get(relation.serviceId).push(relation);
  });
  return bucket;
}

function getBusinessBucket(businessId = currentBusinessId()) {
  if (derivedBusinessCache.stateRef !== store.state) {
    derivedBusinessCache.stateRef = store.state;
    derivedBusinessCache.buckets = new Map();
  }
  const id = businessId || "";
  if (derivedBusinessCache.buckets.has(id)) return derivedBusinessCache.buckets.get(id);
  const bucket = buildBusinessBucketFromState(store.state, id);
  const liveStore = runtimeStore();
  if (liveStore?.renderableResourceRows) {
    bucket.barbers = liveStore.renderableResourceRows("barbers", id, bucket.barbers);
    bucket.activeBarbers = bucket.barbers.filter((barber) => barber.active);
    bucket.services = liveStore.renderableResourceRows("services", id, bucket.services);
    bucket.activeServices = bucket.services.filter((service) => service.active);
    bucket.appointments = liveStore.renderableResourceRows("appointments", id, bucket.appointments);
    bucket.barbersById = new Map(bucket.barbers.map((barber) => [barber.id, barber]));
    bucket.servicesById = new Map(bucket.services.map((service) => [service.id, service]));
    bucket.appointmentsById = new Map(bucket.appointments.map((appointment) => [appointment.id, appointment]));
    bucket.appointmentBySlot = new Map();
    bucket.appointments.forEach((appointment) => {
      bucket.appointmentBySlot.set(`${appointment.barberId}|${appointment.date}|${appointment.time}`, appointment);
    });
  }
  derivedBusinessCache.buckets.set(id, bucket);
  return bucket;
}

function isPastDate(date) {
  return isPastDateInBogota(date);
}

function isTodayDate(date) {
  return isTodayInBogota(date);
}

function slotHasPassed(date, time) {
  return isPastTimeSlotInBogota(date, time);
}

function isPublicSlotBookable(barberId, date, time, businessId = currentBusinessId()) {
  const state = statusFor(barberId, date, time, businessId);
  return !isPastDate(date) && !slotHasPassed(date, time) && state.status === "available";
}

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function defaultBusiness() {
  // Neutral business metadata for the canonical tenant route.
  // This helper should only describe the tenant identity and theme shell.
  // Operational resources must come from Supabase by business_id.
  const palette = BUSINESS_THEMES[DEFAULT_BUSINESS_THEME_KEY];
  return {
    id: DEFAULT_BUSINESS_ID,
    name: "Vision Barber",
    slug: DEFAULT_BUSINESS_SLUG,
    logoUrl: "/assets/vision-barber-logo.avif",
    theme: DEFAULT_BUSINESS_THEME_KEY,
    primaryColor: palette.primary,
    secondaryColor: palette.secondary,
    backgroundColor: palette.background,
    cardColor: palette.card,
    textColor: palette.text,
    textSecondaryColor: palette.textSecondary,
    titleColor: palette.title,
    subtitleColor: palette.subtitle,
    buttonColor: palette.button,
    buttonHoverColor: palette.buttonHover,
    borderColor: palette.border,
    iconColor: palette.icon,
    badgeColor: palette.badge,
    backgroundUrl: "",
    active: true,
    createdAt: todayISO(),
    updatedAt: todayISO(),
  };
}

function cachedThemeForSlug(slug = "") {
  const cleanSlug = slugify(slug) || DEFAULT_BUSINESS_SLUG;
  const memoryTheme = themeMemoryCache.get(cleanSlug);
  if (memoryTheme?.theme && memoryTheme?.colors) return memoryTheme;
  try {
    const cached = JSON.parse(localStorage.getItem(`${THEME_CACHE_PREFIX}${cleanSlug}`) || "null");
    const theme = cached?.theme && BUSINESS_THEMES[cached.theme] ? cached.theme : "";
    const colors = cached?.colors && typeof cached.colors === "object" ? cached.colors : null;
    if (!theme || !colors) return null;
    const themeRecord = { theme, colors, businessId: cached.businessId || "", updatedAt: cached.updatedAt || "" };
    themeMemoryCache.set(cleanSlug, themeRecord);
    if (themeRecord.businessId) themeMemoryCache.set(themeRecord.businessId, themeRecord);
    return themeRecord;
  } catch {
    return null;
  }
}

function cachedThemeForBusiness(business = {}) {
  const businessId = String(business?.id || "").trim();
  const slug = slugify(business?.slug || "");
  return (businessId && themeMemoryCache.get(businessId)) || (slug && cachedThemeForSlug(slug)) || null;
}

function readCachedRecordMap(storageKey) {
  try {
    const raw = JSON.parse(localStorage.getItem(storageKey) || "{}");
    return raw && typeof raw === "object" ? raw : {};
  } catch {
    return {};
  }
}

function writeCachedRecordMap(storageKey, value) {
  localStorage.setItem(storageKey, JSON.stringify(value && typeof value === "object" ? value : {}));
}

function placeholderBusinessForSlug(slug = "") {
  const cleanSlug = slugify(slug) || "barberia";
  const cachedTheme = cachedThemeForSlug(cleanSlug);
  const palette = cachedTheme?.colors || LOADING_BUSINESS_PALETTE;
  return normalizeBusiness({
    id: `missing_${cleanSlug}`,
    name: cleanSlug
      .split("-")
      .filter(Boolean)
      .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
      .join(" ") || "Barberia",
    slug: cleanSlug,
    logoUrl: "",
    theme: cachedTheme?.theme || "loading-neutral",
    primaryColor: palette.primary,
    secondaryColor: palette.secondary,
    backgroundColor: palette.background,
    cardColor: palette.card,
    textColor: palette.text,
    textSecondaryColor: palette.textSecondary,
    titleColor: palette.title,
    subtitleColor: palette.subtitle,
    buttonColor: palette.button,
    buttonHoverColor: palette.buttonHover,
    backgroundUrl: "",
    borderColor: palette.border,
    iconColor: palette.icon,
    badgeColor: palette.badge,
    active: true,
    isPlaceholder: true,
    createdAt: todayISO(),
    updatedAt: todayISO(),
  });
}

function isPlaceholderBusiness(business = {}) {
  return Boolean(business.isPlaceholder) || String(business.id || "").startsWith("missing_");
}

function neutralBootstrapBusiness() {
  return {
    name: "Cargando negocio",
    logoUrl: "",
    theme: "loading-neutral",
    primaryColor: LOADING_BUSINESS_PALETTE.primary,
    secondaryColor: LOADING_BUSINESS_PALETTE.secondary,
    backgroundColor: LOADING_BUSINESS_PALETTE.background,
    cardColor: LOADING_BUSINESS_PALETTE.card,
    textColor: LOADING_BUSINESS_PALETTE.text,
    textSecondaryColor: LOADING_BUSINESS_PALETTE.textSecondary,
    titleColor: LOADING_BUSINESS_PALETTE.title,
    subtitleColor: LOADING_BUSINESS_PALETTE.subtitle,
    buttonColor: LOADING_BUSINESS_PALETTE.button,
    buttonHoverColor: LOADING_BUSINESS_PALETTE.buttonHover,
    borderColor: LOADING_BUSINESS_PALETTE.border,
    iconColor: LOADING_BUSINESS_PALETTE.icon,
    badgeColor: LOADING_BUSINESS_PALETTE.badge,
    active: true,
    isBootstrap: true,
  };
}

function neutralBootstrapState() {
  return {
    meta: {
      dayKey: todayISO(),
      weekKey: getWeekKey(),
      selectedDate: todayISO(),
      currentBusinessId: "",
      businessSummaryById: {},
      bootstrapReady: false,
    },
    businesses: [],
    barbers: [],
    appointments: [],
    blockedDays: [],
    services: [],
    serviceIcons: [],
    barberServices: [],
  };
}

function normalizeThemeKey(themeKey = DEFAULT_BUSINESS_THEME_KEY) {
  const key = String(themeKey || DEFAULT_BUSINESS_THEME_KEY).trim();
  if (key === "loading-neutral") return key;
  return BUSINESS_THEMES[key] ? key : BUSINESS_THEME_ALIASES[key] || DEFAULT_BUSINESS_THEME_KEY;
}

function activeVisualThemeKey(themeKey = DEFAULT_BUSINESS_THEME_KEY) {
  return FORCE_GLOBAL_VISUAL_THEME ? GLOBAL_VISUAL_THEME_KEY : normalizeThemeKey(themeKey);
}

function normalizeBusiness(record = {}) {
  const base = defaultBusiness();
  const id = record.id || base.id;
  const theme = normalizeThemeKey(record.theme || base.theme);
  const palette = theme === "loading-neutral" ? LOADING_BUSINESS_PALETTE : BUSINESS_THEMES[theme] || BUSINESS_THEMES[DEFAULT_BUSINESS_THEME_KEY];
  return {
    ...base,
    ...record,
    id,
    slug: id === DEFAULT_BUSINESS_ID ? DEFAULT_BUSINESS_SLUG : String(record.slug || base.slug).trim().toLowerCase(),
    logoUrl: normalizeAssetUrl(record.logoUrl ?? (id === DEFAULT_BUSINESS_ID ? base.logoUrl : "")),
    theme,
    primaryColor: record.primaryColor || palette.primary,
    secondaryColor: record.secondaryColor || palette.secondary,
    backgroundColor: record.backgroundColor || palette.background,
    cardColor: record.cardColor || palette.card,
    textColor: record.textColor || palette.text,
    textSecondaryColor: record.textSecondaryColor || palette.textSecondary,
    titleColor: record.titleColor || palette.title,
    subtitleColor: record.subtitleColor || palette.subtitle,
    buttonColor: record.buttonColor || palette.button,
    buttonHoverColor: record.buttonHoverColor || palette.buttonHover,
    borderColor: record.borderColor || palette.border,
    iconColor: record.iconColor || palette.icon,
    badgeColor: record.badgeColor || palette.badge,
    backgroundUrl: normalizeAssetUrl(record.backgroundUrl || ""),
    active: parseActiveFlag(record.active, true),
    updatedAt: record.updatedAt || todayISO(),
  };
}

function parseActiveFlag(value, fallback = true) {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (["true", "1", "si", "sí", "active", "activo"].includes(normalized)) return true;
    if (["false", "0", "no", "inactive", "inactivo"].includes(normalized)) return false;
  }
  if (typeof value === "number") return value !== 0;
  return fallback;
}

function isArchivedBusiness(business = {}) {
  const slug = String(business.slug || "").toLowerCase();
  const name = String(business.name || business.business_name || "").toLowerCase();
  return slug.startsWith("deleted-") || name.startsWith("[eliminada]");
}

function normalizeTenantState(state = {}) {
  const business = normalizeBusiness((state.businesses || [defaultBusiness()])[0] || defaultBusiness());
  const businesses = (state.businesses?.length ? state.businesses : [business]).map(normalizeBusiness);
  const currentBusinessId = state.meta?.currentBusinessId || businesses[0]?.id || DEFAULT_BUSINESS_ID;
  const fallbackBusinessId = businesses.length === 1 ? businesses[0]?.id || currentBusinessId || DEFAULT_BUSINESS_ID : "";
  const attachBusiness = (item) => {
    const resolvedBusinessId = item?.negocioId || item?.businessId || item?.business_id || fallbackBusinessId;
    return resolvedBusinessId ? { ...item, negocioId: resolvedBusinessId } : { ...item };
  };
  return {
    ...state,
    meta: {
      dayKey: todayISO(),
      weekKey: getWeekKey(),
      selectedDate: todayISO(),
      ...state.meta,
      currentBusinessId,
      businessSummaryById: state.meta?.businessSummaryById || {},
    },
    businesses,
    barbers: (state.barbers || []).map(attachBusiness),
    appointments: (state.appointments || []).map(attachBusiness),
    blockedDays: (state.blockedDays || []).map(attachBusiness),
    services: (state.services || []).map(attachBusiness),
    serviceIcons: (state.serviceIcons || []).map((icon) => ({
      id: icon.id,
      name: icon.name || "",
      imageData: icon.imageData || icon.image_data || "",
      mimeType: icon.mimeType || icon.mime_type || "image/png",
      active: parseActiveFlag(icon.active, true),
      createdAt: icon.createdAt || icon.created_at || todayISO(),
    })),
    barberServices: (state.barberServices || []).map(attachBusiness),
  };
}

function sanitizeStateForPersistence(state = {}) {
  const normalized = normalizeTenantState(state);
  return {
    ...normalized,
    serviceIcons: [],
  };
}

function persistAppStateSnapshot(state = {}) {
  localStorage.setItem(APP_KEY, JSON.stringify(sanitizeStateForPersistence(state)));
}

function mergeBusinessesById(...groups) {
  const seen = new Map();
  groups
    .flat()
    .filter(Boolean)
    .forEach((business) => {
      const normalized = normalizeBusiness(business);
      seen.set(normalized.id, normalized);
    });
  return [...seen.values()];
}

function paletteForTheme(themeKey = DEFAULT_BUSINESS_THEME_KEY) {
  if (normalizeThemeKey(themeKey) === "loading-neutral") return LOADING_BUSINESS_PALETTE;
  return BUSINESS_THEMES[normalizeThemeKey(themeKey)] || BUSINESS_THEMES[DEFAULT_BUSINESS_THEME_KEY];
}

function paletteColorRecord(palette = BUSINESS_THEMES[DEFAULT_BUSINESS_THEME_KEY]) {
  return {
    primary: palette.primary,
    secondary: palette.secondary,
    background: palette.background,
    card: palette.card,
    text: palette.text,
    textSecondary: palette.textSecondary,
    title: palette.title,
    subtitle: palette.subtitle,
    button: palette.button,
    buttonHover: palette.buttonHover,
    border: palette.border,
    icon: palette.icon,
    badge: palette.badge,
  };
}

function visualColorsForBusiness(business = currentBusiness()) {
  if (FORCE_GLOBAL_VISUAL_THEME) {
    return paletteColorRecord(paletteForTheme(activeVisualThemeKey(business?.theme || DEFAULT_BUSINESS_THEME_KEY)));
  }
  return colorsForBusiness(business);
}

function colorsForBusiness(business = currentBusiness()) {
  const cachedTheme = cachedThemeForBusiness(business);
  if (cachedTheme?.colors && normalizeThemeKey(business?.theme || cachedTheme.theme) === cachedTheme.theme) {
    return cachedTheme.colors;
  }
  const palette = paletteForTheme(business?.theme || DEFAULT_BUSINESS_THEME_KEY);
  return {
    primary: business?.primaryColor || palette.primary,
    secondary: business?.secondaryColor || palette.secondary,
    background: business?.backgroundColor || palette.background,
    card: business?.cardColor || palette.card,
    text: business?.textColor || palette.text,
    textSecondary: business?.textSecondaryColor || palette.textSecondary,
    title: business?.titleColor || palette.title,
    subtitle: business?.subtitleColor || palette.subtitle,
    button: business?.buttonColor || palette.button,
    buttonHover: business?.buttonHoverColor || palette.buttonHover,
    border: business?.borderColor || palette.border,
    icon: business?.iconColor || palette.icon,
    badge: business?.badgeColor || palette.badge,
  };
}

function applyThemeColorsToRoot(colors) {
  document.documentElement.dataset.activeVisualTheme = FORCE_GLOBAL_VISUAL_THEME ? GLOBAL_VISUAL_THEME_KEY : "business";
  const signature = [
    colors.primary,
    colors.secondary,
    colors.background,
    colors.card,
    colors.text,
    colors.textSecondary,
    colors.title,
    colors.subtitle,
    colors.button,
    colors.buttonHover,
    colors.border,
    colors.icon,
    colors.badge,
  ].join("|");
  if (signature === lastAppliedThemeSignature) return;
  lastAppliedThemeSignature = signature;
  const rootStyle = document.documentElement.style;
  rootStyle.setProperty("--color-primary", colors.primary);
  rootStyle.setProperty("--color-secondary", colors.secondary);
  rootStyle.setProperty("--color-background", colors.background);
  rootStyle.setProperty("--color-card", colors.card);
  rootStyle.setProperty("--color-text", colors.text);
  rootStyle.setProperty("--color-text-secondary", colors.textSecondary);
  rootStyle.setProperty("--color-title", colors.title);
  rootStyle.setProperty("--color-subtitle", colors.subtitle);
  rootStyle.setProperty("--color-button", colors.button);
  rootStyle.setProperty("--color-button-hover", colors.buttonHover);
  rootStyle.setProperty("--color-border", colors.border);
  rootStyle.setProperty("--color-icon", colors.icon);
  rootStyle.setProperty("--color-badge", colors.badge);
  rootStyle.setProperty("--petrol", colors.primary);
  rootStyle.setProperty("--petrol-bright", colors.buttonHover);
  rootStyle.setProperty("--black", colors.background);
  rootStyle.setProperty("--matte", colors.secondary);
  rootStyle.setProperty("--graphite", colors.card);
  rootStyle.setProperty("--graphite-2", colors.card);
  rootStyle.setProperty("--white", colors.text);
  rootStyle.setProperty("--muted", colors.textSecondary);
  rootStyle.setProperty("--silver", colors.textSecondary);
  rootStyle.setProperty("--line", `${colors.border}59`);
  rootStyle.setProperty("--line-strong", `${colors.border}82`);
  rootStyle.setProperty("--glass", `${colors.secondary}c7`);
  rootStyle.setProperty("--glass-soft", `${colors.primary}12`);
}

function cacheBusinessTheme(business) {
  if (!business?.slug) return;
  const theme = normalizeThemeKey(business.theme || "loading-neutral");
  if (theme === "loading-neutral") return;
  const palette = paletteForTheme(theme);
  const colors = {
    primary: business?.primaryColor || palette.primary,
    secondary: business?.secondaryColor || palette.secondary,
    background: business?.backgroundColor || palette.background,
    card: business?.cardColor || palette.card,
    text: business?.textColor || palette.text,
    textSecondary: business?.textSecondaryColor || palette.textSecondary,
    title: business?.titleColor || palette.title,
    subtitle: business?.subtitleColor || palette.subtitle,
    button: business?.buttonColor || palette.button,
    buttonHover: business?.buttonHoverColor || palette.buttonHover,
    border: business?.borderColor || palette.border,
    icon: business?.iconColor || palette.icon,
    badge: business?.badgeColor || palette.badge,
  };
  const themeRecord = { theme, colors, businessId: business.id || "", updatedAt: new Date().toISOString() };
  const cleanSlug = slugify(business.slug);
  if (cleanSlug) themeMemoryCache.set(cleanSlug, themeRecord);
  if (business.id) themeMemoryCache.set(business.id, themeRecord);
  try {
    localStorage.setItem(
      `${THEME_CACHE_PREFIX}${business.slug}`,
      JSON.stringify(themeRecord)
    );
  } catch {
    // Cache visual solamente; si falla, la app sigue usando Supabase/local state.
  }
}

function cacheBusinessThemes(businesses = []) {
  businesses.forEach(cacheBusinessTheme);
}

function businessThemePatch(themeKey = DEFAULT_BUSINESS_THEME_KEY) {
  const normalizedTheme = normalizeThemeKey(themeKey);
  const palette = paletteForTheme(themeKey);
  return {
    theme: normalizedTheme,
    primaryColor: palette.primary,
    secondaryColor: palette.secondary,
    backgroundColor: palette.background,
    cardColor: palette.card,
    textColor: palette.text,
    textSecondaryColor: palette.textSecondary,
    titleColor: palette.title,
    subtitleColor: palette.subtitle,
    buttonColor: palette.button,
    buttonHoverColor: palette.buttonHover,
    borderColor: palette.border,
    iconColor: palette.icon,
    badgeColor: palette.badge,
  };
}

function businessThemePatchFromMeta(themeColors = {}) {
  if (!themeColors || typeof themeColors !== "object") return {};
  return {
    ...(themeColors.primary ? { primaryColor: themeColors.primary } : {}),
    ...(themeColors.secondary ? { secondaryColor: themeColors.secondary } : {}),
    ...(themeColors.background ? { backgroundColor: themeColors.background } : {}),
    ...(themeColors.card ? { cardColor: themeColors.card } : {}),
    ...(themeColors.text ? { textColor: themeColors.text } : {}),
    ...(themeColors.textSecondary ? { textSecondaryColor: themeColors.textSecondary } : {}),
    ...(themeColors.title ? { titleColor: themeColors.title } : {}),
    ...(themeColors.subtitle ? { subtitleColor: themeColors.subtitle } : {}),
    ...(themeColors.button ? { buttonColor: themeColors.button } : {}),
    ...(themeColors.buttonHover ? { buttonHoverColor: themeColors.buttonHover } : {}),
    ...(themeColors.border ? { borderColor: themeColors.border } : {}),
    ...(themeColors.icon ? { iconColor: themeColors.icon } : {}),
    ...(themeColors.badge ? { badgeColor: themeColors.badge } : {}),
  };
}

function businessBrandingPatchFromMeta(meta = {}) {
  const logoUrl = meta?.logoUrl || meta?.logo_url || meta?.businessLogoUrl || "";
  return {
    ...(logoUrl ? { logoUrl } : {}),
  };
}

function applyBusinessSettingsThemeColors(businesses = [], settingsRows = []) {
  const settingsByBusiness = new Map(
    (settingsRows || [])
      .filter((row) => row?.business_id)
      .map((row) => [row.business_id, row])
  );
  return (businesses || []).map((business) =>
    settingsByBusiness.has(business.id)
      ? (() => {
          const row = settingsByBusiness.get(business.id);
          const meta = normalizeBusinessSettingsMeta(row.environment_archive_meta);
          return normalizeBusiness({
            ...business,
            ...(row.theme_override ? { theme: row.theme_override } : {}),
            ...businessBrandingPatchFromMeta(meta),
            ...businessThemePatchFromMeta(meta.themeColors),
          });
        })()
      : business
  );
}

function emptyBusinessSummary(business = {}) {
  return {
    businessId: business.id || "",
    businessName: business.name || "Barberia",
    slug: business.slug || "",
    active: business.active !== false,
    totalBarbers: 0,
    totalServices: 0,
    activeServices: 0,
    reservableServices: 0,
    reservationsToday: 0,
  };
}

function buildBusinessSummaryMap(businesses = [], collections = {}) {
  const summaryMap = Object.fromEntries(
    businesses.map((business) => [business.id, emptyBusinessSummary(business)])
  );

  (collections.barbers || []).forEach((barber) => {
    const businessId = barber.negocioId || barber.businessId;
    if (!businessId || !summaryMap[businessId]) return;
    summaryMap[businessId].totalBarbers += 1;
  });

  (collections.services || []).forEach((service) => {
    const businessId = service.negocioId || service.businessId;
    if (!businessId || !summaryMap[businessId]) return;
    summaryMap[businessId].totalServices += 1;
    if (parseActiveFlag(service.active, true)) summaryMap[businessId].activeServices += 1;
    if (isReservableService(service)) summaryMap[businessId].reservableServices += 1;
  });

  (collections.appointments || []).forEach((appointment) => {
    const businessId = appointment.negocioId || appointment.businessId;
    if (!businessId || !summaryMap[businessId]) return;
    if (appointment.date === todayISO() && COUNTABLE_STATUSES.has(appointment.status)) {
      summaryMap[businessId].reservationsToday += 1;
    }
  });

  return summaryMap;
}

function buildBusinessSummaryMapFromRpcRows(businesses = [], rows = []) {
  const summaryMap = Object.fromEntries(
    businesses.map((business) => [business.id, emptyBusinessSummary(business)])
  );
  (rows || []).forEach((row) => {
    const businessId = row.business_id || row.id || "";
    if (!businessId) return;
    const business = businesses.find((item) => item.id === businessId) || {
      id: businessId,
      name: row.business_name || row.nombre_negocio || "Barberia",
      slug: row.slug || "",
      active: row.active !== false,
    };
    summaryMap[businessId] = {
      ...emptyBusinessSummary(business),
      businessId,
      businessName: row.business_name || row.nombre_negocio || business.name || "Barberia",
      slug: row.slug || business.slug || "",
      active: row.active !== false && business.active !== false,
      totalBarbers: Number(row.total_barbers ?? row.total_barberos ?? 0) || 0,
      totalServices: Number(row.total_services ?? row.total_servicios ?? 0) || 0,
      activeServices: Number(row.active_services ?? row.servicios_activos ?? row.total_services ?? row.total_servicios ?? 0) || 0,
      reservableServices: Number(row.reservable_services ?? row.servicios_reservables ?? row.active_services ?? row.servicios_activos ?? row.total_services ?? row.total_servicios ?? 0) || 0,
      reservationsToday: Number(row.reservations_today ?? row.reservas_hoy ?? 0) || 0,
    };
  });
  return summaryMap;
}

function applyActiveServiceCounts(summaryMap = {}, serviceRows = []) {
  const counts = {};
  (serviceRows || []).forEach((row) => {
    const businessId = row.business_id || row.negocioId || row.businessId || "";
    if (!businessId) return;
    counts[businessId] = counts[businessId] || { total: 0, active: 0, reservable: 0 };
    counts[businessId].total += 1;
    if (parseActiveFlag(row.active ?? row.activo, true)) counts[businessId].active += 1;
    if (isReservableService(mapRowToService(row))) counts[businessId].reservable += 1;
  });
  Object.entries(counts).forEach(([businessId, count]) => {
    if (!summaryMap[businessId]) return;
    summaryMap[businessId] = {
      ...summaryMap[businessId],
      totalServices: count.total,
      activeServices: count.active,
      reservableServices: count.reservable,
    };
  });
  return summaryMap;
}

const defaultState = () => ({
  meta: {
    dayKey: todayISO(),
    weekKey: getWeekKey(),
    selectedDate: todayISO(),
    currentBusinessId: DEFAULT_BUSINESS_ID,
    businessSummaryById: {},
  },
  businesses: [defaultBusiness()],
  barbers: [
    {
      id: "barber_mateo",
      negocioId: DEFAULT_BUSINESS_ID,
      name: "Mateo Rivas",
      user: "mateo",
      password: "studio2026",
      whatsapp: "3004448899",
      active: true,
      photo: "",
      gradient: avatarGradients[0],
      specialty: "Cortes urbanos",
    },
    {
      id: "barber_dante",
      negocioId: DEFAULT_BUSINESS_ID,
      name: "Dante Molina",
      user: "dante",
      password: "studio2026",
      whatsapp: "3137771900",
      active: true,
      photo: "",
      gradient: avatarGradients[1],
      specialty: "Barba y perfilado",
    },
    {
      id: "barber_elias",
      negocioId: DEFAULT_BUSINESS_ID,
      name: "Elias Torres",
      user: "elias",
      password: "studio2026",
      whatsapp: "3015552000",
      active: true,
      photo: "",
      gradient: avatarGradients[2],
      specialty: "Fade premium",
    },
    {
      id: "barber_simon",
      negocioId: DEFAULT_BUSINESS_ID,
      name: "Simon Vera",
      user: "simon",
      password: "studio2026",
      whatsapp: "",
      active: false,
      photo: "",
      gradient: avatarGradients[3],
      specialty: "Textura y tijera",
    },
  ],
  appointments: [
    {
      id: "apt_seed_1",
      negocioId: DEFAULT_BUSINESS_ID,
      barberId: "barber_mateo",
      date: todayISO(),
      time: "10:00",
      status: "reserved",
      clientName: "Laura Pena",
      whatsapp: "300 444 8899",
      source: "public",
      weekKey: getWeekKey(),
    },
    {
      id: "apt_seed_2",
      negocioId: DEFAULT_BUSINESS_ID,
      barberId: "barber_dante",
      date: todayISO(),
      time: "15:20",
      status: "fixed",
      clientName: "Andres Silva",
      whatsapp: "313-777-1900",
      source: "admin",
      weekKey: "permanent",
    },
    {
      id: "apt_seed_3",
      negocioId: DEFAULT_BUSINESS_ID,
      barberId: "barber_elias",
      date: todayISO(),
      time: "12:00",
      status: "blocked",
      clientName: "Bloqueo operativo",
      whatsapp: "",
      source: "admin",
      weekKey: "permanent",
    },
  ],
  blockedDays: [],
  services: [
    { id: "service_corte_clasico", negocioId: DEFAULT_BUSINESS_ID, name: "Corte clasico", value: 20000, adminPercentage: 50, barberPercentage: 50, serviceIconId: "", active: true },
    { id: "service_corte_barba", negocioId: DEFAULT_BUSINESS_ID, name: "Corte + barba", value: 30000, adminPercentage: 50, barberPercentage: 50, serviceIconId: "", active: true },
    { id: "service_barba", negocioId: DEFAULT_BUSINESS_ID, name: "Barba", value: 18000, adminPercentage: 50, barberPercentage: 50, serviceIconId: "", active: true },
    { id: "service_cejas", negocioId: DEFAULT_BUSINESS_ID, name: "Cejas", value: 12000, adminPercentage: 50, barberPercentage: 50, serviceIconId: "", active: true },
    { id: "service_diseno", negocioId: DEFAULT_BUSINESS_ID, name: "Diseno", value: 15000, adminPercentage: 50, barberPercentage: 50, serviceIconId: "", active: true },
  ],
  serviceIcons: [],
  barberServices: [
    { id: "barber_service_seed_1", negocioId: DEFAULT_BUSINESS_ID, barberId: "barber_mateo", serviceId: "service_corte_clasico", active: true },
    { id: "barber_service_seed_2", negocioId: DEFAULT_BUSINESS_ID, barberId: "barber_mateo", serviceId: "service_corte_barba", active: true },
    { id: "barber_service_seed_3", negocioId: DEFAULT_BUSINESS_ID, barberId: "barber_mateo", serviceId: "service_diseno", active: true },
    { id: "barber_service_seed_4", negocioId: DEFAULT_BUSINESS_ID, barberId: "barber_dante", serviceId: "service_corte_barba", active: true },
    { id: "barber_service_seed_5", negocioId: DEFAULT_BUSINESS_ID, barberId: "barber_dante", serviceId: "service_barba", active: true },
    { id: "barber_service_seed_6", negocioId: DEFAULT_BUSINESS_ID, barberId: "barber_elias", serviceId: "service_corte_clasico", active: true },
    { id: "barber_service_seed_7", negocioId: DEFAULT_BUSINESS_ID, barberId: "barber_elias", serviceId: "service_diseno", active: true },
    { id: "barber_service_seed_8", negocioId: DEFAULT_BUSINESS_ID, barberId: "barber_simon", serviceId: "service_cejas", active: true },
  ],
});

function normalizeSignaturePart(value) {
  return String(value || "").trim().toLowerCase();
}

function barberCloneSignature(barber) {
  return [
    normalizeSignaturePart(barber.name),
    normalizeSignaturePart(barber.user),
    normalizeSignaturePart(barber.whatsapp),
    normalizeSignaturePart(barber.specialty),
  ].join("|");
}

function serviceCloneSignature(service) {
  return [
    normalizeSignaturePart(service.name),
    Number(service.value) || 0,
    Number(service.adminPercentage) || 0,
    Number(service.barberPercentage) || 0,
  ].join("|");
}

function appointmentCloneSignature(appointment) {
  return [
    normalizeSignaturePart(appointment.barberId),
    normalizeSignaturePart(appointment.time),
    normalizeSignaturePart(appointment.status),
    normalizeSignaturePart(appointment.clientName),
    normalizeSignaturePart(appointment.whatsapp),
    normalizeSignaturePart(appointment.source),
  ].join("|");
}

function visionSeedSnapshot() {
  const seed = defaultState();
  return {
    barberIds: new Set(seed.barbers.map((barber) => barber.id)),
    serviceIds: new Set(seed.services.map((service) => service.id)),
    barberServiceIds: new Set(seed.barberServices.map((relation) => relation.id)),
    appointmentIds: new Set(seed.appointments.map((appointment) => appointment.id)),
    barberSignatures: new Set(seed.barbers.map(barberCloneSignature)),
    serviceSignatures: new Set(seed.services.map(serviceCloneSignature)),
    appointmentSignatures: new Set(seed.appointments.map(appointmentCloneSignature)),
  };
}

function detectReplicatedBusinessIds(state) {
  const seed = visionSeedSnapshot();
  return (state.businesses || [])
    .filter((business) => business.id !== DEFAULT_BUSINESS_ID)
    .filter((business) => {
      const businessBarbers = (state.barbers || []).filter((barber) => barber.negocioId === business.id);
      const businessServices = (state.services || []).filter((service) => service.negocioId === business.id);
      const businessRelations = (state.barberServices || []).filter((relation) => relation.negocioId === business.id);
      const businessAppointments = (state.appointments || []).filter((appointment) => appointment.negocioId === business.id);
      const businessBlockedDays = (state.blockedDays || []).filter((blockedDay) => blockedDay.negocioId === business.id);

      const hasSeedIds =
        businessBarbers.some((barber) => seed.barberIds.has(barber.id)) ||
        businessServices.some((service) => seed.serviceIds.has(service.id)) ||
        businessRelations.some((relation) => seed.barberServiceIds.has(relation.id)) ||
        businessAppointments.some((appointment) => seed.appointmentIds.has(appointment.id));

      const cloneBarbers =
        businessBarbers.length > 0 &&
        businessBarbers.every((barber) => seed.barberSignatures.has(barberCloneSignature(barber)));

      const cloneServices =
        businessServices.length > 0 &&
        businessServices.every((service) => seed.serviceSignatures.has(serviceCloneSignature(service)));

      const cloneAppointments =
        businessAppointments.length > 0 &&
        businessAppointments.every((appointment) =>
          seed.appointmentSignatures.has(appointmentCloneSignature(appointment))
        );

      const cloneSignalCount = [cloneBarbers, cloneServices, cloneAppointments].filter(Boolean).length;
      const hasOperationalCloneLinks = businessRelations.length > 0 || businessAppointments.length > 0 || businessBlockedDays.length > 0;

      return hasSeedIds || (cloneSignalCount >= 2 && hasOperationalCloneLinks);
    })
    .map((business) => business.id);
}

function mapBusinessToRow(record) {
  return {
    id: record.id,
    business_name: record.name,
    slug: record.slug,
    logo_url: normalizeAssetUrl(record.logoUrl || ""),
    theme: normalizeThemeKey(record.theme),
    primary_color: record.primaryColor || paletteForTheme(record.theme).primary,
    secondary_color: record.secondaryColor || "#111111",
    background_url: normalizeAssetUrl(record.backgroundUrl || ""),
    active: record.active !== false,
    created_at: record.createdAt || todayISO(),
    updated_at: record.updatedAt || todayISO(),
  };
}

function mapRowToBusiness(row) {
  return normalizeBusiness({
    id: row.id,
    name: row.business_name || row.name,
    slug: row.slug,
    logoUrl: normalizeAssetUrl(row.logo_url || ""),
    theme: normalizeThemeKey(row.theme),
    primaryColor: row.primary_color || paletteForTheme(row.theme).primary,
    secondaryColor: row.secondary_color || "#111111",
    backgroundColor: row.color_fondo || "",
    textColor: row.color_texto || "",
    buttonColor: row.color_boton || "",
    backgroundUrl: normalizeAssetUrl(row.background_url || ""),
    active: parseActiveFlag(row.active, true),
    createdAt: row.created_at || todayISO(),
    updatedAt: row.updated_at || todayISO(),
  });
}

function createSupabaseClient() {
  if (!hasSupabaseBrowserClient) return null;
  return window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function mapBarberToRow(barber) {
  const useLegacyPassword = !barber.passwordHash && barber.password;
  return {
    id: barber.id,
    business_id: barber.negocioId || DEFAULT_BUSINESS_ID,
    name: barber.name,
    user: barber.user,
    password: useLegacyPassword ? barber.password : "",
    password_hash: barber.passwordHash || "",
    whatsapp: barber.whatsapp || "",
    active: Boolean(barber.active),
    photo: barber.photo || "",
    gradient: barber.gradient || "",
    specialty: barber.specialty || "",
  };
}

function mapAppointmentToRow(appointment) {
  return {
    id: appointment.id,
    business_id: appointment.negocioId || DEFAULT_BUSINESS_ID,
    barber_id: appointment.barberId,
    date: appointment.date,
    time: appointment.time,
    status: appointment.status,
    client_name: appointment.clientName || "",
    whatsapp: appointment.whatsapp || "",
    source: appointment.source || "admin",
    week_key: appointment.weekKey || "permanent",
    block_origin: appointment.blockOrigin || "",
    visit_state: appointment.visitState || "",
    notes: composeAppointmentNotes(appointment),
  };
}

function mapBlockedDayToRow(day) {
  return {
    id: day.id,
    business_id: day.negocioId || DEFAULT_BUSINESS_ID,
    barber_id: day.barberId,
    date: day.date,
  };
}

function parseAppointmentNotes(rawNotes = "") {
  const noteText = String(rawNotes || "");
  const [firstLine, ...restLines] = noteText.split("\n");
  if (!firstLine.startsWith("SERVICE_META::")) {
    return { serviceId: "", serviceName: "", notes: noteText };
  }
  const [, serviceId = "", encodedName = ""] = firstLine.split("::");
  return {
    serviceId,
    serviceName: decodeURIComponent(encodedName || ""),
    notes: restLines.join("\n").trim(),
  };
}

function composeAppointmentNotes(appointment) {
  const notesBody = String(appointment.notes || "").trim();
  if (!appointment.serviceId && !appointment.serviceName) {
    return notesBody;
  }
  const serviceLine = `SERVICE_META::${appointment.serviceId || ""}::${encodeURIComponent(
    appointment.serviceName || ""
  )}`;
  return notesBody ? `${serviceLine}\n${notesBody}` : serviceLine;
}

function mapServiceToRow(service, options = {}) {
  const { includeIconId = true } = options;
  const row = {
    id: service.id,
    business_id: service.negocioId || DEFAULT_BUSINESS_ID,
    service_name: service.name,
    service_value: Number(service.value) || 0,
    admin_percentage: Number(service.adminPercentage) || 0,
    barber_percentage: Number(service.barberPercentage) || 0,
    active: service.active ?? true,
  };
  if (includeIconId) {
    row.service_icon_id = service.serviceIconId || null;
  }
  return row;
}

function mapServiceIconToRow(icon) {
  return {
    id: icon.id,
    name: icon.name || "",
    image_data: icon.imageData || "",
    mime_type: icon.mimeType || "image/png",
    active: icon.active ?? true,
    created_at: icon.createdAt || todayISO(),
  };
}

function errorMentionsSchemaToken(error, token = "") {
  if (!error || !token) return false;
  const haystack = [error.message, error.details, error.hint, error.code]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(String(token).toLowerCase());
}

function mapBarberServiceToRow(item) {
  return {
    id: item.id,
    business_id: item.negocioId || DEFAULT_BUSINESS_ID,
    barber_id: item.barberId,
    service_id: item.serviceId,
    active: item.active ?? true,
  };
}

function mapRowToBarber(row, index = 0) {
  return {
    id: row.id,
    negocioId: row.business_id || DEFAULT_BUSINESS_ID,
    name: row.name || row.nombre || row.nombre_barbero || "",
    user: row.user || row.usuario || "",
    password: row.password || "",
    passwordHash: row.password_hash || "",
    whatsapp: row.whatsapp || "",
    active: parseActiveFlag(row.active ?? row.activo, true),
    photo: row.photo || row.foto || row.fotografia || "",
    gradient: row.gradient || avatarGradients[index % avatarGradients.length],
    specialty: row.specialty || row.especialidad || "Servicio premium",
  };
}

function mapRowToAppointment(row) {
  const parsedMeta = parseAppointmentNotes(row.notes || "");
  return {
    id: row.id,
    negocioId: row.business_id || DEFAULT_BUSINESS_ID,
    barberId: row.barber_id,
    date: row.date,
    time: row.time,
    status: row.status,
    clientName: row.client_name || "",
    whatsapp: row.whatsapp || "",
    source: row.source || "admin",
    weekKey: row.week_key || "permanent",
    blockOrigin: row.block_origin || "",
    visitState: row.visit_state || "",
    notes: parsedMeta.notes,
    serviceId: parsedMeta.serviceId,
    serviceName: parsedMeta.serviceName,
  };
}

function mapRowToBlockedDay(row) {
  return {
    id: row.id,
    negocioId: row.business_id || DEFAULT_BUSINESS_ID,
    barberId: row.barber_id,
    date: row.date,
  };
}

function mapRowToService(row) {
  return {
    id: row.id,
    negocioId: row.business_id || DEFAULT_BUSINESS_ID,
    name: row.service_name || row.nombre_servicio || row.name || row.nombre || "",
    value: Number(row.service_value ?? row.valor_servicio ?? row.value ?? row.valor) || 0,
    adminPercentage: Number(row.admin_percentage ?? row.porcentaje_admin) || 0,
    barberPercentage: Number(row.barber_percentage ?? row.porcentaje_barbero) || 0,
    serviceIconId: row.service_icon_id || row.serviceIconId || "",
    active: parseActiveFlag(row.active ?? row.activo, true),
  };
}

function mapRowToServiceIcon(row) {
  return {
    id: row.id,
    name: row.name || "",
    imageData: row.image_data || row.imageData || "",
    mimeType: row.mime_type || row.mimeType || "image/png",
    active: parseActiveFlag(row.active, true),
    createdAt: row.created_at || todayISO(),
  };
}

function mapRowToBarberService(row) {
  return {
    id: row.id,
    negocioId: row.business_id || DEFAULT_BUSINESS_ID,
    barberId: row.barber_id,
    serviceId: row.service_id,
    active: row.active ?? true,
  };
}

function mapAdminAccountToRow(account) {
  return {
    id: account.id,
    business_id: account.businessId || DEFAULT_BUSINESS_ID,
    admin_name: account.name || "",
    admin_user: account.user || "",
    password: account.password || "",
    password_hash: account.passwordHash || "",
    role: account.role || "admin_negocio",
    active: account.active !== false,
    created_at: account.createdAt || todayISO(),
    updated_at: todayISO(),
  };
}

function mapRowToAdminAccount(row, businesses = []) {
  const businessId = row.business_id || DEFAULT_BUSINESS_ID;
  const business = businesses.find((item) => item.id === businessId);
  return {
    id: row.id,
    businessId,
    businessSlug: business?.slug || "",
    name: row.admin_name || "",
    user: row.admin_user || "",
    password: row.password || "",
    passwordHash: row.password_hash || "",
    role: row.role || "admin_negocio",
    active: row.active !== false,
    createdAt: row.created_at || todayISO(),
  };
}

function mergeBusinessSettingsMeta(currentMeta, patchMeta) {
  return {
    ...normalizeBusinessSettingsMeta(currentMeta),
    ...normalizeBusinessSettingsMeta(patchMeta),
  };
}

function normalizeBusinessSettingsMeta(meta) {
  if (!meta) return {};
  if (typeof meta === "string") {
    try {
      const parsed = JSON.parse(meta);
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  }
  return meta && typeof meta === "object" ? meta : {};
}

class StudioStore {
  constructor() {
    if (typeof window !== "undefined") {
      window.__studioStoreBootstrap = this;
    }
    this.listeners = new Set();
    this.channel = "BroadcastChannel" in window ? new BroadcastChannel(CHANNEL) : null;
    this.supabase = createSupabaseClient();
    this.remoteChannel = null;
    this.remoteScopeKey = "";
    this.remoteLoadedScopeKey = "";
    this.remoteLoadedScopes = new Set();
    this.remoteScopeLoadRequestedAt = new Map();
    this.remoteSubscribeCounters = new Map();
    this.businessResolutionBySlug = new Map();
    this.remoteReady = false;
    this.remoteLastError = "";
    this.remoteAttemptedAt = 0;
    this.syncInFlight = false;
    this.syncQueued = false;
    this.syncQueuedQuiet = false;
    this.syncQueuedForce = false;
    this.syncTimer = null;
    this.bucketCacheStateRef = null;
    this.bucketCache = new Map();
    this.remoteStateCache = new Map();
    this.businessRowsCache = new Map();
    this.adminAccountsCache = new Map();
    this.businessSettingsByBusiness = new Map();
    this.publicServicesCache = new Map();
    this.publicServicesInFlight = new Map();
    this.sessionStableBusinessCacheById = new Map();
    this.lastRemoteSyncByKey = new Map();
    this.activeSessionsSupported = null;
    this.transientEmptyResourceGuards = new Map();
    this.resourceViewState = {
      barbers: new Map(),
      services: new Map(),
      appointments: new Map(),
    };
    this.applyingRemote = false;
    this.dailyResetPending = false;
    this.state = neutralBootstrapState();
    this.state = this.load();
    if (this.shouldIgnoreCrossScopeLocalSync(this.state)) {
      this.state = neutralBootstrapState();
    }
    this.applyDemoMaintenance();

    if (this.channel) {
      this.channel.onmessage = (event) => {
        if (!event.data?.type) return;
        const incomingState = this.loadLocalState();
        if (this.shouldIgnoreCrossScopeLocalSync(incomingState)) {
          return;
        }
        this.state = incomingState;
        this.invalidateBusinessBuckets();
        invalidateDerivedBusinessCache();
        this.emit(event.data);
      };
    }

    window.addEventListener("storage", (event) => {
      if (event.key === PERF_QUERY_METRICS_KEY || event.key === PERF_QUERY_LOG_ENABLED_KEY) {
        return;
      }
      if (event.key === BACKGROUND_MEDIA_BY_BUSINESS_KEY || event.key === BACKGROUND_MEDIA_KEY) {
        app.backgroundMedia = currentBackgroundMedia();
        ensurePersistentBackground();
        scheduleRender();
        return;
      }
      if (event.key === APP_KEY) {
        const incomingState = this.loadLocalState();
        if (this.shouldIgnoreCrossScopeLocalSync(incomingState)) {
          return;
        }
        this.state = incomingState;
        this.invalidateBusinessBuckets();
        invalidateDerivedBusinessCache();
        this.emit({ type: "SYNC" });
      }
    });

    if (this.supabase) {
      this.bootstrapRemote().catch((error) => {
        console.error("Supabase bootstrap failed", error);
      });
    }
  }

  load() {
    return this.loadLocalState();
  }

  loadLocalState() {
    const raw = localStorage.getItem(APP_KEY);
    if (!raw) return neutralBootstrapState();
    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        parsed.serviceIcons = [];
      }
      return normalizeTenantState(parsed);
    } catch {
      return neutralBootstrapState();
    }
  }

  persist(event = { type: "UPDATE" }) {
    this.invalidateBusinessBuckets();
    invalidateDerivedBusinessCache();
    const changedBusinessId =
      event.businessId || event.record?.negocioId || event.record?.businessId || event.record?.business_id || "";
    if (
      ["businesses", "business_settings", "barbers", "services", "barber_services"].includes(event.table) &&
      changedBusinessId
    ) {
      this.invalidateStableBusinessCache(changedBusinessId);
    }
    if (event.table === "businesses" || !changedBusinessId) {
      this.invalidateRemoteCache();
    } else {
      this.invalidateRemoteCache(changedBusinessId);
    }
    this.state = this.stateWithRuntimeScope(this.state);
    persistAppStateSnapshot(this.state);
    if (changedBusinessId) {
      const currentScopeKey = this.currentRuntimeScopeKey(resolveRoute(location.pathname));
      if (event.table === "barbers") {
        this.syncResourceViewFromState("barbers", changedBusinessId, currentScopeKey);
        this.syncResourceViewFromState("appointments", changedBusinessId, currentScopeKey);
      } else if (event.table === "services") {
        this.syncResourceViewFromState("services", changedBusinessId, currentScopeKey);
      } else if (event.table === "appointments") {
        this.syncResourceViewFromState("appointments", changedBusinessId, currentScopeKey);
      }
    }
    this.emit(event);
    this.channel?.postMessage(event);
    if (!event.skipRemote && this.supabase && !this.applyingRemote) {
      this.persistRemote(event)
        .then(() => {
          if (
            changedBusinessId &&
            ["business_settings", "barbers", "services", "barber_services"].includes(event.table)
          ) {
            this.invalidateStableBusinessCache(changedBusinessId);
            this.invalidateRemoteCache(changedBusinessId);
            this.queueRemoteSync({
              quiet: true,
              force: true,
              origin: `persist:${event.table}`,
              component: "StudioStore",
              hook: "persist",
            });
          }
        })
        .catch((error) => {
          console.error("Supabase sync failed", error);
        });
    }
  }

  emit(event) {
    this.listeners.forEach((listener) => listener(this.state, event));
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  currentRuntimeScopeKey(route = resolveRoute(location.pathname)) {
    if (route.view === "super-admin") {
      return "super-admin:global";
    }
    const scopeView = route.shell === "internal" ? "internal" : route.view;
    const scopedBusinessId = this.scopedBusinessIdForRoute(route);
    return `${scopeView}:${scopedBusinessId || "global"}:${route.businessSlug || DEFAULT_BUSINESS_SLUG}`;
  }

  currentRealtimeScopeKey(route = resolveRoute(location.pathname)) {
    if (route.view === "super-admin") {
      return "super-admin:global";
    }
    const scopedBusinessId = this.scopedBusinessIdForRoute(route);
    return `business:${scopedBusinessId || "global"}:${route.businessSlug || DEFAULT_BUSINESS_SLUG}`;
  }

  scopedBusinessIdForRoute(route = resolveRoute(location.pathname)) {
    if (route.view === "super-admin") return null;
    return (
      this.businessBySlug(route.businessSlug)?.id ||
      this.businessResolution(route.businessSlug)?.business?.id ||
      null
    );
  }

  stateWithRuntimeScope(state = this.state, route = resolveRoute(location.pathname)) {
    return normalizeTenantState({
      ...state,
      meta: {
        ...(state.meta || {}),
        remoteScopeKey: this.currentRuntimeScopeKey(route),
        remoteView: route.view,
        remoteBusinessSlug: route.businessSlug || DEFAULT_BUSINESS_SLUG,
      },
    });
  }

  shouldIgnoreCrossScopeLocalSync(incomingState = null) {
    if (!this.supabase) return false;
    const route = resolveRoute(location.pathname);
    const incomingScopeKey = incomingState?.meta?.remoteScopeKey || "";
    if (!incomingScopeKey) {
      return route.view === "super-admin";
    }
    return incomingScopeKey !== this.currentRuntimeScopeKey(route);
  }

  invalidateBusinessBuckets() {
    this.bucketCacheStateRef = null;
    this.bucketCache = new Map();
  }

  stableBusinessCacheMap(state = this.state) {
    return state.meta?.stableBusinessCacheById && typeof state.meta.stableBusinessCacheById === "object"
      ? state.meta.stableBusinessCacheById
      : {};
  }

  stableBusinessCacheEntry(businessId) {
    return this.sessionStableBusinessCacheById.get(businessId) || null;
  }

  hasFreshStableBusinessData(businessId, { needsFull = false } = {}) {
    if (!businessId) return false;
    const entry = this.stableBusinessCacheEntry(businessId);
    const cachedAt = Number(entry && typeof entry === "object" ? entry.at : entry || 0);
    const hasFullData = entry && typeof entry === "object" ? Boolean(entry.full) : false;
    if (needsFull && !hasFullData) return false;
    return Boolean(cachedAt && Date.now() - cachedAt < STABLE_BUSINESS_CACHE_TTL_MS);
  }

  withStableBusinessCacheStamp(state, businessId, { full = false } = {}) {
    if (!businessId) return state;
    const previous = this.stableBusinessCacheEntry(businessId);
    const previousFull = previous && typeof previous === "object" ? Boolean(previous.full) : false;
    this.sessionStableBusinessCacheById.set(businessId, {
      at: Date.now(),
      full: previousFull || full,
    });
    return {
      ...state,
      meta: {
        ...(state.meta || {}),
        stableBusinessCacheById: {},
      },
    };
  }

  invalidateStableBusinessCache(businessId = "") {
    if (!businessId) return;
    this.sessionStableBusinessCacheById.delete(businessId);
    this.publicServicesCache.delete(businessId);
    this.publicServicesInFlight.delete(businessId);
    const persistedServicesMap = readCachedRecordMap(PUBLIC_SERVICES_LOCAL_CACHE_KEY);
    if (persistedServicesMap[businessId]) {
      delete persistedServicesMap[businessId];
      writeCachedRecordMap(PUBLIC_SERVICES_LOCAL_CACHE_KEY, persistedServicesMap);
    }
    if (!this.state?.meta?.stableBusinessCacheById) return;
    const nextCache = { ...this.state.meta.stableBusinessCacheById };
    delete nextCache[businessId];
    this.state = {
      ...this.state,
      meta: {
        ...this.state.meta,
        stableBusinessCacheById: nextCache,
      },
    };
  }

  invalidateRemoteCache(scopePrefix = "") {
    if (!scopePrefix) {
      this.remoteStateCache.clear();
      this.businessRowsCache.clear();
      this.adminAccountsCache.clear();
      this.lastRemoteSyncByKey.clear();
      this.remoteScopeLoadRequestedAt.clear();
      this.transientEmptyResourceGuards.clear();
      return;
    }
    [...this.remoteStateCache.keys()].forEach((key) => {
      if (key.includes(scopePrefix)) this.remoteStateCache.delete(key);
    });
    [...this.businessRowsCache.keys()].forEach((key) => {
      if (key.includes(scopePrefix)) this.businessRowsCache.delete(key);
    });
    [...this.adminAccountsCache.keys()].forEach((key) => {
      if (key.includes(scopePrefix)) this.adminAccountsCache.delete(key);
    });
    [...this.lastRemoteSyncByKey.keys()].forEach((key) => {
      if (key.includes(scopePrefix)) this.lastRemoteSyncByKey.delete(key);
    });
    [...this.remoteScopeLoadRequestedAt.keys()].forEach((key) => {
      if (key.includes(scopePrefix)) this.remoteScopeLoadRequestedAt.delete(key);
    });
    [...this.transientEmptyResourceGuards.keys()].forEach((key) => {
      if (key.includes(scopePrefix)) this.transientEmptyResourceGuards.delete(key);
    });
  }

  transientResourceGuardKey(businessId, syncScopeKey, resourceKey) {
    return `${businessId || "global"}:${syncScopeKey || "scope"}:${resourceKey}`;
  }

  stabilizeScopedBusinessResource(nextState, {
    businessId,
    syncScopeKey,
    resourceKey,
    routeView = "",
    force = false,
    allowScopeSensitivePreserve = false,
  } = {}) {
    if (!businessId || !resourceKey) return nextState;
    const previousBucket = buildBusinessBucketFromState(this.state, businessId);
    const nextBucket = buildBusinessBucketFromState(nextState, businessId);
    const previousRows = previousBucket[resourceKey] || [];
    const nextRows = nextBucket[resourceKey] || [];
    const guardKey = this.transientResourceGuardKey(businessId, syncScopeKey, resourceKey);
    const previousScopeMatches = String(this.state?.meta?.remoteScopeKey || "") === String(syncScopeKey || "");

    if (force || nextRows.length > 0 || previousRows.length === 0) {
      this.transientEmptyResourceGuards.delete(guardKey);
      return nextState;
    }

    if (allowScopeSensitivePreserve && !previousScopeMatches) {
      this.transientEmptyResourceGuards.delete(guardKey);
      return nextState;
    }

    const nextGuardCount = Number(this.transientEmptyResourceGuards.get(guardKey) || 0) + 1;
    this.transientEmptyResourceGuards.set(guardKey, nextGuardCount);

    if (nextGuardCount >= 2) {
      this.transientEmptyResourceGuards.delete(guardKey);
      return nextState;
    }

    const nextRowsForState = nextState[resourceKey] || [];
    const mergedRows = [
      ...nextRowsForState.filter((item) => (item?.negocioId || DEFAULT_BUSINESS_ID) !== businessId),
      ...previousRows,
    ];

    console.warn("Transient empty resource prevented", {
      businessId,
      resourceKey,
      routeView,
      syncScopeKey,
      previousCount: previousRows.length,
      guardAttempt: nextGuardCount,
    });

    return {
      ...nextState,
      [resourceKey]: mergedRows,
    };
  }

  stabilizeScopedBusinessState(nextState, { businessId, syncScopeKey, route, force = false } = {}) {
    if (!businessId) return nextState;
    let stableState = nextState;
    stableState = this.stabilizeScopedBusinessResource(stableState, {
      businessId,
      syncScopeKey,
      resourceKey: "barbers",
      routeView: route?.view || "",
      force,
    });
    stableState = this.stabilizeScopedBusinessResource(stableState, {
      businessId,
      syncScopeKey,
      resourceKey: "services",
      routeView: route?.view || "",
      force,
    });
    stableState = this.stabilizeScopedBusinessResource(stableState, {
      businessId,
      syncScopeKey,
      resourceKey: "barberServices",
      routeView: route?.view || "",
      force,
    });
    stableState = this.stabilizeScopedBusinessResource(stableState, {
      businessId,
      syncScopeKey,
      resourceKey: "appointments",
      routeView: route?.view || "",
      force,
      allowScopeSensitivePreserve: true,
    });
    stableState = this.stabilizeScopedBusinessResource(stableState, {
      businessId,
      syncScopeKey,
      resourceKey: "blockedDays",
      routeView: route?.view || "",
      force,
      allowScopeSensitivePreserve: true,
    });
    return stableState;
  }

  resourceViewScopeKey(businessId = "", syncScopeKey = "") {
    return `${businessId || "global"}:${syncScopeKey || this.currentRuntimeScopeKey(resolveRoute(location.pathname))}`;
  }

  resourceViewEntry(resourceKey, businessId = "", syncScopeKey = "") {
    const map = this.resourceViewState?.[resourceKey];
    if (!map) return null;
    return map.get(this.resourceViewScopeKey(businessId, syncScopeKey)) || null;
  }

  setResourceViewEntry(resourceKey, businessId = "", syncScopeKey = "", entry = null) {
    const map = this.resourceViewState?.[resourceKey];
    if (!map) return;
    const key = this.resourceViewScopeKey(businessId, syncScopeKey);
    if (!entry) {
      map.delete(key);
      this.invalidateBusinessBuckets();
      return;
    }
    map.set(key, entry);
    this.invalidateBusinessBuckets();
  }

  snapshotResourceRows(resourceKey, businessId, state = this.state) {
    const bucket = buildBusinessBucketFromState(state, businessId);
    return [...(bucket[resourceKey] || [])];
  }

  beginResourceLoading(resourceKey, businessId, syncScopeKey = "") {
    if (!RESOURCE_VIEW_KEYS.includes(resourceKey) || !businessId) return;
    const currentRows = this.snapshotResourceRows(resourceKey, businessId, this.state);
    const previous = this.resourceViewEntry(resourceKey, businessId, syncScopeKey);
    this.setResourceViewEntry(resourceKey, businessId, syncScopeKey, {
      loading: true,
      data: previous?.data?.length ? previous.data : currentRows,
      lastValidData: previous?.lastValidData?.length ? previous.lastValidData : currentRows,
      confirmedEmpty: false,
      error: "",
      updatedAt: Date.now(),
    });
  }

  commitResourceLoading(resourceKey, businessId, rows = [], { syncScopeKey = "", success = true, error = "" } = {}) {
    if (!RESOURCE_VIEW_KEYS.includes(resourceKey) || !businessId) return;
    const previous = this.resourceViewEntry(resourceKey, businessId, syncScopeKey);
    const normalizedRows = Array.isArray(rows) ? rows : [];
    const nextLastValidData =
      success && normalizedRows.length
        ? normalizedRows
        : previous?.lastValidData?.length
          ? previous.lastValidData
          : [];
    const nextData =
      success
        ? normalizedRows
        : previous?.data?.length
          ? previous.data
          : nextLastValidData;
    this.setResourceViewEntry(resourceKey, businessId, syncScopeKey, {
      loading: false,
      data: nextData,
      lastValidData: nextLastValidData,
      confirmedEmpty: Boolean(success && normalizedRows.length === 0),
      error: success ? "" : String(error || ""),
      updatedAt: Date.now(),
    });
  }

  syncResourceViewFromState(resourceKey, businessId, syncScopeKey = "") {
    if (!RESOURCE_VIEW_KEYS.includes(resourceKey) || !businessId) return;
    const rows = this.snapshotResourceRows(resourceKey, businessId, this.state);
    const previous = this.resourceViewEntry(resourceKey, businessId, syncScopeKey);
    this.setResourceViewEntry(resourceKey, businessId, syncScopeKey, {
      loading: false,
      data: rows,
      lastValidData: rows.length ? rows : previous?.lastValidData || [],
      confirmedEmpty: rows.length === 0,
      error: "",
      updatedAt: Date.now(),
    });
  }

  renderableResourceRows(resourceKey, businessId, fallbackRows = []) {
    if (!RESOURCE_VIEW_KEYS.includes(resourceKey) || !businessId) return fallbackRows;
    const entry = this.resourceViewEntry(resourceKey, businessId);
    if (!entry) return fallbackRows;
    if (entry.loading) {
      if (Array.isArray(entry.lastValidData) && entry.lastValidData.length) return entry.lastValidData;
      if (Array.isArray(entry.data) && entry.data.length) return entry.data;
      return Array.isArray(fallbackRows) ? fallbackRows : [];
    }
    return Array.isArray(entry.data) ? entry.data : Array.isArray(fallbackRows) ? fallbackRows : [];
  }

  getCachedRemoteState(cacheKey, ttlMs) {
    const cached = this.remoteStateCache.get(cacheKey);
    if (!cached || Date.now() - cached.createdAt > ttlMs) return null;
    return cached.state;
  }

  setCachedRemoteState(cacheKey, state) {
    this.remoteStateCache.set(cacheKey, {
      createdAt: Date.now(),
      state,
    });
  }

  getCachedBusinessRows(cacheKey) {
    const cached = this.businessRowsCache.get(cacheKey);
    if (!cached || Date.now() - cached.createdAt > BUSINESS_IDENTITY_CACHE_TTL_MS) return null;
    return cached.rows;
  }

  setCachedBusinessRows(cacheKey, rows = []) {
    this.businessRowsCache.set(cacheKey, {
      createdAt: Date.now(),
      rows,
    });
  }

  getPersistentBusinessIdentity(slug = "") {
    const normalizedSlug = slugify(slug);
    if (!normalizedSlug) return null;
    const cachedMap = readCachedRecordMap(BUSINESS_IDENTITY_CACHE_KEY);
    const cached = cachedMap[normalizedSlug];
    if (!cached || Date.now() - Number(cached.createdAt || 0) > BUSINESS_IDENTITY_CACHE_TTL_MS) return null;
    return cached.row || null;
  }

  clearPersistentBusinessIdentity(slug = "", businessId = "") {
    const normalizedSlug = slugify(slug);
    const normalizedBusinessId = String(businessId || "").trim();
    const cachedMap = readCachedRecordMap(BUSINESS_IDENTITY_CACHE_KEY);
    let changed = false;
    Object.keys(cachedMap).forEach((key) => {
      const row = cachedMap[key]?.row || null;
      const rowSlug = slugify(row?.slug || row?.business_name || "");
      const rowBusinessId = String(row?.id || row?.business_id || "").trim();
      const slugMatches = normalizedSlug && (key === normalizedSlug || rowSlug === normalizedSlug);
      const businessMatches = normalizedBusinessId && rowBusinessId === normalizedBusinessId;
      if (slugMatches || businessMatches) {
        delete cachedMap[key];
        changed = true;
      }
    });
    if (changed) {
      writeCachedRecordMap(BUSINESS_IDENTITY_CACHE_KEY, cachedMap);
    }
    return changed;
  }

  setPersistentBusinessIdentity(slug = "", row = null) {
    const normalizedSlug = slugify(slug || row?.slug || row?.business_name || "");
    if (!normalizedSlug || !row) return;
    const cachedMap = readCachedRecordMap(BUSINESS_IDENTITY_CACHE_KEY);
    cachedMap[normalizedSlug] = {
      createdAt: Date.now(),
      row,
    };
    writeCachedRecordMap(BUSINESS_IDENTITY_CACHE_KEY, cachedMap);
  }

  seedPersistentBusinessIdentityRows(rows = []) {
    if (!Array.isArray(rows) || !rows.length) return;
    const cachedMap = readCachedRecordMap(BUSINESS_IDENTITY_CACHE_KEY);
    const createdAt = Date.now();
    rows.forEach((row) => {
      const normalizedSlug = slugify(row?.slug || "");
      if (!normalizedSlug) return;
      cachedMap[normalizedSlug] = {
        createdAt,
        row,
      };
    });
    writeCachedRecordMap(BUSINESS_IDENTITY_CACHE_KEY, cachedMap);
  }

  getCachedPublicServices(businessId = "") {
    if (!businessId) return null;
    const cached = this.publicServicesCache.get(businessId);
    if (cached && Date.now() - cached.createdAt <= PUBLIC_SERVICES_CACHE_TTL_MS) {
      return cached.services || [];
    }
    const persistedMap = readCachedRecordMap(PUBLIC_SERVICES_LOCAL_CACHE_KEY);
    const persisted = persistedMap[businessId];
    if (!persisted || Date.now() - Number(persisted.createdAt || 0) > PUBLIC_SERVICES_CACHE_TTL_MS) return null;
    const services = Array.isArray(persisted.services) ? persisted.services : [];
    this.publicServicesCache.set(businessId, {
      createdAt: Number(persisted.createdAt || Date.now()),
      services,
    });
    return services;
  }

  setCachedPublicServices(businessId = "", services = []) {
    if (!businessId) return;
    this.publicServicesCache.set(businessId, {
      createdAt: Date.now(),
      services,
    });
    const persistedMap = readCachedRecordMap(PUBLIC_SERVICES_LOCAL_CACHE_KEY);
    persistedMap[businessId] = {
      createdAt: Date.now(),
      services,
    };
    writeCachedRecordMap(PUBLIC_SERVICES_LOCAL_CACHE_KEY, persistedMap);
  }

  async prefetchPublicServices(businessId = "", { force = false } = {}) {
    if (!this.supabase || !businessId) return [];
    const cached = !force ? this.getCachedPublicServices(businessId) : null;
    const cachedIcons = !force ? cachedPublicServiceIcons() : [];
    if (cached && cachedIcons.length) return cached;
    const existing = this.publicServicesInFlight.get(businessId);
    if (existing) return existing;
    const prefetchPerf = perfMark("public services prefetch");
    const promise = Promise.all([
      this.trackedQuery(
        "services:public_prefetch",
        `public:${businessId}`,
        this.supabase
          .from("services")
          .select(PUBLIC_SERVICE_SELECT_COLUMNS)
          .eq("business_id", businessId)
          .eq("active", true)
          .order("created_at", { ascending: true })
      ),
      this.trackedQuery(
        "service_icons:public_prefetch",
        `public:${businessId}`,
        this.supabase.from("service_icons").select(SERVICE_ICON_SELECT_COLUMNS).order("created_at", { ascending: true })
      ),
    ])
      .then(([servicesResult, iconsResult]) => {
        if (servicesResult.error) throw servicesResult.error;
        if (iconsResult.error && iconsResult.error.code !== "42P01") throw iconsResult.error;
        const hydratePerf = perfMark("public services hydrate");
        const services = (servicesResult.data || []).map(mapRowToService);
        const serviceIcons = (iconsResult.data || []).map(mapRowToServiceIcon);
        this.setCachedPublicServices(businessId, services);
        if (serviceIcons.length) {
          persistPublicServiceIcons(serviceIcons);
        }
        perfStep("public services hydrate", hydratePerf, `(${businessId}:services=${services.length},icons=${serviceIcons.length})`);
        if (services.length || serviceIcons.length) {
          this.state = {
            ...this.state,
            services: services.length
              ? [
                  ...this.state.services.filter((service) => service.negocioId !== businessId),
                  ...services,
                ]
              : this.state.services || [],
            serviceIcons: serviceIcons.length ? serviceIcons : this.state.serviceIcons || [],
          };
          this.invalidateBusinessBuckets();
          invalidateDerivedBusinessCache();
          persistAppStateSnapshot(this.state);
          if (typeof scheduleRender === "function") {
            scheduleRender();
          }
        }
        perfEnd(prefetchPerf, `(${businessId}:services=${services.length},icons=${serviceIcons.length})`);
        return services;
      })
      .catch((error) => {
        console.warn("Public services prefetch skipped", error);
        return [];
      })
      .finally(() => {
        this.publicServicesInFlight.delete(businessId);
      });
    this.publicServicesInFlight.set(businessId, promise);
    return promise;
  }

  businessResolution(slug = "") {
    const normalizedSlug = slugify(slug);
    return normalizedSlug ? this.businessResolutionBySlug.get(normalizedSlug) || null : null;
  }

  async resolveBusinessBySlug(slug = "") {
    const resolvePerf = perfMark("resolveBusinessBySlug");
    const normalizedSlug = slugify(slug) || DEFAULT_BUSINESS_SLUG;
    const persistedBusinessRow = this.getPersistentBusinessIdentity(normalizedSlug);
    if (persistedBusinessRow) {
      const persistedBusiness = mapRowToBusiness(persistedBusinessRow);
      const persistedSlug = slugify(persistedBusiness?.slug || persistedBusinessRow?.slug || "");
      const deletedBusinessIds = loadDeletedBusinessIds();
      if (
        persistedBusiness?.id &&
        !deletedBusinessIds.has(persistedBusiness.id) &&
        persistedSlug === normalizedSlug
      ) {
        this.state = {
          ...this.state,
          businesses: mergeBusinessesById(
            (this.state.businesses || []).filter((item) => !isPlaceholderBusiness(item)),
            [persistedBusiness]
          ),
        };
        persistAppStateSnapshot(this.state);
        this.invalidateBusinessBuckets();
        invalidateDerivedBusinessCache();
      } else {
        this.clearPersistentBusinessIdentity(normalizedSlug, persistedBusiness?.id || "");
      }
    }
    const cachedBusiness =
      this.businessBySlug(normalizedSlug) ||
      null;
    if (cachedBusiness) {
      const result = { status: "success", business: cachedBusiness, checkedAt: Date.now() };
      this.businessResolutionBySlug.set(normalizedSlug, result);
      if (cachedBusiness.id) this.prefetchPublicServices(cachedBusiness.id).catch(() => {});
      perfEnd(resolvePerf, `(cache:${normalizedSlug})`);
      return result;
    }
    const current = this.businessResolutionBySlug.get(normalizedSlug);
    if (current?.status === "pending") return current.promise;
    if (!this.supabase) {
      const result = { status: "error", error: "Supabase no esta configurado.", checkedAt: Date.now() };
      this.businessResolutionBySlug.set(normalizedSlug, result);
      return result;
    }
    const promise = this.supabase
      .from("businesses")
      .select(BUSINESS_SELECT_COLUMNS)
      .eq("slug", normalizedSlug)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) {
          const result = { status: "error", error: error.message || "No fue posible consultar el negocio.", checkedAt: Date.now() };
          this.businessResolutionBySlug.set(normalizedSlug, result);
          return result;
        }
        if (!data) {
          this.clearPersistentBusinessIdentity(normalizedSlug);
          const result = { status: "not_found", checkedAt: Date.now() };
          this.businessResolutionBySlug.set(normalizedSlug, result);
          return result;
        }
        const business = mapRowToBusiness(data);
        this.state = {
          ...this.state,
          businesses: mergeBusinessesById(
            (this.state.businesses || []).filter((item) => !isPlaceholderBusiness(item)),
            [business]
          ),
        };
        this.remoteLastError = "";
        this.remoteReady = true;
        this.setCachedBusinessRows(`business:${normalizedSlug}`, [data]);
        this.setPersistentBusinessIdentity(normalizedSlug, data);
        persistAppStateSnapshot(this.state);
        invalidateDerivedBusinessCache();
        this.invalidateBusinessBuckets();
        this.invalidateStableBusinessCache(business.id);
        this.invalidateRemoteCache(business.id);
        this.prefetchPublicServices(business.id).catch(() => {});
        const activeRoute = resolveRoute(location.pathname);
        const shouldForcePostResolveSync = activeRoute.view === "admin" || activeRoute.view === "barber";
        const result = { status: "success", business, checkedAt: Date.now() };
        this.businessResolutionBySlug.set(normalizedSlug, result);
        this.emit({ type: "BUSINESS_RESOLVED", table: "businesses", businessId: business.id });
        this.queueRemoteSync({
          quiet: true,
          force: shouldForcePostResolveSync,
          origin: "resolve-business-by-slug",
          component: "StudioStore",
          hook: "resolveBusinessBySlug",
        });
        perfEnd(resolvePerf, `(remote:${normalizedSlug})`);
        return result;
      })
      .catch((error) => {
        const result = { status: "error", error: error?.message || "No fue posible consultar el negocio.", checkedAt: Date.now() };
        this.businessResolutionBySlug.set(normalizedSlug, result);
        perfEnd(resolvePerf, `(error:${normalizedSlug})`);
        return result;
      });
    this.businessResolutionBySlug.set(normalizedSlug, { status: "pending", promise, checkedAt: Date.now() });
    return promise;
  }

  applyRemoteState(nextState, syncScopeKey, quiet = false, reason = "remote") {
    this.applyingRemote = true;
    this.state = nextState;
    this.invalidateBusinessBuckets();
    invalidateDerivedBusinessCache();
        persistAppStateSnapshot(this.state);
    this.remoteLoadedScopeKey = syncScopeKey;
    this.remoteLoadedScopes.add(syncScopeKey);
    this.remoteScopeLoadRequestedAt.delete(syncScopeKey);
    this.remoteReady = true;
    if (typeof scheduleRender === "function") {
      scheduleRender();
    }
    if (!quiet) {
      this.emit({ type: "SYNC", table: reason });
      this.channel?.postMessage({ type: "SYNC", table: reason });
    }
  }

  async trackedQuery(label, scope, promise) {
    const startedAt = performance.now();
    const result = await promise;
    const ms = Math.round((performance.now() - startedAt) * 10) / 10;
    recordQueryMetric({
      label,
      scope,
      component: "StudioStore.syncFromRemote",
      reason: "supabase_read",
      source: "supabase",
      ms,
      kb: estimatePayloadKb(result?.data),
      rows: Array.isArray(result?.data) ? result.data.length : result?.data ? 1 : 0,
      error: result?.error?.message || "",
    });
    return result;
  }

  async bootstrapRemote() {
    this.dailyResetPending = false;
    await this.syncFromRemote({ quiet: true, origin: "bootstrapRemote", component: "StudioStore", hook: "bootstrapRemote" });
    this.emit({ type: "SYNC", table: "remote", reason: "remote_bootstrap" });
    this.subscribeRemote();
  }

  queueRemoteSync({ quiet = false, force = false, origin = "queueRemoteSync", component = "StudioStore", hook = "queueRemoteSync" } = {}) {
    this.syncQueuedQuiet = this.syncQueued ? this.syncQueuedQuiet && quiet : quiet;
    this.syncQueuedForce = this.syncQueued ? this.syncQueuedForce || force : force;
    this.syncQueuedOrigin = this.syncQueued ? `${this.syncQueuedOrigin || ""},${origin}` : origin;
    this.syncQueuedComponent = component;
    this.syncQueuedHook = hook;
    if (this.syncInFlight) {
      this.syncQueued = true;
      return;
    }
    this.syncQueued = true;
    window.clearTimeout(this.syncTimer);
    this.syncTimer = window.setTimeout(() => {
      if (!this.syncQueued || this.syncInFlight) return;
      const nextQuiet = this.syncQueuedQuiet;
      const nextForce = this.syncQueuedForce;
      const nextOrigin = this.syncQueuedOrigin || "queueRemoteSync";
      const nextComponent = this.syncQueuedComponent || "StudioStore";
      const nextHook = this.syncQueuedHook || "queueRemoteSync";
      this.syncQueued = false;
      this.syncQueuedQuiet = false;
      this.syncQueuedForce = false;
      this.syncQueuedOrigin = "";
      this.syncFromRemote({
        quiet: nextQuiet,
        force: nextForce,
        origin: nextOrigin,
        component: nextComponent,
        hook: nextHook,
      }).catch((error) => console.error(error));
    }, REMOTE_SYNC_DEBOUNCE_MS);
  }

  async syncFromRemote({ quiet = false, force = false, origin = "direct", component = "StudioStore", hook = "syncFromRemote" } = {}) {
    if (!this.supabase || this.syncInFlight) return;
    const perf = perfMark("syncFromRemote");
    this.syncInFlight = true;
    this.remoteAttemptedAt = Date.now();
    this.remoteLastError = "";
    let activeRoute = null;
    let activeSyncScopeKey = "";
    let activeScopedBusinessId = "";

    try {
      const route = resolveRoute(location.pathname);
      activeRoute = route;
      const queryScope = `${route.view}:${route.businessSlug || "global"}`;
      const earlyRangeAnchor = /^\d{4}-\d{2}-\d{2}$/.test(this.state.meta?.selectedDate || "")
        ? this.state.meta.selectedDate
        : todayISO();
      const earlyWeekDates = getWeekDates(dateAnchor(earlyRangeAnchor));
      const earlyIsPublicRoute = route.view === "public" || route.view === "business-test";
      const earlyDataRangeKey =
        route.view === "super-admin"
          ? todayISO()
          : earlyIsPublicRoute
            ? earlyRangeAnchor
            : `${earlyWeekDates[0]}:${earlyWeekDates[earlyWeekDates.length - 1]}`;
      const earlyScopeKey = this.currentRuntimeScopeKey(route);
      const duplicateGuardKey = `${earlyScopeKey}:${earlyDataRangeKey}`;
      const lastSyncAt = this.lastRemoteSyncByKey.get(duplicateGuardKey) || 0;
      const needsInitialBusinessResolution =
        route.view !== "super-admin" &&
        route.businessSlug &&
        !this.scopedBusinessIdForRoute(route);
      const canUseRemoteStateCache = route.view === "super-admin";
      const earlyCachedState = !force && canUseRemoteStateCache
        ? this.getCachedRemoteState(`${earlyScopeKey}:${earlyDataRangeKey}`, route.view === "super-admin" ? SUPER_ADMIN_CACHE_TTL_MS : REMOTE_SCOPE_CACHE_TTL_MS)
        : null;
      recordSyncMetric({
        scope: earlyScopeKey,
        businessId: currentBusinessId(),
        component,
        hook,
        origin,
        force,
        quiet,
        cacheKey: duplicateGuardKey,
        stack: simplifiedStack(),
      });
      if (earlyCachedState) {
        this.applyRemoteState(earlyCachedState, earlyScopeKey, quiet, "remote-cache");
        perfEnd(perf, `(${route.view}:early-cache)`);
        return;
      }
      if (!needsInitialBusinessResolution && lastSyncAt && Date.now() - lastSyncAt < DUPLICATE_SYNC_GUARD_MS) {
        perfEnd(perf, `(${route.view}:duplicate-guard)`);
        return;
      }
      this.lastRemoteSyncByKey.set(duplicateGuardKey, Date.now());
      const businessPerf = perfMark("business");
      const businessCacheKey =
        route.view === "super-admin"
          ? "businesses:all"
          : `business:${route.businessSlug || DEFAULT_BUSINESS_SLUG}`;
      const cachedBusinessRows = !force ? this.getCachedBusinessRows(businessCacheKey) : null;
      const businessesResult = cachedBusinessRows
        ? { data: cachedBusinessRows, error: null }
        : await this.trackedQuery(
            "businesses",
            queryScope,
            route.view === "super-admin"
              ? this.supabase.from("businesses").select(BUSINESS_SELECT_COLUMNS).order("created_at", { ascending: true })
              : this.supabase.from("businesses").select(BUSINESS_SELECT_COLUMNS).eq("slug", route.businessSlug).limit(1)
          );
      if (businessesResult.error) throw businessesResult.error;
      if (!cachedBusinessRows && (route.view === "super-admin" || (businessesResult.data || []).length)) {
        this.setCachedBusinessRows(businessCacheKey, businessesResult.data || []);
      }
      if ((businessesResult.data || []).length) {
        this.seedPersistentBusinessIdentityRows(businessesResult.data || []);
      }
      perfStep("business", businessPerf, `(${route.view}:${route.businessSlug || "global"})`);
      const deletedBusinessIds = loadDeletedBusinessIds();
      const remoteBusinesses = (businessesResult.data || [])
        .map(mapRowToBusiness)
        .filter((business) => !isArchivedBusiness(business));
      const mergedBusinesses = remoteBusinesses;

      const scopedBusiness =
        route.view === "super-admin"
          ? null
          : mergedBusinesses.find((business) => business.slug === route.businessSlug) ||
            this.businessResolution(route.businessSlug)?.business ||
            placeholderBusinessForSlug(route.businessSlug);
      const scopedBusinessId =
        route.view === "super-admin"
          ? null
          : scopedBusiness?.id || null;
      const syncScopeView = route.shell === "internal" ? "internal" : route.view;
      const syncScopeKey =
        route.view === "super-admin"
          ? "super-admin:global"
          : `${syncScopeView}:${scopedBusinessId || "global"}:${route.businessSlug || ""}`;
      activeSyncScopeKey = syncScopeKey;
      activeScopedBusinessId = scopedBusinessId || "";

      if (route.view === "super-admin") {
        const cacheKey = `${syncScopeKey}:${todayISO()}`;
        const cachedState = !force ? this.getCachedRemoteState(cacheKey, SUPER_ADMIN_CACHE_TTL_MS) : null;
        if (cachedState) {
          this.applyRemoteState(cachedState, syncScopeKey, quiet, "remote-cache");
          perfEnd(perf, "(super-admin cache)");
          return;
        }
        const settingsPerf = perfMark("super-admin settings+summary");
        const [
          businessSettingsResult,
          summaryRpcResult,
          servicesStatusResult,
          barbersSummaryResult,
          appointmentsSummaryResult,
          serviceIconsResult,
        ] = await Promise.all([
          this.trackedQuery(
            "business_settings",
            "super-admin",
            this.supabase.from("business_settings").select(BUSINESS_SETTINGS_LIGHT_SELECT_COLUMNS).order("created_at", { ascending: true })
          ),
          this.trackedQuery(
            "rpc:business_dashboard_summary",
            "super-admin",
            this.supabase.rpc("business_dashboard_summary", { target_date: todayISO() })
          ),
          this.trackedQuery(
            "summary:services_status",
            "super-admin",
            this.supabase.from("services").select("id,business_id,service_name,service_value,active")
          ),
          this.trackedQuery("summary:barbers", "super-admin", this.supabase.from("barbers").select("id,business_id")),
          this.trackedQuery(
            "summary:appointments_today",
            "super-admin",
            this.supabase
              .from("appointments")
              .select("id,business_id,date,status")
              .eq("date", todayISO())
          ),
          this.trackedQuery(
            "service_icons",
            "super-admin",
            this.supabase.from("service_icons").select(SERVICE_ICON_SELECT_COLUMNS).order("created_at", { ascending: true })
          ),
        ]);
        perfStep("super-admin settings+summary", settingsPerf);

        if (businessSettingsResult.error && businessSettingsResult.error.code !== "42P01") {
          throw businessSettingsResult.error;
        }
        if (serviceIconsResult.error && serviceIconsResult.error.code !== "42P01") {
          throw serviceIconsResult.error;
        }

        let businessSummaryById = {};
        const canBuildDirectSummary =
          !barbersSummaryResult.error &&
          !appointmentsSummaryResult.error &&
          !servicesStatusResult.error;

        if (canBuildDirectSummary) {
          businessSummaryById = buildBusinessSummaryMap(mergedBusinesses, {
            barbers: (barbersSummaryResult.data || []).map((row) => ({ negocioId: row.business_id })),
            services: (servicesStatusResult.data || []).map((row) => ({
              negocioId: row.business_id,
              active: row.active,
              name: row.service_name,
              value: row.service_value,
            })),
            appointments: (appointmentsSummaryResult.data || []).map((row) => ({
              negocioId: row.business_id,
              date: row.date,
              status: row.status,
            })),
          });
        } else if (!summaryRpcResult.error && Array.isArray(summaryRpcResult.data)) {
          businessSummaryById = buildBusinessSummaryMapFromRpcRows(mergedBusinesses, summaryRpcResult.data || []);
          if (!servicesStatusResult.error) {
            businessSummaryById = applyActiveServiceCounts(businessSummaryById, servicesStatusResult.data || []);
          }
        } else {
          if (barbersSummaryResult.error) throw barbersSummaryResult.error;
          if (appointmentsSummaryResult.error) throw appointmentsSummaryResult.error;
          if (servicesStatusResult.error && servicesStatusResult.error.code !== "42P01") throw servicesStatusResult.error;
        }
        if (servicesStatusResult.error && servicesStatusResult.error.code !== "42P01") {
          console.warn("Service active summary skipped", servicesStatusResult.error);
        }

        const businessSettingsRows = businessSettingsResult.data || [];
        const serviceIconsRows = serviceIconsResult.error ? [] : serviceIconsResult.data || [];
        if (serviceIconsRows.length) {
          persistPublicServiceIcons(serviceIconsRows.map(mapRowToServiceIcon));
        }
        const themedBusinesses = applyBusinessSettingsThemeColors(mergedBusinesses, businessSettingsRows);
        cacheBusinessThemes(themedBusinesses);
        this.syncBusinessSettingsToLocal(businessSettingsRows, null);
        const nextState = {
          meta: {
            ...this.state.meta,
            dayKey: todayISO(),
            weekKey: getWeekKey(),
            selectedDate: this.state.meta.selectedDate || todayISO(),
            businessSummaryById,
            remoteScopeKey: syncScopeKey,
            remoteView: route.view,
            remoteBusinessSlug: route.businessSlug || DEFAULT_BUSINESS_SLUG,
          },
        businesses: themedBusinesses.length ? themedBusinesses : neutralBootstrapState().businesses,
        barbers: this.state.barbers || [],
        appointments: this.state.appointments || [],
        blockedDays: this.state.blockedDays || [],
        services: this.state.services || [],
        serviceIcons: serviceIconsRows.map(mapRowToServiceIcon),
        barberServices: this.state.barberServices || [],
      };

        await this.syncAdminAccountsFromRemote(null, nextState.businesses);

        this.setCachedRemoteState(cacheKey, nextState);
        this.applyRemoteState(nextState, syncScopeKey, quiet, "remote");

        perfEnd(perf, "(super-admin)");
        return;
      }

      const rangeAnchor = /^\d{4}-\d{2}-\d{2}$/.test(this.state.meta?.selectedDate || "")
        ? this.state.meta.selectedDate
        : todayISO();
      const publicDate = rangeAnchor;
      const activeWeekDates = getWeekDates(dateAnchor(rangeAnchor));
      const weekStartDate = activeWeekDates[0];
      const weekEndDate = activeWeekDates[activeWeekDates.length - 1];
      const isPublicRoute = route.view === "public" || route.view === "business-test";
      const isInternalRoute = route.view === "admin" || route.view === "barber";
      const dataRangeKey = isPublicRoute ? publicDate : `${weekStartDate}:${weekEndDate}`;

      const queryScoped = async (table, orderColumn, ascending = true, tune = null) => {
        if (route.view !== "super-admin" && !scopedBusinessId) {
          return Promise.resolve({ data: [], error: null });
        }
        const columnMap = {
          barbers: isPublicRoute ? PUBLIC_BARBER_SELECT_COLUMNS : BARBER_SELECT_COLUMNS,
          appointments: isPublicRoute ? PUBLIC_APPOINTMENT_SELECT_COLUMNS : APPOINTMENT_SELECT_COLUMNS,
          blocked_days: BLOCKED_DAY_SELECT_COLUMNS,
          services: isPublicRoute ? PUBLIC_SERVICE_SELECT_COLUMNS : SERVICE_SELECT_COLUMNS,
          barber_services: BARBER_SERVICE_SELECT_COLUMNS,
          business_settings: BUSINESS_SETTINGS_LIGHT_SELECT_COLUMNS,
        };
        const selectedColumns = columnMap[table];
        if (!selectedColumns) {
          return Promise.resolve({ data: [], error: new Error(`Columnas no definidas para ${table}`) });
        }
        const buildQuery = (columns, applyTune = true, applyOrder = true) => {
          let query = this.supabase.from(table).select(columns);
          if (route.view !== "super-admin") {
            query = query.eq("business_id", scopedBusinessId);
          }
          if (applyTune && typeof tune === "function") {
            query = tune(query);
          }
          return applyOrder ? query.order(orderColumn, { ascending }) : query;
        };
        const primaryResult = await this.trackedQuery(
          table,
          `${route.view}:${scopedBusinessId || "global"}:${dataRangeKey}`,
          buildQuery(selectedColumns)
        );
        const canFallbackScopedBusinessData =
          route.view !== "super-admin" && ["barbers", "services", "barber_services"].includes(table);
        const needsFallback = canFallbackScopedBusinessData && primaryResult.error;
        if (!needsFallback) {
          return primaryResult;
        }
        const fallbackResult = await this.trackedQuery(
          `${table}:fallback`,
          `${route.view}:${scopedBusinessId || "global"}:${dataRangeKey}`,
          buildQuery("*", false, false)
        );
        if (fallbackResult.error) return primaryResult;
        if ((isPublicRoute || route.view === "barber") && ["barbers", "services"].includes(table)) {
          fallbackResult.data = (fallbackResult.data || []).filter((row) => parseActiveFlag(row.active ?? row.activo, true));
        }
        return fallbackResult;
      };

      const stableBucket = scopedBusinessId ? getBusinessBucket(scopedBusinessId) : emptyBusinessBucket();
      const stableBucketHasBusinessData = Boolean(
        stableBucket.barbers.length || stableBucket.services.length || stableBucket.barberServices.length
      );
      const cachedPrefetchedPublicServices =
        !force && isPublicRoute && scopedBusinessId ? this.getCachedPublicServices(scopedBusinessId) || [] : [];
      const cachedBackgroundMedia =
        !force && scopedBusinessId ? loadBackgroundMedia(scopedBusinessId) : null;
      const cachedPrefetchedPublicIcons =
        !force && isPublicRoute ? cachedPublicServiceIcons() : [];
      const prefetchedPublicIconIds = new Set(
        cachedPrefetchedPublicIcons.map((icon) => String(icon.id || "").trim()).filter(Boolean)
      );
      const canReusePrefetchedPublicData =
        isPublicRoute &&
        scopedBusinessId &&
        cachedPrefetchedPublicServices.length > 0 &&
        cachedPrefetchedPublicServices.every((service) => {
          const iconId = String(service.serviceIconId || "").trim();
          return !iconId || prefetchedPublicIconIds.has(iconId);
        });
      const canReuseStableBusinessData =
        !force &&
        scopedBusinessId &&
        stableBucketHasBusinessData &&
        this.hasFreshStableBusinessData(scopedBusinessId, { needsFull: route.view === "admin" });
      const needsScopedSettingsHydration = Boolean(
        scopedBusinessId &&
        (!cachedBackgroundMedia || !this.businessSettingsByBusiness.has(scopedBusinessId))
      );
      if (scopedBusinessId) {
        this.beginResourceLoading("barbers", scopedBusinessId, syncScopeKey);
        this.beginResourceLoading("services", scopedBusinessId, syncScopeKey);
        this.beginResourceLoading("appointments", scopedBusinessId, syncScopeKey);
      }
      const cachedServiceIconRows =
        !force && Array.isArray(this.state.serviceIcons) && this.state.serviceIcons.length
          ? this.state.serviceIcons.map(mapServiceIconToRow)
          : null;
      const stableQueryResult = { data: null, error: null, fromStableCache: true };
      const scopedDataPerf = perfMark("business scoped data");
      const [barbersResult, appointmentsBaseResult, blockedDaysResult, servicesResult, barberServicesResult, businessSettingsResult, serviceIconsResult] = await Promise.all([
        // These scoped reads intentionally stay parallel and filtered by business_id to keep each tenant isolated.
        canReuseStableBusinessData
          ? Promise.resolve(stableQueryResult)
          : queryScoped("barbers", "created_at", true, (query) =>
              isPublicRoute || route.view === "barber" ? query.eq("active", true) : query
            ),
        queryScoped("appointments", "date", true, (query) =>
          isPublicRoute ? query.eq("date", publicDate) : query.gte("date", weekStartDate).lte("date", weekEndDate)
        ),
        queryScoped("blocked_days", "date", true, (query) =>
          isPublicRoute
            ? query.eq("date", publicDate)
            : isInternalRoute
              ? query.gte("date", weekStartDate).lte("date", weekEndDate)
              : query
        ),
        canReuseStableBusinessData
          ? Promise.resolve(stableQueryResult)
          : canReusePrefetchedPublicData
            ? Promise.resolve({
                data: cachedPrefetchedPublicServices.map((service) => mapServiceToRow(service)),
                error: null,
                fromPublicPrefetch: true,
              })
          : queryScoped("services", "created_at", true, (query) =>
              isPublicRoute || route.view === "barber" ? query.eq("active", true) : query
            ),
        canReuseStableBusinessData ? Promise.resolve(stableQueryResult) : queryScoped("barber_services", "created_at", true),
        canReuseStableBusinessData && !needsScopedSettingsHydration
          ? Promise.resolve(stableQueryResult)
          : queryScoped("business_settings", "created_at", true),
        cachedServiceIconRows
          ? Promise.resolve({ data: cachedServiceIconRows, error: null, fromStateCache: true })
          : canReusePrefetchedPublicData
            ? Promise.resolve({
                data: cachedPrefetchedPublicIcons.map(mapServiceIconToRow),
                error: null,
                fromPublicPrefetch: true,
              })
          : this.trackedQuery(
              "service_icons",
              `shared:${route.view}:${route.businessSlug || scopedBusinessId || "global"}`,
              this.supabase.from("service_icons").select(SERVICE_ICON_SELECT_COLUMNS).order("created_at", { ascending: true })
            ),
      ]);
      perfStep("business scoped data", scopedDataPerf, `(${route.view}:${route.businessSlug || scopedBusinessId || "global"})`);

      if (barbersResult.error) console.warn("Scoped barbers query skipped", barbersResult.error);
      if (appointmentsBaseResult.error) console.warn("Scoped appointments query skipped", appointmentsBaseResult.error);
      if (blockedDaysResult.error) console.warn("Scoped blocked days query skipped", blockedDaysResult.error);
      if (servicesResult.error) console.warn("Scoped services query skipped", servicesResult.error);
      if (barberServicesResult.error) console.warn("Scoped barber services query skipped", barberServicesResult.error);
      if (businessSettingsResult.error && businessSettingsResult.error.code !== "42P01") {
        console.warn("Scoped business settings query skipped", businessSettingsResult.error);
      }
      if (serviceIconsResult.error && serviceIconsResult.error.code !== "42P01") {
        console.warn("Service icons query skipped", serviceIconsResult.error);
      }

      const appointmentsResult = {
        ...appointmentsBaseResult,
        data: (appointmentsBaseResult.error ? [] : appointmentsBaseResult.data || []).sort((a, b) =>
          String(a.time || "").localeCompare(String(b.time || ""))
        ),
      };

      const barbersData = barbersResult.fromStableCache
        ? stableBucket.barbers
        : (barbersResult.error ? [] : barbersResult.data || []).map((row, index) => mapRowToBarber(row, index));
      const servicesData = servicesResult.fromStableCache
        ? stableBucket.services
        : servicesResult.error
          ? []
          : (servicesResult.data || []).map(mapRowToService);
      const barberServicesData = barberServicesResult.fromStableCache
        ? stableBucket.barberServices
        : (barberServicesResult.error ? [] : (barberServicesResult.data || []).map(mapRowToBarberService));
      const serviceIconsData =
        serviceIconsResult.error && serviceIconsResult.error.code !== "42P01"
          ? this.state.serviceIcons || []
          : (serviceIconsResult.data || []).map(mapRowToServiceIcon);
      if (serviceIconsData.length) {
        persistPublicServiceIcons(serviceIconsData);
      }
      const scopedBusinessSettingsRows = businessSettingsResult.fromStableCache || businessSettingsResult.error ? [] : businessSettingsResult.data || [];
      const currentWeek = getWeekKey();
      if (scopedBusinessId) {
        this.commitResourceLoading("barbers", scopedBusinessId, barbersData, {
          syncScopeKey,
          success: !barbersResult.error,
          error: barbersResult.error?.message || "",
        });
        this.commitResourceLoading("services", scopedBusinessId, servicesData, {
          syncScopeKey,
          success: !servicesResult.error,
          error: servicesResult.error?.message || "",
        });
        this.commitResourceLoading(
          "appointments",
          scopedBusinessId,
          (appointmentsResult.data || [])
            .map(mapRowToAppointment)
            .filter((item) => item.status !== "reserved" || item.weekKey === currentWeek),
          {
            syncScopeKey,
            success: !appointmentsBaseResult.error,
            error: appointmentsBaseResult.error?.message || "",
          }
        );
      }
      const scopedBusinessList = mergedBusinesses.length
        ? mergedBusinesses
        : isPlaceholderBusiness(scopedBusiness)
          ? []
          : [scopedBusiness];
      const scopedThemedBusinesses = applyBusinessSettingsThemeColors(scopedBusinessList, scopedBusinessSettingsRows);
      cacheBusinessThemes(scopedThemedBusinesses);
      if (!businessSettingsResult.fromStableCache) {
        this.syncBusinessSettingsToLocal(scopedBusinessSettingsRows, route.view === "super-admin" ? null : scopedBusinessId);
      }

      const nextState = {
        meta: {
          ...this.state.meta,
          dayKey: todayISO(),
          weekKey: currentWeek,
          selectedDate: this.state.meta.selectedDate || todayISO(),
          businessSummaryById: this.state.meta.businessSummaryById || {},
          remoteScopeKey: syncScopeKey,
          remoteView: route.view,
          remoteBusinessSlug: route.businessSlug || DEFAULT_BUSINESS_SLUG,
        },
        businesses: scopedThemedBusinesses.length
          ? scopedThemedBusinesses
          : isPlaceholderBusiness(scopedBusiness)
            ? []
            : [scopedBusiness],
        barbers: barbersData,
        appointments: (appointmentsResult.data || [])
          .map(mapRowToAppointment)
          .filter((item) => item.status !== "reserved" || item.weekKey === currentWeek),
        blockedDays: (blockedDaysResult.error ? [] : blockedDaysResult.data || []).map(mapRowToBlockedDay),
        services: servicesData,
        serviceIcons: serviceIconsData,
        barberServices: barberServicesData,
      };

      const stabilizedState = this.stabilizeScopedBusinessState(nextState, {
        businessId: scopedBusinessId,
        syncScopeKey,
        route,
        force,
      });

      let stampedState = stabilizedState;
      try {
        stampedState = this.withStableBusinessCacheStamp(stabilizedState, scopedBusinessId, { full: route.view === "admin" });
      } catch (cacheError) {
        console.warn("Stable business cache stamp skipped", cacheError);
      }
      this.applyRemoteState(stampedState, syncScopeKey, quiet, "remote");

      perfEnd(perf, `(${route.view}:${scopedBusinessId || "global"})`);
    } catch (error) {
      if (activeScopedBusinessId) {
        this.commitResourceLoading("barbers", activeScopedBusinessId, [], {
          syncScopeKey: activeSyncScopeKey,
          success: false,
          error: error?.message || "",
        });
        this.commitResourceLoading("services", activeScopedBusinessId, [], {
          syncScopeKey: activeSyncScopeKey,
          success: false,
          error: error?.message || "",
        });
        this.commitResourceLoading("appointments", activeScopedBusinessId, [], {
          syncScopeKey: activeSyncScopeKey,
          success: false,
          error: error?.message || "",
        });
      }
      this.remoteReady = true;
      this.remoteLastError = error?.message || "No fue posible cargar los datos remotos.";
      console.error("Supabase sync failed", error);
      if (!quiet) {
        this.emit({ type: "SYNC_ERROR", table: "remote", error: this.remoteLastError });
      }
    } finally {
      this.applyingRemote = false;
      this.syncInFlight = false;
      if (this.syncQueued) {
        const queuedQuiet = this.syncQueuedQuiet || quiet;
        const queuedForce = this.syncQueuedForce || force;
        const queuedOrigin = this.syncQueuedOrigin || origin || "queued-during-sync";
        const queuedComponent = this.syncQueuedComponent || component || "StudioStore";
        const queuedHook = this.syncQueuedHook || hook || "syncFromRemote.finally";
        this.syncQueued = false;
        this.syncQueuedQuiet = false;
        this.syncQueuedForce = false;
        this.syncQueuedOrigin = "";
        this.queueRemoteSync({
          quiet: queuedQuiet,
          force: queuedForce,
          origin: queuedOrigin,
          component: queuedComponent,
          hook: queuedHook,
        });
      }
    }
  }

  async seedRemoteFromLocal({ manual = false, reason = "manual-demo" } = {}) {
    if (!this.supabase) return;
    const manualSeedEnabled =
      manual === true &&
      typeof window !== "undefined" &&
      window.__ENABLE_LOCAL_DEMO_SEED__ === true;
    if (!manualSeedEnabled) {
      console.warn("Local seed to Supabase skipped", {
        reason,
        manualRequested: manual === true,
        demoFlagEnabled:
          typeof window !== "undefined" && window.__ENABLE_LOCAL_DEMO_SEED__ === true,
      });
      return { skipped: true, reason: "manual_seed_disabled" };
    }

    const seedState = this.loadLocalState();
    const [businessesInsert, barbersInsert, appointmentsInsert, blockedDaysInsert, servicesInsert, barberServicesInsert] = await Promise.all([
      this.supabase.from("businesses").upsert(seedState.businesses.map(mapBusinessToRow), { onConflict: "id" }),
      this.supabase.from("barbers").upsert(seedState.barbers.map(mapBarberToRow), { onConflict: "id" }),
      this.supabase.from("appointments").upsert(seedState.appointments.map(mapAppointmentToRow), { onConflict: "id" }),
      this.supabase.from("blocked_days").upsert(seedState.blockedDays.map(mapBlockedDayToRow), { onConflict: "id" }),
      this.supabase.from("services").upsert(seedState.services.map(mapServiceToRow), { onConflict: "id" }),
      this.supabase.from("barber_services").upsert(seedState.barberServices.map(mapBarberServiceToRow), { onConflict: "id" }),
    ]);

    if (businessesInsert.error) console.warn("Supabase businesses seed skipped", businessesInsert.error);
    if (barbersInsert.error) throw barbersInsert.error;
    if (appointmentsInsert.error) throw appointmentsInsert.error;
    if (blockedDaysInsert.error) throw blockedDaysInsert.error;
    if (servicesInsert.error) console.warn("Supabase services seed skipped", servicesInsert.error);
    if (barberServicesInsert.error) console.warn("Supabase barber services seed skipped", barberServicesInsert.error);

    await this.syncFromRemote({
      origin: `seedSupabase:after_seed:${reason}`,
      component: "StudioStore",
      hook: "seedSupabase",
    });
    return { skipped: false, reason };
  }

  subscribeRemote() {
    if (!this.supabase) return;
    const route = resolveRoute(location.pathname);
    const scopedBusinessId =
      route.view === "super-admin" ? null : this.scopedBusinessIdForRoute(route);
    if (route.view !== "super-admin" && !scopedBusinessId) {
      const slug = route.businessSlug || DEFAULT_BUSINESS_SLUG;
      if (slug) {
        this.resolveBusinessBySlug(slug).then((result) => {
          if (result?.status !== "success") return;
          this.queueRemoteSync({
            quiet: true,
            force: true,
            origin: "subscribeRemote:resolved_business",
            component: "StudioStore",
            hook: "subscribeRemote",
          });
          this.subscribeRemote();
        });
      }
      return;
    }
    const scopeKey = this.currentRealtimeScopeKey(route);
    const subscribeCount = (this.remoteSubscribeCounters.get(scopeKey) || 0) + 1;
    this.remoteSubscribeCounters.set(scopeKey, subscribeCount);
    if (this.remoteChannel && this.remoteScopeKey === scopeKey) {
      recordSubscribeMetric({
        action: "reuse",
        scope: scopeKey,
        businessId: scopedBusinessId || "global",
        component: "StudioStore",
        hook: "subscribeRemote",
        count: subscribeCount,
        stack: simplifiedStack(),
      });
      return;
    }
    if (this.remoteChannel) {
      recordSubscribeMetric({
        action: "destroy",
        scope: this.remoteScopeKey,
        businessId: scopedBusinessId || "global",
        component: "StudioStore",
        hook: "subscribeRemote",
        count: subscribeCount,
        stack: simplifiedStack(),
      });
      this.supabase.removeChannel(this.remoteChannel);
      this.remoteChannel = null;
    }
    this.remoteScopeKey = scopeKey;
    const dataScopeKey = this.currentRuntimeScopeKey(route);
    const scopeWasLoaded =
      this.remoteLoadedScopeKey === dataScopeKey ||
      this.remoteLoadedScopes.has(dataScopeKey) ||
      this.remoteLoadedScopes.has(scopeKey);
    this.remoteReady = this.remoteReady || scopeWasLoaded;
    recordSubscribeMetric({
      action: "create",
      scope: scopeKey,
      businessId: scopedBusinessId || "global",
      component: "StudioStore",
      hook: "subscribeRemote",
      loaded: scopeWasLoaded,
      count: subscribeCount,
      stack: simplifiedStack(),
    });
    const appointmentConfig =
      route.view === "super-admin"
        ? { event: "*", schema: "public", table: "appointments" }
        : { event: "*", schema: "public", table: "appointments", filter: `business_id=eq.${scopedBusinessId}` };
    const barbersConfig =
      route.view === "super-admin"
        ? { event: "*", schema: "public", table: "barbers" }
        : { event: "*", schema: "public", table: "barbers", filter: `business_id=eq.${scopedBusinessId}` };
    const blockedDaysConfig =
      route.view === "super-admin"
        ? { event: "*", schema: "public", table: "blocked_days" }
        : { event: "*", schema: "public", table: "blocked_days", filter: `business_id=eq.${scopedBusinessId}` };
    const servicesConfig =
      route.view === "super-admin"
        ? { event: "*", schema: "public", table: "services" }
        : { event: "*", schema: "public", table: "services", filter: `business_id=eq.${scopedBusinessId}` };
    const barberServicesConfig =
      route.view === "super-admin"
        ? { event: "*", schema: "public", table: "barber_services" }
        : { event: "*", schema: "public", table: "barber_services", filter: `business_id=eq.${scopedBusinessId}` };
    const businessSettingsConfig =
      route.view === "super-admin"
        ? { event: "*", schema: "public", table: "business_settings" }
        : { event: "*", schema: "public", table: "business_settings", filter: `business_id=eq.${scopedBusinessId}` };
    const businessesConfig =
      route.view === "super-admin"
        ? { event: "*", schema: "public", table: "businesses" }
        : { event: "*", schema: "public", table: "businesses", filter: `id=eq.${scopedBusinessId}` };

    const onTenantChange = (table = "") => {
      if (table === "businesses" || table === "business_settings") {
        this.invalidateRemoteCache();
      } else {
        this.invalidateRemoteCache(scopedBusinessId || "global");
      }
      if (["business_settings", "barbers", "services", "barber_services"].includes(table) && scopedBusinessId) {
        this.invalidateStableBusinessCache(scopedBusinessId);
      }
      this.queueRemoteSync({ force: true, origin: `realtime:${table || "unknown"}`, component: "SupabaseRealtime", hook: "postgres_changes" });
    };
    let channel = this.supabase
      .channel(`barber-delux-realtime-${scopeKey}`)
      .on("postgres_changes", businessesConfig, () => onTenantChange("businesses"))
      .on("postgres_changes", businessSettingsConfig, () => onTenantChange("business_settings"));
    if (route.view !== "super-admin") {
      channel = channel
        .on("postgres_changes", barbersConfig, () => onTenantChange("barbers"))
        .on("postgres_changes", appointmentConfig, () => onTenantChange("appointments"))
        .on("postgres_changes", blockedDaysConfig, () => onTenantChange("blocked_days"))
        .on("postgres_changes", servicesConfig, () => onTenantChange("services"))
        .on("postgres_changes", barberServicesConfig, () => onTenantChange("barber_services"));
    }
    this.remoteChannel = channel.subscribe();
    if (!scopeWasLoaded) {
      const lastRequestedAt = this.remoteScopeLoadRequestedAt.get(scopeKey) || 0;
      if (!lastRequestedAt || Date.now() - lastRequestedAt > DUPLICATE_SYNC_GUARD_MS) {
        this.remoteScopeLoadRequestedAt.set(scopeKey, Date.now());
        this.queueRemoteSync({ origin: "subscribeRemote:scope_not_loaded", component: "StudioStore", hook: "subscribeRemote" });
      } else {
        recordSubscribeMetric({
          action: "skip_scope_not_loaded_duplicate",
          scope: scopeKey,
          businessId: scopedBusinessId || "global",
          component: "StudioStore",
          hook: "subscribeRemote",
          count: subscribeCount,
          stack: simplifiedStack(),
        });
      }
    }
  }

  async persistRemote(event) {
    if (!this.supabase) return;
    if (event.reason === "daily_reset") {
      console.warn("daily_reset ignored: exclusive maintenance for business_principal is disabled.");
      return;
    }

    if (event.reason === "weekly_cleanup") {
      console.warn("weekly_cleanup ignored: exclusive maintenance for business_principal is disabled.");
      return;
    }

    if (event.table === "appointments") {
      if (event.type === "DELETE") {
        const { error } = await this.supabase
          .from("appointments")
          .delete()
          .eq("id", event.id)
          .eq("business_id", event.businessId || currentBusinessId());
        if (error) throw error;
        return;
      }
      if (!event.record) return;
      const { error } = await this.supabase
        .from("appointments")
        .upsert(mapAppointmentToRow(event.record), { onConflict: "id" });
      if (error) throw error;
      return;
    }

    if (event.table === "barbers") {
      if (event.type === "DELETE") {
        const { error } = await this.supabase
          .from("barbers")
          .delete()
          .eq("id", event.id)
          .eq("business_id", event.businessId || currentBusinessId());
        if (error) throw error;
        return;
      }
      if (!event.record) return;
      const record =
        this.state.barbers.find(
          (barber) => barber.id === event.record.id && barber.negocioId === (event.record.negocioId || currentBusinessId())
        ) || event.record;
      const { error } = await this.supabase.from("barbers").upsert(mapBarberToRow(record), { onConflict: "id" });
      if (error) throw error;
      return;
    }

    if (event.table === "businesses") {
      if (event.type === "CASCADE_DELETE") {
        // Las eliminaciones completas solo deben ejecutarse desde el backend con service_role.
        // Evitamos cascadas desde el navegador para no tocar otros negocios por sincronizaciones locales.
        return;
      }
      if (event.type === "DELETE") {
        // Igual que CASCADE_DELETE: el frontend no borra negocios en remoto.
        return;
      }
      if (!event.record) return;
      const { error } = await this.supabase
        .from("businesses")
        .upsert(mapBusinessToRow(event.record), { onConflict: "id" });
      if (error) throw error;
      return;
    }

    if (event.table === "blocked_days") {
      if (event.type === "DELETE") {
        const record = event.record;
        if (!record?.barberId || !record?.date) return;
        const { error } = await this.supabase
          .from("blocked_days")
          .delete()
          .eq("barber_id", record.barberId)
          .eq("date", record.date)
          .eq("business_id", record.negocioId || currentBusinessId());
        if (error) throw error;
        return;
      }
      if (!event.record) return;
      const existing =
        this.state.blockedDays.find(
          (item) =>
            item.barberId === event.record.barberId &&
            item.date === event.record.date &&
            item.negocioId === (event.record.negocioId || currentBusinessId())
        ) || event.record;
      const { error } = await this.supabase
        .from("blocked_days")
        .upsert(mapBlockedDayToRow(existing), { onConflict: "id" });
      if (error) throw error;
    }

    if (event.table === "services") {
      if (event.type === "DELETE") {
        const { error } = await this.supabase
          .from("services")
          .delete()
          .eq("id", event.id)
          .eq("business_id", event.businessId || currentBusinessId());
        if (error) throw error;
        return;
      }
      if (!event.record) return;
      const primaryRow = mapServiceToRow(event.record);
      let { error } = await this.supabase
        .from("services")
        .upsert(primaryRow, { onConflict: "id" });
      if (error && errorMentionsSchemaToken(error, "service_icon_id")) {
        ({ error } = await this.supabase
          .from("services")
          .upsert(mapServiceToRow(event.record, { includeIconId: false }), { onConflict: "id" }));
      }
      if (error) throw error;
      return;
    }

    if (event.table === "barber_services") {
      if (event.type === "REPLACE") {
        if (!event.barberId) return;
        const removeExisting = await this.supabase
          .from("barber_services")
          .delete()
          .eq("barber_id", event.barberId)
          .eq("business_id", event.businessId || currentBusinessId());
        if (removeExisting.error) throw removeExisting.error;
        if (!event.records?.length) return;
        const insertRows = await this.supabase
          .from("barber_services")
          .upsert(event.records.map(mapBarberServiceToRow), { onConflict: "id" });
        if (insertRows.error) throw insertRows.error;
      }
    }
  }

  applyDemoMaintenance() {
    const currentDay = todayISO();
    const currentWeek = getWeekKey();
    const metaChanged =
      this.state.meta.dayKey !== currentDay ||
      this.state.meta.weekKey !== currentWeek ||
      this.state.meta.selectedDate !== currentDay;
    if (!metaChanged) return;
    this.state.meta.dayKey = currentDay;
    this.state.meta.weekKey = currentWeek;
    this.state.meta.selectedDate = currentDay;
    this.dailyResetPending = false;
    this.persist({ type: "SYNC", table: "meta" });
  }

  activeBarbers() {
    return this.state.barbers.filter((barber) => barber.active);
  }

  businessBucket(businessId) {
    const id = businessId || DEFAULT_BUSINESS_ID;
    if (this.bucketCacheStateRef !== this.state) {
      this.bucketCacheStateRef = this.state;
      this.bucketCache = new Map();
    }
    if (!this.bucketCache.has(id)) {
      const bucket = buildBusinessBucketFromState(this.state, id);
      if (this.renderableResourceRows) {
        bucket.barbers = this.renderableResourceRows("barbers", id, bucket.barbers);
        bucket.activeBarbers = bucket.barbers.filter((barber) => barber.active);
        bucket.services = this.renderableResourceRows("services", id, bucket.services);
        bucket.activeServices = bucket.services.filter((service) => service.active);
        bucket.appointments = this.renderableResourceRows("appointments", id, bucket.appointments);
        bucket.barbersById = new Map(bucket.barbers.map((barber) => [barber.id, barber]));
        bucket.servicesById = new Map(bucket.services.map((service) => [service.id, service]));
        bucket.appointmentsById = new Map(bucket.appointments.map((appointment) => [appointment.id, appointment]));
        bucket.appointmentBySlot = new Map();
        bucket.appointments.forEach((appointment) => {
          bucket.appointmentBySlot.set(`${appointment.barberId}|${appointment.date}|${appointment.time}`, appointment);
        });
      }
      this.bucketCache.set(id, bucket);
    }
    return this.bucketCache.get(id);
  }

  activeBarbersByBusiness(businessId) {
    return this.businessBucket(businessId).activeBarbers;
  }

  businessById(id) {
    return this.state.businesses.find((business) => business.id === id) || null;
  }

  businessBySlug(slug) {
    const normalizedSlug = String(slug || "").trim().toLowerCase();
    return this.state.businesses.find((business) => business.slug === normalizedSlug && !isPlaceholderBusiness(business)) || null;
  }

  saveBusiness(payload) {
    if (payload.id) {
      this.state.businesses = this.state.businesses.map((business) =>
        business.id === payload.id ? normalizeBusiness({ ...business, ...payload, updatedAt: todayISO() }) : business
      );
      this.setPersistentBusinessIdentity(payload.slug || this.businessById(payload.id)?.slug, mapBusinessToRow(this.businessById(payload.id)));
      cacheBusinessTheme(this.businessById(payload.id));
      this.persist({ type: "UPDATE", table: "businesses", record: this.businessById(payload.id) });
      return this.businessById(payload.id);
    }

    const created = normalizeBusiness({
      id: uid("business"),
      active: true,
      ...payload,
      createdAt: todayISO(),
      updatedAt: todayISO(),
    });
    this.state.businesses.push(created);
    this.setPersistentBusinessIdentity(created.slug, mapBusinessToRow(created));
    cacheBusinessTheme(created);
    this.persist({ type: "INSERT", table: "businesses", record: created });
    return created;
  }

  async ensureBusinessRemote(business, environmentAttachment = null) {
    if (!this.supabase || !business?.id) return true;

    const businessUpsert = await this.supabase
      .from("businesses")
      .upsert(mapBusinessToRow(business), { onConflict: "id" });
    if (businessUpsert.error) {
      throw businessUpsert.error;
    }

    const businessSettingRecord = {
      business_id: business.id,
      public_path: "/barberia/:slug",
      environment_archive_url: "",
      environment_archive_name: environmentAttachment?.fileName || "",
      environment_archive_meta: {
        ...(environmentAttachment || { mode: "dynamic_base" }),
        themeColors: colorsForBusiness(business),
        openingTime: DEFAULT_OPENING_TIME,
        closingTime: DEFAULT_CLOSING_TIME,
        slotDurationMinutes: DEFAULT_SLOT_DURATION_MINUTES,
      },
      theme_override: business.theme || "",
      custom_domain: "",
      notes: environmentAttachment?.notes || "",
    };

    const settingsUpsert = await this.supabase
      .from("business_settings")
      .upsert(businessSettingRecord, { onConflict: "business_id" });

    if (settingsUpsert.error && settingsUpsert.error.code !== "42P01") {
      throw settingsUpsert.error;
    }

    return true;
  }

  async syncAdminAccountsFromRemote(businessId = null, businesses = this.state.businesses) {
    if (!this.supabase) return true;
    const cacheKey = `admin-accounts:${businessId || "global"}`;
    const cached = this.adminAccountsCache.get(cacheKey);
    if (cached && Date.now() - cached.createdAt < ADMIN_ACCOUNTS_CACHE_TTL_MS) {
      saveAdminAccounts(cached.accounts);
      return true;
    }
    const buildAdminAccountsQuery = (columns) => {
      let query = this.supabase.from("admin_accounts").select(columns).order("created_at", { ascending: true });
      if (businessId) {
        query = query.eq("business_id", businessId);
      }
      return query;
    };
    let { data, error } = await this.trackedQuery(
      "admin_accounts",
      `admin-accounts:${businessId || "global"}`,
      buildAdminAccountsQuery(ADMIN_ACCOUNT_SELECT_COLUMNS)
    );
    if (error && ["42703", "PGRST204", "PGRST205"].includes(error.code || "")) {
      const legacyResult = await this.trackedQuery(
        "admin_accounts:legacy",
        `admin-accounts:${businessId || "global"}`,
        buildAdminAccountsQuery(ADMIN_ACCOUNT_SELECT_COLUMNS_LEGACY)
      );
      data = legacyResult.data;
      error = legacyResult.error;
    }
    if (error) {
      if (error.code === "42P01") return false;
      throw error;
    }

    const remoteAccounts = (data || []).map((row) => mapRowToAdminAccount(row, businesses));
    remoteAccounts.forEach((account) => {
      if (account.password) {
        setVisibleAdminPassword(account.id, {
          businessId: account.businessId,
          businessName: businesses.find((item) => item.id === account.businessId)?.name || "Barberia",
          user: account.user,
          password: account.password,
        });
      }
    });
    const localAccounts = loadAdminAccounts();
    const preservedAccounts = businessId
      ? localAccounts.filter((account) => account.businessId !== businessId)
      : [];
    const nextAccounts = [...preservedAccounts, ...remoteAccounts];
    saveAdminAccounts(nextAccounts);
    this.adminAccountsCache.set(cacheKey, {
      createdAt: Date.now(),
      accounts: nextAccounts,
    });
    return true;
  }

  isActiveSessionsTableUnavailable(error) {
    return ["42P01", "PGRST204", "PGRST205", "42703"].includes(error?.code || "");
  }

  markActiveSessionsUnsupported(error) {
    if (this.isActiveSessionsTableUnavailable(error)) {
      this.activeSessionsSupported = false;
      return true;
    }
    return false;
  }

  activeSessionBaseQuery(payload) {
    let query = this.supabase.from(ACTIVE_SESSIONS_TABLE).select("*");
    query = query.eq("role", payload.role).eq("user_id", payload.userId);
    query = payload.businessId ? query.eq("business_id", payload.businessId) : query.is("business_id", null);
    return query;
  }

  async claimActiveSessionRemote(payload) {
    if (!this.supabase || !payload?.sessionToken) return { ok: true, skipped: true };
    if (this.activeSessionsSupported === false) return { ok: true, skipped: true };
    const now = new Date().toISOString();
    try {
      const existingResult = await this.trackedQuery(
        "active_sessions:existing",
        `active-session:${payload.role}:${payload.businessId || "global"}:${payload.userId}`,
        this.activeSessionBaseQuery(payload).eq("active", true)
      );
      if (existingResult.error) {
        if (this.markActiveSessionsUnsupported(existingResult.error)) return { ok: true, skipped: true };
        throw existingResult.error;
      }

      const existing = existingResult.data || [];
      const otherIds = existing
        .filter((row) => row.session_token !== payload.sessionToken)
        .map((row) => row.id)
        .filter(Boolean);

      if (otherIds.length) {
        const { error: closeError } = await this.supabase
          .from(ACTIVE_SESSIONS_TABLE)
          .update({
            active: false,
            closed_at: now,
            closed_reason: "replaced_by_new_login",
          })
          .in("id", otherIds);
        if (closeError && !this.markActiveSessionsUnsupported(closeError)) {
          throw closeError;
        }
      }

      const row = {
        session_token: payload.sessionToken,
        device_id: payload.deviceId || getDeviceId(),
        role: payload.role,
        business_id: payload.businessId || null,
        user_id: payload.userId,
        user_label: payload.userLabel || "",
        active: true,
        created_at: payload.startedAt || now,
        last_seen_at: now,
        closed_at: null,
        closed_reason: null,
      };
      const { error: upsertError } = await this.supabase
        .from(ACTIVE_SESSIONS_TABLE)
        .upsert(row, { onConflict: "session_token" });
      if (upsertError) {
        if (this.markActiveSessionsUnsupported(upsertError)) return { ok: true, skipped: true };
        throw upsertError;
      }
      this.activeSessionsSupported = true;
      return { ok: true, replaced: otherIds.length > 0 };
    } catch (error) {
      console.warn("Claim active session skipped", error);
      return { ok: true, skipped: true, error };
    }
  }

  async validateActiveSessionRemote(payload) {
    if (!this.supabase || !payload?.sessionToken) return { ok: true, active: true, skipped: true };
    if (this.activeSessionsSupported === false) return { ok: true, active: true, skipped: true };
    try {
      const { data, error } = await this.supabase
        .from(ACTIVE_SESSIONS_TABLE)
        .select("id,session_token,device_id,role,business_id,user_id,active,closed_reason")
        .eq("session_token", payload.sessionToken)
        .maybeSingle();
      if (error) {
        if (this.markActiveSessionsUnsupported(error)) return { ok: true, active: true, skipped: true };
        throw error;
      }
      this.activeSessionsSupported = true;
      if (!data?.id || data.active === false) {
        return {
          ok: false,
          active: false,
          message: remoteSessionClosedMessage(payload.role),
        };
      }
      if (String(data.role || "") !== String(payload.role || "")) {
        return { ok: false, active: false, message: remoteSessionClosedMessage(payload.role) };
      }
      if (String(data.user_id || "") !== String(payload.userId || "")) {
        return { ok: false, active: false, message: remoteSessionClosedMessage(payload.role) };
      }
      if ((payload.businessId || null) !== (data.business_id || null)) {
        return { ok: false, active: false, message: remoteSessionClosedMessage(payload.role) };
      }
      if (String(data.device_id || "") !== String(payload.deviceId || "")) {
        return { ok: false, active: false, message: remoteSessionClosedMessage(payload.role) };
      }
      return { ok: true, active: true };
    } catch (error) {
      console.warn("Validate active session skipped", error);
      return { ok: true, active: true, skipped: true, error };
    }
  }

  async touchActiveSessionRemote(payload) {
    if (!this.supabase || !payload?.sessionToken) return { ok: true, skipped: true };
    if (this.activeSessionsSupported === false) return { ok: true, skipped: true };
    const { error } = await this.supabase
      .from(ACTIVE_SESSIONS_TABLE)
      .update({ last_seen_at: new Date().toISOString() })
      .eq("session_token", payload.sessionToken)
      .eq("active", true);
    if (error) {
      if (this.markActiveSessionsUnsupported(error)) return { ok: true, skipped: true };
      console.warn("Touch active session skipped", error);
      return { ok: true, skipped: true, error };
    }
    this.activeSessionsSupported = true;
    return { ok: true };
  }

  async closeActiveSessionRemote(payload, reason = "manual_logout") {
    if (!this.supabase || !payload?.sessionToken) return { ok: true, skipped: true };
    if (this.activeSessionsSupported === false) return { ok: true, skipped: true };
    const { error } = await this.supabase
      .from(ACTIVE_SESSIONS_TABLE)
      .update({
        active: false,
        closed_at: new Date().toISOString(),
        closed_reason: reason || "manual_logout",
      })
      .eq("session_token", payload.sessionToken);
    if (error) {
      if (this.markActiveSessionsUnsupported(error)) return { ok: true, skipped: true };
      console.warn("Close active session skipped", error);
      return { ok: true, skipped: true, error };
    }
    this.activeSessionsSupported = true;
    return { ok: true };
  }

  syncBusinessSettingsToLocal(rows = [], scopedBusinessId = null) {
    const map = loadBackgroundMediaMap();
    const businessesById = new Map(this.state.businesses.map((business) => [business.id, business]));
    const rowsByBusiness = new Map(
      (rows || []).map((row) => [row.business_id || DEFAULT_BUSINESS_ID, row])
    );
    rowsByBusiness.forEach((row, businessId) => {
      const meta = normalizeBusinessSettingsMeta(row?.environment_archive_meta);
      const hasPublicPriceSetting =
        Object.prototype.hasOwnProperty.call(row || {}, "show_public_prices") ||
        Object.prototype.hasOwnProperty.call(meta, "showPublicPrices") ||
        Object.prototype.hasOwnProperty.call(meta, "show_public_prices");
      this.businessSettingsByBusiness.set(businessId, {
        businessId,
        row,
        meta,
        publicPricesResolved: hasPublicPriceSetting,
        showPublicPrices: parseShowPublicPricesSetting(
          row?.show_public_prices ?? meta?.showPublicPrices ?? meta?.show_public_prices
        ),
        schedule: normalizeBusinessScheduleConfig({
          openingTime: row?.opening_time ?? meta?.openingTime ?? meta?.opening_time,
          closingTime: row?.closing_time ?? meta?.closingTime ?? meta?.closing_time,
          slotDurationMinutes:
            row?.slot_duration_minutes ?? meta?.slotDurationMinutes ?? meta?.slot_duration_minutes,
        }),
      });
    });
    agendaMemo.slotRows.clear();
    agendaMemo.publicDateAvailability.clear();

    if (scopedBusinessId) {
      const row = rowsByBusiness.get(scopedBusinessId);
      const hasRemoteMeta = row && Object.prototype.hasOwnProperty.call(row, "environment_archive_meta");
      const meta = normalizeBusinessSettingsMeta(row?.environment_archive_meta);
      const backgroundMedia = meta?.backgroundMedia || null;
      if (backgroundMedia) {
        map[scopedBusinessId] = backgroundMedia;
      } else if (hasRemoteMeta) {
        delete map[scopedBusinessId];
      }
      if (meta?.themeColors && businessesById.has(scopedBusinessId)) {
        businessesById.set(scopedBusinessId, normalizeBusiness({
          ...businessesById.get(scopedBusinessId),
          ...businessBrandingPatchFromMeta(meta),
          ...businessThemePatchFromMeta(meta.themeColors),
        }));
      } else if (businessesById.has(scopedBusinessId)) {
        businessesById.set(scopedBusinessId, normalizeBusiness({
          ...businessesById.get(scopedBusinessId),
          ...businessBrandingPatchFromMeta(meta),
        }));
      }
    } else {
      this.state.businesses.forEach((business) => {
        const row = rowsByBusiness.get(business.id);
        const hasRemoteMeta = row && Object.prototype.hasOwnProperty.call(row, "environment_archive_meta");
        const meta = normalizeBusinessSettingsMeta(row?.environment_archive_meta);
        const backgroundMedia = meta?.backgroundMedia || null;
        if (backgroundMedia) {
          map[business.id] = backgroundMedia;
        } else if (hasRemoteMeta && business.id !== DEFAULT_BUSINESS_ID) {
          delete map[business.id];
        }
        if (meta?.themeColors) {
          businessesById.set(business.id, normalizeBusiness({
            ...business,
            ...businessBrandingPatchFromMeta(meta),
            ...businessThemePatchFromMeta(meta.themeColors),
          }));
        } else if (businessBrandingPatchFromMeta(meta).logoUrl) {
          businessesById.set(business.id, normalizeBusiness({
            ...business,
            ...businessBrandingPatchFromMeta(meta),
          }));
        }
      });
    }

    this.state.businesses = [...businessesById.values()];
    localStorage.setItem(BACKGROUND_MEDIA_BY_BUSINESS_KEY, JSON.stringify(map));
    if (typeof app !== "undefined") {
      app.backgroundMedia = currentBackgroundMedia();
      ensurePersistentBackground();
    }
  }

  businessSettingsForBusiness(businessId = currentBusinessId()) {
    const id = businessId || DEFAULT_BUSINESS_ID;
    return (
      this.businessSettingsByBusiness.get(id) || {
        businessId: id,
        row: null,
        meta: {},
        publicPricesResolved: false,
        showPublicPrices: false,
        schedule: normalizeBusinessScheduleConfig(),
      }
    );
  }

  async uploadBusinessLogo(businessId, file) {
    if (!this.supabase || !businessId || !file) return "";
    const extension = archiveExtension(file.name) || "png";
    const cleanExtension = ["png", "jpg", "jpeg", "webp"].includes(extension) ? extension : "png";
    const filePath = `${businessId}/logo-${Date.now()}.${cleanExtension}`;
    const { error } = await this.supabase.storage
      .from("logos-negocios")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
        contentType: file.type || `image/${cleanExtension}`,
      });
    if (error) throw error;
    const { data } = this.supabase.storage.from("logos-negocios").getPublicUrl(filePath);
    return data?.publicUrl || "";
  }

  async uploadBusinessBackgroundVideo(businessId, file) {
    if (!this.supabase || !businessId || !file) return null;
    const extension = archiveExtension(file.name) || "mp4";
    const cleanExtension = ["mp4", "webm"].includes(extension) ? extension : "mp4";
    const filePath = `${businessId}/background-video.${cleanExtension}`;
    const { error } = await this.supabase.storage
      .from("logos-negocios")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
        contentType: file.type || `video/${cleanExtension}`,
      });
    if (error) throw error;
    const { data } = this.supabase.storage.from("logos-negocios").getPublicUrl(filePath);
    const cacheBustedUrl = data?.publicUrl ? `${data.publicUrl}?v=${Date.now()}` : "";
    return cacheBustedUrl
      ? {
          type: "video",
          src: cacheBustedUrl,
          storageBucket: "logos-negocios",
          storagePath: filePath,
          mime: file.type || `video/${cleanExtension}`,
          name: file.name || `background-video.${cleanExtension}`,
          size: file.size || 0,
          savedAt: new Date().toISOString(),
        }
      : null;
  }

  async updateBusinessLogoRemote(businessId, logoUrl) {
    if (!this.supabase || !businessId || !logoUrl) return true;
    const { error } = await this.supabase
      .from("businesses")
      .update({ logo_url: logoUrl, updated_at: todayISO() })
      .eq("id", businessId);
    if (error) throw error;
    return true;
  }

  async upsertBusinessSettingsRemote(businessId, patch = {}) {
    if (!this.supabase || !businessId) return true;

    const existingResult = await this.supabase
      .from("business_settings")
      .select(BUSINESS_SETTINGS_SELECT_COLUMNS)
      .eq("business_id", businessId)
      .maybeSingle();

    if (existingResult.error && existingResult.error.code !== "PGRST116" && existingResult.error.code !== "42P01") {
      throw existingResult.error;
    }
    if (existingResult.error?.code === "42P01") return false;

    const existingRow = existingResult.data || {};
    const nextMeta = mergeBusinessSettingsMeta(existingRow.environment_archive_meta, patch.environment_archive_meta);
    const payload = {
      business_id: businessId,
      environment_archive_url: patch.environment_archive_url ?? existingRow.environment_archive_url ?? "",
      environment_archive_name: patch.environment_archive_name ?? existingRow.environment_archive_name ?? "",
      environment_archive_meta: nextMeta,
      public_path: patch.public_path ?? existingRow.public_path ?? "/barberia/:slug",
      theme_override: patch.theme_override ?? existingRow.theme_override ?? "",
      custom_domain: patch.custom_domain ?? existingRow.custom_domain ?? "",
      notes: patch.notes ?? existingRow.notes ?? "",
    };

    const { error } = await this.supabase
      .from("business_settings")
      .upsert(payload, { onConflict: "business_id" });
    if (error) {
      if (error.code === "42P01") return false;
      throw error;
    }
    this.syncBusinessSettingsToLocal([{ ...existingRow, ...payload }], businessId);
    return true;
  }

  async upsertAdminAccountRemote(account) {
    if (!this.supabase || !account?.id) return true;
    let { error } = await this.supabase
      .from("admin_accounts")
      .upsert(mapAdminAccountToRow(account), { onConflict: "id" });
    if (error && ["42703", "PGRST204", "PGRST205"].includes(error.code || "")) {
      const legacyPayload = mapAdminAccountToRow({ ...account, password: "" });
      delete legacyPayload.password;
      ({ error } = await this.supabase
        .from("admin_accounts")
        .upsert(legacyPayload, { onConflict: "id" }));
    }
    if (error) {
      if (error.code === "42P01") return false;
      throw error;
    }
    if (account.password) {
      setVisibleAdminPassword(account.id, {
        businessId: account.businessId,
        businessName: this.businessById(account.businessId)?.name || "Barberia",
        user: account.user,
        password: account.password,
      });
    }
    return true;
  }

  saveServiceIconLocal(icon) {
    if (!icon?.id) return null;
    const normalized = {
      id: icon.id,
      name: String(icon.name || "").trim(),
      imageData: String(icon.imageData || ""),
      mimeType: String(icon.mimeType || "image/png"),
      active: parseActiveFlag(icon.active, true),
      createdAt: icon.createdAt || todayISO(),
    };
    const exists = this.state.serviceIcons.some((item) => item.id === normalized.id);
    this.state.serviceIcons = exists
      ? this.state.serviceIcons.map((item) => (item.id === normalized.id ? { ...item, ...normalized } : item))
      : [...this.state.serviceIcons, normalized];
    this.state = this.stateWithRuntimeScope(this.state);
    this.invalidateBusinessBuckets();
    persistAppStateSnapshot(this.state);
    return normalized;
  }

  removeServiceIconLocal(iconId) {
    if (!iconId) return false;
    this.state.serviceIcons = this.state.serviceIcons.filter((icon) => icon.id !== iconId);
    this.state.services = this.state.services.map((service) =>
      service.serviceIconId === iconId ? { ...service, serviceIconId: "" } : service
    );
    this.state = this.stateWithRuntimeScope(this.state);
    this.invalidateBusinessBuckets();
    persistAppStateSnapshot(this.state);
    return true;
  }

  async upsertServiceIconRemote(icon) {
    if (!this.supabase || !icon?.id) return true;
    const { data, error } = await this.supabase
      .from("service_icons")
      .upsert(mapServiceIconToRow(icon), { onConflict: "id" })
      .select(SERVICE_ICON_SELECT_COLUMNS)
      .maybeSingle();
    if (error) {
      if (error.code === "42P01") return false;
      if (error.code === "42501") {
        const permissionError = new Error("No tienes permisos para guardar iconos en service_icons.");
        permissionError.code = error.code;
        permissionError.details = error.message || "";
        throw permissionError;
      }
      throw error;
    }
    if (data?.id) {
      this.saveServiceIconLocal(mapRowToServiceIcon(data));
    }
    return true;
  }

  async deleteServiceIconRemote(iconId) {
    if (!this.supabase || !iconId) return { ok: true, deleted: false };
    const usageResult = await this.supabase
      .from("services")
      .select("id", { head: true, count: "exact" })
      .eq("service_icon_id", iconId);
    if (usageResult.error && usageResult.error.code !== "42703") {
      throw usageResult.error;
    }
    const usageCount = Number(usageResult.count || 0);
    if (usageCount > 0) {
      return { ok: false, inUse: true, usageCount };
    }
    const { error } = await this.supabase.from("service_icons").delete().eq("id", iconId);
    if (error) {
      if (error.code === "42P01") return { ok: false, missingTable: true };
      if (error.code === "42501") {
        const permissionError = new Error("No tienes permisos para eliminar iconos en service_icons.");
        permissionError.code = error.code;
        permissionError.details = error.message || "";
        throw permissionError;
      }
      throw error;
    }
    this.removeServiceIconLocal(iconId);
    return { ok: true, deleted: true, usageCount: 0 };
  }

  async deleteAdminAccountRemote(id, businessId = null) {
    if (!this.supabase || !id) return true;
    let query = this.supabase.from("admin_accounts").delete().eq("id", id);
    if (businessId) {
      query = query.eq("business_id", businessId);
    }
    const { error } = await query;
    if (error) {
      if (error.code === "42P01") return false;
      throw error;
    }
    return true;
  }

  async deleteRowsByBusinessId(table, businessId) {
    if (!this.supabase || !table || !businessId) return true;
    const { error } = await this.supabase.from(table).delete().eq("business_id", businessId);
    if (error) {
      if (error.code === "42P01" || error.code === "42703") return false;
      throw error;
    }
    return true;
  }

  async removeStoragePrefix(bucket, prefix) {
    if (!this.supabase || !bucket || !prefix) return true;
    const storage = this.supabase.storage.from(bucket);
    const collectFiles = async (path) => {
      const { data, error } = await storage.list(path, { limit: 1000 });
      if (error) return [];
      const paths = [];
      for (const item of data || []) {
        const itemPath = `${path}/${item.name}`.replace(/^\/+/, "");
        if (item.metadata === null) {
          paths.push(...(await collectFiles(itemPath)));
        } else {
          paths.push(itemPath);
        }
      }
      return paths;
    };
    const files = await collectFiles(prefix.replace(/\/+$/, ""));
    if (!files.length) return true;
    const { error } = await storage.remove(files);
    if (error) console.warn(`No fue posible limpiar Storage ${bucket}/${prefix}`, error);
    return !error;
  }

  async deleteBusinessRemoteCascade(businessId) {
    // Por seguridad multi-negocio, el navegador no ejecuta cascadas remotas.
    // Usar /api/delete-business, que borra con service_role y filtros exactos por business_id.
    return true;
  }

  clearBusinessOperationalDataLocal(businessId) {
    if (!businessId || businessId === DEFAULT_BUSINESS_ID) return false;
    this.state.barbers = this.state.barbers.filter((barber) => barber.negocioId !== businessId);
    this.state.services = this.state.services.filter((service) => service.negocioId !== businessId);
    this.state.appointments = this.state.appointments.filter((appointment) => appointment.negocioId !== businessId);
    this.state.blockedDays = this.state.blockedDays.filter((blockedDay) => blockedDay.negocioId !== businessId);
    this.state.barberServices = this.state.barberServices.filter((relation) => relation.negocioId !== businessId);
    this.state = this.stateWithRuntimeScope(this.state);
    persistAppStateSnapshot(this.state);
    return true;
  }

  async ensureBusinessStartsEmpty(businessId) {
    if (!businessId || businessId === DEFAULT_BUSINESS_ID) return true;

    this.clearBusinessOperationalDataLocal(businessId);
    this.emit({ type: "SYNC", table: "businesses", reason: "empty_business_bootstrap" });
    // Seguridad SaaS multi-negocio:
    // un negocio nuevo debe iniciar vacio por definicion, no vaciarse mediante
    // borrados remotos automáticos. Esto evita que un id incorrecto o una
    // llamada accidental toque datos operativos de otra barbería.
    return true;
  }

  async purgeSecondaryBusinessesOperationalData() {
    // Desactivado: en SaaS multi-negocio no debe existir limpieza automatica
    // de negocios secundarios. Solo se vacia un negocio nuevo durante su creacion.
    return true;
  }

  deleteBusiness(businessId) {
    if (!businessId || businessId === DEFAULT_BUSINESS_ID) return false;
    return this.deleteBusinessLocalOnly(businessId);
  }

  deleteBusinessLocalOnly(businessId) {
    if (!businessId || businessId === DEFAULT_BUSINESS_ID) return false;
    const targetBusiness = this.businessById(businessId);
    markBusinessDeleted(businessId);
    if (targetBusiness?.slug) {
      this.businessResolutionBySlug.delete(String(targetBusiness.slug).trim().toLowerCase());
    }
    this.clearPersistentBusinessIdentity(targetBusiness?.slug || "", businessId);
    this.invalidateStableBusinessCache(businessId);
    this.invalidateRemoteCache(businessId);
    this.publicServicesCache.delete(businessId);
    this.publicServicesInFlight.delete(businessId);
    this.state.businesses = this.state.businesses.filter((business) => business.id !== businessId);
    this.state.barbers = this.state.barbers.filter((barber) => barber.negocioId !== businessId);
    this.state.services = this.state.services.filter((service) => service.negocioId !== businessId);
    this.state.appointments = this.state.appointments.filter((appointment) => appointment.negocioId !== businessId);
    this.state.blockedDays = this.state.blockedDays.filter((blockedDay) => blockedDay.negocioId !== businessId);
    this.state.barberServices = this.state.barberServices.filter((relation) => relation.negocioId !== businessId);
    this.state = this.stateWithRuntimeScope(this.state);
    this.invalidateBusinessBuckets();
    invalidateDerivedBusinessCache();
    persistAppStateSnapshot(this.state);
    this.emit({ type: "SYNC", table: "businesses", reason: "business_delete_local" });
    return true;
  }

  async deleteBusinessCompletely(businessId) {
    if (!businessId || businessId === DEFAULT_BUSINESS_ID) return false;
    // Compatibilidad: el borrado remoto completo se hace solo desde /api/delete-business.
    return this.deleteBusinessLocalOnly(businessId);
  }

  barberBelongsToBusiness(barberId, negocioId = currentBusinessId()) {
    if (!barberId || !negocioId) return false;
    return Boolean(this.businessBucket(negocioId).barbersById.get(barberId));
  }

  getAppointment(barberId, date, time, negocioId = currentBusinessId()) {
    if (!this.barberBelongsToBusiness(barberId, negocioId)) return null;
    return this.businessBucket(negocioId).appointmentBySlot.get(`${barberId}|${date}|${time}`);
  }

  isDayBlocked(barberId, date, negocioId = currentBusinessId()) {
    if (!this.barberBelongsToBusiness(barberId, negocioId)) return false;
    return this.businessBucket(negocioId).blockedDayKeys.has(`${barberId}|${date}`);
  }

  upsertAppointment(payload) {
    const negocioId = payload.negocioId || currentBusinessId();
    if (!this.barberBelongsToBusiness(payload.barberId, negocioId)) return null;
    const existing = this.getAppointment(payload.barberId, payload.date, payload.time, negocioId);
    const appointment = {
      id: existing?.id || uid("apt"),
      negocioId,
      source: payload.source || "admin",
      weekKey: payload.status === "reserved" ? getWeekKey(dateAnchor(payload.date)) : "permanent",
      blockOrigin:
        payload.status === "blocked"
          ? payload.blockOrigin || existing?.blockOrigin || "manual"
          : "",
      clientName: payload.clientName || "",
      whatsapp: payload.whatsapp || "",
      ...payload,
    };

    if (existing) {
      this.state.appointments = this.state.appointments.map((item) =>
        item.id === existing.id ? appointment : item
      );
      this.persist({ type: "UPDATE", table: "appointments", record: appointment });
      return appointment;
    }

    this.state.appointments.push(appointment);
    this.persist({ type: "INSERT", table: "appointments", record: appointment });
    return appointment;
  }

  async reservePublicAppointment(payload) {
    const negocioId = payload.negocioId || currentBusinessId();
    if (!this.barberBelongsToBusiness(payload.barberId, negocioId)) {
      return {
        ok: false,
        code: "invalid_barber",
        message: "Este barbero no pertenece a este negocio.",
      };
    }
    const existing = this.getAppointment(payload.barberId, payload.date, payload.time, negocioId);
    if (existing && existing.status !== "available") {
      return {
        ok: false,
        code: "slot_taken",
        message: "Este horario ya no esta disponible. Por favor selecciona otro.",
      };
    }

    const appointment = {
      id: uid("apt"),
      negocioId,
      source: "public",
      weekKey: getWeekKey(dateAnchor(payload.date)),
      clientName: payload.clientName || "",
      whatsapp: payload.whatsapp || "",
      ...payload,
    };

    if (!this.supabase) {
      this.upsertAppointment(appointment);
      return { ok: true, appointment };
    }

    const { data: remoteExisting, error: remoteLookupError } = await this.supabase
      .from("appointments")
      .select("id,status")
      .eq("business_id", negocioId)
      .eq("barber_id", payload.barberId)
      .eq("date", payload.date)
      .eq("time", payload.time)
      .limit(1);

    if (remoteLookupError) throw remoteLookupError;

    if ((remoteExisting || []).length) {
      return {
        ok: false,
        code: "slot_taken",
        message: "Este horario ya no esta disponible. Por favor selecciona otro.",
      };
    }

    const { error: insertError } = await this.supabase
      .from("appointments")
      .insert(mapAppointmentToRow(appointment));

    if (insertError) {
      if (insertError.code === "23505") {
        return {
          ok: false,
          code: "slot_taken",
          message: "Este horario ya no esta disponible. Por favor selecciona otro.",
        };
      }
      throw insertError;
    }

    this.state.appointments.push(appointment);
    this.invalidateBusinessBuckets();
    invalidateDerivedBusinessCache();
    this.state = this.stateWithRuntimeScope(this.state);
    persistAppStateSnapshot(this.state);
    const localEvent = { type: "INSERT", table: "appointments", record: appointment, source: "public_remote_safe" };
    this.emit(localEvent);
    this.channel?.postMessage(localEvent);
    return { ok: true, appointment };
  }

  deleteAppointment(id, negocioId = currentBusinessId()) {
    this.state.appointments = this.state.appointments.filter(
      (item) => !(item.id === id && item.negocioId === negocioId)
    );
    this.persist({ type: "DELETE", table: "appointments", id, businessId: negocioId });
  }

  deleteBarber(id, negocioId = currentBusinessId()) {
    this.state.barbers = this.state.barbers.filter(
      (barber) => !(barber.id === id && barber.negocioId === negocioId)
    );
    this.state.appointments = this.state.appointments.filter(
      (item) => !(item.barberId === id && item.negocioId === negocioId)
    );
    this.state.blockedDays = this.state.blockedDays.filter(
      (item) => !(item.barberId === id && item.negocioId === negocioId)
    );
    this.state.barberServices = this.state.barberServices.filter(
      (item) => !(item.barberId === id && item.negocioId === negocioId)
    );
    this.persist({ type: "DELETE", table: "barbers", id, businessId: negocioId });
  }

  saveBarber(payload, options = {}) {
    const businessId = payload.negocioId || currentWritableBusinessId() || currentBusinessId();
    if (payload.id) {
      this.state.barbers = this.state.barbers.map((barber) =>
        barber.id === payload.id && barber.negocioId === businessId
          ? { ...barber, ...payload, negocioId: businessId }
          : barber
      );
      this.persist({
        type: "UPDATE",
        table: "barbers",
        record: this.state.barbers.find((barber) => barber.id === payload.id && barber.negocioId === businessId),
        skipRemote: Boolean(options.skipRemote),
      });
      return this.state.barbers.find((barber) => barber.id === payload.id && barber.negocioId === businessId);
    }

    const { id, ...barberPayload } = payload;
    const created = {
      id: uid("barber"),
      negocioId: businessId,
      gradient: avatarGradients[this.state.barbers.length % avatarGradients.length],
      photo: "",
      active: true,
      specialty: "Servicio premium",
      ...barberPayload,
    };
    this.state.barbers.push(created);
    this.persist({ type: "INSERT", table: "barbers", record: created, skipRemote: Boolean(options.skipRemote) });
    return created;
  }

  blockDay(barberId, date) {
    if (!this.barberBelongsToBusiness(barberId, currentBusinessId())) return;
    if (!this.isDayBlocked(barberId, date)) {
      const record = { id: uid("day"), negocioId: currentBusinessId(), barberId, date };
      this.state.blockedDays.push(record);
      this.persist({ type: "INSERT", table: "blocked_days", record });
    }
  }

  unblockDay(barberId, date) {
    if (!this.barberBelongsToBusiness(barberId, currentBusinessId())) return;
    this.state.blockedDays = this.state.blockedDays.filter(
      (item) => !(item.barberId === barberId && item.date === date && item.negocioId === currentBusinessId())
    );
    this.persist({ type: "DELETE", table: "blocked_days", record: { barberId, date, negocioId: currentBusinessId() } });
  }

  blockAvailableSlots(barberId, date) {
    if (!this.barberBelongsToBusiness(barberId, currentBusinessId())) return;
    slotsForBusiness(currentBusinessId()).forEach((time) => {
      if (!this.getAppointment(barberId, date, time)) {
        this.upsertAppointment({
          barberId,
          date,
          time,
          status: "blocked",
          blockOrigin: "day_complete",
          clientName: "Bloqueo operativo",
          whatsapp: "",
          source: "admin",
        });
      }
    });
  }

  unblockBlockedSlots(barberId, date) {
    if (!this.barberBelongsToBusiness(barberId, currentBusinessId())) return;
    const blocked = this.state.appointments.filter(
      (item) =>
        item.barberId === barberId &&
        item.date === date &&
        item.status === "blocked" &&
        item.blockOrigin === "day_complete" &&
        item.negocioId === currentBusinessId()
    );
    blocked.forEach((item) => this.deleteAppointment(item.id, item.negocioId));
    this.unblockDay(barberId, date);
  }

  saveService(payload, options = {}) {
    const businessId = payload.negocioId || currentWritableBusinessId() || currentBusinessId();
    if (payload.id) {
      const currentService =
        this.state.services.find((service) => service.id === payload.id && service.negocioId === businessId) || null;
      const nextPayload = {
        ...payload,
        negocioId: businessId,
        serviceIconId:
          Object.prototype.hasOwnProperty.call(payload, "serviceIconId")
            ? payload.serviceIconId || ""
            : currentService?.serviceIconId || "",
      };
      this.state.services = this.state.services.map((service) =>
        service.id === payload.id && service.negocioId === businessId
          ? { ...service, ...nextPayload }
          : service
      );
      this.persist({
        type: "UPDATE",
        table: "services",
        record: this.state.services.find((service) => service.id === payload.id && service.negocioId === businessId),
        skipRemote: Boolean(options.skipRemote),
      });
      return this.state.services.find((service) => service.id === payload.id && service.negocioId === businessId);
    }

    const created = {
      id: uid("service"),
      negocioId: businessId,
      active: true,
      ...payload,
    };
    this.state.services.push(created);
    this.persist({ type: "INSERT", table: "services", record: created, skipRemote: Boolean(options.skipRemote) });
    return created;
  }

  deleteService(id, negocioId = currentBusinessId()) {
    this.state.services = this.state.services.filter(
      (service) => !(service.id === id && service.negocioId === negocioId)
    );
    this.state.barberServices = this.state.barberServices.filter(
      (item) => !(item.serviceId === id && item.negocioId === negocioId)
    );
    this.persist({ type: "DELETE", table: "services", id, businessId: negocioId });
  }

  getBarberServiceIds(barberId, negocioId = currentBusinessId()) {
    return this.state.barberServices
      .filter((item) => item.barberId === barberId && item.active && item.negocioId === negocioId)
      .map((item) => item.serviceId);
  }

  saveBarberServices(barberId, serviceIds, negocioId = currentWritableBusinessId() || currentBusinessId(), options = {}) {
    const uniqueIds = [...new Set((serviceIds || []).filter(Boolean))];
    this.state.barberServices = this.state.barberServices.filter(
      (item) => !(item.barberId === barberId && item.negocioId === negocioId)
    );
    const records = uniqueIds.map((serviceId) => ({
      id: uid("barber_service"),
      negocioId,
      barberId,
      serviceId,
      active: true,
    }));
    this.state.barberServices.push(...records);
    this.persist({
      type: "REPLACE",
      table: "barber_services",
      barberId,
      businessId: negocioId,
      records,
      skipRemote: Boolean(options.skipRemote),
    });
    return records;
  }
}

let app = null;
const store = new StudioStore();
if (typeof window !== "undefined") {
  window.__studioStore = store;
  delete window.__studioStoreBootstrap;
}

function runtimeStore() {
  if (typeof window === "undefined") return null;
  return window.__studioStore || window.__studioStoreBootstrap || null;
}

disableTemporaryPerformanceDiagnostics();
const ADMIN_SESSION_KEY = "barber-delux-admin-session";
const BARBER_SESSION_KEY = "noxora-barber-session";
const ADMIN_ACCOUNTS_KEY = "barber-delux-admin-accounts-v1";
const BUSINESS_ENV_ATTACHMENTS_KEY = "barber-delux-business-env-attachments-v1";
const VISUAL_NAV_STATE_KEY = "barber-delux-visual-nav-state-v1";
const SUPER_ADMIN_VISIBLE_PASSWORDS_KEY = "barber-delux-super-admin-visible-passwords-v1";
const SUPER_ADMIN_SESSION_KEY = "vision-barber-super-admin-session";
const DELETED_BUSINESSES_KEY = "barber-delux-deleted-businesses-v1";
const BACKGROUND_MEDIA_KEY = "barber-delux-background-media-v1";
const BACKGROUND_MEDIA_BY_BUSINESS_KEY = "barber-delux-background-media-by-business-v1";
const MULTITENANT_SECONDARY_PURGE_KEY = "barber-delux-secondary-business-purge-v1";
const SOUND_PREF_KEY = "barber-delux-sound-enabled";
const DEVICE_ID_KEY = "barber-delux-device-id-v1";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000;
const SESSION_IDLE_TTL_MS = 45 * 60 * 1000;
const SESSION_HEARTBEAT_MS = 60 * 1000;
const REMOTE_SESSION_VALIDATE_MS = 45 * 1000;
const REMOTE_SESSION_HEARTBEAT_MS = 90 * 1000;
const ACTIVE_SESSIONS_TABLE = "active_sessions";
const EMPTY_BUSINESS_DATA_REFRESH_COOLDOWN_MS = 12 * 1000;
const EMPTY_BUSINESS_DATA_LOADING_MS = 3500;
const PUBLIC_SERVICES_LOADING_MS = 2000;
const AUTH_ATTEMPTS_KEY = "barber-delux-auth-attempts-v1";
const AUTH_WINDOW_MS = 15 * 60 * 1000;
const AUTH_BLOCK_MS = 20 * 60 * 1000;
const AUTH_MAX_ATTEMPTS = 5;
const MAX_BACKGROUND_VIDEO_BYTES = 10 * 1024 * 1024;
const MAX_ENV_ARCHIVE_BYTES = 25 * 1024 * 1024;
const MAX_SERVICE_ICON_BYTES = 1 * 1024 * 1024;
const DEFAULT_BACKGROUND_VIDEO = {
  type: "video",
  src: "/assets/v2_watermarked-a5df2acc-b2b0-45a5-9132-e0006456c345.mp4",
};
// Legacy role label kept only to preserve compatibility in old admin records
// and UI guards while Vision Barber continues behaving as a normal tenant.
const PRINCIPAL_ADMIN_ROLE = "administrador_principal";
const remoteSessionMonitorState = {
  super_admin: { validating: false, lastValidatedAt: 0, lastHeartbeatAt: 0, lastToken: "" },
  admin: { validating: false, lastValidatedAt: 0, lastHeartbeatAt: 0, lastToken: "" },
  barber: { validating: false, lastValidatedAt: 0, lastHeartbeatAt: 0, lastToken: "" },
};
const RESOURCE_VIEW_KEYS = ["barbers", "services", "appointments"];

function resolveRoute(pathname = location.pathname) {
  const parts = pathname.split("/").filter(Boolean);
  const routeSlug = (index) => slugify(decodeURIComponent(parts[index] || "")) || DEFAULT_BUSINESS_SLUG;
  if (parts[0] === "super-admin" || parts[0] === "admin-global") {
    return { view: "super-admin", businessSlug: "", shell: "super-admin" };
  }
  if (parts[0] === "barberia-test" && parts[1]) {
    return { view: "business-test", businessSlug: routeSlug(1) };
  }
  if (parts[0] === "panel" && parts[1]) {
    const params = new URLSearchParams(location.search);
    return { view: params.get("modo") === "barbero" ? "barber" : "admin", businessSlug: routeSlug(1), shell: "internal" };
  }
  if (parts[0] === "admin" && parts[1]) {
    return { view: "admin", businessSlug: routeSlug(1), shell: "internal" };
  }
  if (parts[0] === "barbero" && parts[1]) {
    return { view: "barber", businessSlug: routeSlug(1), shell: "internal" };
  }
  if ((parts[0] === "barberia" || parts[0] === "negocio") && parts[1]) {
    return { view: "public", businessSlug: routeSlug(1), shell: "public" };
  }
  // Legacy routes remain here only so the router understands old links before
  // canonical redirection normalizes them to explicit /panel/:slug paths.
  if (pathname === "/admin-vip") return { view: "admin", businessSlug: DEFAULT_BUSINESS_SLUG, shell: "internal" };
  if (pathname === "/gestion-equipo") return { view: "barber", businessSlug: DEFAULT_BUSINESS_SLUG, shell: "internal" };
  return { view: "public", businessSlug: DEFAULT_BUSINESS_SLUG, shell: "public" };
}

function canonicalLegacyPath(pathname = location.pathname, search = location.search) {
  const normalizedPath = String(pathname || "/").replace(/\/+$/, "") || "/";
  // Legacy entrypoints are redirected to explicit tenant URLs so they no
  // longer act as runtime bootstrap paths by themselves.
  if (normalizedPath === "/") return `/barberia/${DEFAULT_BUSINESS_SLUG}`;
  if (normalizedPath === "/admin-vip") return `/panel/${DEFAULT_BUSINESS_SLUG}?modo=admin`;
  if (normalizedPath === "/gestion-equipo") return `/panel/${DEFAULT_BUSINESS_SLUG}?modo=barbero`;
  return "";
}

function ensureCanonicalLegacyPath() {
  if (typeof history === "undefined" || typeof location === "undefined") return false;
  const canonicalPath = canonicalLegacyPath(location.pathname, location.search);
  if (!canonicalPath) return false;
  const currentPath = `${location.pathname}${location.search || ""}`;
  if (currentPath === canonicalPath) return false;
  history.replaceState(null, "", canonicalPath);
  return true;
}

function loadAdminAccounts() {
  const raw = localStorage.getItem(ADMIN_ACCOUNTS_KEY);
  let accounts = [];
  try {
    accounts = raw ? JSON.parse(raw) : [];
  } catch {
    accounts = [];
  }

  return accounts.map((account) => ({
    ...account,
    password: "",
  }));
}

function adminAccountsForBusiness(businessId = currentBusinessId()) {
  return loadAdminAccounts().filter((account) => account.businessId === businessId);
}

function saveAdminAccounts(accounts) {
  const normalized = accounts
    .map((account) => ({
      ...account,
      password: "",
    }));
  localStorage.setItem(ADMIN_ACCOUNTS_KEY, JSON.stringify(normalized));
}

function upsertLocalAdminAccount(account) {
  if (!account?.id) return null;
  const visiblePassword = String(account.password || "").trim();
  const normalizedAccount = {
    id: account.id,
    businessId: account.businessId || currentBusinessId() || DEFAULT_BUSINESS_ID,
    businessSlug: account.businessSlug || currentBusiness()?.slug || "",
    name: account.name || "",
    user: account.user || "",
    password: "",
    passwordHash: account.passwordHash || "",
    role: account.role || "admin_negocio",
    active: account.active !== false,
    createdAt: account.createdAt || todayISO(),
  };
  const existing = loadAdminAccounts();
  const nextAccounts = existing.some((item) => item.id === normalizedAccount.id)
      ? existing.map((item) => (item.id === normalizedAccount.id ? { ...item, ...normalizedAccount } : item))
      : [...existing, normalizedAccount];
  saveAdminAccounts(nextAccounts);
  if (visiblePassword) {
    setVisibleAdminPassword(normalizedAccount.id, {
      businessId: normalizedAccount.businessId,
      businessName: store?.businessById?.(normalizedAccount.businessId)?.name || currentBusiness()?.name || "Barberia",
      user: normalizedAccount.user,
      password: visiblePassword,
    });
  }
  return normalizedAccount;
}

function loadVisibleAdminPasswords() {
  if (typeof window === "undefined") return {};
  return window.__superAdminVisiblePasswords || {};
}

function saveVisibleAdminPasswords(map) {
  if (typeof window === "undefined") return;
  window.__superAdminVisiblePasswords = { ...(map || {}) };
  if (typeof app === "object" && app) {
    app.superAdminVisiblePasswords = window.__superAdminVisiblePasswords;
  }
}

function loadDeletedBusinessIds() {
  try {
    return new Set(JSON.parse(localStorage.getItem(DELETED_BUSINESSES_KEY) || "[]"));
  } catch {
    return new Set();
  }
}

function markBusinessDeleted(businessId) {
  if (!businessId || businessId === DEFAULT_BUSINESS_ID) return;
  const deleted = loadDeletedBusinessIds();
  deleted.add(businessId);
  localStorage.setItem(DELETED_BUSINESSES_KEY, JSON.stringify([...deleted]));
}

function setVisibleAdminPassword(accountId, payload) {
  const map = loadVisibleAdminPasswords();
  if (!payload) {
    delete map[accountId];
  } else {
    map[accountId] = {
      ...payload,
      updatedAt: new Date().toISOString(),
    };
  }
  saveVisibleAdminPasswords(map);
}

function visibleAdminPassword(accountId) {
  return loadVisibleAdminPasswords()[accountId] || null;
}

function adminPasswordValue(account) {
  if (!account?.id) return "";
  const visible = visibleAdminPassword(account.id);
  if (visible?.password) return visible.password;
  return String(account.password || "");
}

function isAdminPasswordVisible(accountId) {
  return Boolean(app?.superAdminPasswordVisibility?.[accountId]);
}

function setAdminPasswordVisibility(accountId, visible) {
  if (!accountId || !app) return;
  app.superAdminPasswordVisibility = {
    ...(app.superAdminPasswordVisibility || {}),
    [accountId]: Boolean(visible),
  };
}

function readStoredJSON(storage, key) {
  if (!storage || !key) return null;
  try {
    const raw = storage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function randomSessionToken(prefix = "session") {
  if (window.crypto?.randomUUID) return `${prefix}_${window.crypto.randomUUID()}`;
  const random = window.crypto?.getRandomValues
    ? [...window.crypto.getRandomValues(new Uint32Array(4))].map((value) => value.toString(16)).join("")
    : Math.random().toString(16).slice(2);
  return `${prefix}_${Date.now().toString(36)}_${random}`;
}

function persistentStorage() {
  return window.localStorage;
}

function getDeviceId() {
  try {
    const storage = persistentStorage();
    const existing = storage.getItem(DEVICE_ID_KEY);
    if (existing) return existing;
    const nextDeviceId = randomSessionToken("device");
    storage.setItem(DEVICE_ID_KEY, nextDeviceId);
    return nextDeviceId;
  } catch {
    return "device_unavailable";
  }
}

function normalizePersistentSession(session, context = {}) {
  if (!session) return null;
  const role = context.role || session.role || "session";
  const businessSlug = context.businessSlug || session.businessSlug || DEFAULT_BUSINESS_SLUG;
  const businessId = context.businessId || session.businessId || "";
  const now = new Date().toISOString();
  return {
    ...session,
    role,
    businessSlug,
    businessId,
    token: session.token || randomSessionToken(role),
    deviceId: session.deviceId || getDeviceId(),
    startedAt: session.startedAt || now,
    lastSeenAt: session.lastSeenAt || now,
    fingerprint: buildSessionFingerprint(role, businessSlug, businessId),
  };
}

function loadSuperAdminSession() {
  const stored = readStoredJSON(localStorage, SUPER_ADMIN_SESSION_KEY) || readStoredJSON(sessionStorage, SUPER_ADMIN_SESSION_KEY);
  const normalized = normalizePersistentSession(stored, { role: "super_admin", businessSlug: DEFAULT_BUSINESS_SLUG });
  if (normalized) saveSuperAdminSession(normalized);
  return normalized;
}

function saveSuperAdminSession(session) {
  if (!session) return;
  const normalized = normalizePersistentSession(session, { role: "super_admin", businessSlug: DEFAULT_BUSINESS_SLUG });
  localStorage.setItem(SUPER_ADMIN_SESSION_KEY, JSON.stringify(normalized));
  sessionStorage.removeItem(SUPER_ADMIN_SESSION_KEY);
}

function clearSuperAdminSession() {
  localStorage.removeItem(SUPER_ADMIN_SESSION_KEY);
  sessionStorage.removeItem(SUPER_ADMIN_SESSION_KEY);
}

function businessScopedSessionKey(baseKey, businessSlug = DEFAULT_BUSINESS_SLUG) {
  const slug = String(businessSlug || DEFAULT_BUSINESS_SLUG).trim().toLowerCase() || DEFAULT_BUSINESS_SLUG;
  return `${baseKey}:${slug}`;
}

function normalizeBusinessSlugKey(businessSlug = DEFAULT_BUSINESS_SLUG) {
  return String(businessSlug || DEFAULT_BUSINESS_SLUG).trim().toLowerCase() || DEFAULT_BUSINESS_SLUG;
}

function sessionMatchesBusinessScope(session, businessSlug = DEFAULT_BUSINESS_SLUG, businessId = "") {
  if (!session) return false;
  const requestedSlug = normalizeBusinessSlugKey(businessSlug);
  const sessionSlug = normalizeBusinessSlugKey(session.businessSlug || session.slug || "");
  if (sessionSlug && sessionSlug !== requestedSlug) return false;
  if (businessId && session.businessId && String(session.businessId) !== String(businessId)) return false;
  return true;
}

function visualRouteKey(view = app.view, businessSlug = app.currentBusinessSlug) {
  return `${view || "public"}:${String(businessSlug || DEFAULT_BUSINESS_SLUG).trim().toLowerCase()}`;
}

function readVisualNavState() {
  return readStoredJSON(sessionStorage, VISUAL_NAV_STATE_KEY) || {};
}

function writeVisualNavState(routeKey, state) {
  const all = readVisualNavState();
  all[routeKey] = {
    ...(all[routeKey] || {}),
    ...state,
    updatedAt: new Date().toISOString(),
  };
  sessionStorage.setItem(VISUAL_NAV_STATE_KEY, JSON.stringify(all));
}

function stateFromCurrentUrl() {
  const params = new URLSearchParams(location.search);
  return {
    superBusinessId: params.get("negocio") || "",
    superCreateOpen: params.get("crear") || "",
    adminView: params.get("section") || "",
    adminOpenPanel: params.get("panel") || "",
    adminBarberId: params.get("barbero") || "",
    barberScheduleView: params.get("vista") || "",
    barberDate: params.get("fecha") || "",
    publicStep: params.get("step") || "",
  };
}

function applyVisualRouteState() {
  const routeKey = visualRouteKey();
  if (app.lastVisualRouteKey === routeKey) return;
  app.lastVisualRouteKey = routeKey;
  const saved = readVisualNavState()[routeKey] || {};
  const fromUrl = stateFromCurrentUrl();
  const state = { ...saved, ...Object.fromEntries(Object.entries(fromUrl).filter(([, value]) => value)) };

  if (app.view === "super-admin" && state.superBusinessId) {
    app.superAdminOpenBusinessId = state.superBusinessId;
  }
  if (app.view === "super-admin" && state.superCreateOpen) {
    app.superAdminCreateOpen = state.superCreateOpen === "1";
  }
  if (app.view === "admin") {
    if (state.adminView) app.adminView = state.adminView;
    if (state.adminOpenPanel) app.adminOpenPanel = state.adminOpenPanel;
    if (state.adminBarberId) app.adminBarberId = state.adminBarberId;
  }
  if (app.view === "barber") {
    if (state.barberScheduleView) app.barberScheduleView = state.barberScheduleView;
    if (state.barberDate) app.barberDate = state.barberDate;
  }
}

function persistVisualRouteState() {
  const routeKey = visualRouteKey();
  const state = {
    superBusinessId: app.superAdminOpenBusinessId || "",
    superCreateOpen: app.superAdminCreateOpen ? "1" : "",
    adminView: app.adminView || "",
    adminOpenPanel: app.adminOpenPanel || "",
    adminBarberId: app.adminBarberId || "",
    barberScheduleView: app.barberScheduleView || "",
    barberDate: app.barberDate || "",
    publicStep: app.selectedSlot ? "confirmacion" : app.publicDaySelected ? "hora" : app.selectedBarberId ? "fecha" : app.selectedServiceId ? "barbero" : "servicio",
  };
  writeVisualNavState(routeKey, state);

  const params = new URLSearchParams();
  if (routeShellType() === "internal") params.set("modo", app.view === "barber" ? "barbero" : "admin");
  if (app.view === "super-admin" && state.superBusinessId) params.set("negocio", state.superBusinessId);
  if (app.view === "super-admin" && state.superCreateOpen) params.set("crear", "1");
  if (app.view === "admin") {
    if (state.adminView && state.adminView !== "home") params.set("section", state.adminView);
    if (state.adminOpenPanel) params.set("panel", state.adminOpenPanel);
    if (state.adminBarberId) params.set("barbero", state.adminBarberId);
  }
  if (app.view === "barber") {
    if (state.barberScheduleView && state.barberScheduleView !== "hours") params.set("vista", state.barberScheduleView);
    if (state.barberDate && state.barberDate !== todayISO()) params.set("fecha", state.barberDate);
  }
  if (app.view === "public" && state.publicStep && state.publicStep !== "servicio") params.set("step", state.publicStep);
  const nextUrl = `${location.pathname}${params.toString() ? `?${params}` : ""}`;
  if (`${location.pathname}${location.search}` !== nextUrl) {
    history.replaceState(null, "", nextUrl);
  }
}

function detectDeviceProfile() {
  const width = window.innerWidth || document.documentElement.clientWidth || 1024;
  const coarsePointer = window.matchMedia?.("(pointer: coarse)")?.matches || false;
  if (width <= 760) return { type: "mobile", touch: coarsePointer };
  if (width <= 1100 || coarsePointer) return { type: "tablet", touch: coarsePointer };
  return { type: "desktop", touch: coarsePointer };
}

function applyDeviceProfile() {
  const profile = detectDeviceProfile();
  if (document.body.dataset.device === profile.type && document.body.dataset.touch === String(profile.touch)) {
    return false;
  }
  document.body.dataset.device = profile.type;
  document.body.dataset.touch = String(profile.touch);
  return true;
}

function loadScopedBusinessSession(baseKey, businessSlug, legacyKey = baseKey) {
  const scopedKey = businessScopedSessionKey(baseKey, businessSlug);
  const scoped = readStoredJSON(localStorage, scopedKey) || readStoredJSON(sessionStorage, scopedKey);
  const legacyScoped = !scoped && legacyKey ? readStoredJSON(localStorage, legacyKey) || readStoredJSON(sessionStorage, legacyKey) : null;
  const requestedSlug = normalizeBusinessSlugKey(businessSlug);
  const scopedSource =
    (sessionMatchesBusinessScope(scoped, requestedSlug) ? scoped : null) ||
    (sessionMatchesBusinessScope(legacyScoped, requestedSlug) ? legacyScoped : null);
  if (!scopedSource) return null;
  const role = baseKey === BARBER_SESSION_KEY ? "barber" : "admin";
  const normalized = normalizePersistentSession(scopedSource, {
    role,
    businessSlug,
    businessId: scopedSource.businessId || "",
  });
  saveScopedBusinessSession(baseKey, businessSlug, normalized, legacyKey);
  return normalized;
}

function saveScopedBusinessSession(baseKey, businessSlug, value, legacyKey = baseKey) {
  const role = baseKey === BARBER_SESSION_KEY ? "barber" : "admin";
  const normalized = normalizePersistentSession(value, {
    role,
    businessSlug,
    businessId: value?.businessId || "",
  });
  localStorage.setItem(businessScopedSessionKey(baseKey, businessSlug), JSON.stringify(normalized));
  if (legacyKey) {
    const legacyLocal = readStoredJSON(localStorage, legacyKey);
    const legacySession = readStoredJSON(sessionStorage, legacyKey);
    if (sessionMatchesBusinessScope(legacyLocal, businessSlug, normalized.businessId)) {
      localStorage.removeItem(legacyKey);
    }
    if (sessionMatchesBusinessScope(legacySession, businessSlug, normalized.businessId)) {
      sessionStorage.removeItem(legacyKey);
    }
  }
  sessionStorage.removeItem(businessScopedSessionKey(baseKey, businessSlug));
}

function clearScopedBusinessSession(baseKey, businessSlug, legacyKey = baseKey) {
  localStorage.removeItem(businessScopedSessionKey(baseKey, businessSlug));
  sessionStorage.removeItem(businessScopedSessionKey(baseKey, businessSlug));
  if (legacyKey) {
    const legacyLocal = readStoredJSON(localStorage, legacyKey);
    const legacySession = readStoredJSON(sessionStorage, legacyKey);
    if (sessionMatchesBusinessScope(legacyLocal, businessSlug)) {
      localStorage.removeItem(legacyKey);
    }
    if (sessionMatchesBusinessScope(legacySession, businessSlug)) {
      sessionStorage.removeItem(legacyKey);
    }
  }
}

function buildSessionFingerprint(role = "session", businessSlug = DEFAULT_BUSINESS_SLUG, businessId = "") {
  const host = window.location?.host || "local";
  const userAgent = window.navigator?.userAgent || "ua";
  return [
    String(role || "session").trim().toLowerCase(),
    String(businessSlug || DEFAULT_BUSINESS_SLUG).trim().toLowerCase(),
    String(businessId || "").trim().toLowerCase(),
    getDeviceId(),
    host,
    userAgent.slice(0, 160),
  ].join("|");
}

function isSessionExpired(session, context = {}) {
  if (!session) return false;
  if (session.deviceId && session.deviceId !== getDeviceId()) return true;
  const expectedFingerprint = buildSessionFingerprint(
    context.role || session.role || "session",
    context.businessSlug || session.businessSlug || DEFAULT_BUSINESS_SLUG,
    context.businessId || session.businessId || ""
  );
  return Boolean(session.fingerprint && expectedFingerprint && session.fingerprint !== expectedFingerprint);
}

function refreshSessionHeartbeat(baseKey, businessSlug, session, context = {}, legacyKey = baseKey) {
  if (!session) return null;
  const nextSession = {
    ...session,
    lastSeenAt: new Date().toISOString(),
    fingerprint: buildSessionFingerprint(
      context.role || session.role || "session",
      context.businessSlug || session.businessSlug || businessSlug || DEFAULT_BUSINESS_SLUG,
      context.businessId || session.businessId || ""
    ),
  };
  const previousHeartbeat = new Date(session.lastSeenAt || session.startedAt || 0).getTime();
  if (
    !Number.isFinite(previousHeartbeat) ||
    Date.now() - previousHeartbeat > SESSION_HEARTBEAT_MS ||
    nextSession.fingerprint !== session.fingerprint
  ) {
    if (baseKey === SUPER_ADMIN_SESSION_KEY) {
      saveSuperAdminSession(nextSession);
    } else {
      saveScopedBusinessSession(baseKey, businessSlug, nextSession, legacyKey);
    }
  }
  return nextSession;
}

function sessionMonitorFor(role = "admin") {
  return remoteSessionMonitorState[role] || remoteSessionMonitorState.admin;
}

function resetRemoteSessionMonitor(role = "admin", token = "") {
  const monitor = sessionMonitorFor(role);
  monitor.validating = false;
  monitor.lastValidatedAt = 0;
  monitor.lastHeartbeatAt = 0;
  monitor.lastToken = token || "";
}

function remoteSessionContext(kind, session = null) {
  const activeSession = session || (kind === "super_admin" ? app.superAdminSession : kind === "admin" ? app.adminSession : app.barberSession);
  if (!activeSession?.token) return null;
  const role = kind === "super_admin" ? "super_admin" : kind === "barber" ? "barber" : "admin";
  const businessSlug = role === "super_admin" ? DEFAULT_BUSINESS_SLUG : activeSession.businessSlug || app.currentBusinessSlug || DEFAULT_BUSINESS_SLUG;
  const businessId = role === "super_admin" ? null : activeSession.businessId || currentBusinessId() || null;
  const userId = activeSession.id || (role === "super_admin" ? "super_admin" : "");
  const userLabel =
    role === "super_admin"
      ? activeSession.user || SUPER_ADMIN_USER
      : activeSession.name || activeSession.user || userId;
  if (!userId) return null;
  return {
    role,
    sessionToken: activeSession.token,
    deviceId: activeSession.deviceId || getDeviceId(),
    businessId,
    businessSlug,
    userId,
    userLabel,
    startedAt: activeSession.startedAt || new Date().toISOString(),
    lastSeenAt: activeSession.lastSeenAt || new Date().toISOString(),
  };
}

function clearLocalSessionByKind(kind, { message = "" } = {}) {
  if (kind === "super_admin") {
    app.superAdminSession = null;
    app.superAdminLoginError = message || "";
    clearSuperAdminSession();
    resetRemoteSessionMonitor("super_admin");
    return;
  }
  if (kind === "admin") {
    app.adminSession = null;
    app.adminLoginError = message || "";
    clearScopedBusinessSession(ADMIN_SESSION_KEY, app.currentBusinessSlug);
    resetRemoteSessionMonitor("admin");
    return;
  }
  app.barberSession = null;
  app.barberLoginError = message || "";
  clearScopedBusinessSession(BARBER_SESSION_KEY, app.currentBusinessSlug);
  resetRemoteSessionMonitor("barber");
}

function remoteSessionClosedMessage(role = "admin") {
  if (role === "super_admin") {
    return "Tu sesion de Super Admin fue cerrada porque se inicio sesion en otro dispositivo.";
  }
  if (role === "barber") {
    return "Tu sesion de barbero fue cerrada porque se inicio sesion en otro dispositivo.";
  }
  return "Tu sesion administrativa fue cerrada porque se inicio sesion en otro dispositivo.";
}

function ensureRemoteSessionHealth(kind, session) {
  if (!store?.supabase || !session?.token) return;
  const context = remoteSessionContext(kind, session);
  if (!context) return;
  const monitor = sessionMonitorFor(context.role);
  if (monitor.lastToken !== context.sessionToken) {
    resetRemoteSessionMonitor(context.role, context.sessionToken);
  }
  if (monitor.validating) return;
  const now = Date.now();
  const needsValidation = !monitor.lastValidatedAt || now - monitor.lastValidatedAt >= REMOTE_SESSION_VALIDATE_MS;
  const needsHeartbeat = !monitor.lastHeartbeatAt || now - monitor.lastHeartbeatAt >= REMOTE_SESSION_HEARTBEAT_MS;
  if (!needsValidation && !needsHeartbeat) return;

  monitor.validating = true;
  Promise.resolve()
    .then(async () => {
      const validation = needsValidation
        ? await store.validateActiveSessionRemote(context)
        : { ok: true, active: true, skipped: false };
      monitor.lastValidatedAt = Date.now();
      if (validation?.skipped) {
        monitor.lastHeartbeatAt = Date.now();
        return;
      }
      if (!validation?.ok || validation?.active === false) {
        const currentContext = remoteSessionContext(kind);
        if (currentContext?.sessionToken === context.sessionToken) {
          clearLocalSessionByKind(kind, { message: validation?.message || remoteSessionClosedMessage(context.role) });
          scheduleRender();
        }
        return;
      }
      if (needsHeartbeat) {
        await store.touchActiveSessionRemote(context);
        monitor.lastHeartbeatAt = Date.now();
      }
    })
    .catch((error) => {
      console.warn("Remote session health skipped", error);
    })
    .finally(() => {
      monitor.validating = false;
    });
}

async function claimRemoteSession(kind, session) {
  const context = remoteSessionContext(kind, session);
  if (!context || !store?.supabase) return { ok: true, skipped: true };
  const result = await store.claimActiveSessionRemote(context);
  resetRemoteSessionMonitor(context.role, context.sessionToken);
  return result;
}

async function closeRemoteSession(kind, session, reason = "manual_logout") {
  const context = remoteSessionContext(kind, session);
  if (!context || !store?.supabase) return { ok: true, skipped: true };
  const result = await store.closeActiveSessionRemote(context, reason);
  resetRemoteSessionMonitor(context.role);
  return result;
}

function loadAuthAttempts() {
  return readStoredJSON(localStorage, AUTH_ATTEMPTS_KEY) || {};
}

function saveAuthAttempts(map) {
  localStorage.setItem(AUTH_ATTEMPTS_KEY, JSON.stringify(map || {}));
}

function authAttemptIdentity(role = "session", businessSlug = DEFAULT_BUSINESS_SLUG, user = "") {
  return [
    String(role || "session").trim().toLowerCase(),
    String(businessSlug || DEFAULT_BUSINESS_SLUG).trim().toLowerCase(),
    String(user || "").trim().toLowerCase(),
  ].join(":");
}

function readAuthAttemptState(role, businessSlug, user) {
  const key = authAttemptIdentity(role, businessSlug, user);
  const all = loadAuthAttempts();
  const record = all[key] || { failures: [], blockedUntil: "" };
  const now = Date.now();
  const failures = (record.failures || []).filter((value) => Number.isFinite(value) && now - value <= AUTH_WINDOW_MS);
  const blockedUntil = new Date(record.blockedUntil || 0).getTime();
  if (failures.length !== (record.failures || []).length || (!Number.isFinite(blockedUntil) && record.blockedUntil)) {
    all[key] = {
      failures,
      blockedUntil: Number.isFinite(blockedUntil) && blockedUntil > now ? new Date(blockedUntil).toISOString() : "",
    };
    saveAuthAttempts(all);
  }
  return {
    key,
    failures,
    blockedUntil: Number.isFinite(blockedUntil) && blockedUntil > now ? blockedUntil : 0,
  };
}

function remainingAuthBlockLabel(blockedUntil) {
  const remainingMs = Math.max(0, blockedUntil - Date.now());
  const totalMinutes = Math.ceil(remainingMs / 60000);
  return totalMinutes <= 1 ? "1 minuto" : `${totalMinutes} minutos`;
}

function registerFailedAuthAttempt(role, businessSlug, user) {
  const state = readAuthAttemptState(role, businessSlug, user);
  const all = loadAuthAttempts();
  const now = Date.now();
  const failures = [...state.failures, now].filter((value) => now - value <= AUTH_WINDOW_MS);
  const blockedUntil =
    failures.length >= AUTH_MAX_ATTEMPTS ? new Date(now + AUTH_BLOCK_MS).toISOString() : "";
  all[state.key] = { failures, blockedUntil };
  saveAuthAttempts(all);
  return {
    remainingAttempts: Math.max(0, AUTH_MAX_ATTEMPTS - failures.length),
    blockedUntil: blockedUntil ? new Date(blockedUntil).getTime() : 0,
  };
}

function clearAuthAttemptState(role, businessSlug, user) {
  const key = authAttemptIdentity(role, businessSlug, user);
  const all = loadAuthAttempts();
  if (!all[key]) return;
  delete all[key];
  saveAuthAttempts(all);
}

function authBlockMessage(roleLabel, blockedUntil) {
  return `${roleLabel} bloqueado temporalmente. Intenta de nuevo en ${remainingAuthBlockLabel(blockedUntil)}.`;
}

function loadBusinessEnvironmentAttachments() {
  const raw = localStorage.getItem(BUSINESS_ENV_ATTACHMENTS_KEY);
  try {
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveBusinessEnvironmentAttachments(attachments) {
  localStorage.setItem(BUSINESS_ENV_ATTACHMENTS_KEY, JSON.stringify(attachments || {}));
}

function businessEnvironmentAttachment(businessId) {
  return loadBusinessEnvironmentAttachments()[businessId] || null;
}

function archiveExtension(fileName = "") {
  const parts = String(fileName || "").toLowerCase().split(".");
  return parts.length > 1 ? parts.at(-1) : "";
}

function formatBytes(size = 0) {
  if (!size) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  let value = Number(size);
  let index = 0;
  while (value >= 1024 && index < units.length - 1) {
    value /= 1024;
    index += 1;
  }
  const fixed = value >= 10 || index === 0 ? 0 : 1;
  return `${value.toFixed(fixed)} ${units[index]}`;
}

function summarizeEnvironmentAttachment(meta) {
  if (!meta) return "Usara la plantilla base dinamica del sistema.";
  if (meta.mode === "dynamic_base") return "Usa la plantilla base dinamica del sistema.";
  const validationLabel =
    meta.validationMode === "zip_structure"
      ? "ZIP validado"
      : meta.validationMode === "rar_basic"
        ? "RAR aceptado"
        : "Adjunto validado";
  return `${validationLabel}: ${meta.fileName} · ${formatBytes(meta.size)}`;
}

async function validateEnvironmentArchive(file) {
  if (!file) {
    return { valid: false, error: "Debes seleccionar un archivo .zip o .rar." };
  }

  const extension = archiveExtension(file.name);
  if (!["zip", "rar"].includes(extension)) {
    return { valid: false, error: "Formato no permitido. Usa .zip o .rar." };
  }

  if (file.size > MAX_ENV_ARCHIVE_BYTES) {
    return { valid: false, error: "El archivo supera el tamano maximo de 25 MB." };
  }

  const baseMeta = {
    fileName: file.name,
    size: file.size,
    mimeType: file.type || "",
    extension,
    validatedAt: new Date().toISOString(),
  };

  if (extension === "rar") {
    return {
      valid: true,
      meta: {
        ...baseMeta,
        validationMode: "rar_basic",
        structureOk: true,
        notes: "Archivo RAR aceptado con validacion basica. Se recomienda ZIP para validacion estructural completa.",
      },
    };
  }

  if (!window.JSZip?.loadAsync) {
    return {
      valid: true,
      meta: {
        ...baseMeta,
        validationMode: "zip_basic",
        structureOk: true,
        notes: "ZIP aceptado con validacion basica.",
      },
    };
  }

  try {
    const zip = await window.JSZip.loadAsync(file);
    const entryNames = Object.keys(zip.files)
      .filter((name) => !zip.files[name].dir)
      .map((name) => name.replaceAll("\\", "/"));
    const requiredEntries = ["app.js", "index.html", "styles.css"];
    const hasRequiredEntries = requiredEntries.every((requiredName) =>
      entryNames.some((name) => name.toLowerCase().endsWith(requiredName))
    );

    if (!hasRequiredEntries) {
      return {
        valid: false,
        error: "El ZIP no parece un entorno valido. Debe incluir al menos app.js, index.html y styles.css.",
      };
    }

    return {
      valid: true,
      meta: {
        ...baseMeta,
        validationMode: "zip_structure",
        structureOk: true,
        entryCount: entryNames.length,
        sampleEntries: entryNames.slice(0, 6),
        notes: "ZIP validado correctamente como plantilla base.",
      },
    };
  } catch {
    return { valid: false, error: "No fue posible leer el ZIP. Verifica que no este danado." };
  }
}

function currentBusiness() {
  const activeApp = app && typeof app === "object" ? app : null;
  const activeStore = runtimeStore();
  if (activeApp?.view === "super-admin") {
    return neutralBootstrapBusiness();
  }
  const slug = String(activeApp?.currentBusinessSlug || DEFAULT_BUSINESS_SLUG).trim().toLowerCase() || DEFAULT_BUSINESS_SLUG;
  const resolution = activeStore?.businessResolution(slug) || null;
  const persistedBusinessRow = activeStore?.getPersistentBusinessIdentity?.(slug) || null;
  const persistedBusiness = persistedBusinessRow ? mapRowToBusiness(persistedBusinessRow) : null;
  return (
    requestedBusiness() ||
    resolution?.business ||
    persistedBusiness ||
    placeholderBusinessForSlug(slug)
  );
}

function visualBusinessSnapshot() {
  const slug = String(app?.currentBusinessSlug || "").trim().toLowerCase();
  const current = currentBusiness() || neutralBootstrapBusiness();
  app.lastValidBusinessBySlug = app.lastValidBusinessBySlug || {};
  if (slug && current && !isPlaceholderBusiness(current) && !current.isBootstrap) {
    app.lastValidBusinessBySlug[slug] = current;
    return current;
  }
  return (slug && app.lastValidBusinessBySlug[slug]) || current;
}

function requestedBusiness() {
  const activeApp = app && typeof app === "object" ? app : null;
  if (activeApp?.view === "super-admin") return null;
  const slug = String(activeApp?.currentBusinessSlug || "").trim().toLowerCase();
  const activeStore = runtimeStore();
  return activeStore?.businessBySlug(slug) || null;
}

function currentBusinessResolution() {
  const activeApp = app && typeof app === "object" ? app : null;
  if (activeApp?.view === "super-admin") {
    return { status: "idle", business: null };
  }
  const slug = String(activeApp?.currentBusinessSlug || DEFAULT_BUSINESS_SLUG).trim().toLowerCase() || DEFAULT_BUSINESS_SLUG;
  const activeStore = runtimeStore();
  if (!activeStore) {
    return { status: "idle", business: null };
  }
  const business = requestedBusiness();
  if (business) return { status: "success", business };
  const resolved = activeStore.businessResolution(slug);
  if (resolved) return resolved;
  return { status: "idle", business: null };
}

function ensureCurrentBusinessResolution() {
  if (requestedBusiness()) return;
  const activeApp = app && typeof app === "object" ? app : null;
  if (activeApp?.view === "super-admin") return;
  const slug = String(activeApp?.currentBusinessSlug || DEFAULT_BUSINESS_SLUG).trim().toLowerCase() || DEFAULT_BUSINESS_SLUG;
  const activeStore = runtimeStore();
  if (!activeStore) return;
  const resolution = activeStore.businessResolution(slug);
  if (resolution && resolution.status !== "idle") return;
  activeStore.resolveBusinessBySlug(slug).then(() => scheduleRender());
}

function currentBusinessId() {
  return currentBusinessResolution().business?.id || null;
}

function currentWritableBusinessId() {
  const activeStore = runtimeStore();
  const directBusiness = requestedBusiness();
  if (directBusiness?.id && !isPlaceholderBusiness(directBusiness)) return directBusiness.id;
  const resolvedBusiness = currentBusinessResolution().business;
  if (resolvedBusiness?.id && !isPlaceholderBusiness(resolvedBusiness)) return resolvedBusiness.id;
  const route = resolveRoute(location.pathname);
  const persistedBusinessRow = activeStore?.getPersistentBusinessIdentity?.(route.businessSlug || "") || null;
  const persistedBusiness = persistedBusinessRow ? mapRowToBusiness(persistedBusinessRow) : null;
  if (persistedBusiness?.id && !isPlaceholderBusiness(persistedBusiness)) return persistedBusiness.id;
  const cachedBusiness = activeStore?.businessBySlug(route.businessSlug || "");
  if (cachedBusiness?.id && !isPlaceholderBusiness(cachedBusiness)) return cachedBusiness.id;
  return null;
}

function currentDocumentTitle() {
  if (app.view === "super-admin") return "Super Admin | SaaS";
  const resolution = currentBusinessResolution();
  const scopedBusinessPending =
    Boolean(app.currentBusinessSlug && app.currentBusinessSlug !== DEFAULT_BUSINESS_SLUG) &&
    ["idle", "pending"].includes(resolution.status);
  if (scopedBusinessPending) return "Cargando negocio...";
  const businessName = resolution.business?.name || currentBusiness()?.name || "Barberia";
  if (app.view === "public" || app.view === "business-test") return `${businessName} | Reservas`;
  if (app.view === "admin" || app.view === "barber") return `${businessName} | Panel`;
  return businessName;
}

function expectedScopeForCurrentRoute() {
  const route = resolveRoute(location.pathname);
  if (route.view === "super-admin") return "super-admin:global";
  const business = requestedBusiness() || store.businessResolution(route.businessSlug)?.business || null;
  const scopeView = route.shell === "internal" ? "internal" : route.view;
  return `${scopeView}:${business?.id || "global"}:${route.businessSlug || DEFAULT_BUSINESS_SLUG}`;
}

function isCurrentBusinessLoading() {
  if (!store.supabase) return false;
  if (store.remoteLastError) return false;
  if (app.view === "super-admin") return store.remoteLoadedScopeKey !== expectedScopeForCurrentRoute() && !store.remoteReady;
  const route = resolveRoute(location.pathname);
  const hasResolvedBusiness = Boolean(requestedBusiness()) || Boolean(currentBusinessResolution().business);
  const resolution = currentBusinessResolution();
  if (!hasResolvedBusiness && (resolution.status === "idle" || resolution.status === "pending")) return true;
  if (route.shell === "internal") return !hasResolvedBusiness && !store.remoteReady;
  if (hasResolvedBusiness) return false;
  if (store.remoteAttemptedAt && Date.now() - store.remoteAttemptedAt > 8000) return false;
  return !store.remoteReady;
}

function businessBucketHasVisibleSetupData(businessId = currentBusinessId()) {
  if (!businessId) return false;
  const bucket = getBusinessBucket(businessId);
  return Boolean(bucket.barbers.length || bucket.services.length || bucket.barberServices.length);
}

function businessBucketHasAnyServices(businessId = currentBusinessId()) {
  if (!businessId) return false;
  return Boolean(getBusinessBucket(businessId).services.length);
}

function publicServicesLoadState(businessId = currentBusinessId()) {
  if (!store.supabase || !businessId || isPlaceholderBusiness(currentBusiness())) {
    return { loading: false, slow: false, error: "" };
  }
  if (businessBucketHasAnyServices(businessId)) {
    return { loading: false, slow: false, error: "" };
  }
  if (store.getCachedPublicServices(businessId)?.length) {
    return { loading: false, slow: false, error: "" };
  }
  if (store.remoteLastError) {
    return { loading: false, slow: false, error: store.remoteLastError };
  }
  const currentScopeLoaded =
    currentBusinessResolution().status === "success" &&
    store.remoteLoadedScopeKey === expectedScopeForCurrentRoute() &&
    !store.syncInFlight;
  if (currentScopeLoaded) {
    return { loading: false, slow: false, error: "" };
  }
  app.emptyBusinessDataRefreshAt = app.emptyBusinessDataRefreshAt || {};
  const now = Date.now();
  const lastAttempt = app.emptyBusinessDataRefreshAt[businessId] || 0;
  const businessResolved = currentBusinessResolution().status === "success";
  const recentlyRequested = lastAttempt && now - lastAttempt < EMPTY_BUSINESS_DATA_REFRESH_COOLDOWN_MS;
  if (!recentlyRequested) {
    app.emptyBusinessDataRefreshAt[businessId] = now;
    store.prefetchPublicServices(businessId, { force: true }).catch(() => {});
  }
  const elapsed = now - (app.emptyBusinessDataRefreshAt[businessId] || now);
  if (businessResolved && elapsed >= PUBLIC_SERVICES_LOADING_MS) {
    return { loading: false, slow: false, error: "" };
  }
  return {
    loading: elapsed < PUBLIC_SERVICES_LOADING_MS || (store.syncInFlight && elapsed < EMPTY_BUSINESS_DATA_LOADING_MS),
    slow: elapsed >= PUBLIC_SERVICES_LOADING_MS && store.syncInFlight,
    error: "",
  };
}

function requestBusinessDataRefreshIfEmpty(businessId = currentBusinessId(), component = "BusinessRender") {
  if (!store.supabase || !businessId || isPlaceholderBusiness(currentBusiness())) return false;
  if (businessBucketHasVisibleSetupData(businessId)) return false;
  app.emptyBusinessDataRefreshAt = app.emptyBusinessDataRefreshAt || {};
  const now = Date.now();
  const lastAttempt = app.emptyBusinessDataRefreshAt[businessId] || 0;
  if (!lastAttempt) {
    app.emptyBusinessDataRefreshAt[businessId] = now;
    store.invalidateStableBusinessCache(businessId);
    store.invalidateRemoteCache(businessId);
    store.queueRemoteSync({
      quiet: true,
      force: true,
      origin: "empty-business-data-refresh",
      component,
      hook: "requestBusinessDataRefreshIfEmpty",
    });
    return true;
  }
  const elapsed = now - lastAttempt;
  if (elapsed >= EMPTY_BUSINESS_DATA_LOADING_MS) return false;
  return true;
}

function isBusinessDataRefreshPending(businessId = currentBusinessId()) {
  if (!businessId || !app.emptyBusinessDataRefreshAt) return false;
  const startedAt = app.emptyBusinessDataRefreshAt[businessId] || 0;
  if (!startedAt) return false;
  return Date.now() - startedAt < EMPTY_BUSINESS_DATA_LOADING_MS;
}

function businessLoadingShell(title = "Preparando entorno") {
  return appShell(`
    <section class="admin-main business-component-loading">
      <div class="section-title"><span>S</span><h2>${escapeHTML(title)}</h2></div>
      <p class="microcopy">Sincronizando tema, logo, servicios, barberos y agenda del negocio...</p>
      <div class="business-component-skeleton"><span></span><span></span><span></span></div>
    </section>
  `);
}

function currentAdminAccountRecord() {
  if (!app.adminSession) return null;
  return (
    adminAccountsForBusiness(currentBusinessId()).find(
      (account) =>
        account.id === app.adminSession.id &&
        account.active &&
        account.user === app.adminSession.user
    ) || null
  );
}

function servicesForBusiness(businessId = currentBusinessId()) {
  return getServicesByBusiness(businessId);
}

function activeServicesForBusiness(businessId = currentBusinessId()) {
  return getServicesByBusiness(businessId, { activeOnly: true });
}

function parseShowPublicPricesSetting(source = null) {
  if (source === false) return false;
  if (source === true) return true;
  const normalized = String(source ?? "").trim().toLowerCase();
  if (["true", "1", "si", "yes"].includes(normalized)) return true;
  if (["false", "0", "no"].includes(normalized)) return false;
  return false;
}

function publicServiceIconsReady(services = []) {
  const requiredIconIds = [...new Set((services || []).map((service) => String(service.serviceIconId || "").trim()).filter(Boolean))];
  if (!requiredIconIds.length) return true;
  const availableIcons = new Set(cachedPublicServiceIcons().map((icon) => String(icon.id || "").trim()).filter(Boolean));
  return requiredIconIds.every((iconId) => availableIcons.has(iconId));
}

function publicServiceIconsLoadState(businessId = currentBusinessId(), services = []) {
  const requiredIconIds = [...new Set((services || []).map((service) => String(service.serviceIconId || "").trim()).filter(Boolean))];
  if (!requiredIconIds.length) {
    return { loading: false, slow: false };
  }
  if (publicServiceIconsReady(services)) {
    return { loading: false, slow: false };
  }
  const currentScopeLoaded =
    currentBusinessResolution().status === "success" &&
    store.remoteLoadedScopeKey === expectedScopeForCurrentRoute() &&
    !store.syncInFlight;
  if (currentScopeLoaded) {
    return { loading: false, slow: false };
  }
  app.emptyBusinessDataRefreshAt = app.emptyBusinessDataRefreshAt || {};
  const now = Date.now();
  const lastAttempt = app.emptyBusinessDataRefreshAt[businessId] || 0;
  const recentlyRequested = lastAttempt && now - lastAttempt < EMPTY_BUSINESS_DATA_REFRESH_COOLDOWN_MS;
  if (!recentlyRequested) {
    app.emptyBusinessDataRefreshAt[businessId] = now;
    store.prefetchPublicServices(businessId, { force: true }).catch(() => {});
  }
  const elapsed = now - (app.emptyBusinessDataRefreshAt[businessId] || now);
  return {
    loading: Boolean(store.publicServicesInFlight?.get(businessId)) || elapsed < PUBLIC_SERVICES_LOADING_MS,
    slow: elapsed >= PUBLIC_SERVICES_LOADING_MS,
  };
}

function publicPricesVisibleForBusiness(businessId = currentBusinessId()) {
  const settings = store.businessSettingsForBusiness(businessId);
  return settings.publicPricesResolved && settings.showPublicPrices === true;
}

function publicServicePriceMarkup(service, businessId = currentBusinessId()) {
  return publicPricesVisibleForBusiness(businessId) ? `<small>${formatCOP(service.value)}</small>` : "";
}

function publicServiceBadgeLabel(businessId = currentBusinessId()) {
  return "Servicio";
}

function businessWhatsappForBusiness(business = currentBusiness(), businessId = business?.id || currentBusinessId()) {
  const settings = store.businessSettingsForBusiness(businessId);
  const meta = settings?.meta || {};
  return moneylessPhone(
    business?.whatsapp ||
      business?.phone ||
      meta.whatsapp ||
      meta.phone ||
      meta.contactWhatsapp ||
      meta.contactPhone ||
      ""
  );
}

function renderBookingConfirmationDialog() {
  if (!app.bookingConfirmation) return "";
  const businessPhone = businessWhatsappForBusiness();
  return `<dialog id="booking-confirm-dialog">
    <div class="modal-card confirm-card booking-confirm-card booking-confirm-card-v2">
      <div class="booking-confirm-card-v2__hero">
        <div class="booking-confirm-card-v2__icon" aria-hidden="true">✓</div>
        <div class="booking-confirm-card-v2__copy">
          <h3>Reserva creada</h3>
          <p>Tu cita quedo registrada correctamente. Conserva este resumen para llegar con todo listo.</p>
        </div>
      </div>
      <div class="booking-confirm-card-v2__summary">
        <div class="booking-confirm-card-v2__row">
          <span>Barbero</span><strong>${escapeHTML(app.bookingConfirmation.barberName)}</strong>
        </div>
        <div class="booking-confirm-card-v2__row">
          <span>Servicio</span><strong>${escapeHTML(app.bookingConfirmation.serviceName)}</strong>
        </div>
        <div class="booking-confirm-card-v2__row">
          <span>Fecha</span><strong>${escapeHTML(app.bookingConfirmation.date)}</strong>
        </div>
        <div class="booking-confirm-card-v2__row">
          <span>Hora</span><strong>${escapeHTML(app.bookingConfirmation.range)}</strong>
        </div>
        <div class="booking-confirm-card-v2__row">
          <span>WhatsApp</span><strong>${escapeHTML(app.bookingConfirmation.whatsapp)}</strong>
        </div>
      </div>
      <div class="booking-confirm-card-v2__tips">
        <span class="booking-confirm-card-v2__tips-title">Recomendaciones</span>
        <p>Llega unos minutos antes, mantente atento al WhatsApp y usa este mismo chat si necesitas reprogramar.</p>
      </div>
      <div class="button-row booking-confirm-card-v2__actions">
        ${businessPhone ? `<a class="secondary-action booking-confirm-card-v2__whatsapp" href="https://wa.me/${businessPhone}" target="_blank" rel="noreferrer">Abrir WhatsApp</a>` : ""}
        <button class="primary-action booking-confirm-card-v2__close" type="button" data-close-booking-confirm>Entendido</button>
      </div>
    </div>
  </dialog>`;
}

function isReservableService(service = {}) {
  return parseActiveFlag(service.active, true) && Boolean(String(service.name || "").trim()) && Number(service.value) > 0;
}

function getServicesByBusiness(businessId = currentBusinessId(), options = {}) {
  const { activeOnly = false, reservableOnly = false } = options || {};
  const bucketServices = getBusinessBucket(businessId).services || [];
  const services =
    bucketServices.length || !(app.view === "public" || app.view === "business-test")
      ? bucketServices
      : store.getCachedPublicServices(businessId) || [];
  return services.filter((service) => {
    if (reservableOnly) return isReservableService(service);
    if (activeOnly) return parseActiveFlag(service.active, true);
    return true;
  });
}

function reservableServicesForBusiness(businessId = currentBusinessId()) {
  return getServicesByBusiness(businessId, { reservableOnly: true });
}

function barbersForBusiness(businessId = currentBusinessId()) {
  return getBusinessBucket(businessId).barbers;
}

async function sha256(value) {
  const encoded = new TextEncoder().encode(String(value || ""));
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function generateSecurePassword(length = 10) {
  const upper = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const lower = "abcdefghijkmnopqrstuvwxyz";
  const numbers = "23456789";
  const symbols = "@#$%&*!?";
  const all = `${upper}${lower}${numbers}${symbols}`;
  const picks = [
    upper[Math.floor(Math.random() * upper.length)],
    lower[Math.floor(Math.random() * lower.length)],
    numbers[Math.floor(Math.random() * numbers.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
  ];
  while (picks.length < length) {
    picks.push(all[Math.floor(Math.random() * all.length)]);
  }
  return picks.sort(() => Math.random() - 0.5).join("");
}

async function regenerateBarberPassword(barber) {
  const businessId = barber?.negocioId || currentBusinessId();
  if (!barber?.id || !businessId) {
    throw new Error("Barbero o negocio no valido.");
  }
  const generatedPassword = generateSecurePassword(10);
  const passwordHash = await sha256(generatedPassword);
  if (store.supabase) {
    const { data, error } = await store.supabase
      .from("barbers")
      .update({ password: "", password_hash: passwordHash })
      .eq("id", barber.id)
      .eq("business_id", businessId)
      .select("id,business_id")
      .maybeSingle();
    if (error) {
      console.error("Barber password regeneration failed", {
        barber_id: barber.id,
        business_id: businessId,
        field: "password_hash",
        error,
      });
      throw error;
    }
    if (!data?.id) {
      const noRowError = new Error("Supabase no devolvio el barbero actualizado.");
      console.error("Barber password regeneration updated no rows", {
        barber_id: barber.id,
        business_id: businessId,
        field: "password_hash",
        error: noRowError,
      });
      throw noRowError;
    }
  }
  const updated = store.saveBarber({
    ...barber,
    negocioId: businessId,
    password: "",
    passwordHash,
  });
  store.invalidateStableBusinessCache(businessId);
  store.invalidateRemoteCache(businessId);
  return { barber: updated, password: generatedPassword };
}

async function authenticateViaBackend(role, user, password, businessSlug = app.currentBusinessSlug) {
  try {
    const response = await fetch("/api/auth-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, user, password, businessSlug }),
    });
    const result = await response.json().catch(() => ({}));
    if (result?.fallback) return { ok: false, fallback: true, error: result.error || "" };
    if (!response.ok || !result?.ok) {
      return { ok: false, fallback: true, error: result?.error || "Credenciales invalidas." };
    }
    return { ok: true, ...result };
  } catch {
    return { ok: false, fallback: true, error: "" };
  }
}

async function deleteBusinessViaBackend(businessId, confirmation) {
  const response = await fetch("/api/delete-business", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      businessId,
      confirmation,
      superAdminUser: app.superAdminSession?.user || "",
      superAdminPasswordHash: app.superAdminSession?.token ? SUPER_ADMIN_PASSWORD_HASH : "",
    }),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.ok) {
    throw new Error(`${result.step ? `${result.step}: ` : ""}${result.error || "No fue posible eliminar la barberia en el servidor."}`);
  }
  return result;
}

function businessUrlSet(business) {
  const slug = business?.slug || DEFAULT_BUSINESS_SLUG;
  return {
    public: `${PRODUCTION_BASE_URL}/barberia/${slug}`,
    panel: `${PRODUCTION_BASE_URL}/panel/${slug}`,
    admin: `${PRODUCTION_BASE_URL}/panel/${slug}?modo=admin`,
    barber: `${PRODUCTION_BASE_URL}/panel/${slug}?modo=barbero`,
  };
}

function uniqueBusinessSlug(baseValue, excludeId = "") {
  const base = slugify(baseValue) || "barberia";
  const existing = new Set(
    store.state.businesses
      .filter((business) => business.id !== excludeId)
      .map((business) => business.slug)
  );
  if (!existing.has(base)) return base;
  let index = 2;
  while (existing.has(`${base}-${index}`)) {
    index += 1;
  }
  return `${base}-${index}`;
}

function seedBusinessFromTemplate(business) {
  return business;
}

async function findAdminAccount(user, password, businessId = null) {
  if (businessId && store?.supabase) {
    try {
      await store.syncAdminAccountsFromRemote(businessId);
    } catch (error) {
      console.warn("Admin accounts sync skipped", error);
    }
  }

  const candidates = loadAdminAccounts().filter(
    (account) =>
      account.active &&
      account.user === user &&
      (!businessId || account.businessId === businessId)
  );
  if (!candidates.length) return null;

  const normalizedUser = String(user || "").trim().toLowerCase();
  const passwordHash = await sha256(password);
  const hashedMatch =
    candidates.find(
      (account) =>
        String(account.user || "").trim().toLowerCase() === normalizedUser &&
        account.passwordHash &&
        account.passwordHash === passwordHash
    ) || null;
  if (hashedMatch) return hashedMatch;

  const legacyCandidates = candidates.filter((account) => !account.passwordHash);
  const legacyMatch =
    legacyCandidates.find(
      (account) =>
        String(account.user || "").trim().toLowerCase() === normalizedUser &&
        (
          (account.password && account.password === password) ||
          visibleAdminPassword(account.id)?.password === password
        )
    ) || null;
  if (!legacyMatch) return null;

  legacyMatch.passwordHash = passwordHash;
  legacyMatch.password = "";
  saveAdminAccounts(loadAdminAccounts().map((account) => (account.id === legacyMatch.id ? legacyMatch : account)));
  try {
    await store.upsertAdminAccountRemote(legacyMatch);
  } catch (error) {
    console.warn("Legacy admin hash upgrade skipped", error);
  }

  return legacyMatch;
}

async function findBarberAccount(user, password, businessId = currentBusinessId()) {
  const normalizedUser = String(user || "").trim().toLowerCase();
  const candidates = barbersForBusiness(businessId).filter(
    (barber) => barber.active && String(barber.user || "").trim().toLowerCase() === normalizedUser
  );
  if (!candidates.length) return null;

  const passwordHash = await sha256(password);
  const hashedMatch = candidates.find((barber) => barber.passwordHash && barber.passwordHash === passwordHash) || null;
  if (hashedMatch) return hashedMatch;

  const legacyMatch = candidates.find((barber) => barber.password && barber.password === password) || null;
  if (!legacyMatch) return null;

  legacyMatch.passwordHash = passwordHash;
  legacyMatch.password = "";
  store.saveBarber({
    ...legacyMatch,
    id: legacyMatch.id,
    negocioId: legacyMatch.negocioId || businessId,
    password: "",
    passwordHash,
  });
  return legacyMatch;
}

async function resolveLoginBarber(backendBarber, user, password, businessId = currentBusinessId()) {
  const localByBackendId = backendBarber?.id ? barberById(backendBarber.id, businessId) : null;
  if (localByBackendId) return localByBackendId;

  const localByPassword = await findBarberAccount(user, password, businessId);
  if (localByPassword) return localByPassword;

  if (backendBarber?.id && store?.supabase) {
    try {
      await store.syncFromRemote({
        quiet: true,
        origin: "barber-login-refresh",
        component: "resolveLoginBarber",
        hook: "login",
      });
      const refreshed = barberById(backendBarber.id, businessId);
      if (refreshed) return refreshed;
    } catch (error) {
      console.warn("Barber login refresh skipped", error);
    }
  }

  if (!backendBarber?.id) return null;
  const fallbackBarber = {
    id: backendBarber.id,
    negocioId: businessId,
    name: backendBarber.name || user || "Barbero",
    user: backendBarber.user || user,
    password: "",
    passwordHash: "",
    whatsapp: "",
    active: true,
    photo: "",
    gradient: avatarGradients[0],
    specialty: "Servicio premium",
  };
  store.state.barbers = [
    ...store.state.barbers.filter((barber) => !(barber.id === fallbackBarber.id && barber.negocioId === businessId)),
    fallbackBarber,
  ];
  store.state = store.stateWithRuntimeScope(store.state);
  persistAppStateSnapshot(store.state);
  return fallbackBarber;
}

function isPrincipalAdmin() {
  return app.adminSession?.role === PRINCIPAL_ADMIN_ROLE;
}

function loadBackgroundMediaMap() {
  const raw = localStorage.getItem(BACKGROUND_MEDIA_BY_BUSINESS_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function loadBackgroundMedia(businessId = DEFAULT_BUSINESS_ID) {
  const map = loadBackgroundMediaMap();
  if (map[businessId]) return map[businessId];
  if (businessId === DEFAULT_BUSINESS_ID) {
    const legacy = localStorage.getItem(BACKGROUND_MEDIA_KEY);
    if (legacy) {
      try {
        return JSON.parse(legacy);
      } catch {
        return DEFAULT_BACKGROUND_VIDEO;
      }
    }
    return DEFAULT_BACKGROUND_VIDEO;
  }
  return null;
}

function saveBackgroundMedia(media, businessId = currentBusinessId()) {
  const map = loadBackgroundMediaMap();
  if (!media) {
    delete map[businessId];
  } else {
    map[businessId] = media;
  }
  localStorage.setItem(BACKGROUND_MEDIA_BY_BUSINESS_KEY, JSON.stringify(map));
  if (businessId === DEFAULT_BUSINESS_ID) {
    if (!media) {
      localStorage.removeItem(BACKGROUND_MEDIA_KEY);
    } else {
      localStorage.setItem(BACKGROUND_MEDIA_KEY, JSON.stringify(media));
    }
  }
}

function refreshBackgroundPresentation({ rerender = false } = {}) {
  app.backgroundMedia = currentBackgroundMedia();
  ensurePersistentBackground();
  if (rerender) {
    render();
  } else {
    scheduleRender();
  }
}

function shouldRenderPublicBackgroundVideo() {
  const pathname = String(location?.pathname || "");
  return app.view === "public" && pathname.startsWith("/barberia/");
}

function currentBackgroundMedia() {
  const businessId = currentBusinessId();
  const slug = String(app?.currentBusinessSlug || "").trim().toLowerCase();
  const activeStore = runtimeStore();
  const settingsMedia = businessId
    ? activeStore?.businessSettingsForBusiness?.(businessId)?.meta?.backgroundMedia || null
    : null;
  const hasHydratedSettings = Boolean(businessId && activeStore?.businessSettingsByBusiness?.has?.(businessId));
  app.lastValidBackgroundBySlug = app.lastValidBackgroundBySlug || {};
  if (businessId) {
    const cachedMedia = loadBackgroundMedia(businessId);
    if (hasHydratedSettings) {
      if (settingsMedia) {
        saveBackgroundMedia(settingsMedia, businessId);
        if (slug) {
          app.lastValidBackgroundBySlug[slug] = settingsMedia;
        }
        return settingsMedia;
      }
      if (slug) {
        delete app.lastValidBackgroundBySlug[slug];
      }
      return null;
    }
    const media = cachedMedia;
    if (slug && media) {
      app.lastValidBackgroundBySlug[slug] = media;
    }
    return media || (slug ? app.lastValidBackgroundBySlug[slug] || null : null);
  }
  return slug ? app.lastValidBackgroundBySlug[slug] || null : null;
}

function loadSoundPreference() {
  return localStorage.getItem(SOUND_PREF_KEY) === "true";
}

ensureCanonicalLegacyPath();
const initialRoute = resolveRoute(location.pathname);

app = {
  route: initialRoute,
  view: initialRoute.view,
  currentBusinessSlug: initialRoute.businessSlug,
  selectedServiceId: "",
  selectedBarberId: "",
  selectedDate: store.state.meta.selectedDate,
  publicDaySelected: false,
  selectedSlot: "",
  bookingError: "",
  bookingSubmitting: false,
  bookingConfirmation: null,
  adminBarberId: "",
  adminView: "home",
  adminOpenPanel: "",
  adminScheduleView: "hours",
  adminSelectedSlots: [],
  adminModalMode: "reserved",
  adminServiceEditAppointmentId: "",
  adminSession: loadScopedBusinessSession(ADMIN_SESSION_KEY, initialRoute.businessSlug),
  superAdminSession: loadSuperAdminSession(),
  superAdminLoginError: "",
  superAdminMessage: "",
  superAdminCredentialReveal: null,
  superAdminVisiblePasswords: loadVisibleAdminPasswords(),
  superAdminPasswordVisibility: {},
  superAdminPendingLogos: {},
  superAdminPendingLogoFiles: {},
  superAdminPendingEnvironmentArchives: {},
  superAdminServiceIconDraft: null,
  superAdminServiceIconBusy: false,
  superAdminOpenBusinessId: "",
  superAdminDeleteTarget: null,
  superAdminDeleting: false,
  superAdminCreateOpen: false,
  superAdminView: "home",
  adminLoginError: "",
  adminAccountMessage: "",
  adminActionMessage: "",
  adminBarberMessage: "",
  adminServiceMessage: "",
  adminScheduleMessage: "",
  backgroundMedia: null,
  backgroundMessage: "",
  pendingBackgroundVideo: null,
  soundEnabled: loadSoundPreference(),
  barberDate: todayISO(),
  barberOpenPanel: "",
  barberScheduleView: "hours",
  barberSession: loadScopedBusinessSession(BARBER_SESSION_KEY, initialRoute.businessSlug),
  barberLoginError: "",
  lastEvent: "",
  lastVisualRouteKey: "",
};

function barberById(id, businessId = currentBusinessId()) {
  return getBusinessBucket(businessId).barbersById.get(id) || null;
}

function appointmentById(id, businessId = currentBusinessId()) {
  return getBusinessBucket(businessId).appointmentsById.get(id) || null;
}

function barberOwnsAgendaScope(barberId, businessId = currentBusinessId()) {
  return Boolean(barberById(barberId, businessId));
}

function businessSummaryById(businessId) {
  return store.state.meta?.businessSummaryById?.[businessId] || null;
}

function businessBarberCount(businessId) {
  const summary = businessSummaryById(businessId);
  if (summary) return summary.totalBarbers || 0;
  return getBusinessBucket(businessId).barbers.length;
}

function businessServiceCount(businessId) {
  const summary = businessSummaryById(businessId);
  if (summary) return summary.totalServices || 0;
  return getBusinessBucket(businessId).services.length;
}

function businessActiveServiceCount(businessId) {
  const summary = businessSummaryById(businessId);
  if (summary && Number.isFinite(Number(summary.activeServices))) return Number(summary.activeServices) || 0;
  return getServicesByBusiness(businessId, { activeOnly: true }).length;
}

function businessReservableServiceCount(businessId) {
  const summary = businessSummaryById(businessId);
  if (summary && Number.isFinite(Number(summary.reservableServices))) return Number(summary.reservableServices) || 0;
  return reservableServicesForBusiness(businessId).length;
}

function serviceCountLabel(businessId) {
  const total = businessServiceCount(businessId);
  const active = businessActiveServiceCount(businessId);
  const reservable = businessReservableServiceCount(businessId);
  if (total !== active || active !== reservable) {
    return `<strong>${reservable}</strong> reservables / <strong>${active}</strong> activos / <strong>${total}</strong> total`;
  }
  return `<strong>${total}</strong> servicios`;
}

function businessTodayReservationCount(businessId) {
  const summary = businessSummaryById(businessId);
  if (summary) return summary.reservationsToday || 0;
  const today = todayISO();
  return getBusinessBucket(businessId).appointments.filter(
    (appointment) =>
      appointment.date === today && COUNTABLE_STATUSES.has(appointment.status)
  ).length;
}

function statusFor(barberId, date, time, businessId = currentBusinessId()) {
  if (!barberOwnsAgendaScope(barberId, businessId)) return { status: "available" };
  if (store.isDayBlocked(barberId, date, businessId)) return { status: "blocked", dayBlocked: true };
  const appointment = store.getAppointment(barberId, date, time, businessId);
  return appointment ? { status: appointment.status, appointment } : { status: "available" };
}

function isUnavailableSlot(date, time, status) {
  return isPastDate(date) || slotHasPassed(date, time);
}

function publicSlotLabel(status, dayBlocked) {
  if (status === "available") return "Disponible";
  return dayBlocked ? "No disponible" : "Ocupado";
}

function publicSlotStateTag(status, dayBlocked, expired) {
  if (expired) return "NO DISPONIBLE";
  if (dayBlocked || status === "blocked") return "BLOQUEADO";
  if (status === "fixed") return "FIJADA";
  if (status === "reserved") return "OCUPADO";
  return "DISPONIBLE";
}

function dateAnchor(date) {
  return new Date(`${String(date).slice(0, 10)}T12:00:00-05:00`);
}

function isCountableAppointment(item) {
  return item && COUNTABLE_STATUSES.has(item.status);
}

function buildCounterSummary(anchorDate) {
  const activeWeekDates = new Set(getWeekDatesMemo(dateAnchor(anchorDate)));
  return getBusinessBucket(currentBusinessId()).appointments.reduce(
    (summary, appointment) => {
      if (!isCountableAppointment(appointment) || !activeWeekDates.has(appointment.date)) return summary;
      summary.weeklyByBarber[appointment.barberId] =
        (summary.weeklyByBarber[appointment.barberId] || 0) + 1;
      if (appointment.date === anchorDate) {
        summary.dailyByBarber[appointment.barberId] =
          (summary.dailyByBarber[appointment.barberId] || 0) + 1;
      }
      return summary;
    },
    { weeklyByBarber: {}, dailyByBarber: {} }
  );
}

function counterValue(group, barberId) {
  return group[barberId] || 0;
}

function renderCounter(value, extraClass = "") {
  return `<span class="counter-badge ${extraClass}">${value}</span>`;
}

function renderAccordionPanel(id, label, title, content, open = false) {
  return `<section class="admin-main accordion-panel ds-card ds-accordion-panel ${open ? "open" : ""}">
    <button class="accordion-trigger" type="button" data-admin-panel="${id}" aria-expanded="${open ? "true" : "false"}">
      <span class="section-title">
        <span>${label}</span>
        <h2>${title}</h2>
      </span>
      <strong>${open ? "−" : "+"}</strong>
    </button>
    ${open ? `<div class="accordion-content">${content}</div>` : ""}
  </section>`;
}

function viewPath(view) {
  const slug = app.currentBusinessSlug || DEFAULT_BUSINESS_SLUG;
  if (view === "super-admin") return "/super-admin";
  if (view === "business-test") return `/barberia-test/${slug}`;
  if (view === "admin") return `/panel/${slug}?modo=admin`;
  if (view === "barber") return `/panel/${slug}?modo=barbero`;
  return `/barberia/${slug}`;
}

function routeShellType() {
  if (app.view === "super-admin") return "super-admin";
  return app.route?.shell || (app.view === "admin" || app.view === "barber" ? "internal" : "public");
}

function avatar(barber, size = "lg") {
  const hasPhoto = Boolean(barber.photo);
  const style = barber.photo
    ? `background-image:url('${barber.photo}')`
    : `background:${barber.gradient}`;
  const initials = barber.name
    .split(" ")
    .map((item) => item[0])
    .join("")
    .slice(0, 2);
  return `<div class="avatar ${size} ${hasPhoto ? "has-photo" : ""}" style="${style}"><span>${hasPhoto ? "" : escapeHTML(initials)}</span></div>`;
}

function renderGlobalBackground() {
  const backgroundMedia = currentBackgroundMedia();
  const useStaticSuperAdminBg = app.view === "super-admin";
  const usePublicVideo = shouldRenderPublicBackgroundVideo();
  const isVideo = backgroundMedia?.type === "video" && usePublicVideo;
  const videoMarkup = !useStaticSuperAdminBg && isVideo
    ? `<video class="global-bg-video" src="${backgroundMedia.src}" autoplay muted loop playsinline preload="metadata" poster="/assets/atelier-luxury-hero.png"></video>`
    : "";
  return `
    <div class="global-bg ${useStaticSuperAdminBg ? "super-admin-bg" : ""}" aria-hidden="true" data-bg-kind="${useStaticSuperAdminBg ? "static" : isVideo ? "video" : "image"}">
      <div class="global-bg-image"></div>
      ${videoMarkup}
      <div class="global-bg-overlay"></div>
    </div>
  `;
}

function ensurePersistentBackground() {
  const existing = document.querySelector(".global-bg");
  const backgroundMedia = currentBackgroundMedia();
  const backgroundVideoVisible = shouldRenderPublicBackgroundVideo() && backgroundMedia?.type === "video";
  const backgroundScope = app.view === "super-admin" ? "super-admin" : currentBusinessId();
  const signature = `${backgroundScope}|${backgroundVideoVisible ? "video" : "image"}|${backgroundVideoVisible ? backgroundMedia?.src || "" : ""}`;
  if (!existing) {
    document.body.insertAdjacentHTML("afterbegin", renderGlobalBackground());
    document.body.dataset.backgroundSignature = signature;
    return;
  }

  if (document.body.dataset.backgroundSignature !== signature) {
    existing.outerHTML = renderGlobalBackground();
    document.body.dataset.backgroundSignature = signature;
  }
  ensureBackgroundPlayback();
}

function ensureBackgroundPlayback() {
  const video = document.querySelector(".global-bg-video");
  if (!video) return;
  const playback = video.play();
  if (playback?.catch) playback.catch(() => {});
}

function appShell(content) {
  return `<div class="app-view">${content}</div>`;
}

function renderLayoutShell() {
  if (app.view === "super-admin") {
    return `
      <main class="super-admin-shell"><div id="view-root"></div></main>
      <div class="realtime-toast">
        <span></span>
        <strong></strong>
      </div>
    `;
  }
  const business = visualBusinessSnapshot() || neutralBootstrapBusiness();
  const shellType = routeShellType();
  const tabs = shellType === "internal"
    ? [
        ["admin", "Admin"],
        ["barber", "Barbero"],
      ]
    : [];
  return `
    <header class="topbar">
      <button class="brand" data-public-link aria-label="Ir a agenda publica">
        ${businessLogoMarkup(business)}
        <span><strong>${escapeHTML(business?.name || "Cargando negocio")}</strong></span>
      </button>
      ${tabs.length ? `<nav class="nav-tabs internal-nav-tabs" aria-label="Navegacion interna">
        ${tabs.map(([id, label]) => `<button class="${app.view === id ? "active" : ""}" data-view="${id}">${label}</button>`).join("")}
      </nav>` : ""}
    </header>
    <main><div id="view-root"></div></main>
    <div class="realtime-toast">
      <span></span>
      <strong></strong>
    </div>
  `;
}

function businessThemeStyle(business = currentBusiness()) {
  const colors = visualColorsForBusiness(business || neutralBootstrapBusiness());
  return [
    `--color-primary:${colors.primary}`,
    `--color-secondary:${colors.secondary}`,
    `--color-background:${colors.background}`,
    `--color-card:${colors.card}`,
    `--color-text:${colors.text}`,
    `--color-text-secondary:${colors.textSecondary}`,
    `--color-title:${colors.title}`,
    `--color-subtitle:${colors.subtitle}`,
    `--color-button:${colors.button}`,
    `--color-button-hover:${colors.buttonHover}`,
    `--color-border:${colors.border}`,
    `--color-icon:${colors.icon}`,
    `--color-badge:${colors.badge}`,
    `--petrol:${colors.primary}`,
    `--petrol-bright:${colors.buttonHover}`,
    `--black:${colors.background}`,
    `--matte:${colors.secondary}`,
    `--graphite:${colors.card}`,
    `--graphite-2:${colors.card}`,
    `--white:${colors.text}`,
    `--muted:${colors.textSecondary}`,
    `--silver:${colors.textSecondary}`,
    `--line:${colors.border}59`,
    `--line-strong:${colors.border}82`,
    `--glass:${colors.secondary}c7`,
    `--glass-soft:${colors.primary}12`,
  ].join(";");
}

function businessLogoMarkup(business = currentBusiness()) {
  const safeBusiness = business || neutralBootstrapBusiness();
  return safeBusiness?.logoUrl
    ? `<span class="brand-mark business-logo-mark has-logo"><img src="${escapeHTML(safeBusiness.logoUrl)}" alt="Logo ${escapeHTML(safeBusiness.name || "barberia")}" loading="eager" decoding="async" fetchpriority="high" /></span>`
    : `<span class="brand-mark business-logo-mark empty-logo">${escapeHTML((safeBusiness?.name || "B").slice(0, 1).toUpperCase())}</span>`;
}

function refreshPersistentShellBrand() {
  if (app.view === "super-admin") {
    applyThemeColorsToRoot(visualColorsForBusiness(neutralBootstrapBusiness()));
    return;
  }
  const business = visualBusinessSnapshot() || neutralBootstrapBusiness();
  const colors = visualColorsForBusiness(business);
  applyThemeColorsToRoot(colors);
  const brand = document.querySelector(".brand");
  if (!brand) return;
  brand.innerHTML = `
    ${businessLogoMarkup(business)}
    <span><strong>${escapeHTML(business?.name || "Barberia")}</strong></span>
  `;
}

function barberWhatsappLink(barber) {
  const phone = moneylessPhone(barber?.whatsapp);
  return phone ? `<a class="inline-link" href="https://wa.me/${phone}" target="_blank" rel="noreferrer">WhatsApp</a>` : `<span>Sin WhatsApp</span>`;
}

function renderWeekSelector(selected, onClickAttr = "data-date", options = {}) {
  const { disabledDate = null, anchorDate = selected || todayISO() } = options;
  return `<div class="date-strip day-selector">${getWeekDatesMemo(dateAnchor(anchorDate)).map((date) => {
    const disabled = typeof disabledDate === "function" ? !!disabledDate(date) : false;
    return `<button class="${date === selected ? "active" : ""} ${disabled ? "past-date" : ""}" ${onClickAttr}="${date}" ${disabled ? "disabled" : ""}>
      <span>${dayNameForISODate(date)}</span>
      <strong>${dayNumberForISODate(date)}</strong>
    </button>`;
  }).join("")}</div>`;
}

function renderPublicWeekSelector(selected, onClickAttr = "data-public-date", options = {}) {
  const { disabledDate = null, anchorDate = selected || todayISO() } = options;
  return `<div class="public-week-selector" role="list" aria-label="Seleccion de dia">${getWeekDatesMemo(dateAnchor(anchorDate))
    .map((date) => {
      const disabled = typeof disabledDate === "function" ? !!disabledDate(date) : false;
      return `<button class="public-week-card ${date === selected ? "active" : ""} ${disabled ? "past-date" : ""}" ${onClickAttr}="${date}" ${disabled ? "disabled" : ""}>
        <span>${escapeHTML(dayNameForISODate(date))}</span>
        <strong>${escapeHTML(dayNumberForISODate(date))}</strong>
      </button>`;
    })
    .join("")}</div>`;
}

function dsIcon(name = "dot") {
  const icons = {
    business: "◈",
    barbers: "◌",
    services: "✦",
    reservations: "◷",
    url: "↗",
    admin: "◎",
    environment: "▣",
    theme: "◍",
    status: "●",
    create: "+",
    income: "$",
    schedule: "=",
    background: "â–§",
    settings: "*",
    users: "U",
    notifications: "!",
  };
  return `<span class="ds-icon" aria-hidden="true">${icons[name] || "•"}</span>`;
}

function dsStatusBadge(active, activeLabel = "Activo", inactiveLabel = "Inactivo") {
  return `<span class="ds-status-badge ${active ? "is-active" : "is-inactive"}">${dsIcon("status")}<span>${escapeHTML(active ? activeLabel : inactiveLabel)}</span></span>`;
}

function dsMetricCard({ icon = "business", label = "", value = "", meta = "" }) {
  return `<article class="ds-metric-card">
    <div class="ds-metric-card__icon">${dsIcon(icon)}</div>
    <div class="ds-metric-card__copy">
      <strong>${escapeHTML(String(value))}</strong>
      <span>${escapeHTML(label)}</span>
      ${meta ? `<small>${escapeHTML(meta)}</small>` : ""}
    </div>
  </article>`;
}

function dsStatItem({ icon = "business", label = "", value = "", emphasis = "" }) {
  return `<div class="ds-stat-item">
    <span class="ds-stat-item__label">${dsIcon(icon)}${escapeHTML(label)}</span>
    <strong>${escapeHTML(String(value || emphasis))}</strong>
  </div>`;
}

function dsMetricSection(title, iconToken, cards = [], extra = "") {
  return `<section class="admin-main dashboard-lite ds-metric-section">
    <div class="section-title"><span>${escapeHTML(iconToken)}</span><h2>${escapeHTML(title)}</h2></div>
    <div class="dashboard-cards ds-metric-grid">
      ${cards.join("")}
    </div>
    ${extra}
  </section>`;
}

function dsTextField(label, inputMarkup, options = {}) {
  const { hint = "", wide = false, className = "" } = options;
  return `<label class="ds-field ${wide ? "ds-field--wide" : ""} ${className}">
    <span class="ds-field__label">${escapeHTML(label)}</span>
    ${inputMarkup}
    ${hint ? `<small class="ds-field__hint">${escapeHTML(hint)}</small>` : ""}
  </label>`;
}

function dsInputField(label, name, options = {}) {
  const {
    value = "",
    placeholder = "",
    type = "text",
    required = false,
    disabled = false,
    autocomplete = "",
    wide = false,
    extra = "",
    hint = "",
  } = options;
  return dsTextField(
    label,
    `<input name="${escapeHTML(name)}" type="${escapeHTML(type)}" ${required ? "required" : ""} ${disabled ? "disabled" : ""} ${autocomplete ? `autocomplete="${escapeHTML(autocomplete)}"` : ""} value="${escapeHTML(String(value))}" placeholder="${escapeHTML(placeholder)}" ${extra} />`,
    { wide, hint }
  );
}

function dsSelectField(label, name, choices = [], options = {}) {
  const { value = "", wide = false, hint = "" } = options;
  return dsTextField(
    label,
    `<select name="${escapeHTML(name)}">${choices
      .map((choice) => `<option value="${escapeHTML(choice.value)}" ${String(choice.value) === String(value) ? "selected" : ""}>${escapeHTML(choice.label)}</option>`)
      .join("")}</select>`,
    { wide, hint }
  );
}

function dsFileField(label, name, accept, dataAttr, options = {}) {
  const { hint = "", wide = false } = options;
  return dsTextField(
    label,
    `<label class="file-control ds-upload-field">${escapeHTML(label)}
      <input name="${escapeHTML(name)}" type="file" accept="${escapeHTML(accept)}" ${dataAttr} />
    </label>`,
    { wide, hint, className: "ds-field--upload" }
  );
}

function serviceIconPickerField(selectedIconId = "", fieldName = "serviceIconId") {
  const selectedIcon = serviceIconById(selectedIconId);
  const visibleIcons = [
    ...activeServiceIcons(),
    ...(selectedIcon && !parseActiveFlag(selectedIcon.active, true) ? [selectedIcon] : []),
  ];
  const uniqueIcons = Array.from(new Map(visibleIcons.map((icon) => [icon.id, icon])).values());
  const icons = [...uniqueIcons].sort((left, right) =>
    String(left.name || "").localeCompare(String(right.name || ""), "es")
  );
  return `<div class="ds-service-icon-picker">
    <div class="ds-service-icon-picker__header">
      <span class="ds-field__label">Icono del servicio</span>
      <small class="ds-field__hint">Selecciona un icono guardado en base de datos o deja el servicio sin icono.</small>
    </div>
    <div class="ds-service-icon-picker__grid">
      <label class="ds-service-icon-option ${!selectedIconId ? "active" : ""}">
        <input type="radio" name="${escapeHTML(fieldName)}" value="" ${!selectedIconId ? "checked" : ""} />
        <span class="ds-service-icon-option__preview ds-service-icon-option__preview--empty">Sin icono</span>
      </label>
      ${
        selectedIconId && !selectedIcon
          ? `<label class="ds-service-icon-option active">
              <input type="radio" name="${escapeHTML(fieldName)}" value="${escapeHTML(selectedIconId)}" checked />
              <span class="ds-service-icon-option__preview ds-service-icon-option__preview--empty">Actual</span>
              <span class="ds-service-icon-option__name">Icono asignado</span>
            </label>`
          : ""
      }
      ${
        icons.length
          ? icons
              .map(
                (icon) => `<label class="ds-service-icon-option ${icon.id === selectedIconId ? "active" : ""}">
            <input type="radio" name="${escapeHTML(fieldName)}" value="${escapeHTML(icon.id)}" ${icon.id === selectedIconId ? "checked" : ""} />
            <span class="ds-service-icon-option__preview">${serviceIconImgMarkup(icon, "ds-service-icon-option__image")}</span>
            <span class="ds-service-icon-option__name">${escapeHTML(icon.name)}${parseActiveFlag(icon.active, true) ? "" : " · inactivo"}</span>
          </label>`
              )
              .join("")
          : `<div class="ds-service-icon-picker__empty">No hay iconos cargados todavia.</div>`
      }
    </div>
  </div>`;
}

function renderBusinessIdentityBlock(business, options = {}) {
  const { pendingLogo = "", showUrl = true } = options;
  const logoSrc = pendingLogo || business.logoUrl || "";
  return `<div class="super-business-summary__brand ds-business-identity">
    <div class="super-business-summary__logo ds-business-identity__logo">
      ${logoSrc ? `<img src="${escapeHTML(logoSrc)}" alt="Logo ${escapeHTML(business.name)}" loading="lazy" decoding="async" />` : `<span>${escapeHTML((business.name || "B").slice(0, 1).toUpperCase())}</span>`}
    </div>
    <div class="super-business-summary__copy ds-business-identity__copy">
      <h3>${escapeHTML(business.name)}</h3>
      <div class="ds-business-identity__meta">
        ${dsStatusBadge(Boolean(business.active), "Activa", "Inactiva")}
        ${showUrl ? `<span class="ds-inline-path">${dsIcon("url")}<span>/barberia/${escapeHTML(business.slug)}</span></span>` : ""}
      </div>
    </div>
  </div>`;
}

function renderBusinessStatsRow({ barberCount = 0, serviceCount = 0, reservationCount = 0, environmentLabel = "Base" }) {
  return `<div class="super-business-summary__stats ds-stat-grid">
    ${dsStatItem({ icon: "barbers", label: "Barberos", value: barberCount })}
    ${dsStatItem({ icon: "services", label: "Servicios", value: serviceCount })}
    ${dsStatItem({ icon: "reservations", label: "Reservas de hoy", value: reservationCount })}
    ${dsStatItem({ icon: "environment", label: "Entorno", value: environmentLabel })}
  </div>`;
}

function publicFlowCard({ step, title, state = "locked", summary = "", actions = "", body = "" }) {
  return `<section class="flow-card ${state}">
    <div class="flow-card-head">
      <div class="section-title">
        <span>${step}</span>
        <h2>${title}</h2>
      </div>
      ${summary ? `<div class="flow-summary">${summary}</div>` : ""}
      ${actions ? `<div class="step-toolbar flow-toolbar">${actions}</div>` : ""}
    </div>
    ${state === "open" ? `<div class="flow-card-body">${body}</div>` : ""}
  </section>`;
}

function publicProgressStepper(currentStep = "services") {
  const steps = [
    { key: "services", number: "01", label: "Servicio" },
    { key: "barbers", number: "02", label: "Barbero" },
    { key: "days", number: "03", label: "Fecha" },
    { key: "slots", number: "04", label: "Hora" },
    { key: "details", number: "05", label: "Confirmar" },
  ];
  const activeIndex = Math.max(steps.findIndex((step) => step.key === currentStep), 0);
  return `<div class="public-progress" aria-label="Progreso de la reserva">
    ${steps
      .map((step, index) => {
        const state = index < activeIndex ? "done" : index === activeIndex ? "active" : "idle";
        return `<div class="public-progress__item ${state}">
          <span class="public-progress__dot">${step.number}</span>
          <small>${step.label}</small>
        </div>`;
      })
      .join("")}
  </div>`;
}

function publicSelectionPill({ icon = "services", eyebrow = "", title = "", meta = "" }) {
  return `<article class="public-selection-pill">
    <span class="public-selection-pill__icon">${dsIcon(icon)}</span>
    <div class="public-selection-pill__copy">
      ${eyebrow ? `<small>${escapeHTML(eyebrow)}</small>` : ""}
      <strong>${escapeHTML(title)}</strong>
      ${meta ? `<span>${escapeHTML(meta)}</span>` : ""}
    </div>
  </article>`;
}

function publicServiceCard(service, businessId, isSelected) {
  const serviceIcon = serviceIconById(service.serviceIconId);
  return `<button class="service-card public-service-card-v2 ${isSelected ? "active" : ""}" data-select-service="${service.id}">
    <div class="public-service-card-v2__body">
      <strong>${escapeHTML(service.name)}</strong>
      <div class="public-service-card-v2__meta">
        ${publicPricesVisibleForBusiness(businessId) ? `<span class="public-service-card-v2__price">${escapeHTML(formatCOP(service.value))}</span>` : ""}
        ${serviceIcon ? `<span class="public-service-card-v2__asset">${serviceIconImgMarkup(serviceIcon, "public-service-card-v2__asset-image")}</span>` : ""}
      </div>
    </div>
  </button>`;
}

function renderPublicBookingShell({
  business,
  currentStep,
  bookingCardTitle,
  bookingCardMicrocopy,
  bookingCardSummary,
  bookingCardActions,
  bookingCardBody,
}) {
  const backgroundMedia = currentBackgroundMedia();
  return appShell(`
    <section class="hero public-reservation-hero public-reservation-hero-v2">
      <div class="hero-bg ${backgroundMedia?.type === "video" ? "video-backed" : ""}"></div>
      <div class="public-reservation-hero-v2__overlay"></div>
      <div class="workspace public-reservation-hero-v2__content">
        <section class="public-booking-panel-v2 public-booking-panel-v2--${escapeHTML(currentStep)}">
          <div class="public-booking-panel-v2__head public-motion-enter public-motion-enter--base">
            <div class="public-booking-panel-v2__title">
              <h2>${escapeHTML(bookingCardTitle)}</h2>
            </div>
            ${publicProgressStepper(currentStep)}
          </div>
          ${bookingCardSummary ? `<div class="public-booking-panel-v2__summary public-motion-enter public-motion-enter--delay-1">${bookingCardSummary}</div>` : ""}
          ${bookingCardActions ? `<div class="public-booking-panel-v2__actions public-motion-enter public-motion-enter--delay-2">${bookingCardActions}</div>` : ""}
          <div class="public-booking-panel-v2__body public-motion-enter public-motion-enter--delay-3">${bookingCardBody}</div>
        </section>
      </div>
    </section>
    ${renderBookingConfirmationDialog()}
  `);
}

function serviceById(id, businessId = currentBusinessId()) {
  return getBusinessBucket(businessId).servicesById.get(id) || null;
}

let serviceIconLookupCache = {
  source: null,
  map: new Map(),
};

function cachedPublicServiceIcons() {
  const runtimeIcons = store?.state?.serviceIcons || [];
  if (runtimeIcons.length) return runtimeIcons;
  try {
    const cached = JSON.parse(localStorage.getItem(PUBLIC_SERVICE_ICONS_LOCAL_CACHE_KEY) || "[]");
    return Array.isArray(cached) ? cached.map(mapRowToServiceIcon) : [];
  } catch {
    return [];
  }
}

function persistPublicServiceIcons(icons = []) {
  try {
    localStorage.setItem(
      PUBLIC_SERVICE_ICONS_LOCAL_CACHE_KEY,
      JSON.stringify((icons || []).map(mapServiceIconToRow))
    );
  } catch {
    // Service icon cache is only used to accelerate public visual hydration.
  }
}

function serviceIconById(id) {
  if (!id) return null;
  const icons = cachedPublicServiceIcons();
  if (serviceIconLookupCache.source !== icons) {
    serviceIconLookupCache = {
      source: icons,
      map: new Map(
        icons
          .filter((icon) => icon?.id)
          .map((icon) => [icon.id, icon])
      ),
    };
  }
  return serviceIconLookupCache.map.get(id) || null;
}

function activeServiceIcons() {
  return cachedPublicServiceIcons().filter((icon) => parseActiveFlag(icon.active, true));
}

function serviceIconDataUrl(icon) {
  if (!icon?.imageData) return "";
  return `data:${icon.mimeType || "image/png"};base64,${icon.imageData}`;
}

function serviceIconImgMarkup(icon, className = "service-icon-chip__image") {
  const src = serviceIconDataUrl(icon);
  if (!src) return "";
  return `<img class="${escapeHTML(className)}" src="${escapeHTML(src)}" alt="${escapeHTML(icon.name || "Icono del servicio")}" loading="lazy" decoding="async" />`;
}

function serviceIconUsageCount(iconId = "") {
  if (!iconId) return 0;
  return store.state.services.filter((service) => service.serviceIconId === iconId).length;
}

function serviceNameForAppointment(appointment) {
  if (!appointment) return "Sin servicio";
  return appointment.serviceName || serviceById(appointment.serviceId)?.name || "Sin servicio";
}

function serviceValueForAppointment(appointment) {
  if (!appointment) return 0;
  const byId = serviceById(appointment.serviceId, appointment.negocioId || currentBusinessId());
  if (byId) return Number(byId.value) || 0;
  const byName = getBusinessBucket(appointment.negocioId || currentBusinessId()).services.find((service) => service.name === appointment.serviceName);
  return Number(byName?.value) || 0;
}

function serviceShareForAppointment(appointment) {
  const businessId = appointment?.negocioId || currentBusinessId();
  const service =
    serviceById(appointment?.serviceId, businessId) ||
    getBusinessBucket(businessId).services.find((item) => item.name === appointment?.serviceName);
  return {
    adminPercentage: Number(service?.adminPercentage) || 0,
    barberPercentage: Number(service?.barberPercentage) || 0,
  };
}

function formatCOP(value) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(value) || 0).replace(/\s+/g, "");
}

function isRealizedAppointment(appointment) {
  return appointment?.visitState === "done";
}

function visitStateLabel(visitState = "") {
  if (visitState === "arrived") return "Cliente llego";
  if (visitState === "service") return "En servicio";
  if (visitState === "done") return "Realizada";
  if (visitState === "no_show") return "No asistio";
  return "";
}

function operationalStatusLabel({ appointment, status, dayBlocked, unavailable = false }) {
  const visitLabel = visitStateLabel(appointment?.visitState);
  if (visitLabel) return visitLabel;
  if (dayBlocked) return "Dia completo bloqueado";
  if (unavailable && status === "available") return "No disponible";
  return STATUS[status]?.label || "Disponible";
}

function renderVisitStatePill(visitState = "") {
  const meta = VISIT_STATE_META[visitState];
  if (!meta) return "";
  return `<span class="visit-state-pill ${meta.tone}">${escapeHTML(meta.label)}</span>`;
}

function calculateAppointmentIncome(appointment) {
  const value = serviceValueForAppointment(appointment);
  const share = serviceShareForAppointment(appointment);
  return {
    total: value,
    admin: Math.round((value * share.adminPercentage) / 100),
    barber: Math.round((value * share.barberPercentage) / 100),
  };
}

function buildBarberSummary(barberId, anchorDate) {
  const appointments = getBusinessBucket(currentBusinessId()).appointments;
  const todayReservations = appointments.filter(
    (item) =>
      item.barberId === barberId &&
      item.date === anchorDate &&
      COUNTABLE_STATUSES.has(item.status)
  );
  const realizedToday = todayReservations.filter(isRealizedAppointment);
  const weekDates = new Set(getWeekDatesMemo(dateAnchor(anchorDate)).filter((date) => date <= anchorDate));
  const weekAppointments = appointments.filter(
    (item) =>
      item.barberId === barberId &&
      weekDates.has(item.date) &&
      COUNTABLE_STATUSES.has(item.status)
  );
  const totals = realizedToday.reduce(
    (acc, appointment) => {
      const income = calculateAppointmentIncome(appointment);
      acc.income += income.total;
      acc.barber += income.barber;
      return acc;
    },
    { income: 0, barber: 0 }
  );
  const weeklyBarberGain = weekAppointments
    .filter(isRealizedAppointment)
    .reduce((sum, appointment) => sum + calculateAppointmentIncome(appointment).barber, 0);
  return {
    reservationsToday: todayReservations.length,
    incomeToday: totals.income,
    barberGainToday: totals.barber,
    barberGainWeek: weeklyBarberGain,
  };
}

function barberOffersService(barberId, serviceId) {
  if (!serviceId) return true;
  const bucket = getBusinessBucket(currentBusinessId());
  const allRelations = bucket.barberServices || [];
  const barberRelations = (bucket.barberServicesByBarber.get(barberId) || []).filter((item) => item.active);
  if (!allRelations.length || !barberRelations.length) return true;
  return barberRelations.some((item) => item.serviceId === serviceId);
}

function barbersForService(serviceId) {
  return store.activeBarbersByBusiness(currentBusinessId()).filter((barber) => barberOffersService(barber.id, serviceId));
}

function servicesForBarber(barberId) {
  return reservableServicesForBusiness(currentBusinessId()).filter(
    (service) => barberOffersService(barberId, service.id)
  );
}

function isPublicDateAvailable(barberId, date, businessId = currentBusinessId()) {
  if (!barberId || isPastDate(date)) return false;
  return slotsForBusiness(businessId).some((time) => isPublicSlotBookable(barberId, date, time, businessId));
}

function BusinessPublicTemplate({
  business,
  currentStep,
  bookingCardTitle,
  bookingCardMicrocopy,
  bookingStepper,
  bookingCardSummary,
  bookingCardActions,
  bookingCardBody,
}) {
  return renderPublicBookingShell({
    business,
    currentStep,
    bookingCardTitle,
    bookingCardMicrocopy,
    bookingCardSummary,
    bookingCardActions,
    bookingCardBody,
  });
}

function renderBusinessPublicTest() {
  const requested = requestedBusiness();
  if (app.currentBusinessSlug && !requested && !store.remoteReady) {
    return appShell(`
      <section class="admin-main business-component-loading">
        <div class="section-title"><span>S</span><h2>Preparando vista del negocio</h2></div>
        <p class="microcopy">Sincronizando configuracion, servicios y barberos...</p>
        <div class="business-component-skeleton"><span></span><span></span><span></span></div>
      </section>
    `);
  }

  if (!requested) {
    return appShell(`
      <section class="booking-surface">
        <div class="section-title"><span>!</span><h2>Negocio no encontrado</h2></div>
        <p class="microcopy">No existe una barberia registrada para el slug <strong>${escapeHTML(app.currentBusinessSlug)}</strong>.</p>
      </section>
    `);
  }

  const businessId = requested.id;
  const services = getServicesByBusiness(businessId);
  const activeBarbers = store.activeBarbersByBusiness(businessId);
  const appointments = store.state.appointments.filter((appointment) => appointment.negocioId === businessId);
  const blockedDays = store.state.blockedDays.filter((blockedDay) => blockedDay.negocioId === businessId);

  return appShell(`
    <section class="dashboard-head">
      <div>
        <p class="eyebrow">BusinessPublicTemplate test</p>
        <h1>${escapeHTML(requested.name)}</h1>
      </div>
      <a class="secondary-action inline-action" href="${escapeHTML(`/barberia/${requested.slug}`)}">Abrir entorno publico</a>
    </section>

    <section class="admin-stack">
      <section class="admin-main dashboard-lite">
        <div class="section-title"><span>T</span><h2>Resumen del slug</h2></div>
        <div class="dashboard-cards">
          <div><span>Slug</span><strong>${escapeHTML(requested.slug)}</strong></div>
          <div><span>Estado</span><strong>${requested.active ? "Activo" : "Inactivo"}</strong></div>
          <div><span>Negocio ID</span><strong>${escapeHTML(requested.id)}</strong></div>
        </div>
      </section>

      <section class="admin-main dashboard-lite">
        <div class="section-title"><span>D</span><h2>Datos cargados</h2></div>
        <div class="dashboard-cards">
          <div><span>Servicios</span><strong>${services.length}</strong></div>
          <div><span>Barberos activos</span><strong>${activeBarbers.length}</strong></div>
          <div><span>Reservas</span><strong>${appointments.length}</strong></div>
          <div><span>Bloqueos</span><strong>${blockedDays.length}</strong></div>
        </div>
      </section>

      <section class="admin-main">
        <div class="section-title"><span>E</span><h2>Estado del entorno</h2></div>
        ${
          !requested.active
            ? `<div class="empty-state-card"><p>Este negocio no esta disponible actualmente.</p></div>`
            : ""
        }
        ${
          !services.length
            ? `<div class="empty-state-card"><p>Aun no hay servicios disponibles.</p></div>`
            : ""
        }
        ${
          !activeBarbers.length
            ? `<div class="empty-state-card"><p>Aun no hay barberos disponibles.</p></div>`
            : ""
        }
        ${
          !appointments.length
            ? `<div class="empty-state-card"><p>Aun no hay reservas registradas.</p></div>`
            : ""
        }
        ${
          !blockedDays.length
            ? `<div class="empty-state-card"><p>Aun no hay bloqueos configurados.</p></div>`
            : ""
        }
      </section>
    </section>
  `);
}

function renderPublic() {
  const resolution = currentBusinessResolution();
  const requested = requestedBusiness();
  let businessDataLoading =
    (!requested && isCurrentBusinessLoading()) ||
    Boolean(app.currentBusinessSlug && app.currentBusinessSlug !== DEFAULT_BUSINESS_SLUG && !requested && ["idle", "pending"].includes(resolution.status));
  if (app.currentBusinessSlug && app.currentBusinessSlug !== DEFAULT_BUSINESS_SLUG && !requested && resolution.status === "not_found") {
    return appShell(`
      <section class="booking-surface">
        <div class="section-title"><span>!</span><h2>Entorno no disponible</h2></div>
        <p class="microcopy">Negocio no encontrado.</p>
      </section>
    `);
  }
  if (app.currentBusinessSlug && app.currentBusinessSlug !== DEFAULT_BUSINESS_SLUG && !requested && resolution.status === "error") {
    return appShell(`
      <section class="booking-surface">
        <div class="section-title"><span>!</span><h2>No fue posible cargar el negocio</h2></div>
        <p class="microcopy">${escapeHTML(resolution.error || "Error de conexion.")}</p>
        <button class="secondary-action" type="button" data-retry-business-resolution>Reintentar</button>
      </section>
    `);
  }
  if (requested && requested.active === false) {
    return appShell(`
      <section class="booking-surface">
        <div class="section-title"><span>!</span><h2>Negocio inactivo</h2></div>
        <p class="microcopy">Este negocio no esta disponible actualmente.</p>
      </section>
    `);
  }
  const business = currentBusiness();
  if (isPastDate(app.selectedDate)) {
    app.selectedDate = todayISO();
    app.publicDaySelected = false;
    app.selectedSlot = "";
  }
  const businessId = business.id;
  const publicServices = reservableServicesForBusiness(businessId);
  const showPublicPrices = publicPricesVisibleForBusiness(businessId);
  const servicesLoadState = publicServices.length ? { loading: false, slow: false, error: "" } : publicServicesLoadState(businessId);
  const iconLoadState = publicServiceIconsLoadState(businessId, publicServices);
  const servicesLoading = !publicServices.length && servicesLoadState.loading;
  businessDataLoading = businessDataLoading || servicesLoading;
  const activeBarbers = app.selectedServiceId ? barbersForService(app.selectedServiceId) : store.activeBarbersByBusiness(businessId);
  const waitingBarbersForPublic = !activeBarbers.length && isBusinessDataRefreshPending(businessId);
  const selected = activeBarbers.find((barber) => barber.id === app.selectedBarberId) || null;
  const hasSelectedBarber = Boolean(selected);
  const selectedService = publicServices.find((service) => service.id === app.selectedServiceId) || null;
  const hasSelectedService = Boolean(selectedService);
  const hasSelectedDay = hasSelectedBarber && app.publicDaySelected;
  const hasSelectedSlot = hasSelectedDay && Boolean(app.selectedSlot);
  const availability = hasSelectedDay
    ? slotRowsForBarberDate(selected.id, app.selectedDate, businessId)
    : [];
  const currentStep = hasSelectedSlot
    ? "details"
    : hasSelectedDay
      ? "slots"
      : hasSelectedBarber
        ? "days"
        : hasSelectedService
          ? "barbers"
          : "services";
  const selectedDayLabel = hasSelectedDay
    ? `${dayNameForISODate(app.selectedDate, true)} · ${app.selectedDate}`
    : "";
  const bookingDayLabel = hasSelectedDay ? `${dayNameForISODate(app.selectedDate, true)} · ${app.selectedDate}` : "";
  let bookingCardTitle = "Seleccionar servicio";
  let bookingCardMicrocopy = "Elige el servicio que deseas reservar.";
  let bookingCardActions = "";
  let bookingCardSummary = "";
  let bookingCardBody = "";

  if (currentStep === "services") {
    bookingCardTitle = "Seleccionar servicio";
    bookingCardMicrocopy = servicesLoading
      ? servicesLoadState.slow || iconLoadState.slow
        ? "Estamos cargando los servicios..."
        : "Preparando servicios disponibles."
      : "Selecciona el servicio principal para continuar con la reserva.";
    const serviceCardsPerf = perfMark("public service cards render");
    const serviceCardsMarkup = publicServices.length
      ? publicServices
          .map(
            (service) => `${publicServiceCard(service, businessId, service.id === app.selectedServiceId)}`
          )
          .join("")
      : "";
    if (publicServices.length) {
      perfEnd(serviceCardsPerf, `(${businessId}:cards=${publicServices.length})`);
    }
    bookingCardBody = `<div class="public-service-step-v2">
      <div class="public-service-step-v2__grid">
      ${
        servicesLoading
          ? `<div class="business-component-skeleton public-component-skeleton public-service-skeleton"><span></span><span></span></div>`
          : publicServices.length
          ? serviceCardsMarkup
          : `<div class="empty-state-card">
              <p>${servicesLoadState.error ? "No fue posible cargar los servicios." : "No hay servicios disponibles para reservar."}</p>
              ${servicesLoadState.error ? `<button class="secondary-action" type="button" data-retry-public-services>Reintentar</button>` : ""}
            </div>`
      }
      </div>
    </div>`;
  }

  if (currentStep === "barbers") {
    bookingCardTitle = "Elegir barbero";
    bookingCardMicrocopy = "Selecciona el profesional disponible para este servicio.";
    bookingCardSummary = `<div class="public-step-two-summary">
      <div class="public-step-two-summary__service">
        ${publicSelectionPill({
          icon: "services",
          eyebrow: publicServiceBadgeLabel(businessId),
          title: selectedService?.name || "",
          meta: selectedService && showPublicPrices ? formatCOP(selectedService.value) : "",
        })}
      </div>
      <button class="secondary-action public-step-two-summary__change" type="button" data-reset-service>Cambiar servicio</button>
    </div>`;
    bookingCardActions = "";
    bookingCardBody = `<div class="barber-list public-barber-grid">
      ${
        activeBarbers.length
          ? activeBarbers
              .map(
                (barber) => `
          <button class="barber-card public-barber-card public-barber-card-v2 ${barber.id === app.selectedBarberId ? "active" : ""}" data-select-barber="${barber.id}">
            ${avatar(barber, "lg")}
            <span class="public-barber-copy">
              <strong>${escapeHTML(barber.name)}</strong>
              <small class="public-barber-status">Disponible</small>
            </span>
          </button>`
              )
              .join("")
          : waitingBarbersForPublic
            ? `<div class="empty-state-card"><p>Sincronizando barberos disponibles...</p></div>`
            : `<div class="empty-state-card"><p>No hay barberos disponibles para este servicio.</p><button class="secondary-action" type="button" data-reset-service>Cambiar servicio</button></div>`
      }
    </div>`;
  }

  if (currentStep === "days") {
    bookingCardTitle = "Seleccionar dia";
    bookingCardMicrocopy = "Explora la semana y elige el dia ideal para continuar con tu reserva.";
    bookingCardSummary = `<div class="public-step-three-summary">
      ${publicSelectionPill({
        icon: "services",
        eyebrow: publicServiceBadgeLabel(businessId),
        title: selectedService?.name || "",
        meta: selectedService && showPublicPrices ? formatCOP(selectedService.value) : "",
      })}
      ${publicSelectionPill({
        icon: "barbers",
        eyebrow: "Barbero",
        title: selected?.name || "",
        meta: selected?.specialty || "Servicio premium",
      })}
    </div>`;
    bookingCardActions = `<button class="secondary-action public-step-three-action" type="button" data-reset-service>Cambiar servicio</button><button class="secondary-action public-step-three-action" type="button" data-reset-barber>Cambiar barbero</button>`;
    bookingCardBody = `<div class="public-step-three-body">
      <div class="public-step-three-calendar">
        ${renderPublicWeekSelector(app.selectedDate, "data-public-date", {
          anchorDate: app.selectedDate,
          disabledDate: (date) => !publicDateAvailableMemo(selected.id, date, businessId),
        })}
      </div>
    </div>`;
  }

  if (currentStep === "slots") {
    bookingCardTitle = "Seleccionar horario";
    bookingCardMicrocopy = "Elige un horario disponible para completar la reserva.";
    bookingCardSummary = `<div class="public-step-four-summary">
      ${publicSelectionPill({
        icon: "services",
        eyebrow: publicServiceBadgeLabel(businessId),
        title: selectedService?.name || "",
        meta: selectedService && showPublicPrices ? formatCOP(selectedService.value) : "",
      })}
      ${publicSelectionPill({
        icon: "barbers",
        eyebrow: "Barbero",
        title: selected?.name || "",
        meta: selected?.specialty || "Servicio premium",
      })}
      ${publicSelectionPill({
        icon: "reservations",
        eyebrow: "Fecha",
        title: bookingDayLabel,
        meta: "Dia seleccionado",
      })}
    </div>`;
    bookingCardActions = `<button class="secondary-action public-step-four-action" type="button" data-reset-service>Cambiar servicio</button><button class="secondary-action public-step-four-action" type="button" data-reset-barber>Cambiar barbero</button><button class="secondary-action public-step-four-action" type="button" data-reset-day>Cambiar fecha</button>`;
    bookingCardBody = `<div class="public-slot-grid-v2">
      ${availability
        .map(({ time, status, appointment, dayBlocked }) => {
          const unavailable = isUnavailableSlot(app.selectedDate, time, status);
          const disabled = status !== "available" || unavailable;
          const visualState = disabled ? "Ocupado" : "Disponible";
          return `<button class="slot public-slot-card-v2 ${STATUS[status].tone} ${unavailable ? "unavailable" : ""} ${time === app.selectedSlot ? "picked" : ""}" data-slot="${time}" ${disabled ? "disabled" : ""}>
            <small class="public-slot-card-v2__state">${visualState}</small>
            <strong class="public-slot-card-v2__time">${slotRange(time)}</strong>
          </button>`;
        })
        .join("")}
    </div>`;
  }

  if (currentStep === "details") {
    bookingCardTitle = "Confirmar reserva";
    bookingCardMicrocopy = "Revisa el resumen y completa tus datos para finalizar la reserva.";
    bookingCardSummary = `<div class="public-step-five-summary">
      ${publicSelectionPill({
        icon: "services",
        eyebrow: publicServiceBadgeLabel(businessId),
        title: selectedService?.name || "",
        meta: selectedService && showPublicPrices ? formatCOP(selectedService.value) : "",
      })}
      ${publicSelectionPill({
        icon: "barbers",
        eyebrow: "Barbero",
        title: selected?.name || "",
        meta: bookingDayLabel,
      })}
      ${publicSelectionPill({
        icon: "reservations",
        eyebrow: "Horario",
        title: slotRange(app.selectedSlot),
        meta: "Horario seleccionado",
      })}
    </div>`;
    bookingCardActions = `<button class="secondary-action public-step-five-action" type="button" data-reset-service>Cambiar servicio</button><button class="secondary-action public-step-five-action" type="button" data-reset-barber>Cambiar barbero</button><button class="secondary-action public-step-five-action" type="button" data-reset-day>Cambiar fecha</button><button class="secondary-action public-step-five-action" type="button" data-reset-slot>Cambiar hora</button>`;
    bookingCardBody = `<form id="public-booking-form" class="form-stack public-booking-form-v2">
        ${app.bookingError ? `<p class="form-feedback error">${escapeHTML(app.bookingError)}</p>` : ""}
        <div class="public-confirmation-card-v2">
          <div class="public-confirmation-card-v2__row">
            <span>Servicio</span><strong>${escapeHTML(selectedService?.name || "")}</strong>
          </div>
          <div class="public-confirmation-card-v2__row">
            <span>Barbero</span><strong>${escapeHTML(selected?.name || "")}</strong>
          </div>
          <div class="public-confirmation-card-v2__row">
            <span>Fecha</span><strong>${escapeHTML(app.selectedDate)}</strong>
          </div>
          <div class="public-confirmation-card-v2__row">
            <span>Hora</span><strong>${slotRange(app.selectedSlot || businessScheduleConfig(businessId).openingTime, businessId)}</strong>
          </div>
        </div>
        <div class="public-booking-form-v2__fields">
          <label class="public-booking-field-v2">Nombre<input name="clientName" required placeholder="Tu nombre" /></label>
          <label class="public-booking-field-v2">WhatsApp<input name="whatsapp" required inputmode="tel" placeholder="300 123 4567" /></label>
        </div>
        <div class="public-booking-form-v2__footer">
          <button class="primary-action public-confirm-submit-v2" ${app.bookingSubmitting ? "disabled" : ""}>${app.bookingSubmitting ? "Reservando..." : "Confirmar cita"}</button>
        </div>
      </form>`;
  }

  return renderPublicBookingShell({
    business,
    currentStep,
    bookingCardTitle,
    bookingCardMicrocopy,
    bookingCardSummary,
    bookingCardActions,
    bookingCardBody,
  });
}

function renderAdmin() {
  const selected = barberById(app.adminBarberId) || barbersForBusiness(currentBusinessId())[0];
  const businessId = currentBusinessId();
  const businessBarbers = barbersForBusiness(businessId);
  const businessAppointments = store.state.appointments.filter((appointment) => appointment.negocioId === businessId);
  const businessBlockedDays = store.state.blockedDays.filter((blockedDay) => blockedDay.negocioId === businessId);
  const rows = selected ? slotRowsForBarberDate(selected.id, app.selectedDate, businessId) : [];
  const blocked = selected ? store.isDayBlocked(selected.id, app.selectedDate, businessId) : false;

  return appShell(`
    <section class="dashboard-head">
      <div>
        <p class="eyebrow">Centro de operaciones</p>
        <h1>Panel administrador</h1>
      </div>
      <div class="metric-row">
        <div><strong>${businessBarbers.length}</strong><span>Barberos</span></div>
        <div><strong>${businessAppointments.filter((appointment) => appointment.date === app.selectedDate).length}</strong><span>Citas hoy</span></div>
        <div><strong>${businessBlockedDays.length}</strong><span>Dias bloqueados</span></div>
      </div>
    </section>

    <section class="admin-layout">
      <aside class="admin-sidebar">
        <div class="section-title"><span>A</span><h2>Barberos</h2></div>
        <div class="barber-list compact">
          ${businessBarbers
            .map(
              (barber) => `
              <button class="barber-card ${barber.id === selected?.id ? "active" : ""}" data-admin-barber="${barber.id}">
                ${avatar(barber, "md")}
                <span><strong>${escapeHTML(barber.name)}</strong><small>${barber.active ? "Activo" : "Inactivo"} · ${escapeHTML(barber.user)}</small></span>
              </button>`
            )
            .join("")}
        </div>
        <form id="barber-form" class="editor-card">
          <input type="hidden" name="id" value="${escapeHTML(selected?.id || "")}" />
          <label>Nombre<input name="name" required value="${escapeHTML(selected?.name || "")}" /></label>
          <label>Usuario<input name="user" required value="${escapeHTML(selected?.user || "")}" /></label>
          <label>Contrasena<input name="password" required value="${escapeHTML(selected?.password || "")}" /></label>
          <label>Especialidad<input name="specialty" value="${escapeHTML(selected?.specialty || "")}" /></label>
          <label class="file-control">Fotografia<input name="photo" type="file" accept="image/*" /></label>
          <label class="toggle-line"><input name="active" type="checkbox" ${selected?.active ? "checked" : ""} /> Barbero activo</label>
          <div class="button-row">
            <button class="secondary-action" type="button" data-new-barber>Nuevo</button>
            <button class="primary-action">Guardar</button>
          </div>
        </form>
      </aside>

      <section class="admin-main">
        <div class="agenda-toolbar">
          <div>${renderWeekSelector(app.selectedDate, "data-admin-date", { anchorDate: app.selectedDate })}</div>
          <div class="button-row">
            <button class="secondary-action" data-block-day="${blocked ? "off" : "on"}">${blocked ? "Desbloquear dia" : "Bloquear dia"}</button>
          </div>
        </div>
        <div class="status-legend">
          ${Object.entries(STATUS)
            .map(([id, item]) => `<span class="${item.tone}"><i></i>${item.label}</span>`)
            .join("")}
        </div>
        <div class="admin-slots">
          ${rows
            .map(({ time, status, appointment, dayBlocked }) => `
            <article class="slot-row ${STATUS[status].tone}">
              <div>
                <strong>${slotRange(time)}</strong>
                <span>${dayBlocked ? "Dia completo bloqueado" : STATUS[status].label}</span>
              </div>
              <div class="slot-client">
                <strong>${escapeHTML(appointment?.clientName || "Sin cliente")}</strong>
                <small>${appointment?.whatsapp ? displayPhone(appointment.whatsapp) : "Sin WhatsApp"}</small>
              </div>
              <div class="row-actions">
                ${appointment?.whatsapp ? `<a class="icon-action" href="https://wa.me/${moneylessPhone(appointment.whatsapp)}" target="_blank" rel="noreferrer">WA</a>` : ""}
                <button class="icon-action" data-manual="${time}">Reservar</button>
                <button class="icon-action" data-fixed="${time}">Fijar</button>
                <button class="icon-action" data-block="${time}">Bloquear</button>
                ${appointment ? `<button class="icon-action danger" data-free="${appointment.id}">Liberar</button>` : ""}
              </div>
            </article>`)
            .join("")}
        </div>
      </section>
    </section>

    <dialog id="manual-dialog">
      <form method="dialog" id="manual-form" class="form-stack modal-card">
        <h3 id="manual-title">Gestionar horario</h3>
        <input type="hidden" name="time" />
        <input type="hidden" name="status" />
        <label>Cliente<input name="clientName" placeholder="Nombre del cliente" /></label>
        <label>WhatsApp<input name="whatsapp" inputmode="tel" placeholder="300 123 4567" /></label>
        <div class="button-row">
          <button class="secondary-action" type="button" data-close-dialog>Cancelar</button>
          <button class="primary-action" value="confirm">Guardar</button>
        </div>
      </form>
    </dialog>
  `);
}

function renderBarber() {
  if (!app.barberSession) {
    return appShell(`
      <section class="login-view">
        <div class="login-panel">
          <p class="eyebrow">Acceso privado</p>
          <h1>Panel del barbero</h1>
          <form id="barber-login" class="form-stack">
            <label>Usuario<input name="user" required placeholder="mateo" /></label>
            <label>Contrasena<input name="password" type="password" required placeholder="studio2026" /></label>
            ${app.barberLoginError ? `<p class="form-error">${escapeHTML(app.barberLoginError)}</p>` : ""}
            <button class="primary-action">Entrar</button>
          </form>
        </div>
      </section>
    `);
  }

  const barber = barberById(app.barberSession.id);
  if (!barber) {
    app.barberSession = null;
    app.barberLoginError = "Tu acceso de barbero no esta cargado en este negocio. Intenta iniciar sesion nuevamente.";
    clearScopedBusinessSession(BARBER_SESSION_KEY, app.currentBusinessSlug);
    return renderBarber();
  }
  const date = todayISO();
  const rows = slotRowsForBarberDate(barber.id, date, currentBusinessId());
  const counterSummary = buildCounterSummary(date);
  const business = currentBusiness();
  const hasOperationalRows = rows.some(({ status, dayBlocked, appointment }) => dayBlocked || status !== "available" || appointment);
  const activeBarberModule = app.barberOpenPanel || "agenda";
  return appShell(`
    ${renderBarberWelcomeCard(barber, business, counterSummary)}
    ${
      activeBarberModule
        ? renderBarberDedicatedModule(activeBarberModule, {
            barber,
            business,
            rows,
            counterSummary,
            hasOperationalRows,
          })
        : renderBarberModuleHub()
    }
  `);
  return appShell(`
    <section class="dashboard-head">
      <div class="barber-heading">
        ${avatar(barber, "lg")}
        <div>
          <p class="eyebrow">Agenda del dia actual</p>
          <h1>${escapeHTML(barber.name)}</h1>
          <span>${dayNameForISODate(date, true)} · ${date}</span>
        </div>
      </div>
      <button class="secondary-action" data-logout>Salir</button>
    </section>
    <section class="barber-board">
      <div class="status-legend">
        ${Object.entries(STATUS)
          .filter(([id]) => id !== "available")
          .map(([, item]) => `<span class="${item.tone}"><i></i>${item.label}</span>`)
          .join("")}
      </div>
      <div class="admin-slots readonly">
        ${rows
          .map(({ time, status, appointment, dayBlocked }) => `
          <article class="slot-row ${STATUS[status].tone}">
            <div><strong>${slotRange(time)}</strong><span>${dayBlocked ? "Dia bloqueado" : STATUS[status].label}</span></div>
            <div class="slot-client">
              <strong>${escapeHTML(appointment?.clientName || (status === "available" ? "Disponible" : "Sin cliente"))}</strong>
              <small>${appointment?.whatsapp ? displayPhone(appointment.whatsapp) : "Solo lectura"}</small>
            </div>
          </article>`)
          .join("")}
      </div>
    </section>
  `);
}

function barberEditorForm(barber, submitLabel) {
  const businessId = barber?.negocioId || currentBusinessId();
  const services = activeServicesForBusiness(businessId);
  const storedServiceIds = barber ? store.getBarberServiceIds(barber.id, businessId) : [];
  const selectedServiceIds = new Set(
    storedServiceIds.length ? storedServiceIds : services.map((service) => service.id)
  );
  return `<form id="barber-form" class="editor-card ds-form-card ds-crud-form">
    <input type="hidden" name="id" value="${escapeHTML(barber?.id || "")}" />
    ${app.adminBarberMessage ? `<p class="form-note ds-message-card">${escapeHTML(app.adminBarberMessage)}</p>` : ""}
    <div class="form-grid ds-form-grid">
      ${dsInputField("Nombre", "name", { required: true, value: barber?.name || "" })}
      ${dsInputField("WhatsApp", "whatsapp", { value: barber?.whatsapp || "", placeholder: "300 123 4567", extra: 'inputmode="tel"' })}
      ${dsInputField("Usuario", "user", { required: true, value: barber?.user || "" })}
      ${dsInputField("Clave", "password", { required: !barber, value: "", placeholder: barber ? "Deja vacio para conservar la clave actual" : "studio2026" })}
      ${dsInputField("Especialidad", "specialty", { value: barber?.specialty || "Servicio premium", wide: true })}
      ${dsTextField("Fotografia", `<label class="file-control ds-upload-field">Subir imagen<input name="photo" type="file" accept="image/*" /></label>`, { wide: true })}
    </div>
    <div class="service-checklist-block ds-checklist-block">
      <span class="field-label ds-field__label">Servicios disponibles</span>
      ${
        services.length
          ? `<div class="checklist-grid">
              ${services
                .map(
                  (service) => `<label class="check-item ds-check-item">
                    <input type="checkbox" name="serviceIds" value="${escapeHTML(service.id)}" ${selectedServiceIds.has(service.id) ? "checked" : ""} />
                    <span>${escapeHTML(service.name)}</span>
                  </label>`
                )
                .join("")}
            </div>`
          : `<div class="empty-state-card ds-empty-card"><p class="microcopy">Primero crea servicios en el modulo Servicios para poder asignarlos.</p></div>`
      }
    </div>
    <label class="toggle-line ds-toggle-line"><input name="active" type="checkbox" ${barber?.active ?? true ? "checked" : ""} /> Barbero activo</label>
    <div class="button-row ds-button-row">
      <button class="primary-action">${submitLabel}</button>
      ${barber?.id ? `<button class="secondary-action" type="button" data-regenerate-barber-password="${escapeHTML(barber.id)}">Regenerar clave</button>` : ""}
    </div>
  </form>`;
}

function adminSelectedHeader(barber) {
  return `<section class="admin-main selected-admin-head">
    <div class="barber-heading">
      ${avatar(barber, "lg")}
      <div class="barber-heading-copy">
        <p class="eyebrow">${barber.active ? "Activo" : "Inactivo"}</p>
        <h1>${escapeHTML(barber.name)}</h1>
      </div>
    </div>
    <div class="button-row selected-admin-actions">
      <button class="secondary-action" data-admin-home>Inicio</button>
      <button class="secondary-action" data-admin-profile>Perfil</button>
      <button class="secondary-action" data-admin-summary>Resumen</button>
      <button class="primary-action" data-admin-agenda>Agenda</button>
    </div>
  </section>`;
}

function barberSummaryCards(barber, anchorDate, viewer = "barber") {
  const summary = buildBarberSummary(barber.id, anchorDate);
  const title = viewer === "admin" ? "Resumen del barbero" : "Resumen de hoy";
  return dsMetricSection(title, "R", [
    dsMetricCard({ icon: "reservations", label: "Reservas de hoy", value: summary.reservationsToday }),
    dsMetricCard({ icon: "income", label: "Ganancias de hoy", value: formatCOP(summary.barberGainToday) }),
    dsMetricCard({ icon: "income", label: "Ganancias semanales", value: formatCOP(summary.barberGainWeek) }),
  ]);
}

function buildAdminDashboardSummary(businessId, anchorDate = todayISO()) {
  const businessAppointments = store.state.appointments.filter((item) => item.negocioId === businessId);
  const todayAppointments = businessAppointments.filter((item) => item.date === anchorDate);
  const currentWeekDates = getWeekDatesMemo(dateAnchor(anchorDate)).filter((date) => date <= anchorDate);
  const currentWeekSet = new Set(currentWeekDates);
  const reservedToday = todayAppointments.filter((item) => COUNTABLE_STATUSES.has(item.status)).length;
  const realizedToday = todayAppointments.filter(isRealizedAppointment);
  const realizedWeek = businessAppointments.filter(
    (item) => isRealizedAppointment(item) && currentWeekSet.has(item.date)
  );
  const incomeToday = realizedToday.reduce((sum, appointment) => sum + serviceValueForAppointment(appointment), 0);
  const incomeWeek = realizedWeek.reduce((sum, appointment) => sum + serviceValueForAppointment(appointment), 0);
  const gainsToday = realizedToday.reduce(
    (acc, appointment) => {
      const income = calculateAppointmentIncome(appointment);
      acc.admin += income.admin;
      acc.barber += income.barber;
      return acc;
    },
    { admin: 0, barber: 0 }
  );

  return {
    reservedToday,
    incomeToday,
    incomeWeek,
    adminGainToday: gainsToday.admin,
    barberGainToday: gainsToday.barber,
  };
}

function renderDashboardHeroMetrics(items = []) {
  if (!items.length) return "";
  return `<div class="admin-dashboard-hero__metrics ds-stat-grid" aria-label="Resumen de hoy">
    ${items
      .map(
        (item) => `<article class="admin-dashboard-hero__metric ds-stat-card">
          <small>${escapeHTML(item.label)}</small>
          <strong>${escapeHTML(String(item.value))}</strong>
        </article>`
      )
      .join("")}
  </div>`;
}

function adminAccountsSection() {
  const accounts = adminAccountsForBusiness(currentBusinessId());
  return `<section class="admin-main ds-crud-shell">
    <div class="section-title"><span>U</span><h2>Gestionar administradores</h2></div>
    ${app.adminAccountMessage ? `<p class="form-note ds-message-card">${escapeHTML(app.adminAccountMessage)}</p>` : ""}
    <form id="admin-account-create" class="editor-card ds-form-card ds-crud-form">
      <div class="form-grid ds-form-grid">
        ${dsInputField("Nombre completo", "name", { required: true, placeholder: "Nombre del administrador" })}
        ${dsInputField("Usuario", "user", { required: true, placeholder: "usuario" })}
        ${dsInputField("Contrasena", "password", { type: "password", required: true, placeholder: "Clave temporal" })}
        ${dsInputField("Confirmar contrasena", "confirmPassword", { type: "password", required: true, placeholder: "Repetir clave" })}
      </div>
      <label class="toggle-line ds-toggle-line"><input name="active" type="checkbox" checked /> Administrador activo</label>
      <div class="button-row ds-button-row">
        <button class="primary-action">Registrar administrador</button>
      </div>
    </form>
    <div class="admin-account-list ds-card-list">
      ${accounts
        .map((account) => {
          const principal = account.role === PRINCIPAL_ADMIN_ROLE;
          return `<article class="admin-account-card ds-form-card ${principal ? "locked" : ""}">
            <div>
              <p class="eyebrow">${principal ? "Administrador principal" : account.active ? "Activo" : "Inactivo"}</p>
              <h3>${escapeHTML(account.name)}</h3>
              <p>Usuario: ${escapeHTML(account.user)} · Rol: ${escapeHTML(account.role)}</p>
            </div>
            ${
              principal
                ? `<div class="empty-state-card ds-empty-card"><p class="microcopy">Cuenta protegida. No se puede editar ni eliminar desde el panel.</p></div>`
                : `<form class="admin-account-edit form-stack ds-crud-form" data-admin-account-id="${account.id}">
                    <div class="form-grid ds-form-grid">
                      ${dsInputField("Nombre", "name", { required: true, value: account.name })}
                      ${dsInputField("Usuario", "user", { required: true, value: account.user })}
                      ${dsInputField("Nueva contrasena", "password", { type: "password", required: true, value: account.password })}
                      ${dsInputField("Confirmar", "confirmPassword", { type: "password", required: true, value: account.password })}
                    </div>
                    <label class="toggle-line ds-toggle-line"><input name="active" type="checkbox" ${account.active ? "checked" : ""} /> Activo</label>
                    <div class="button-row ds-button-row">
                      <button class="primary-action">Guardar cambios</button>
                      <button class="icon-action danger" type="button" data-delete-admin-account="${account.id}">Eliminar</button>
                    </div>
                  </form>`
            }
          </article>`;
        })
        .join("")}
    </div>
  </section>`;
  return `<section class="admin-main">
    <div class="section-title"><span>U</span><h2>Gestionar administradores</h2></div>
    ${app.adminAccountMessage ? `<p class="form-note">${escapeHTML(app.adminAccountMessage)}</p>` : ""}
    <form id="admin-account-create" class="editor-card">
      <div class="form-grid">
        <label>Nombre completo<input name="name" required placeholder="Nombre del administrador" /></label>
        <label>Usuario<input name="user" required placeholder="usuario" /></label>
        <label>Contrasena<input name="password" type="password" required placeholder="Clave temporal" /></label>
        <label>Confirmar contrasena<input name="confirmPassword" type="password" required placeholder="Repetir clave" /></label>
      </div>
      <label class="toggle-line"><input name="active" type="checkbox" checked /> Administrador activo</label>
      <div class="button-row">
        <button class="primary-action">Registrar administrador</button>
      </div>
    </form>
    <div class="admin-account-list">
      ${accounts
        .map((account) => {
          const principal = account.role === PRINCIPAL_ADMIN_ROLE;
          return `<article class="admin-account-card ${principal ? "locked" : ""}">
            <div>
              <p class="eyebrow">${principal ? "Administrador principal" : account.active ? "Activo" : "Inactivo"}</p>
              <h3>${escapeHTML(account.name)}</h3>
              <p>Usuario: ${escapeHTML(account.user)} · Rol: ${escapeHTML(account.role)}</p>
            </div>
            ${
              principal
                ? `<p class="microcopy">Cuenta protegida. No se puede editar ni eliminar desde el panel.</p>`
                : `<form class="admin-account-edit form-stack" data-admin-account-id="${account.id}">
                    <div class="form-grid">
                      <label>Nombre<input name="name" required value="${escapeHTML(account.name)}" /></label>
                      <label>Usuario<input name="user" required value="${escapeHTML(account.user)}" /></label>
                      <label>Nueva contrasena<input name="password" type="password" required value="${escapeHTML(account.password)}" /></label>
                      <label>Confirmar<input name="confirmPassword" type="password" required value="${escapeHTML(account.password)}" /></label>
                    </div>
                    <label class="toggle-line"><input name="active" type="checkbox" ${account.active ? "checked" : ""} /> Activo</label>
                    <div class="button-row">
                      <button class="primary-action">Guardar cambios</button>
                      <button class="icon-action danger" type="button" data-delete-admin-account="${account.id}">Eliminar</button>
                    </div>
                  </form>`
            }
          </article>`;
        })
        .join("")}
    </div>
  </section>`;
}

function validateAdminAccountPayload(payload, accounts, editingId = "", businessId = currentBusinessId()) {
  if (!payload.name || !payload.user || !payload.password || !payload.confirmPassword) {
    return "Todos los campos son obligatorios.";
  }
  if (payload.password !== payload.confirmPassword) {
    return "Las contrasenas no coinciden.";
  }
  const duplicate = accounts.find(
    (account) => account.businessId === businessId && account.user === payload.user && account.id !== editingId
  );
  if (duplicate) return "Ya existe un administrador con ese usuario.";
  return "";
}

function validateServicePayload(payload) {
  if (!payload.name || !String(payload.value).trim()) {
    return "Nombre y valor del servicio son obligatorios.";
  }
  const adminPercentage = Number(payload.adminPercentage);
  const barberPercentage = Number(payload.barberPercentage);
  const serviceValue = Number(payload.value);
  if (!Number.isFinite(serviceValue) || serviceValue <= 0) {
    return "El valor del servicio debe ser mayor a 0.";
  }
  if (!Number.isFinite(adminPercentage) || !Number.isFinite(barberPercentage)) {
    return "Debes ingresar porcentajes validos.";
  }
  if (adminPercentage < 0 || barberPercentage < 0) {
    return "Los porcentajes no pueden ser negativos.";
  }
  if (adminPercentage + barberPercentage !== 100) {
    return "Los porcentajes deben sumar 100%.";
  }
  return "";
}

function submittedServiceIconId(formData, fallbackValue = "") {
  if (!formData || typeof formData.get !== "function") return String(fallbackValue || "").trim();
  if (!formData.has("serviceIconId")) return String(fallbackValue || "").trim();
  return String(formData.get("serviceIconId") || "").trim();
}

function validateBarberPayload(payload, editingId = "") {
  if (!payload.name || !payload.user || (!editingId && !payload.password)) {
    return "Nombre, usuario y clave del barbero son obligatorios.";
  }
  const normalizedUser = String(payload.user || "").trim().toLowerCase();
  const duplicateUser = store.state.barbers.find(
    (barber) =>
      barber.id !== editingId &&
      barber.negocioId === currentBusinessId() &&
      String(barber.user || "").trim().toLowerCase() === normalizedUser
  );
  if (duplicateUser) {
    return "Ya existe un barbero con ese usuario en este negocio.";
  }
  return "";
}

function serviceEditorCard(service) {
  return `<article class="service-card ds-form-card">
    <form class="service-edit-form form-stack ds-crud-form" data-service-id="${escapeHTML(service.id)}">
      <p class="microcopy ds-inline-status">Estado visible: <strong>${service.active ? "Activo en agenda" : "Inactivo / oculto en agenda"}</strong></p>
      <div class="form-grid ds-form-grid">
        ${dsInputField("Nombre del servicio", "name", { required: true, value: service.name })}
        ${dsInputField("Valor del servicio", "value", { required: true, value: service.value, extra: 'inputmode="numeric"' })}
        ${dsInputField("% administrador", "adminPercentage", { required: true, value: service.adminPercentage, extra: 'inputmode="numeric"' })}
        ${dsInputField("% barbero", "barberPercentage", { required: true, value: service.barberPercentage, extra: 'inputmode="numeric"' })}
      </div>
      ${serviceIconPickerField(service.serviceIconId || "")}
      <label class="toggle-line ds-toggle-line"><input name="active" type="checkbox" ${service.active ? "checked" : ""} /> Servicio activo</label>
      <div class="button-row ds-button-row">
        <button class="primary-action">Guardar servicio</button>
        <button class="icon-action danger" type="button" data-delete-service="${escapeHTML(service.id)}">Eliminar</button>
      </div>
    </form>
  </article>`;
  return `<article class="service-card">
    <form class="service-edit-form form-stack" data-service-id="${escapeHTML(service.id)}">
      <p class="microcopy">Estado visible: <strong>${service.active ? "Activo en agenda" : "Inactivo / oculto en agenda"}</strong></p>
      <div class="form-grid">
        <label>Nombre del servicio<input name="name" required value="${escapeHTML(service.name)}" /></label>
        <label>Valor del servicio<input name="value" required inputmode="numeric" value="${escapeHTML(service.value)}" /></label>
        <label>% administrador<input name="adminPercentage" required inputmode="numeric" value="${escapeHTML(service.adminPercentage)}" /></label>
        <label>% barbero<input name="barberPercentage" required inputmode="numeric" value="${escapeHTML(service.barberPercentage)}" /></label>
      </div>
      <label class="toggle-line"><input name="active" type="checkbox" ${service.active ? "checked" : ""} /> Servicio activo</label>
      <div class="button-row">
        <button class="primary-action">Guardar servicio</button>
        <button class="icon-action danger" type="button" data-delete-service="${escapeHTML(service.id)}">Eliminar</button>
      </div>
    </form>
  </article>`;
}

function servicesSection() {
  const services = [...servicesForBusiness(currentBusinessId())].sort((a, b) => a.name.localeCompare(b.name, "es"));
  const showPublicPrices = publicPricesVisibleForBusiness(currentBusinessId());
  const waitingServices = !services.length && isBusinessDataRefreshPending(currentBusinessId());
  return `<section class="admin-main ds-crud-shell">
    <div class="section-title"><span>S</span><h2>Servicios</h2></div>
    <p class="microcopy">Crea y administra servicios sin tocar todavia el flujo actual de reservas.</p>
    ${app.adminServiceMessage ? `<p class="form-note ds-message-card">${escapeHTML(app.adminServiceMessage)}</p>` : ""}
    <form id="public-price-visibility-form" class="editor-card compact-form ds-form-card ds-crud-form">
      <div class="split-inline ds-inline-control">
        <div>
          <strong>Mostrar precios al cliente</strong>
          <p class="microcopy">Controla si la agenda publica muestra el valor de cada servicio.</p>
        </div>
        <label class="toggle-line ds-toggle-line"><input name="showPublicPrices" type="checkbox" ${showPublicPrices ? "checked" : ""} /> Visible en agenda publica</label>
      </div>
      <div class="button-row ds-button-row">
        <button class="primary-action">Guardar preferencia</button>
      </div>
    </form>
    <form id="service-create-form" class="editor-card ds-form-card ds-crud-form">
      <div class="form-grid ds-form-grid">
        ${dsInputField("Nombre del servicio", "name", { required: true, placeholder: "Corte clasico" })}
        ${dsInputField("Valor del servicio", "value", { required: true, placeholder: "20000", extra: 'inputmode="numeric"' })}
        ${dsInputField("% administrador", "adminPercentage", { required: true, placeholder: "50", extra: 'inputmode="numeric"' })}
        ${dsInputField("% barbero", "barberPercentage", { required: true, placeholder: "50", extra: 'inputmode="numeric"' })}
      </div>
      ${serviceIconPickerField("")}
      <label class="toggle-line ds-toggle-line"><input name="active" type="checkbox" checked /> Servicio activo</label>
      <div class="button-row ds-button-row">
        <button class="primary-action">Crear servicio</button>
      </div>
    </form>
    <div class="service-list ds-card-list">
      ${
        services.length
          ? services.map(serviceEditorCard).join("")
          : waitingServices
            ? `<div class="empty-state-card ds-empty-card"><p class="microcopy">Sincronizando servicios del negocio...</p></div>`
            : `<div class="empty-state-card ds-empty-card"><p class="microcopy">Aun no hay servicios creados.</p></div>`
      }
    </div>
  </section>`;
  return `<section class="admin-main">
    <div class="section-title"><span>S</span><h2>Servicios</h2></div>
    <p class="microcopy">Crea y administra servicios sin tocar todavia el flujo actual de reservas.</p>
    ${app.adminServiceMessage ? `<p class="form-note">${escapeHTML(app.adminServiceMessage)}</p>` : ""}
    <form id="public-price-visibility-form" class="editor-card compact-form">
      <div class="split-inline">
        <div>
          <strong>Mostrar precios al cliente</strong>
          <p class="microcopy">Controla si la agenda publica muestra el valor de cada servicio.</p>
        </div>
        <label class="toggle-line"><input name="showPublicPrices" type="checkbox" ${showPublicPrices ? "checked" : ""} /> Visible en agenda publica</label>
      </div>
      <div class="button-row">
        <button class="primary-action">Guardar preferencia</button>
      </div>
    </form>
    <form id="service-create-form" class="editor-card">
      <div class="form-grid">
        <label>Nombre del servicio<input name="name" required placeholder="Corte clasico" /></label>
        <label>Valor del servicio<input name="value" required inputmode="numeric" placeholder="20000" /></label>
        <label>% administrador<input name="adminPercentage" required inputmode="numeric" placeholder="50" /></label>
        <label>% barbero<input name="barberPercentage" required inputmode="numeric" placeholder="50" /></label>
      </div>
      <label class="toggle-line"><input name="active" type="checkbox" checked /> Servicio activo</label>
      <div class="button-row">
        <button class="primary-action">Crear servicio</button>
      </div>
    </form>
    <div class="service-list">
      ${
        services.length
          ? services.map(serviceEditorCard).join("")
          : waitingServices
            ? `<p class="microcopy">Sincronizando servicios del negocio...</p>`
            : `<p class="microcopy">Aun no hay servicios creados.</p>`
      }
    </div>
  </section>`;
}

function attentionHoursSection() {
  const businessId = currentBusinessId();
  const schedule = businessScheduleConfig(businessId);
  const previewSlots = slotsForBusiness(businessId);
  return `<section class="admin-main ds-crud-shell">
    <div class="section-title"><span>H</span><h2>Horarios de atencion</h2></div>
    <p class="microcopy">Configura las franjas que usara esta barberia en agenda publica, panel administrador y panel barbero.</p>
    ${app.adminScheduleMessage ? `<p class="form-note ds-message-card">${escapeHTML(app.adminScheduleMessage)}</p>` : ""}
    <form id="business-schedule-form" class="editor-card compact-form ds-form-card ds-crud-form">
      <div class="form-grid ds-form-grid">
        ${dsInputField("Hora de apertura", "openingTime", { type: "time", required: true, value: schedule.openingTime })}
        ${dsInputField("Hora de cierre", "closingTime", { type: "time", required: true, value: schedule.closingTime })}
        ${dsSelectField("Duracion del intervalo", "slotDurationMinutes", ALLOWED_SLOT_DURATIONS.map((duration) => ({ value: duration, label: `${duration} minutos` })), { value: schedule.slotDurationMinutes })}
      </div>
      <div class="button-row ds-button-row">
        <button class="primary-action">Guardar horarios</button>
      </div>
    </form>
    <div class="empty-state-card ds-empty-card ds-preview-card">
      <p>Vista previa: ${previewSlots.length} franjas activas.</p>
      <p>${escapeHTML(slotRange(previewSlots[0] || schedule.openingTime, businessId))} hasta ${escapeHTML(slotRange(previewSlots[previewSlots.length - 1] || schedule.openingTime, businessId))}</p>
    </div>
  </section>`;
  return `<section class="admin-main">
    <div class="section-title"><span>H</span><h2>Horarios de atencion</h2></div>
    <p class="microcopy">Configura las franjas que usara esta barberia en agenda publica, panel administrador y panel barbero.</p>
    ${app.adminScheduleMessage ? `<p class="form-note">${escapeHTML(app.adminScheduleMessage)}</p>` : ""}
    <form id="business-schedule-form" class="editor-card compact-form">
      <div class="form-grid">
        <label>Hora de apertura<input name="openingTime" type="time" required value="${escapeHTML(schedule.openingTime)}" /></label>
        <label>Hora de cierre<input name="closingTime" type="time" required value="${escapeHTML(schedule.closingTime)}" /></label>
        <label>Duracion del intervalo
          <select name="slotDurationMinutes">
            ${ALLOWED_SLOT_DURATIONS.map((duration) => `<option value="${duration}" ${duration === schedule.slotDurationMinutes ? "selected" : ""}>${duration} minutos</option>`).join("")}
          </select>
        </label>
      </div>
      <div class="button-row">
        <button class="primary-action">Guardar horarios</button>
      </div>
    </form>
    <div class="empty-state-card">
      <p>Vista previa: ${previewSlots.length} franjas activas.</p>
      <p>${escapeHTML(slotRange(previewSlots[0] || schedule.openingTime, businessId))} hasta ${escapeHTML(slotRange(previewSlots[previewSlots.length - 1] || schedule.openingTime, businessId))}</p>
    </div>
  </section>`;
}

function renderSuperAdmin() {
  const businesses = [...store.state.businesses].sort((a, b) => a.name.localeCompare(b.name, "es"));
  const totalBusinesses = businesses.length;
  const activeBusinesses = businesses.filter((item) => item.active).length;
  const totalBarbers = businesses.reduce((sum, business) => sum + businessBarberCount(business.id), 0);
  const totalServices = businesses.reduce((sum, business) => sum + businessServiceCount(business.id), 0);
  const reservationsToday = businesses.reduce((sum, business) => sum + businessTodayReservationCount(business.id), 0);
  const globalStatusLabel =
    totalBusinesses === 1 ? "1 negocio sincronizado" : `${totalBusinesses} negocios sincronizados`;
  const credentialReveal = app.superAdminCredentialReveal
    ? `<div class="editor-card credential-reveal-card">
        <p class="eyebrow">Credenciales temporales</p>
        <h3>${escapeHTML(app.superAdminCredentialReveal.businessName)}</h3>
        <p>Entorno: <a class="inline-link" href="${escapeHTML(app.superAdminCredentialReveal.publicUrl)}" target="_blank" rel="noreferrer">${escapeHTML(app.superAdminCredentialReveal.publicUrl)}</a></p>
        <p>Usuario: <strong>${escapeHTML(app.superAdminCredentialReveal.user)}</strong></p>
        <p>Clave temporal: <strong>${escapeHTML(app.superAdminCredentialReveal.password)}</strong></p>
        <div class="button-row">
          <button class="secondary-action" type="button" data-clear-super-credentials>Ocultar</button>
        </div>
      </div>`
    : "";
  const businessCards = businesses
    .map((business) => {
      const urls = businessUrlSet(business);
      const admins = loadAdminAccounts().filter(
        (account) => account.businessId === business.id
      );
      const admin = admins[0] || null;
      const adminList = admins.length
        ? admins
            .map(
              (account) => {
                const currentPassword = adminPasswordValue(account);
                const passwordVisible = isAdminPasswordVisible(account.id);
                return `<form class="super-admin-account-edit form-stack" data-admin-account-id="${escapeHTML(account.id)}">
                <div class="form-grid">
                  <label>Nombre<input name="name" required value="${escapeHTML(account.name || "")}" /></label>
                  <label>Usuario<input name="user" required value="${escapeHTML(account.user || "")}" /></label>
                  <label>Creado<input value="${escapeHTML(account.createdAt || todayISO())}" disabled /></label>
                </div>
                <label data-admin-password-row="true">Contrasena fija
                  <div class="password-inline">
                    <input name="password" type="${passwordVisible ? "text" : "password"}" value="${escapeHTML(currentPassword)}" autocomplete="new-password" placeholder="Define una clave fija" />
                    <button class="secondary-action inline-action" type="button" data-toggle-admin-password="${escapeHTML(account.id)}">${passwordVisible ? "Ocultar" : "Mostrar"}</button>
                  </div>
                </label>
                <p class="microcopy">${currentPassword ? "La clave visible pertenece solo a esta barberia y se valida con el login actual." : "Si la clave actual solo existe como hash, define una nueva clave fija para poder verla aqui."}</p>
                <label class="toggle-line"><input name="active" type="checkbox" ${account.active ? "checked" : ""} /> Activo</label>
                <div class="button-row">
                  <button class="primary-action">Guardar admin</button>
                  <button class="secondary-action" type="button" data-regenerate-admin-password="${escapeHTML(account.id)}">Regenerar contrasena</button>
                </div>
              </form>`;
              }
            )
            .join("")
        : `<p class="microcopy">Aun no hay administradores registrados para esta barberia.</p>`;
      return `<article class="admin-account-card">
        <div>
          <p class="eyebrow">${business.active ? "Negocio activo" : "Negocio inactivo"}</p>
          <h3>${escapeHTML(business.name)}</h3>
          <p>Slug: ${escapeHTML(business.slug)}</p>
          <p>Admin principal: ${escapeHTML(admin?.name || "Pendiente")} · Usuario: ${escapeHTML(admin?.user || "Desarrollo")}</p>
          <p>URL publica: <a class="inline-link" href="${escapeHTML(urls.public)}" target="_blank" rel="noreferrer">${escapeHTML(urls.public)}</a></p>
        </div>
        <form class="super-business-edit form-stack" data-business-id="${escapeHTML(business.id)}">
          <div class="form-grid">
            <label>Nombre<input name="name" required value="${escapeHTML(business.name)}" /></label>
            <label>Slug<input name="slug" required value="${escapeHTML(business.slug)}" /></label>
            <label>Tema
              <select name="theme">
                ${Object.entries(BUSINESS_THEMES).map(([key, theme]) => `<option value="${key}" ${business.theme === key ? "selected" : ""}>${escapeHTML(theme.label)}</option>`).join("")}
              </select>
            </label>
            <label class="file-control">Subir logo
              <input name="logo" type="file" accept="image/png,image/jpeg,image/jpg,image/webp" data-business-logo-input="${escapeHTML(business.id)}" />
            </label>
          </div>
          <div class="super-admin-logo-preview">${business.logoUrl || app.superAdminPendingLogos[business.id] ? `<img src="${escapeHTML(app.superAdminPendingLogos[business.id] || business.logoUrl)}" alt="Logo ${escapeHTML(business.name)}" loading="lazy" decoding="async" />` : `<span>Sin logo cargado</span>`}</div>
          <label class="toggle-line"><input name="active" type="checkbox" ${business.active ? "checked" : ""} /> Negocio activo</label>
          <div class="button-row">
            <button class="primary-action">Guardar negocio</button>
            <button class="secondary-action" type="button" data-regenerate-business-password="${escapeHTML(business.id)}">Regenerar clave admin</button>
            <a class="secondary-action inline-action" href="${escapeHTML(urls.public)}" target="_blank" rel="noreferrer">Cliente / Reservas</a>
            <a class="secondary-action inline-action" href="${escapeHTML(urls.panel)}" target="_blank" rel="noreferrer">Admin / Barbero</a>
          </div>
        </form>
        <section class="super-admin-admins">
          <div class="section-title"><span>A</span><h2>Administradores</h2></div>
          ${adminList}
          <form class="super-admin-account-create form-stack" data-business-id="${escapeHTML(business.id)}">
            <div class="form-grid">
              <label>Nombre<input name="name" required placeholder="Nuevo administrador" /></label>
              <label>Usuario<input name="user" required placeholder="usuario.admin" /></label>
            </div>
            <label class="toggle-line"><input name="active" type="checkbox" checked /> Activo</label>
            <div class="button-row">
              <button class="primary-action">Crear administrador</button>
            </div>
          </form>
        </section>
      </article>`;
    })
    .join("");
  const businessCardsUnified = businesses
    .map((business) => {
      const urls = businessUrlSet(business);
      const barberCount = businessBarberCount(business.id);
      const activeServiceCount = businessActiveServiceCount(business.id);
      const reservationCount = businessTodayReservationCount(business.id);
      const environmentAttachment = businessEnvironmentAttachment(business.id);
      return `<article class="admin-account-card super-business-card ds-card ds-card--business">
        <div class="super-business-summary">
          <button class="super-business-summary__trigger" type="button" data-toggle-super-business="${escapeHTML(business.id)}" aria-label="Abrir detalle de ${escapeHTML(business.name)}">
            ${renderBusinessIdentityBlock(business, { pendingLogo: app.superAdminPendingLogos[business.id] || "" })}
            ${renderBusinessStatsRow({
              barberCount,
              serviceCount: activeServiceCount,
              reservationCount,
              environmentLabel: environmentAttachment?.mode === "attached_archive" ? "ZIP/RAR" : "Base",
            })}
          </button>
          <div class="super-business-summary__actions ds-card__actions">
            <a class="secondary-action inline-action" href="${escapeHTML(urls.public)}" target="_blank" rel="noreferrer">Cliente / Reservas</a>
            <a class="secondary-action inline-action" href="${escapeHTML(urls.panel)}" target="_blank" rel="noreferrer">Admin / Barbero</a>
            <button class="secondary-action inline-action" type="button" data-toggle-super-business="${escapeHTML(business.id)}">Acciones</button>
          </div>
        </div>
      </article>`;
    })
    .join("");

  const renderSuperAdminAccountEditCard = (account) => {
    const currentPassword = adminPasswordValue(account);
    const passwordVisible = isAdminPasswordVisible(account.id);
    return `<form class="super-admin-account-edit form-stack ds-form-card" data-admin-account-id="${escapeHTML(account.id)}">
      <div class="form-grid ds-form-grid">
        ${dsInputField("Nombre", "name", { required: true, value: account.name || "" })}
        ${dsInputField("Usuario", "user", { required: true, value: account.user || "" })}
        ${dsInputField("Creado", "created_at_preview", { value: account.createdAt || todayISO(), disabled: true })}
      </div>
      ${dsTextField(
        "Contraseña fija",
        `<div class="password-inline ds-password-inline">
          <input name="password" type="${passwordVisible ? "text" : "password"}" value="${escapeHTML(currentPassword)}" autocomplete="new-password" placeholder="Define una clave fija" />
          <button class="secondary-action inline-action" type="button" data-toggle-admin-password="${escapeHTML(account.id)}">${passwordVisible ? "Ocultar" : "Mostrar"}</button>
        </div>`,
        {
          wide: true,
          hint: currentPassword
            ? "La clave visible pertenece solo a esta barberia y se valida con el login actual."
            : "Si la clave actual solo existe como hash, define una nueva clave fija para poder verla aqui.",
        }
      )}
      <label class="toggle-line ds-toggle-line"><input name="active" type="checkbox" ${account.active ? "checked" : ""} /> Activo</label>
      <div class="button-row ds-button-row">
        <button class="primary-action">Guardar admin</button>
        <button class="secondary-action" type="button" data-regenerate-admin-password="${escapeHTML(account.id)}">Regenerar contraseña</button>
      </div>
    </form>`;
  };

  const renderSuperAdminAccountCreateCard = (business) => `<form class="super-admin-account-create form-stack ds-form-card" data-business-id="${escapeHTML(business.id)}">
    <div class="form-grid ds-form-grid">
      ${dsInputField("Nombre", "name", { required: true, placeholder: "Nuevo administrador" })}
      ${dsInputField("Usuario", "user", { required: true, placeholder: "usuario.admin" })}
    </div>
    <label class="toggle-line ds-toggle-line"><input name="active" type="checkbox" checked /> Activo</label>
    <div class="button-row ds-button-row">
      <button class="primary-action">Crear administrador</button>
    </div>
  </form>`;

  const renderSuperBusinessDetailPanel = (business) => {
    if (!business) {
      return `<section class="admin-main super-admin-list-shell">
        <div class="section-title"><span>!</span><h2>Negocio no encontrado</h2></div>
        <p class="microcopy">Selecciona un negocio del listado para ver su detalle.</p>
      </section>`;
    }
    const urls = businessUrlSet(business);
    const barberCount = businessBarberCount(business.id);
    const activeServiceCount = businessActiveServiceCount(business.id);
    const reservationCount = businessTodayReservationCount(business.id);
    const environmentAttachment = businessEnvironmentAttachment(business.id);
    const admins = loadAdminAccounts().filter(
      (account) => account.businessId === business.id
    );
    const admin = admins[0] || null;
    const adminList = admins.length
      ? admins
          .map((account) => {
            const currentPassword = adminPasswordValue(account);
            const passwordVisible = isAdminPasswordVisible(account.id);
            return `<form class="super-admin-account-edit form-stack" data-admin-account-id="${escapeHTML(account.id)}">
              <div class="form-grid">
                <label>Nombre<input name="name" required value="${escapeHTML(account.name || "")}" /></label>
                <label>Usuario<input name="user" required value="${escapeHTML(account.user || "")}" /></label>
                <label>Creado<input value="${escapeHTML(account.createdAt || todayISO())}" disabled /></label>
              </div>
              <label data-admin-password-row="true">Contrasena fija
                <div class="password-inline">
                  <input name="password" type="${passwordVisible ? "text" : "password"}" value="${escapeHTML(currentPassword)}" autocomplete="new-password" placeholder="Define una clave fija" />
                  <button class="secondary-action inline-action" type="button" data-toggle-admin-password="${escapeHTML(account.id)}">${passwordVisible ? "Ocultar" : "Mostrar"}</button>
                </div>
              </label>
              <p class="microcopy">${currentPassword ? "La clave visible pertenece solo a esta barberia y se valida con el login actual." : "Si la clave actual solo existe como hash, define una nueva clave fija para poder verla aqui."}</p>
              <label class="toggle-line"><input name="active" type="checkbox" ${account.active ? "checked" : ""} /> Activo</label>
              <div class="button-row">
                <button class="primary-action">Guardar admin</button>
                <button class="secondary-action" type="button" data-regenerate-admin-password="${escapeHTML(account.id)}">Regenerar contrasena</button>
              </div>
            </form>`;
          })
          .join("")
      : `<p class="microcopy">Aun no hay administradores registrados para esta barberia.</p>`;

    return `<section class="admin-main super-admin-list-shell super-admin-detail-shell">
      <div class="super-admin-view-toolbar">
        <button class="secondary-action" type="button" data-super-admin-back>Volver al panel principal</button>
        <div>
          <p class="eyebrow">Detalle del negocio</p>
          <h2>${escapeHTML(business.name)}</h2>
        </div>
      </div>
      <article class="admin-account-card super-business-card is-open">
        <div class="super-business-summary">
          <div class="super-business-summary__trigger super-business-summary__trigger--static">
            <div class="super-business-summary__brand">
              <div class="super-business-summary__logo">
                ${business.logoUrl || app.superAdminPendingLogos[business.id] ? `<img src="${escapeHTML(app.superAdminPendingLogos[business.id] || business.logoUrl)}" alt="Logo ${escapeHTML(business.name)}" loading="lazy" decoding="async" />` : `<span>${escapeHTML((business.name || "B").slice(0, 1).toUpperCase())}</span>`}
              </div>
              <div class="super-business-summary__copy">
                <h3>${escapeHTML(business.name)}</h3>
                <p>${business.active ? "Activa" : "Inactiva"} · /barberia/${escapeHTML(business.slug)}</p>
              </div>
            </div>
            <div class="super-business-summary__stats">
              <span><strong>${barberCount}</strong> barberos</span>
              <span><strong>${activeServiceCount}</strong> servicios</span>
              <span><strong>${reservationCount}</strong> reservas hoy</span>
              <span><strong>${environmentAttachment?.mode === "attached_archive" ? "ZIP/RAR" : "Base"}</strong> entorno</span>
            </div>
          </div>
          <div class="super-business-summary__actions">
            <a class="secondary-action inline-action" href="${escapeHTML(urls.public)}" target="_blank" rel="noreferrer">Cliente / Reservas</a>
            <a class="secondary-action inline-action" href="${escapeHTML(urls.panel)}" target="_blank" rel="noreferrer">Admin / Barbero</a>
          </div>
        </div>
        <div class="super-business-panel">
          <div class="super-business-panel__meta">
            <p class="eyebrow">${business.active ? "Negocio activo" : "Negocio inactivo"}</p>
            <p>Slug: ${escapeHTML(business.slug)}</p>
            <p>Admin principal: ${escapeHTML(admin?.name || "Pendiente")} · Usuario: ${escapeHTML(admin?.user || "Desarrollo")}</p>
            <p>Cliente / Reservas: <a class="inline-link" href="${escapeHTML(urls.public)}" target="_blank" rel="noreferrer">${escapeHTML(urls.public)}</a></p>
            <p>Admin / Barbero: <a class="inline-link" href="${escapeHTML(urls.panel)}" target="_blank" rel="noreferrer">${escapeHTML(urls.panel)}</a></p>
            <p>Plantilla asociada: ${escapeHTML(summarizeEnvironmentAttachment(environmentAttachment))}</p>
          </div>
          <form class="super-business-edit form-stack" data-business-id="${escapeHTML(business.id)}">
            <div class="form-grid">
              <label>Nombre<input name="name" required value="${escapeHTML(business.name)}" /></label>
              <label>Slug<input name="slug" required value="${escapeHTML(business.slug)}" /></label>
              <label>Tema
                <select name="theme">
                  ${Object.entries(BUSINESS_THEMES).map(([key, theme]) => `<option value="${key}" ${business.theme === key ? "selected" : ""}>${escapeHTML(theme.label)}</option>`).join("")}
                </select>
              </label>
              <label class="file-control">Subir logo
                <input name="logo" type="file" accept="image/png,image/jpeg,image/jpg,image/webp" data-business-logo-input="${escapeHTML(business.id)}" />
              </label>
            </div>
            <div class="super-admin-logo-preview">${business.logoUrl || app.superAdminPendingLogos[business.id] ? `<img src="${escapeHTML(app.superAdminPendingLogos[business.id] || business.logoUrl)}" alt="Logo ${escapeHTML(business.name)}" loading="lazy" decoding="async" />` : `<span>Sin logo cargado</span>`}</div>
            <label class="toggle-line"><input name="active" type="checkbox" ${business.active ? "checked" : ""} /> Negocio activo</label>
            <div class="button-row">
              <button class="primary-action">Guardar negocio</button>
              <a class="secondary-action inline-action" href="${escapeHTML(urls.public)}" target="_blank" rel="noreferrer">Cliente / Reservas</a>
              <a class="secondary-action inline-action" href="${escapeHTML(urls.panel)}" target="_blank" rel="noreferrer">Admin / Barbero</a>
              ${business.id !== DEFAULT_BUSINESS_ID ? `<button class="secondary-action danger" type="button" data-delete-business="${escapeHTML(business.id)}" data-delete-business-slug="${escapeHTML(business.slug)}" data-delete-business-name="${escapeHTML(business.name)}">Eliminar barberia</button>` : ""}
            </div>
          </form>
          <section class="super-admin-admins">
            <div class="section-title"><span>A</span><h2>Administradores</h2></div>
            ${adminList}
            <form class="super-admin-account-create form-stack" data-business-id="${escapeHTML(business.id)}">
              <div class="form-grid">
                <label>Nombre<input name="name" required placeholder="Nuevo administrador" /></label>
                <label>Usuario<input name="user" required placeholder="usuario.admin" /></label>
              </div>
              <label class="toggle-line"><input name="active" type="checkbox" checked /> Activo</label>
              <div class="button-row">
                <button class="primary-action">Crear administrador</button>
              </div>
            </form>
          </section>
        </div>
      </article>
    </section>`;
  };
  const renderCreateBusinessPanel = () => `<article class="admin-account-card super-business-card is-open">
    <div class="super-business-summary">
      <button class="super-business-summary__trigger" type="button" data-toggle-super-create aria-expanded="${app.superAdminCreateOpen ? "true" : "false"}">
        <div class="super-business-summary__brand">
          <div class="super-business-summary__logo"><span>+</span></div>
          <div class="super-business-summary__copy">
            <h3>Crear barberia</h3>
            <p>Nuevo entorno independiente con plantilla base dinamica</p>
            <div class="super-business-summary__meta-row">
              <span class="super-status-pill is-draft">Preparar alta</span>
            </div>
          </div>
        </div>
        <div class="super-business-summary__stats">
          <span><strong>Nuevo</strong> negocio</span>
          <span><strong>Usuario</strong> Desarrollo</span>
          <span><strong>URL</strong> automatica</span>
        </div>
      </button>
      <div class="super-business-summary__actions">
        <span class="super-business-summary__toggle">${app.superAdminCreateOpen ? "-" : "+"}</span>
      </div>
    </div>
    <div class="super-business-panel">
      <div class="super-admin-create-form">
        <div class="super-admin-create-head">
          <div>
            <p class="eyebrow">Alta guiada</p>
            <h3>Nuevo entorno listo para operar</h3>
            <p class="microcopy">Configura la barberia, el tema visual y el acceso inicial sin salir del centro de mando.</p>
          </div>
          <div class="super-admin-create-badges">
            <span>Slug automatico</span>
            <span>Sesion independiente</span>
            <span>Base dinamica</span>
          </div>
        </div>
        ${app.superAdminMessage ? `<p class="form-note super-admin-global-message-inline">${escapeHTML(app.superAdminMessage)}</p>` : ""}
        ${credentialReveal}
      </div>
      <form id="super-business-create" class="editor-card">
        <div class="form-grid">
          <label>Nombre del negocio<input name="name" required placeholder="Barberia Elite" /></label>
          <label>Slug URL<input name="slug" placeholder="Se genera automaticamente desde el nombre" /></label>
          <label>Tema
            <select name="theme">
              ${Object.entries(BUSINESS_THEMES).map(([key, theme]) => `<option value="${key}">${escapeHTML(theme.label)}</option>`).join("")}
            </select>
          </label>
          <label class="file-control">Subir logo<input name="logo" type="file" accept="image/png,image/jpeg,image/jpg,image/webp" data-business-logo-input="create" /></label>
          <label class="file-control">Adjuntar Entorno<input name="environmentArchive" type="file" accept=".zip,.rar,application/zip,application/vnd.rar,application/x-rar-compressed" data-business-environment-input="create" /></label>
          <label>Administrador principal<input name="adminName" required placeholder="Nombre administrador" /></label>
        </div>
        <div class="super-admin-logo-preview">${app.superAdminPendingLogos.create ? `<img src="${escapeHTML(app.superAdminPendingLogos.create)}" alt="Vista previa logo" loading="lazy" decoding="async" />` : `<span>Vista previa del logo</span>`}</div>
        <div class="super-admin-environment-preview">${app.superAdminPendingEnvironmentArchives.create ? `<strong>${escapeHTML(app.superAdminPendingEnvironmentArchives.create.fileName)}</strong><span>${escapeHTML(summarizeEnvironmentAttachment(app.superAdminPendingEnvironmentArchives.create))}</span>` : `<span>Si no adjuntas entorno, la barberia usara la plantilla base dinamica.</span>`}</div>
        <p class="microcopy">El usuario administrador inicial se crea automaticamente como <strong>Desarrollo</strong> y el sistema genera una clave temporal segura.</p>
        <label class="toggle-line"><input name="active" type="checkbox" checked /> Negocio activo</label>
        <div class="button-row">
          <button class="primary-action">Crear barberia</button>
        </div>
      </form>
    </div>
  </article>`;

  const renderSuperBusinessDetailPanelDS = (business) => {
    if (!business) {
      return `<section class="admin-main super-admin-list-shell">
        ${backToolbar("Detalle del negocio", "Negocio no encontrado")}
        <p class="microcopy">Selecciona un negocio del listado para ver su detalle.</p>
      </section>`;
    }
    const urls = businessUrlSet(business);
    const barberCount = businessBarberCount(business.id);
    const activeServiceCount = businessActiveServiceCount(business.id);
    const reservationCount = businessTodayReservationCount(business.id);
    const environmentAttachment = businessEnvironmentAttachment(business.id);
      const admins = loadAdminAccounts().filter((account) => account.businessId === business.id);
    const admin = admins[0] || null;
    const themeChoices = Object.entries(BUSINESS_THEMES).map(([key, theme]) => ({ value: key, label: theme.label }));
    const adminList = admins.length
      ? admins.map((account) => renderSuperAdminAccountEditCard(account)).join("")
      : `<p class="microcopy">Aun no hay administradores registrados para esta barberia.</p>`;

    return `<section class="admin-main super-admin-list-shell super-admin-detail-shell">
      ${backToolbar("Detalle del negocio", business.name)}
      <article class="admin-account-card super-business-card is-open ds-card ds-card--business-detail">
        <div class="super-business-summary">
          <div class="super-business-summary__trigger super-business-summary__trigger--static">
            ${renderBusinessIdentityBlock(business, { pendingLogo: app.superAdminPendingLogos[business.id] || "" })}
            ${renderBusinessStatsRow({
              barberCount,
              serviceCount: activeServiceCount,
              reservationCount,
              environmentLabel: environmentAttachment?.mode === "attached_archive" ? "ZIP/RAR" : "Base",
            })}
          </div>
          <div class="super-business-summary__actions ds-card__actions">
            <a class="secondary-action inline-action" href="${escapeHTML(urls.public)}" target="_blank" rel="noreferrer">Cliente / Reservas</a>
            <a class="secondary-action inline-action" href="${escapeHTML(urls.panel)}" target="_blank" rel="noreferrer">Admin / Barbero</a>
          </div>
        </div>
        <div class="super-business-panel">
          <div class="super-business-panel__meta ds-meta-grid">
            <div class="super-business-meta-card"><span>Estado</span><strong>${business.active ? "Activo" : "Inactivo"}</strong></div>
            <div class="super-business-meta-card"><span>Slug</span><strong>${escapeHTML(business.slug)}</strong></div>
            <div class="super-business-meta-card"><span>Administrador principal</span><strong>${escapeHTML(admin?.name || "Pendiente")}</strong><small>${escapeHTML(admin?.user || "Desarrollo")}</small></div>
            <div class="super-business-meta-card super-business-meta-card--wide"><span>Plantilla asociada</span><strong>${escapeHTML(summarizeEnvironmentAttachment(environmentAttachment))}</strong></div>
          </div>
          <form class="super-business-edit form-stack ds-form-card" data-business-id="${escapeHTML(business.id)}">
            <div class="form-grid ds-form-grid">
              ${dsInputField("Nombre", "name", { required: true, value: business.name })}
              ${dsInputField("Slug", "slug", { required: true, value: business.slug })}
              ${dsSelectField("Tema", "theme", themeChoices, { value: business.theme || DEFAULT_BUSINESS_THEME_KEY })}
              ${dsFileField("Subir logo", "logo", "image/png,image/jpeg,image/jpg,image/webp", `data-business-logo-input=\"${escapeHTML(business.id)}\"`)}
            </div>
            <div class="super-admin-logo-preview ds-media-preview">${business.logoUrl || app.superAdminPendingLogos[business.id] ? `<img src="${escapeHTML(app.superAdminPendingLogos[business.id] || business.logoUrl)}" alt="Logo ${escapeHTML(business.name)}" loading="lazy" decoding="async" />` : `<span>Sin logo cargado</span>`}</div>
            <label class="toggle-line ds-toggle-line"><input name="active" type="checkbox" ${business.active ? "checked" : ""} /> Negocio activo</label>
            <div class="button-row ds-button-row">
              <button class="primary-action">Guardar negocio</button>
              <a class="secondary-action inline-action" href="${escapeHTML(urls.public)}" target="_blank" rel="noreferrer">Cliente / Reservas</a>
              <a class="secondary-action inline-action" href="${escapeHTML(urls.panel)}" target="_blank" rel="noreferrer">Admin / Barbero</a>
              ${business.id !== DEFAULT_BUSINESS_ID ? `<button class="secondary-action danger" type="button" data-delete-business="${escapeHTML(business.id)}" data-delete-business-slug="${escapeHTML(business.slug)}" data-delete-business-name="${escapeHTML(business.name)}">Eliminar barberia</button>` : ""}
            </div>
          </form>
          <section class="super-admin-admins">
            <div class="section-title"><span>A</span><h2>Administradores</h2></div>
            ${adminList}
            ${renderSuperAdminAccountCreateCard(business)}
          </section>
        </div>
      </article>
    </section>`;
  };

  const renderCreateBusinessPanelDS = () => {
    const themeChoices = Object.entries(BUSINESS_THEMES).map(([key, theme]) => ({ value: key, label: theme.label }));
    return `<article class="admin-account-card super-business-card is-open ds-card ds-card--business-detail">
      <div class="super-business-summary">
        <button class="super-business-summary__trigger" type="button" data-toggle-super-create aria-expanded="${app.superAdminCreateOpen ? "true" : "false"}">
          <div class="super-business-summary__brand ds-business-identity">
            <div class="super-business-summary__logo ds-business-identity__logo"><span>+</span></div>
            <div class="super-business-summary__copy ds-business-identity__copy">
              <h3>Crear barberia</h3>
              <div class="ds-business-identity__meta">
                ${dsStatusBadge(true, "Alta guiada", "Alta guiada")}
                <span class="ds-inline-path">${dsIcon("create")}<span>Plantilla base dinámica</span></span>
              </div>
            </div>
          </div>
          <div class="super-business-summary__stats ds-stat-grid">
            ${dsStatItem({ icon: "business", label: "Negocio", value: "Nuevo" })}
            ${dsStatItem({ icon: "admin", label: "Usuario", value: "Desarrollo" })}
            ${dsStatItem({ icon: "url", label: "URL", value: "Automática" })}
            ${dsStatItem({ icon: "environment", label: "Entorno", value: "Base" })}
          </div>
        </button>
      </div>
      <div class="super-business-panel">
        ${app.superAdminMessage ? `<p class="form-note">${escapeHTML(app.superAdminMessage)}</p>` : ""}
        ${credentialReveal}
        <form id="super-business-create" class="editor-card ds-form-card">
          <div class="form-grid ds-form-grid">
            ${dsInputField("Nombre del negocio", "name", { required: true, placeholder: "Barberia Elite" })}
            ${dsInputField("Slug URL", "slug", { placeholder: "Se genera automaticamente desde el nombre" })}
            ${dsSelectField("Tema", "theme", themeChoices, { value: DEFAULT_BUSINESS_THEME_KEY })}
            ${dsFileField("Subir logo", "logo", "image/png,image/jpeg,image/jpg,image/webp", "data-business-logo-input=\"create\"")}
            ${dsFileField("Adjuntar entorno", "environmentArchive", ".zip,.rar,application/zip,application/vnd.rar,application/x-rar-compressed", "data-business-environment-input=\"create\"")}
            ${dsInputField("Administrador principal", "adminName", { required: true, placeholder: "Nombre administrador" })}
          </div>
          <div class="super-admin-logo-preview ds-media-preview">${app.superAdminPendingLogos.create ? `<img src="${escapeHTML(app.superAdminPendingLogos.create)}" alt="Vista previa logo" loading="lazy" decoding="async" />` : `<span>Vista previa del logo</span>`}</div>
          <div class="super-admin-environment-preview ds-media-preview">${app.superAdminPendingEnvironmentArchives.create ? `<strong>${escapeHTML(app.superAdminPendingEnvironmentArchives.create.fileName)}</strong><span>${escapeHTML(summarizeEnvironmentAttachment(app.superAdminPendingEnvironmentArchives.create))}</span>` : `<span>Si no adjuntas entorno, la barberia usara la plantilla base dinamica.</span>`}</div>
          <p class="microcopy">El usuario administrador inicial se crea automaticamente como <strong>Desarrollo</strong> y el sistema genera una clave temporal segura.</p>
          <label class="toggle-line ds-toggle-line"><input name="active" type="checkbox" checked /> Negocio activo</label>
          <div class="button-row ds-button-row">
            <button class="primary-action">Crear barberia</button>
          </div>
        </form>
      </div>
    </article>`;
  };

  const deleteTarget = app.superAdminDeleteTarget
    ? store.businessById(app.superAdminDeleteTarget.id) || app.superAdminDeleteTarget
    : null;
  const deleteBusinessDialog = deleteTarget
    ? `<dialog class="modal-dialog destructive-dialog" open>
        <form id="delete-business-form" class="form-stack">
          <div class="section-title"><span>!</span><h2>Eliminar barberia</h2></div>
          ${app.superAdminMessage ? `<p class="form-note">${escapeHTML(app.superAdminMessage)}</p>` : ""}
          ${app.superAdminMessage ? `<p class="form-note">${escapeHTML(app.superAdminMessage)}</p>` : ""}
          <p class="microcopy">¿Seguro que deseas eliminar esta barberia? Esta accion eliminara todo su entorno, datos y archivos asociados. No se podra deshacer.</p>
          <div class="empty-state-card">
            <strong>${escapeHTML(deleteTarget.name || "Barberia")}</strong>
            <p class="microcopy">Para confirmar, escribe exactamente el nombre o slug:</p>
            <code>${escapeHTML(deleteTarget.slug || deleteTarget.name || "")}</code>
          </div>
          <label>Confirmacion
            <input name="confirmation" required autocomplete="off" placeholder="${escapeHTML(deleteTarget.slug || deleteTarget.name || "")}" />
          </label>
          <div class="button-row">
            <button class="secondary-action" type="button" data-cancel-delete-business ${app.superAdminDeleting ? "disabled" : ""}>Cancelar</button>
            <button class="secondary-action danger" ${app.superAdminDeleting ? "disabled" : ""}>${app.superAdminDeleting ? "Eliminando..." : "Eliminar definitivamente"}</button>
          </div>
        </form>
      </dialog>`
    : "";

  if (!app.superAdminSession) {
    return appShell(`
      <section class="login-view">
        <div class="login-panel">
          <p class="eyebrow">Control global</p>
          <h1>SUPER ADMIN</h1>
          <form id="super-admin-login" class="form-stack">
            <label>Usuario<input name="user" required autocomplete="username" placeholder="SDMcompany" /></label>
            <label>Clave<input name="password" type="password" required autocomplete="current-password" placeholder="••••••••" /></label>
            ${app.superAdminLoginError ? `<p class="form-error">${escapeHTML(app.superAdminLoginError)}</p>` : ""}
            <button class="primary-action">Entrar</button>
          </form>
        </div>
      </section>
    `);
  }

  return appShell(`
    <section class="dashboard-head">
      <div>
        <p class="eyebrow">Control SaaS</p>
        <h1>SUPER ADMINISTRADOR</h1>
      </div>
      <button class="secondary-action" data-super-logout>Cerrar sesion</button>
    </section>
    <section class="admin-stack">
      <section class="admin-main dashboard-lite">
        <div class="section-title"><span>N</span><h2>Negocios registrados</h2></div>
        ${app.superAdminMessage ? `<p class="form-note">${escapeHTML(app.superAdminMessage)}</p>` : ""}
        <div class="dashboard-cards">
          <div><span>Total negocios</span><strong>${businesses.length}</strong></div>
          <div><span>Negocios activos</span><strong>${businesses.filter((item) => item.active).length}</strong></div>
          <div><span>URL base</span><strong>/barberia/:slug</strong></div>
        </div>
      </section>
      <section class="admin-main">
        <div class="section-title"><span>+</span><h2>Nuevo negocio</h2></div>
        ${renderCreateBusinessPanel()}
      </section>
      <section class="admin-main">
        <div class="section-title"><span>L</span><h2>Listado de negocios</h2></div>
        <div class="admin-account-list">
          ${businessCards || `<p class="microcopy">Aun no hay negocios registrados.</p>`}
        </div>
      </section>
      ${deleteBusinessDialog}
    </section>
  `);
}

function renderSuperAdminV2() {
  if (isSessionExpired(app.superAdminSession, { role: "super_admin", businessSlug: DEFAULT_BUSINESS_SLUG })) {
    app.superAdminSession = null;
    app.superAdminLoginError = "La sesion del super administrador no corresponde a este dispositivo. Inicia sesion nuevamente.";
    clearSuperAdminSession();
  }
  app.superAdminSession = refreshSessionHeartbeat(
    SUPER_ADMIN_SESSION_KEY,
    DEFAULT_BUSINESS_SLUG,
    app.superAdminSession,
    { role: "super_admin", businessSlug: DEFAULT_BUSINESS_SLUG }
  );
  ensureRemoteSessionHealth("super_admin", app.superAdminSession);

  const expectedSuperAdminScope = "super-admin:global";
  const hasSuperAdminScopeLoaded =
    store.remoteLoadedScopeKey === expectedSuperAdminScope ||
    store.remoteLoadedScopes?.has(expectedSuperAdminScope);
  const stagedBusinesses = store.state.businesses || [];
  const onlySeedBusinessVisible =
    stagedBusinesses.length === 1 &&
    stagedBusinesses[0]?.id === DEFAULT_BUSINESS_ID &&
    !hasSuperAdminScopeLoaded;
  const remoteAttemptStillFresh =
    !store.remoteAttemptedAt || Date.now() - store.remoteAttemptedAt < 5000;
  const shouldShowSuperAdminLoading =
    app.superAdminSession &&
    store.supabase &&
    !hasSuperAdminScopeLoaded &&
    !store.remoteLastError &&
    (store.syncInFlight || remoteAttemptStillFresh || onlySeedBusinessVisible);
  if (shouldShowSuperAdminLoading) {
    return appShell(`
      <section class="dashboard-head super-admin-hero">
        <div class="super-admin-hero__copy">
          <p class="eyebrow">Control SaaS</p>
          <h1>SUPER ADMINISTRADOR</h1>
          <span>Sincronizando el centro de mando global de tus barberias.</span>
        </div>
        <div class="super-admin-hero__actions">
          <div class="super-admin-hero__pulse">
            <span>Estado global</span>
            <strong>Conectando negocios</strong>
          </div>
          <button class="secondary-action" data-super-logout>Cerrar sesion</button>
        </div>
      </section>
      <section class="admin-stack">
        <section class="admin-main super-admin-loading">
          <div class="section-title"><span>S</span><h2>Sincronizando barberias</h2></div>
          <p class="microcopy">Cargando la informacion completa de tus negocios desde Supabase...</p>
          <div class="super-admin-loading-grid" aria-hidden="true">
            <span></span><span></span><span></span>
          </div>
        </section>
      </section>
    `);
  }

  const businesses = [...store.state.businesses].sort((a, b) => a.name.localeCompare(b.name, "es"));
  const totalBusinesses = businesses.length;
  const activeBusinesses = businesses.filter((item) => item.active).length;
  const totalBarbers = businesses.reduce((sum, business) => sum + businessBarberCount(business.id), 0);
  const totalServices = businesses.reduce((sum, business) => sum + businessServiceCount(business.id), 0);
  const reservationsToday = businesses.reduce((sum, business) => sum + businessTodayReservationCount(business.id), 0);
  const globalStatusLabel =
    activeBusinesses === 1 ? "1 negocio activo" : `${activeBusinesses} negocios activos`;
  const credentialReveal = app.superAdminCredentialReveal
    ? `<div class="editor-card credential-reveal-card">
        <p class="eyebrow">Credenciales temporales</p>
        <h3>${escapeHTML(app.superAdminCredentialReveal.businessName)}</h3>
        <p>Entorno: <a class="inline-link" href="${escapeHTML(app.superAdminCredentialReveal.publicUrl)}" target="_blank" rel="noreferrer">${escapeHTML(app.superAdminCredentialReveal.publicUrl)}</a></p>
        <p>Usuario: <strong>${escapeHTML(app.superAdminCredentialReveal.user)}</strong></p>
        <p>Clave temporal: <strong>${escapeHTML(app.superAdminCredentialReveal.password)}</strong></p>
        <div class="button-row">
          <button class="secondary-action" type="button" data-clear-super-credentials>Ocultar</button>
        </div>
      </div>`
    : "";

  const businessCards = businesses
    .map((business) => {
      const urls = businessUrlSet(business);
      const isOpen = app.superAdminOpenBusinessId === business.id;
      const barberCount = businessBarberCount(business.id);
      const totalServiceCount = businessServiceCount(business.id);
      const activeServiceCount = businessActiveServiceCount(business.id);
      const serviceLabel = `<strong>${activeServiceCount}</strong> servicios`;
      const reservationCount = businessTodayReservationCount(business.id);
      const environmentAttachment = businessEnvironmentAttachment(business.id);
      return `<article class="admin-account-card super-business-card">
        <div class="super-business-summary">
          <button class="super-business-summary__trigger" type="button" data-toggle-super-business="${escapeHTML(business.id)}" aria-label="Abrir detalle de ${escapeHTML(business.name)}">
            <div class="super-business-summary__brand">
              <div class="super-business-summary__logo">
                ${business.logoUrl || app.superAdminPendingLogos[business.id] ? `<img src="${escapeHTML(app.superAdminPendingLogos[business.id] || business.logoUrl)}" alt="Logo ${escapeHTML(business.name)}" loading="lazy" decoding="async" />` : `<span>${escapeHTML((business.name || "B").slice(0, 1).toUpperCase())}</span>`}
              </div>
              <div class="super-business-summary__copy">
                <h3>${escapeHTML(business.name)}</h3>
                <p>${business.active ? "Activa" : "Inactiva"} · /barberia/${escapeHTML(business.slug)}</p>
              </div>
            </div>
            <div class="super-business-summary__stats">
              <span><strong>${barberCount}</strong> barberos</span>
              <span>${serviceLabel}</span>
              <span><strong>${reservationCount}</strong> reservas hoy</span>
              <span><strong>${environmentAttachment?.mode === "attached_archive" ? "ZIP/RAR" : "Base"}</strong> entorno</span>
            </div>
          </button>
          <div class="super-business-summary__actions">
            <a class="secondary-action inline-action" href="${escapeHTML(urls.public)}" target="_blank" rel="noreferrer">Cliente / Reservas</a>
            <a class="secondary-action inline-action" href="${escapeHTML(urls.panel)}" target="_blank" rel="noreferrer">Admin / Barbero</a>
            <button class="secondary-action inline-action" type="button" data-toggle-super-business="${escapeHTML(business.id)}">Ver detalle</button>
          </div>
        </div>
      </article>`;
      const admins = loadAdminAccounts().filter(
        (account) => account.businessId === business.id
      );
      const admin = admins[0] || null;
      const adminList = admins.length
        ? admins
            .map(
              (account) => {
                const currentPassword = adminPasswordValue(account);
                const passwordVisible = isAdminPasswordVisible(account.id);
                return `<form class="super-admin-account-edit form-stack" data-admin-account-id="${escapeHTML(account.id)}">
                <div class="form-grid">
                  <label>Nombre<input name="name" required value="${escapeHTML(account.name || "")}" /></label>
                  <label>Usuario<input name="user" required value="${escapeHTML(account.user || "")}" /></label>
                  <label>Creado<input value="${escapeHTML(account.createdAt || todayISO())}" disabled /></label>
                </div>
                <label data-admin-password-row="true">Contrasena fija
                  <div class="password-inline">
                    <input name="password" type="${passwordVisible ? "text" : "password"}" value="${escapeHTML(currentPassword)}" autocomplete="new-password" placeholder="Define una clave fija" />
                    <button class="secondary-action inline-action" type="button" data-toggle-admin-password="${escapeHTML(account.id)}">${passwordVisible ? "Ocultar" : "Mostrar"}</button>
                  </div>
                </label>
                <p class="microcopy">${currentPassword ? "La clave visible pertenece solo a esta barberia y se valida con el login actual." : "Si la clave actual solo existe como hash, define una nueva clave fija para poder verla aqui."}</p>
                <label class="toggle-line"><input name="active" type="checkbox" ${account.active ? "checked" : ""} /> Activo</label>
                <div class="button-row">
                  <button class="primary-action">Guardar admin</button>
                  <button class="secondary-action" type="button" data-regenerate-admin-password="${escapeHTML(account.id)}">Regenerar contrasena</button>
                </div>
              </form>`;
              }
            )
            .join("")
        : `<p class="microcopy">Aun no hay administradores registrados para esta barberia.</p>`;

      return `<article class="admin-account-card super-business-card ${isOpen ? "is-open" : ""}">
        <div class="super-business-summary">
          <button class="super-business-summary__trigger" type="button" data-toggle-super-business="${escapeHTML(business.id)}" aria-expanded="${isOpen ? "true" : "false"}">
          <div class="super-business-summary__brand">
            <div class="super-business-summary__logo">
              ${business.logoUrl || app.superAdminPendingLogos[business.id] ? `<img src="${escapeHTML(app.superAdminPendingLogos[business.id] || business.logoUrl)}" alt="Logo ${escapeHTML(business.name)}" loading="lazy" decoding="async" />` : `<span>${escapeHTML((business.name || "B").slice(0, 1).toUpperCase())}</span>`}
            </div>
            <div class="super-business-summary__copy">
              <h3>${escapeHTML(business.name)}</h3>
              <p>${business.active ? "Activa" : "Inactiva"} · /barberia/${escapeHTML(business.slug)}</p>
            </div>
          </div>
          <div class="super-business-summary__stats">
            <span><strong>${barberCount}</strong> barberos</span>
            <span>${serviceLabel}</span>
            <span><strong>${reservationCount}</strong> reservas hoy</span>
            <span><strong>${environmentAttachment?.mode === "attached_archive" ? "ZIP/RAR" : "Base"}</strong> entorno</span>
          </div>
          </button>
          <div class="super-business-summary__actions">
            <a class="secondary-action inline-action" href="${escapeHTML(urls.public)}" target="_blank" rel="noreferrer">Cliente / Reservas</a>
            <a class="secondary-action inline-action" href="${escapeHTML(urls.panel)}" target="_blank" rel="noreferrer">Admin / Barbero</a>
            <span class="super-business-summary__toggle">${isOpen ? "-" : "+"}</span>
          </div>
        </div>
        <div class="super-business-panel" ${isOpen ? "" : "hidden"}>
          <div class="super-business-panel__meta">
            <p class="eyebrow">${business.active ? "Negocio activo" : "Negocio inactivo"}</p>
            <p>Slug: ${escapeHTML(business.slug)}</p>
            <p>Admin principal: ${escapeHTML(admin?.name || "Pendiente")} · Usuario: ${escapeHTML(admin?.user || "Desarrollo")}</p>
            <p>Cliente / Reservas: <a class="inline-link" href="${escapeHTML(urls.public)}" target="_blank" rel="noreferrer">${escapeHTML(urls.public)}</a></p>
            <p>Admin / Barbero: <a class="inline-link" href="${escapeHTML(urls.panel)}" target="_blank" rel="noreferrer">${escapeHTML(urls.panel)}</a></p>
            <p>Plantilla asociada: ${escapeHTML(summarizeEnvironmentAttachment(environmentAttachment))}</p>
          </div>
          <form class="super-business-edit form-stack" data-business-id="${escapeHTML(business.id)}">
            <div class="form-grid">
              <label>Nombre<input name="name" required value="${escapeHTML(business.name)}" /></label>
              <label>Slug<input name="slug" required value="${escapeHTML(business.slug)}" /></label>
              <label>Tema
                <select name="theme">
                  ${Object.entries(BUSINESS_THEMES).map(([key, theme]) => `<option value="${key}" ${business.theme === key ? "selected" : ""}>${escapeHTML(theme.label)}</option>`).join("")}
                </select>
              </label>
              <label class="file-control">Subir logo
                <input name="logo" type="file" accept="image/png,image/jpeg,image/jpg,image/webp" data-business-logo-input="${escapeHTML(business.id)}" />
              </label>
            </div>
            <div class="super-admin-logo-preview">${business.logoUrl || app.superAdminPendingLogos[business.id] ? `<img src="${escapeHTML(app.superAdminPendingLogos[business.id] || business.logoUrl)}" alt="Logo ${escapeHTML(business.name)}" loading="lazy" decoding="async" />` : `<span>Sin logo cargado</span>`}</div>
            <label class="toggle-line"><input name="active" type="checkbox" ${business.active ? "checked" : ""} /> Negocio activo</label>
            <div class="button-row">
              <button class="primary-action">Guardar negocio</button>
              <a class="secondary-action inline-action" href="${escapeHTML(urls.public)}" target="_blank" rel="noreferrer">Cliente / Reservas</a>
              <a class="secondary-action inline-action" href="${escapeHTML(urls.panel)}" target="_blank" rel="noreferrer">Admin / Barbero</a>
              ${business.id !== DEFAULT_BUSINESS_ID ? `<button class="secondary-action danger" type="button" data-delete-business="${escapeHTML(business.id)}" data-delete-business-slug="${escapeHTML(business.slug)}" data-delete-business-name="${escapeHTML(business.name)}">Eliminar barberia</button>` : ""}
            </div>
          </form>
          <section class="super-admin-admins">
            <div class="section-title"><span>A</span><h2>Administradores</h2></div>
            ${adminList}
            <form class="super-admin-account-create form-stack" data-business-id="${escapeHTML(business.id)}">
              <div class="form-grid">
                <label>Nombre<input name="name" required placeholder="Nuevo administrador" /></label>
                <label>Usuario<input name="user" required placeholder="usuario.admin" /></label>
              </div>
              <label class="toggle-line"><input name="active" type="checkbox" checked /> Activo</label>
              <div class="button-row">
                <button class="primary-action">Crear administrador</button>
              </div>
            </form>
          </section>
        </div>
      </article>`;
    })
    .join("");
  const renderSuperBusinessDetailPanel = (business) => {
    if (!business) {
      return `<section class="admin-main super-admin-list-shell">
        <div class="super-admin-view-toolbar">
          <button class="secondary-action" type="button" data-super-admin-back>Volver al panel principal</button>
          <div>
            <p class="eyebrow">Detalle del negocio</p>
            <h2>Negocio no encontrado</h2>
          </div>
        </div>
        <p class="microcopy">Selecciona un negocio del listado para ver su detalle.</p>
      </section>`;
    }
    const urls = businessUrlSet(business);
    const barberCount = businessBarberCount(business.id);
    const activeServiceCount = businessActiveServiceCount(business.id);
    const reservationCount = businessTodayReservationCount(business.id);
    const environmentAttachment = businessEnvironmentAttachment(business.id);
    const admins = loadAdminAccounts().filter(
      (account) => account.businessId === business.id
    );
    const admin = admins[0] || null;
    const adminList = admins.length
      ? admins
          .map((account) => {
            const currentPassword = adminPasswordValue(account);
            const passwordVisible = isAdminPasswordVisible(account.id);
            return `<form class="super-admin-account-edit form-stack" data-admin-account-id="${escapeHTML(account.id)}">
              <div class="form-grid">
                <label>Nombre<input name="name" required value="${escapeHTML(account.name || "")}" /></label>
                <label>Usuario<input name="user" required value="${escapeHTML(account.user || "")}" /></label>
                <label>Creado<input value="${escapeHTML(account.createdAt || todayISO())}" disabled /></label>
              </div>
              <label data-admin-password-row="true">Contrasena fija
                <div class="password-inline">
                  <input name="password" type="${passwordVisible ? "text" : "password"}" value="${escapeHTML(currentPassword)}" autocomplete="new-password" placeholder="Define una clave fija" />
                  <button class="secondary-action inline-action" type="button" data-toggle-admin-password="${escapeHTML(account.id)}">${passwordVisible ? "Ocultar" : "Mostrar"}</button>
                </div>
              </label>
              <p class="microcopy">${currentPassword ? "La clave visible pertenece solo a esta barberia y se valida con el login actual." : "Si la clave actual solo existe como hash, define una nueva clave fija para poder verla aqui."}</p>
              <label class="toggle-line"><input name="active" type="checkbox" ${account.active ? "checked" : ""} /> Activo</label>
              <div class="button-row">
                <button class="primary-action">Guardar admin</button>
                <button class="secondary-action" type="button" data-regenerate-admin-password="${escapeHTML(account.id)}">Regenerar contrasena</button>
              </div>
            </form>`;
          })
          .join("")
      : `<p class="microcopy">Aun no hay administradores registrados para esta barberia.</p>`;

    return `<section class="admin-main super-admin-list-shell super-admin-detail-shell">
      <div class="super-admin-view-toolbar">
        <button class="secondary-action" type="button" data-super-admin-back>Volver al panel principal</button>
        <div>
          <p class="eyebrow">Detalle del negocio</p>
          <h2>${escapeHTML(business.name)}</h2>
        </div>
      </div>
      <article class="admin-account-card super-business-card is-open">
        <div class="super-business-summary">
          <div class="super-business-summary__trigger super-business-summary__trigger--static">
            <div class="super-business-summary__brand">
              <div class="super-business-summary__logo">
                ${business.logoUrl || app.superAdminPendingLogos[business.id] ? `<img src="${escapeHTML(app.superAdminPendingLogos[business.id] || business.logoUrl)}" alt="Logo ${escapeHTML(business.name)}" loading="lazy" decoding="async" />` : `<span>${escapeHTML((business.name || "B").slice(0, 1).toUpperCase())}</span>`}
              </div>
              <div class="super-business-summary__copy">
                <h3>${escapeHTML(business.name)}</h3>
                <p>${business.active ? "Activa" : "Inactiva"} · /barberia/${escapeHTML(business.slug)}</p>
              </div>
            </div>
            <div class="super-business-summary__stats">
              <span><strong>${barberCount}</strong> barberos</span>
              <span><strong>${activeServiceCount}</strong> servicios</span>
              <span><strong>${reservationCount}</strong> reservas hoy</span>
              <span><strong>${environmentAttachment?.mode === "attached_archive" ? "ZIP/RAR" : "Base"}</strong> entorno</span>
            </div>
          </div>
          <div class="super-business-summary__actions">
            <a class="secondary-action inline-action" href="${escapeHTML(urls.public)}" target="_blank" rel="noreferrer">Cliente / Reservas</a>
            <a class="secondary-action inline-action" href="${escapeHTML(urls.panel)}" target="_blank" rel="noreferrer">Admin / Barbero</a>
          </div>
        </div>
        <div class="super-business-panel">
          <div class="super-business-panel__meta">
            <p class="eyebrow">${business.active ? "Negocio activo" : "Negocio inactivo"}</p>
            <p>Slug: ${escapeHTML(business.slug)}</p>
            <p>Admin principal: ${escapeHTML(admin?.name || "Pendiente")} · Usuario: ${escapeHTML(admin?.user || "Desarrollo")}</p>
            <p>Cliente / Reservas: <a class="inline-link" href="${escapeHTML(urls.public)}" target="_blank" rel="noreferrer">${escapeHTML(urls.public)}</a></p>
            <p>Admin / Barbero: <a class="inline-link" href="${escapeHTML(urls.panel)}" target="_blank" rel="noreferrer">${escapeHTML(urls.panel)}</a></p>
            <p>Plantilla asociada: ${escapeHTML(summarizeEnvironmentAttachment(environmentAttachment))}</p>
          </div>
          <form class="super-business-edit form-stack" data-business-id="${escapeHTML(business.id)}">
            <div class="form-grid">
              <label>Nombre<input name="name" required value="${escapeHTML(business.name)}" /></label>
              <label>Slug<input name="slug" required value="${escapeHTML(business.slug)}" /></label>
              <label>Tema
                <select name="theme">
                  ${Object.entries(BUSINESS_THEMES).map(([key, theme]) => `<option value="${key}" ${business.theme === key ? "selected" : ""}>${escapeHTML(theme.label)}</option>`).join("")}
                </select>
              </label>
              <label class="file-control">Subir logo
                <input name="logo" type="file" accept="image/png,image/jpeg,image/jpg,image/webp" data-business-logo-input="${escapeHTML(business.id)}" />
              </label>
            </div>
            <div class="super-admin-logo-preview">${business.logoUrl || app.superAdminPendingLogos[business.id] ? `<img src="${escapeHTML(app.superAdminPendingLogos[business.id] || business.logoUrl)}" alt="Logo ${escapeHTML(business.name)}" loading="lazy" decoding="async" />` : `<span>Sin logo cargado</span>`}</div>
            <label class="toggle-line"><input name="active" type="checkbox" ${business.active ? "checked" : ""} /> Negocio activo</label>
            <div class="button-row">
              <button class="primary-action">Guardar negocio</button>
              <a class="secondary-action inline-action" href="${escapeHTML(urls.public)}" target="_blank" rel="noreferrer">Cliente / Reservas</a>
              <a class="secondary-action inline-action" href="${escapeHTML(urls.panel)}" target="_blank" rel="noreferrer">Admin / Barbero</a>
              ${business.id !== DEFAULT_BUSINESS_ID ? `<button class="secondary-action danger" type="button" data-delete-business="${escapeHTML(business.id)}" data-delete-business-slug="${escapeHTML(business.slug)}" data-delete-business-name="${escapeHTML(business.name)}">Eliminar barberia</button>` : ""}
            </div>
          </form>
          <section class="super-admin-admins">
            <div class="section-title"><span>A</span><h2>Administradores</h2></div>
            ${adminList}
            <form class="super-admin-account-create form-stack" data-business-id="${escapeHTML(business.id)}">
              <div class="form-grid">
                <label>Nombre<input name="name" required placeholder="Nuevo administrador" /></label>
                <label>Usuario<input name="user" required placeholder="usuario.admin" /></label>
              </div>
              <label class="toggle-line"><input name="active" type="checkbox" checked /> Activo</label>
              <div class="button-row">
                <button class="primary-action">Crear administrador</button>
              </div>
            </form>
          </section>
        </div>
      </article>
    </section>`;
  };

  const renderCreateBusinessPanel = () => `<article class="admin-account-card super-business-card is-open">
    <div class="super-business-summary">
      <button class="super-business-summary__trigger" type="button" data-toggle-super-create aria-expanded="${app.superAdminCreateOpen ? "true" : "false"}">
        <div class="super-business-summary__brand">
          <div class="super-business-summary__logo"><span>+</span></div>
          <div class="super-business-summary__copy">
            <h3>Crear barberia</h3>
            <p>Nuevo entorno independiente con plantilla base dinamica</p>
          </div>
        </div>
        <div class="super-business-summary__stats">
          <span><strong>Nuevo</strong> negocio</span>
          <span><strong>Usuario</strong> Desarrollo</span>
          <span><strong>URL</strong> automatica</span>
        </div>
      </button>
      <div class="super-business-summary__actions">
        <span class="super-business-summary__toggle">${app.superAdminCreateOpen ? "-" : "+"}</span>
      </div>
    </div>
    <div class="super-business-panel">
      ${app.superAdminMessage ? `<p class="form-note">${escapeHTML(app.superAdminMessage)}</p>` : ""}
      ${credentialReveal}
      <form id="super-business-create" class="editor-card">
        <div class="form-grid">
          <label>Nombre del negocio<input name="name" required placeholder="Barberia Elite" /></label>
          <label>Slug URL<input name="slug" placeholder="Se genera automaticamente desde el nombre" /></label>
          <label>Tema
            <select name="theme">
              ${Object.entries(BUSINESS_THEMES).map(([key, theme]) => `<option value="${key}">${escapeHTML(theme.label)}</option>`).join("")}
            </select>
          </label>
          <label class="file-control">Subir logo<input name="logo" type="file" accept="image/png,image/jpeg,image/jpg,image/webp" data-business-logo-input="create" /></label>
          <label class="file-control">Adjuntar Entorno<input name="environmentArchive" type="file" accept=".zip,.rar,application/zip,application/vnd.rar,application/x-rar-compressed" data-business-environment-input="create" /></label>
          <label>Administrador principal<input name="adminName" required placeholder="Nombre administrador" /></label>
        </div>
        <div class="super-admin-logo-preview">${app.superAdminPendingLogos.create ? `<img src="${escapeHTML(app.superAdminPendingLogos.create)}" alt="Vista previa logo" loading="lazy" decoding="async" />` : `<span>Vista previa del logo</span>`}</div>
        <div class="super-admin-environment-preview">${app.superAdminPendingEnvironmentArchives.create ? `<strong>${escapeHTML(app.superAdminPendingEnvironmentArchives.create.fileName)}</strong><span>${escapeHTML(summarizeEnvironmentAttachment(app.superAdminPendingEnvironmentArchives.create))}</span>` : `<span>Si no adjuntas entorno, la barberia usara la plantilla base dinamica.</span>`}</div>
        <p class="microcopy">El usuario administrador inicial se crea automaticamente como <strong>Desarrollo</strong> y el sistema genera una clave temporal segura.</p>
        <label class="toggle-line"><input name="active" type="checkbox" checked /> Negocio activo</label>
        <div class="button-row">
          <button class="primary-action">Crear barberia</button>
        </div>
      </form>
    </div>
  </article>`;

  const renderServiceIconsManagerPanel = () => {
    const icons = [...(store.state.serviceIcons || [])].sort((left, right) =>
      String(left.name || "").localeCompare(String(right.name || ""), "es")
    );
    const draft = app.superAdminServiceIconDraft || null;
    return `<article class="admin-account-card super-business-card is-open">
      <div class="super-business-summary">
        <div class="super-business-summary__trigger super-business-summary__trigger--static">
          <div class="super-business-summary__brand">
            <div class="super-business-summary__logo"><span>I</span></div>
            <div class="super-business-summary__copy">
              <h3>Biblioteca global de iconos</h3>
              <p>Los iconos cargados aqui quedan disponibles para todas las barberias.</p>
            </div>
          </div>
          <div class="super-business-summary__stats">
            <span><strong>${icons.filter((icon) => parseActiveFlag(icon.active, true)).length}</strong> activos</span>
            <span><strong>${icons.length}</strong> totales</span>
          </div>
        </div>
      </div>
      <div class="super-business-panel">
        ${app.superAdminMessage ? `<p class="form-note">${escapeHTML(app.superAdminMessage)}</p>` : ""}
        <form id="service-icon-create-form" class="editor-card ds-form-card ds-crud-form">
          <div class="form-grid ds-form-grid">
            ${dsInputField("Nombre del icono", "name", { required: true, placeholder: "Bigote" })}
            ${dsTextField(
              "Imagen",
              `<label class="file-control ds-upload-field">Seleccionar imagen<input name="icon" type="file" accept="image/png,image/jpeg,image/jpg,image/webp" data-service-icon-input="create" /></label>`,
              {
                hint: "Formatos permitidos: PNG, JPG, JPEG y WEBP. Maximo 1 MB.",
              }
            )}
          </div>
          <div class="super-admin-logo-preview ds-media-preview service-icon-upload-preview">${draft?.previewSrc ? `<img src="${escapeHTML(draft.previewSrc)}" alt="Vista previa icono" loading="lazy" decoding="async" />` : `<span>Vista previa del icono</span>`}</div>
          <div class="button-row ds-button-row">
            <button class="primary-action" ${app.superAdminServiceIconBusy ? "disabled" : ""}>Guardar icono</button>
          </div>
        </form>
        <div class="admin-account-list ds-card-list service-icon-admin-grid">
          ${
            icons.length
              ? icons
                  .map(
                    (icon) => `<article class="ds-form-card service-icon-admin-card ${parseActiveFlag(icon.active, true) ? "is-active" : "is-inactive"}">
              <div class="service-icon-admin-card__preview">
                ${serviceIconImgMarkup(icon, "service-icon-admin-card__image")}
              </div>
              <div class="service-icon-admin-card__copy">
                <div>
                  <strong>${escapeHTML(icon.name)}</strong>
                  ${dsStatusBadge(parseActiveFlag(icon.active, true), "Activo", "Inactivo")}
                </div>
                <small>${serviceIconUsageCount(icon.id)} servicio(s) usando este icono.</small>
              </div>
              <div class="button-row ds-button-row service-icon-admin-card__actions">
                <button class="secondary-action inline-action" type="button" data-toggle-service-icon="${escapeHTML(icon.id)}">${parseActiveFlag(icon.active, true) ? "Desactivar" : "Activar"}</button>
                <button class="secondary-action danger inline-action" type="button" data-delete-service-icon="${escapeHTML(icon.id)}">Eliminar</button>
              </div>
            </article>`
                  )
                  .join("")
              : `<div class="empty-state-card ds-empty-card"><p class="microcopy">Aun no hay iconos cargados. Sube el primero desde este modulo.</p></div>`
          }
        </div>
      </div>
    </article>`;
  };

  const deleteTarget = app.superAdminDeleteTarget
    ? store.businessById(app.superAdminDeleteTarget.id) || app.superAdminDeleteTarget
    : null;
  const deleteBusinessDialog = deleteTarget
    ? `<dialog class="modal-dialog destructive-dialog" open>
        <form id="delete-business-form" class="form-stack">
          <div class="section-title"><span>!</span><h2>Eliminar barberia</h2></div>
          <p class="microcopy">¿Seguro que deseas eliminar esta barberia? Esta accion eliminara todo su entorno, datos y archivos asociados. No se podra deshacer.</p>
          <div class="empty-state-card">
            <strong>${escapeHTML(deleteTarget.name || "Barberia")}</strong>
            <p class="microcopy">Para confirmar, escribe exactamente el nombre o slug:</p>
            <code>${escapeHTML(deleteTarget.slug || deleteTarget.name || "")}</code>
          </div>
          <label>Confirmacion
            <input name="confirmation" required autocomplete="off" placeholder="${escapeHTML(deleteTarget.slug || deleteTarget.name || "")}" />
          </label>
          <div class="button-row">
            <button class="secondary-action" type="button" data-cancel-delete-business ${app.superAdminDeleting ? "disabled" : ""}>Cancelar</button>
            <button class="secondary-action danger" ${app.superAdminDeleting ? "disabled" : ""}>${app.superAdminDeleting ? "Eliminando..." : "Eliminar definitivamente"}</button>
          </div>
        </form>
      </dialog>`
    : "";

  if (!app.superAdminSession) {
    return appShell(`
      <section class="login-view">
        <div class="login-panel">
          <p class="eyebrow">Control global</p>
          <h1>SUPER ADMIN</h1>
          <form id="super-admin-login" class="form-stack">
            <label>Usuario<input name="user" required autocomplete="username" placeholder="SDMcompany" /></label>
            <label>Clave<input name="password" type="password" required autocomplete="current-password" placeholder="••••••••" /></label>
            ${app.superAdminLoginError ? `<p class="form-error">${escapeHTML(app.superAdminLoginError)}</p>` : ""}
            <button class="primary-action">Entrar</button>
          </form>
        </div>
      </section>
    `);
  }

  const activeSuperAdminView = app.superAdminOpenBusinessId
    ? "business-detail"
    : app.superAdminView || "home";
  const selectedSuperBusiness = app.superAdminOpenBusinessId
    ? store.businessById(app.superAdminOpenBusinessId)
    : null;
  const heroMetrics = `<div class="super-admin-hero__metrics ds-metric-grid" aria-label="Metricas globales">
    ${dsMetricCard({ icon: "business", label: "Total negocios", value: totalBusinesses })}
    ${dsMetricCard({ icon: "services", label: "Servicios totales", value: totalServices })}
    ${dsMetricCard({ icon: "barbers", label: "Barberos totales", value: totalBarbers })}
    ${dsMetricCard({ icon: "reservations", label: "Reservas de hoy", value: reservationsToday })}
  </div>`;
  const metricsSection = `<section class="admin-main dashboard-lite super-admin-command-board">
    <div class="section-title"><span>N</span><h2>Centro de mando</h2></div>
    <div class="dashboard-cards super-admin-metrics ds-metric-grid">
      ${dsMetricCard({ icon: "business", label: "Total negocios", value: totalBusinesses })}
      ${dsMetricCard({ icon: "status", label: "Negocios activos", value: activeBusinesses })}
      ${dsMetricCard({ icon: "services", label: "Servicios totales", value: totalServices })}
      ${dsMetricCard({ icon: "barbers", label: "Barberos totales", value: totalBarbers })}
      ${dsMetricCard({ icon: "reservations", label: "Reservas de hoy", value: reservationsToday })}
    </div>
  </section>`;
  const backToolbar = (eyebrow, title) => `<div class="super-admin-view-toolbar">
    <button class="secondary-action" type="button" data-super-admin-back>Volver al panel principal</button>
    <div>
      <p class="eyebrow">${escapeHTML(eyebrow)}</p>
      <h2>${escapeHTML(title)}</h2>
    </div>
  </div>`;
  const homeContent = `<section class="admin-main super-admin-command-board">
    <div class="section-title"><span>S</span><h2>Panel principal</h2></div>
    ${app.superAdminMessage ? `<p class="form-note super-admin-global-message-inline">${escapeHTML(app.superAdminMessage)}</p>` : ""}
    <div class="super-admin-module-grid">
      <button class="super-admin-module-card" type="button" data-super-admin-view="businesses">
        <span>01</span><strong>Negocios registrados</strong><small>${totalBusinesses} negocios · ${activeBusinesses} activos · Acciones y detalles por barberia.</small>
      </button>
      <button class="super-admin-module-card" type="button" data-super-admin-view="create">
        <span>02</span><strong>Crear negocio</strong><small>Alta guiada de nueva barberia con entorno independiente.</small>
      </button>
      <button class="super-admin-module-card" type="button" data-super-admin-view="service-icons">
        <span>03</span><strong>Iconos de servicios</strong><small>Galeria global reutilizable para cualquier barberia.</small>
      </button>
      <button class="super-admin-module-card" type="button" data-super-admin-view="operations">
        <span>03</span><strong>Operación SaaS</strong><small>Configuracion, sesiones independientes y estado operativo en una sola vista.</small>
      </button>
    </div>
  </section>`;
  const businessesContent = `<section class="admin-main super-admin-list-shell">
    ${backToolbar("Negocios", "Negocios registrados")}
    <div class="admin-account-list super-admin-business-list">
      ${businessCards || `<p class="microcopy">Aun no hay negocios registrados.</p>`}
    </div>
  </section>`;
  const createContent = `<section class="admin-main super-admin-create-shell">
    ${backToolbar("Alta guiada", "Crear negocio")}
    ${renderCreateBusinessPanel()}
  </section>`;
  const serviceIconsContent = `<section class="admin-main super-admin-create-shell">
    ${backToolbar("Recursos globales", "Iconos de servicios")}
    ${renderServiceIconsManagerPanel()}
  </section>`;
  const settingsContent = `<section class="admin-main super-admin-command-board">
    ${backToolbar("Configuracion", "Configuracion general")}
    <div class="dashboard-cards super-admin-metrics ds-metric-grid">
      ${dsMetricCard({ icon: "theme", label: "Tema visual", value: "Urban Neon" })}
      ${dsMetricCard({ icon: "url", label: "URL publica", value: "/barberia/:slug" })}
      ${dsMetricCard({ icon: "environment", label: "Entorno base", value: "Dinamico" })}
    </div>
  </section>`;
  const sessionsContent = `<section class="admin-main super-admin-command-board">
    ${backToolbar("Accesos", "Sesiones / accesos")}
    <div class="dashboard-cards super-admin-metrics ds-metric-grid">
      ${dsMetricCard({ icon: "admin", label: "Super Admin", value: "Independiente" })}
      ${dsMetricCard({ icon: "business", label: "Admin negocio", value: "Por barberia" })}
      ${dsMetricCard({ icon: "barbers", label: "Barberos", value: "Por negocio" })}
    </div>
  </section>`;
  const auditContent = `<section class="admin-main super-admin-command-board">
    ${backToolbar("Estado", "Auditoria / estado")}
    <div class="dashboard-cards super-admin-metrics ds-metric-grid">
      ${dsMetricCard({ icon: "status", label: "Negocios activos", value: activeBusinesses })}
      ${dsMetricCard({ icon: "reservations", label: "Reservas hoy", value: reservationsToday })}
      ${dsMetricCard({ icon: "business", label: "Estado global", value: globalStatusLabel })}
    </div>
  </section>`;
  const operationsContent = `<section class="admin-main super-admin-command-board">
    ${backToolbar("Operacion", "Operación SaaS")}
    <div class="dashboard-cards super-admin-metrics ds-metric-grid">
      ${dsMetricCard({ icon: "status", label: "Negocios activos", value: activeBusinesses })}
      ${dsMetricCard({ icon: "url", label: "URL publica", value: "/barberia/:slug" })}
      ${dsMetricCard({ icon: "theme", label: "Tema visual", value: "Urban Neon" })}
      ${dsMetricCard({ icon: "admin", label: "Sesiones", value: "Por negocio" })}
      ${dsMetricCard({ icon: "business", label: "Estado", value: globalStatusLabel })}
    </div>
  </section>`;
  const superAdminContent =
    activeSuperAdminView === "summary"
      ? `${backToolbar("Resumen", "Resumen global")}${metricsSection}`
      : activeSuperAdminView === "businesses"
        ? businessesContent
        : activeSuperAdminView === "create"
          ? createContent
          : activeSuperAdminView === "service-icons"
            ? serviceIconsContent
          : activeSuperAdminView === "business-detail"
            ? renderSuperBusinessDetailPanel(selectedSuperBusiness)
            : activeSuperAdminView === "settings"
              ? operationsContent
              : activeSuperAdminView === "sessions"
                ? operationsContent
                : activeSuperAdminView === "audit"
                  ? operationsContent
                  : activeSuperAdminView === "operations"
                    ? operationsContent
                  : homeContent;

  return appShell(`
    <section class="dashboard-head super-admin-hero">
      <div class="super-admin-hero__copy">
        <p class="eyebrow">Control SaaS</p>
        <h1>SUPER ADMINISTRADOR</h1>
        <span>Administra negocios, accesos, entornos y operaciones desde un centro de mando visual, claro y preparado para crecer.</span>
      </div>
      <div class="super-admin-hero__actions">
        ${heroMetrics}
        <button class="secondary-action" data-super-logout>Cerrar sesion</button>
      </div>
    </section>
    <section class="admin-stack super-admin-dashboard">
      ${superAdminContent}
      ${deleteBusinessDialog}
    </section>
  `);
}

function backgroundSettingsSection() {
  return `<section class="admin-main ds-crud-shell">
    <div class="section-title"><span>V</span><h2>Fondo dinamico</h2></div>
    <p class="microcopy">Carga un video corto MP4 o WEBM de maximo 10 MB. Recomendado: 10 a 15 segundos.</p>
    ${app.backgroundMessage ? `<p class="form-note ds-message-card">${escapeHTML(app.backgroundMessage)}</p>` : ""}
    <form id="background-form" class="editor-card ds-form-card ds-crud-form">
      ${dsTextField("Video de fondo", `<label class="file-control ds-upload-field">Seleccionar video<input name="video" type="file" accept="video/mp4,video/webm" /></label>`, { wide: true, hint: "Usa videos breves para mantener una experiencia fluida." })}
      ${
        app.pendingBackgroundVideo
          ? `<video class="background-preview" src="${app.pendingBackgroundVideo.src}" controls muted loop playsinline></video>`
          : app.backgroundMedia?.type === "video"
            ? `<video class="background-preview" src="${app.backgroundMedia.src}" controls muted loop playsinline></video>`
            : `<div class="background-preview static-preview"><span>Fondo estatico activo</span></div>`
      }
      <div class="button-row ds-button-row">
        <button class="primary-action" type="submit" ${app.pendingBackgroundVideo ? "" : "disabled"}>Guardar video como fondo</button>
        <button class="secondary-action" type="button" data-reset-background>Volver al fondo estatico</button>
      </div>
    </form>
  </section>`;
}

function adminDashboardSection() {
  const businessId = currentBusinessId();
  const summary = buildAdminDashboardSummary(businessId, todayISO());
  const open = app.adminOpenPanel === "dashboard-summary";

  return renderAccordionPanel(
    "dashboard-summary",
    "D",
    "Resumen de hoy",
    `
      <div class="dashboard-cards ds-metric-grid">
        ${[
          dsMetricCard({ icon: "reservations", label: "Reservas de hoy", value: summary.reservedToday }),
          dsMetricCard({ icon: "income", label: "Ingresos de hoy", value: formatCOP(summary.incomeToday) }),
          dsMetricCard({ icon: "income", label: "Ingresos de la semana actual", value: formatCOP(summary.incomeWeek) }),
          dsMetricCard({ icon: "admin", label: "Ganancias del administrador", value: formatCOP(summary.adminGainToday) }),
          dsMetricCard({ icon: "barbers", label: "Ganancias de los barberos", value: formatCOP(summary.barberGainToday) }),
        ].join("")}
      </div>
      <label class="toggle-line sound-toggle"><input type="checkbox" data-sound-toggle ${app.soundEnabled ? "checked" : ""} /> Sonido sutil para nueva reserva</label>
    `,
    open
  );
}

function renderAdminBarbersBoard(businessBarbers, waitingBarbers, counterSummary) {
  return `<section class="admin-main admin-barber-board" id="admin-barbers-board">
    <div class="section-title"><span>A</span><h2>Barberos</h2></div>
    <p class="microcopy">Selecciona un barbero para abrir automaticamente su agenda del dia actual.</p>
    ${
      businessBarbers.length
        ? `<div class="admin-barber-grid">
          ${businessBarbers
            .map(
              (barber) => `<button class="barber-card admin-person-card ${barber.active ? "" : "inactive"}" data-admin-barber="${barber.id}">
                ${avatar(barber, "md")}
                <span class="barber-card-copy">
                  <strong>${escapeHTML(barber.name)}</strong>
                  <small>${barber.whatsapp ? displayPhone(barber.whatsapp) : "Sin WhatsApp"}</small>
                  <small>Usuario: ${escapeHTML(barber.user)} · Clave protegida</small>
                </span>
                ${renderCounter(counterValue(counterSummary.weeklyByBarber, barber.id))}
              </button>`
            )
            .join("")}
        </div>`
        : waitingBarbers
          ? `<div class="empty-state-card">
              <p>Sincronizando barberos del negocio...</p>
              <p>Estamos validando la informacion mas reciente antes de mostrar un estado vacio.</p>
            </div>`
          : `<div class="empty-state-card">
              <p>Aun no hay barberos creados en este negocio.</p>
              <p>Crea el primer barbero desde el modulo Nuevo barbero para empezar a gestionar la agenda.</p>
            </div>`
    }
  </section>`;
}

function renderAdminModuleToolbar(title) {
  return `<section class="admin-main admin-module-toolbar-card">
    <div class="admin-module-toolbar">
      <button class="secondary-action" type="button" data-admin-module-back>Atras</button>
      <div class="admin-module-toolbar__copy">
        <p class="eyebrow">Panel administrativo</p>
        <h2>${escapeHTML(title)}</h2>
      </div>
    </div>
  </section>`;
}

function renderAdminModuleHub(businessBarbers, waitingBarbers, counterSummary) {
  return `<section class="admin-stack admin-dashboard-shell admin-module-hub">
    ${renderAdminBarbersBoard(businessBarbers, waitingBarbers, counterSummary)}
    ${renderAccordionPanel("new-barber", "+", "Nuevo barbero", "", false)}
    ${renderAccordionPanel("attention-hours", "H", "Horarios de atencion", "", false)}
    ${renderAccordionPanel("services", "S", "Servicios", "", false)}
    ${renderAccordionPanel("dynamic-bg", "U", "Fondo dinamico", "", false)}
    ${isPrincipalAdmin() ? renderAccordionPanel("admin-accounts", "U", "Gestionar administradores", "", false) : ""}
  </section>`;
}

function renderAdminDedicatedModule(moduleId, context) {
  const {
    businessBarbers = [],
    waitingBarbers = false,
    counterSummary = { weeklyByBarber: {} },
  } = context || {};

  if (moduleId === "dashboard-summary") {
    return `<section class="admin-stack admin-module-stack">
      ${renderAdminModuleToolbar("Resumen de hoy")}
      ${adminDashboardSection()}
    </section>`;
  }

  if (moduleId === "barbers") {
    return `<section class="admin-stack admin-module-stack">
      ${renderAdminModuleToolbar("Barberos")}
      ${renderAdminBarbersBoard(businessBarbers, waitingBarbers, counterSummary)}
    </section>`;
  }

  if (moduleId === "new-barber") {
    return `<section class="admin-stack admin-module-stack">
      ${renderAdminModuleToolbar("Nuevo barbero")}
      <section class="admin-main ds-crud-shell">
        <div class="section-title"><span>+</span><h2>Nuevo barbero</h2></div>
        ${barberEditorForm(null, "Crear barbero")}
      </section>
    </section>`;
  }

  if (moduleId === "attention-hours") {
    return `<section class="admin-stack admin-module-stack">
      ${renderAdminModuleToolbar("Horarios de atencion")}
      ${attentionHoursSection()}
    </section>`;
  }

  if (moduleId === "services") {
    return `<section class="admin-stack admin-module-stack">
      ${renderAdminModuleToolbar("Servicios")}
      ${servicesSection()}
    </section>`;
  }

  if (moduleId === "dynamic-bg") {
    return `<section class="admin-stack admin-module-stack">
      ${renderAdminModuleToolbar("Fondo dinamico")}
      ${backgroundSettingsSection()}
    </section>`;
  }

  if (moduleId === "admin-accounts" && isPrincipalAdmin()) {
    return `<section class="admin-stack admin-module-stack">
      ${renderAdminModuleToolbar("Gestionar administradores")}
      ${adminAccountsSection()}
    </section>`;
  }

  return renderAdminModuleHub();
}

function roleLabelForDashboard(role) {
  if (role === "barber") return "Barbero";
  if (role === "super_admin") return "Super Administrador";
  return "Administrador";
}

function renderAdminWelcomeCard(account, business) {
  const accountName = account?.name || app.adminSession?.name || "Administrador";
  const roleLabel = roleLabelForDashboard(account?.role || "admin");
  const businessName = business?.name || "Barberia";
  const summary = buildAdminDashboardSummary(currentBusinessId(), todayISO());
  const now = new Date();
  const rawDateLabel = BOGOTA_LONG_DATE_FORMATTER.format(now);
  const todayLabel = rawDateLabel ? `${rawDateLabel.charAt(0).toUpperCase()}${rawDateLabel.slice(1)}` : "";
  const timeLabel = BOGOTA_TIME_FORMATTER.format(now);
  const online = typeof navigator === "undefined" ? true : navigator.onLine !== false;
  const statusLabel = online ? "En linea" : "Sin conexion";

  return `
    <section class="dashboard-head admin-dashboard-hero">
      <div class="admin-dashboard-hero__brand">
        <div class="admin-dashboard-hero__copy">
          <p class="eyebrow">Panel administrativo</p>
          <h1>Bienvenido, ${escapeHTML(accountName)}</h1>
          <span>${escapeHTML(`${roleLabel} · ${businessName}`)}</span>
        </div>
        <div class="admin-dashboard-hero__facts" aria-label="Resumen del entorno">
          <article class="admin-dashboard-hero__fact">
            <small>Fecha</small>
            <strong>${escapeHTML(todayLabel)}</strong>
          </article>
          <article class="admin-dashboard-hero__fact">
            <small>Hora actual</small>
            <strong>${escapeHTML(timeLabel)}</strong>
          </article>
          <article class="admin-dashboard-hero__fact">
            <small>Estado del sistema</small>
            <strong class="admin-dashboard-hero__status ${online ? "is-online" : "is-offline"}">${escapeHTML(statusLabel)}</strong>
          </article>
        </div>
        ${renderDashboardHeroMetrics([
          { label: "Reservas hoy", value: summary.reservedToday },
          { label: "Ingresos hoy", value: formatCOP(summary.incomeToday) },
          { label: "Ingresos semana", value: formatCOP(summary.incomeWeek) },
          { label: "Ganancia admin", value: formatCOP(summary.adminGainToday) },
          { label: "Ganancia barberos", value: formatCOP(summary.barberGainToday) },
        ])}
      </div>
      <div class="admin-dashboard-hero__side">
        <button class="secondary-action" data-admin-logout>Cerrar sesion</button>
      </div>
    </section>
  `;
}

function renderBarberWelcomeCard(barber, business, counterSummary) {
  const accountName = barber?.name || app.barberSession?.name || "Barbero";
  const businessName = business?.name || "Barberia";
  const summary = buildBarberSummary(barber.id, todayISO());
  const now = new Date();
  const rawDateLabel = BOGOTA_LONG_DATE_FORMATTER.format(now);
  const todayLabel = rawDateLabel ? `${rawDateLabel.charAt(0).toUpperCase()}${rawDateLabel.slice(1)}` : "";
  const timeLabel = BOGOTA_TIME_FORMATTER.format(now);
  const online = typeof navigator === "undefined" ? true : navigator.onLine !== false;
  const statusLabel = online ? "En linea" : "Sin conexion";

  return `
    <section class="dashboard-head admin-dashboard-hero barber-dashboard-hero">
      <div class="admin-dashboard-hero__brand">
        <div class="admin-dashboard-hero__copy">
          <p class="eyebrow">Panel barbero</p>
          <h1>Bienvenido, ${escapeHTML(accountName)}</h1>
          <span>${escapeHTML(`Barbero · ${businessName}`)}</span>
        </div>
        <div class="admin-dashboard-hero__facts" aria-label="Resumen del entorno del barbero">
          <article class="admin-dashboard-hero__fact">
            <small>Fecha</small>
            <strong>${escapeHTML(todayLabel)}</strong>
          </article>
          <article class="admin-dashboard-hero__fact">
            <small>Hora actual</small>
            <strong>${escapeHTML(timeLabel)}</strong>
          </article>
          <article class="admin-dashboard-hero__fact">
            <small>Estado del sistema</small>
            <strong class="admin-dashboard-hero__status ${online ? "is-online" : "is-offline"}">${escapeHTML(statusLabel)}</strong>
          </article>
        </div>
        ${renderDashboardHeroMetrics([
          { label: "Reservas hoy", value: summary.reservationsToday },
          { label: "Ganancias hoy", value: formatCOP(summary.barberGainToday) },
          { label: "Ganancias semana", value: formatCOP(summary.barberGainWeek) },
          { label: "Reservas semana", value: counterValue(counterSummary.weeklyByBarber, barber?.id) },
        ])}
      </div>
      <div class="admin-dashboard-hero__side">
        <button class="secondary-action" data-logout>Cerrar sesion</button>
      </div>
    </section>
  `;
}

function renderBarberModuleToolbar(title) {
  return `<section class="admin-main admin-module-toolbar-card">
    <div class="admin-module-toolbar">
      <button class="secondary-action" type="button" data-barber-module-back>Atras</button>
      <div class="admin-module-toolbar__copy">
        <p class="eyebrow">Panel barbero</p>
        <h2>${escapeHTML(title)}</h2>
      </div>
    </div>
  </section>`;
}

function renderBarberModuleCard(id, label, title, description) {
  return `<button class="super-admin-module-card barber-module-card" type="button" data-barber-panel="${escapeHTML(id)}">
    <span>${escapeHTML(label)}</span>
    <strong>${escapeHTML(title)}</strong>
    <small>${escapeHTML(description)}</small>
  </button>`;
}

function renderBarberProfilePanel(barber, business, counterSummary) {
  return `<section class="admin-main admin-barber-board barber-profile-card">
    <div class="section-title"><span>P</span><h2>Perfil</h2></div>
    <div class="barber-heading">
      ${avatar(barber, "lg")}
      <div class="barber-heading-copy">
        <p class="eyebrow">${barber.active ? "Barbero activo" : "Barbero inactivo"}</p>
        <h1>${escapeHTML(barber.name)}</h1>
        <span>Usuario: ${escapeHTML(barber.user)} · ${escapeHTML(barber.specialty || "Servicio premium")}</span>
      </div>
      ${renderCounter(counterValue(counterSummary.weeklyByBarber, barber.id), "header-counter")}
    </div>
    <div class="admin-dashboard-hero__facts barber-profile-facts">
      <article class="admin-dashboard-hero__fact">
        <small>WhatsApp</small>
        <strong>${escapeHTML(barber.whatsapp ? displayPhone(barber.whatsapp) : "Sin WhatsApp")}</strong>
      </article>
      <article class="admin-dashboard-hero__fact">
        <small>Negocio</small>
        <strong>${escapeHTML(business?.name || "Barberia")}</strong>
      </article>
      <article class="admin-dashboard-hero__fact">
        <small>Estado</small>
        <strong class="admin-dashboard-hero__status ${barber.active ? "is-online" : "is-offline"}">${barber.active ? "Disponible" : "Inactivo"}</strong>
      </article>
    </div>
  </section>`;
}

function renderBarberDaysPanel() {
  return `<section class="admin-main admin-barber-board barber-schedule-panel">
    <div class="section-title"><span>D</span><h2>Seleccionar dia</h2></div>
    ${renderWeekSelector(app.barberDate, "data-barber-date", { anchorDate: app.barberDate })}
  </section>`;
}

function renderBarberAgendaPanel(rows, counterSummary, hasOperationalRows) {
  return `<section class="admin-main admin-barber-board barber-schedule-panel">
    <div class="agenda-toolbar">
      <div>
        <div class="section-title"><span>H</span><h2>Agenda del dia</h2></div>
        <p class="microcopy">${dayNameForISODate(app.barberDate, true)} · ${app.barberDate}</p>
      </div>
      <button class="secondary-action" data-barber-days>Cambiar dia</button>
    </div>
    <div class="status-legend">
      ${Object.entries(STATUS).map(([, item]) => `<span class="${item.tone}"><i></i>${item.label}</span>`).join("")}
    </div>
    <div class="status-legend visit-legend">
      ${Object.entries(VISIT_STATE_META).map(([, item]) => `<span class="visit-state-pill ${item.tone}">${escapeHTML(item.label)}</span>`).join("")}
    </div>
    ${
      !hasOperationalRows
        ? `<div class="empty-state-card">
            <p>Aun no tienes citas, bloqueos ni citas fijadas para este dia.</p>
            <p>Cuando el administrador o los clientes registren movimientos, apareceran aqui en tiempo real.</p>
          </div>`
        : ""
    }
    <div class="admin-slots readonly">
      ${rows
        .map(({ time, status, appointment, dayBlocked }) => {
          const unavailable = isUnavailableSlot(app.barberDate, time, status);
          const serviceName = serviceNameForAppointment(appointment);
          const statusLabel = operationalStatusLabel({ appointment, status, dayBlocked, unavailable });
          return `
        <article class="slot-row ${STATUS[status].tone} ${unavailable ? "unavailable" : ""}">
          <div><strong>${slotRange(time)}</strong><span>${statusLabel}</span></div>
          <div class="slot-client">
            <strong>${escapeHTML(appointment?.clientName || (status === "available" ? "Disponible" : "Sin cliente"))}</strong>
            <small>${appointment?.whatsapp ? displayPhone(appointment.whatsapp) : "Solo lectura"}</small>
            ${appointment ? `<small>Servicio: ${escapeHTML(serviceName)}</small>` : ""}
            ${appointment ? renderVisitStatePill(appointment.visitState) : ""}
          </div>
        </article>`;
        })
        .join("")}
    </div>
    <div class="day-counter-row">
      ${renderCounter(counterValue(counterSummary.dailyByBarber, app.barberSession?.id), "day-counter")}
    </div>
  </section>`;
}

function renderBarberModuleHub() {
  return `<section class="admin-stack admin-dashboard-shell barber-dashboard-shell">
    <section class="admin-main ds-card barber-dashboard-home">
      <div class="section-title"><span>I</span><h2>Dashboard del barbero</h2></div>
      <div class="super-admin-module-grid barber-module-grid">
        ${renderBarberModuleCard("agenda", "01", "Agenda del dia", "Visualiza los horarios, reservas, bloqueos y citas fijadas del dia seleccionado.")}
        ${renderBarberModuleCard("days", "02", "Seleccionar dia", "Explora la semana y cambia rapidamente la fecha activa de tu agenda.")}
        ${renderBarberModuleCard("profile", "03", "Perfil", "Revisa tu cuenta, contacto, estado actual y el negocio al que perteneces.")}
      </div>
    </section>
  </section>`;
}

function renderBarberDedicatedModule(moduleId, context) {
  const { barber, business, rows = [], counterSummary, hasOperationalRows = false } = context || {};

  if (moduleId === "agenda") {
    return `<section class="admin-stack admin-module-stack barber-module-stack">
      ${renderBarberModuleToolbar("Agenda del dia")}
      ${renderBarberAgendaPanel(rows, counterSummary, hasOperationalRows)}
    </section>`;
  }

  if (moduleId === "days") {
    return `<section class="admin-stack admin-module-stack barber-module-stack">
      ${renderBarberModuleToolbar("Seleccionar dia")}
      ${renderBarberDaysPanel()}
    </section>`;
  }

  if (moduleId === "profile") {
    return `<section class="admin-stack admin-module-stack barber-module-stack">
      ${renderBarberModuleToolbar("Perfil")}
      ${renderBarberProfilePanel(barber, business, counterSummary)}
    </section>`;
  }

  return renderBarberModuleHub();
}

function clientHistorySummary(record) {
  if (!record?.clientName && !record?.whatsapp) return `<p class="microcopy">Sin historial disponible.</p>`;
  const businessId = record?.negocioId || currentBusinessId();
  const keyPhone = moneylessPhone(record.whatsapp);
  const keyName = String(record.clientName || "").trim().toLowerCase();
  const visits = store.state.appointments
    .filter((item) => {
      const samePhone = keyPhone && moneylessPhone(item.whatsapp) === keyPhone;
      const sameName = keyName && String(item.clientName || "").trim().toLowerCase() === keyName;
      return item.negocioId === businessId && (samePhone || sameName) && item.id !== record.id;
    })
    .sort((a, b) => `${b.date} ${b.time}`.localeCompare(`${a.date} ${a.time}`))
    .slice(0, 3);
  if (!visits.length) return `<p class="microcopy">Primera visita registrada.</p>`;
  return `<div class="client-history">
    ${visits
      .map((visit) => {
        const barber = barberById(visit.barberId);
        return `<span>${escapeHTML(visit.date)}</span><strong>${escapeHTML(barber?.name || "Barbero")}</strong>`;
      })
      .join("")}
  </div>`;
}

function renderAdminV2() {
  const businessResolution = currentBusinessResolution();
  if (businessResolution.status === "not_found") {
    return appShell(`
      <section class="login-view">
        <div class="login-panel">
          <p class="eyebrow">Centro de operaciones</p>
          <h1>NEGOCIO NO ENCONTRADO</h1>
          <p class="microcopy">No existe una barberia registrada para este slug.</p>
        </div>
      </section>
    `);
  }
  if (businessResolution.status === "error") {
    return appShell(`
      <section class="login-view">
        <div class="login-panel">
          <p class="eyebrow">Centro de operaciones</p>
          <h1>NO FUE POSIBLE CARGAR</h1>
          <p class="microcopy">${escapeHTML(businessResolution.error || "Error de conexion.")}</p>
          <button class="secondary-action" type="button" data-retry-business-resolution>Reintentar</button>
        </div>
      </section>
    `);
  }
  if (isCurrentBusinessLoading()) {
    return businessLoadingShell("Preparando panel administrador");
  }

  if (isSessionExpired(app.adminSession, { role: "admin", businessSlug: app.currentBusinessSlug, businessId: currentBusinessId() })) {
    app.adminSession = null;
    clearScopedBusinessSession(ADMIN_SESSION_KEY, app.currentBusinessSlug);
    app.adminLoginError = "La sesion administrativa expiro. Inicia sesion nuevamente.";
    return renderAdminV2();
  }

  if (!app.adminSession) {
    return appShell(`
      <section class="login-view">
        <div class="login-panel">
          <p class="eyebrow">Centro de operaciones</p>
          <h1>ADMINISTRADOR</h1>
          <form id="admin-login" class="form-stack">
            <label>Usuario<input name="user" required autocomplete="username" placeholder="admin" /></label>
            <label>Contraseña<input name="password" type="password" required autocomplete="current-password" placeholder="admin123" /></label>
            ${app.adminLoginError ? `<p class="form-error">${escapeHTML(app.adminLoginError)}</p>` : ""}
            <button class="primary-action">Iniciar sesión</button>
          </form>
        </div>
      </section>
    `);
  }

  if (app.adminSession.businessId && app.adminSession.businessId !== currentBusinessId()) {
    app.adminSession = null;
    clearScopedBusinessSession(ADMIN_SESSION_KEY, app.currentBusinessSlug);
    app.adminLoginError = "";
    return renderAdminV2();
  }

  const adminAccount = currentAdminAccountRecord();
  if (!adminAccount) {
    app.adminSession = null;
    clearScopedBusinessSession(ADMIN_SESSION_KEY, app.currentBusinessSlug);
    app.adminLoginError = "Tu acceso administrativo ya no esta disponible en este negocio.";
    return renderAdminV2();
  }
  app.adminSession = refreshSessionHeartbeat(
    ADMIN_SESSION_KEY,
    app.currentBusinessSlug,
    app.adminSession,
    { role: "admin", businessSlug: app.currentBusinessSlug, businessId: currentBusinessId() }
  );
  ensureRemoteSessionHealth("admin", app.adminSession);

  const selected = barberById(app.adminBarberId);
  requestBusinessDataRefreshIfEmpty(currentBusinessId(), "BusinessRenderAdmin");
  const businessBarbers = [...barbersForBusiness(currentBusinessId())].sort((a, b) => a.name.localeCompare(b.name, "es"));
  const waitingBarbers = !businessBarbers.length && isBusinessDataRefreshPending(currentBusinessId());
  const counterSummary = buildCounterSummary(app.selectedDate);
  const selectedRecords = app.adminSelectedSlots
    .map((time) => selected && store.getAppointment(selected.id, app.selectedDate, time))
    .filter(Boolean);
  const singleSelectedRecord = selectedRecords.length === 1 ? selectedRecords[0] : null;
  const currentBusinessRecord = currentBusiness();
  const dashboardMode = !selected || app.adminView === "home";
  const activeAdminModule = dashboardMode ? app.adminOpenPanel || "" : "";
  const visibleAdminModule =
    activeAdminModule === "barbers" || activeAdminModule === "dashboard-summary" ? "" : activeAdminModule;

  return appShell(`
    ${renderAdminWelcomeCard(adminAccount, currentBusinessRecord)}

    ${
      dashboardMode
        ? visibleAdminModule
          ? renderAdminDedicatedModule(visibleAdminModule, {
              businessBarbers,
              waitingBarbers,
              counterSummary,
            })
          : renderAdminModuleHub(businessBarbers, waitingBarbers, counterSummary)
        : ""
    }

    ${
      selected && app.adminView === "profile"
        ? `<section class="admin-stack">
          ${adminSelectedHeader(selected)}
          <section class="admin-main">
            <div class="profile-card">
              ${avatar(selected, "lg")}
              <div>
                <p class="eyebrow">${selected.active ? "Activo" : "Inactivo"}</p>
                <h2>${escapeHTML(selected.name)}</h2>
                <p>Usuario: ${escapeHTML(selected.user)} · Clave protegida</p>
                <p>${barberWhatsappLink(selected)}</p>
              </div>
            </div>
            <div class="section-title"><span>P</span><h2>Editar perfil</h2></div>
            ${barberEditorForm(selected, "Guardar perfil")}
            <div class="button-row danger-zone">
              <button class="icon-action danger" data-delete-barber="${selected.id}">Eliminar barbero</button>
            </div>
          </section>
        </section>`
        : ""
    }

    ${
      selected && app.adminView === "summary"
        ? `<section class="admin-stack">
          ${adminSelectedHeader(selected)}
          ${barberSummaryCards(selected, todayISO(), "admin")}
        </section>`
        : ""
    }

    ${
      selected && app.adminView === "agenda"
        ? `<section class="admin-stack">
          ${adminSelectedHeader(selected)}
          <section class="admin-main">
            ${
              app.adminScheduleView === "days"
                ? `<div class="section-title"><span>D</span><h2>Dias de la semana</h2></div>${renderWeekSelector(app.selectedDate, "data-admin-date", { anchorDate: app.selectedDate })}`
                : adminHoursView(selected)
            }
          </section>
        </section>`
        : ""
    }

    <dialog id="action-dialog">
      <form method="dialog" id="action-form" class="form-stack modal-card">
        <h3>Gestionar ${app.adminSelectedSlots.length} horario(s)</h3>
        <label>Accion
          <select name="status">
            <option value="reserved">Reservar</option>
            <option value="fixed">Fijar cita</option>
            <option value="blocked">Bloquear</option>
            <option value="release">Liberar turnos</option>
          </select>
        </label>
        <div data-client-fields>
          <label>Cliente<input name="clientName" placeholder="Nombre del cliente" value="${escapeHTML(singleSelectedRecord?.clientName || "")}" /></label>
          <label>WhatsApp<input name="whatsapp" inputmode="tel" placeholder="300 123 4567" value="${escapeHTML(singleSelectedRecord?.whatsapp || "")}" /></label>
          <label>Estado cliente
            <select name="visitState">
              <option value="">Sin estado</option>
              <option value="arrived" ${singleSelectedRecord?.visitState === "arrived" ? "selected" : ""}>Cliente llego</option>
              <option value="service" ${singleSelectedRecord?.visitState === "service" ? "selected" : ""}>En servicio</option>
              <option value="done" ${singleSelectedRecord?.visitState === "done" ? "selected" : ""}>Realizada</option>
              <option value="no_show" ${singleSelectedRecord?.visitState === "no_show" ? "selected" : ""}>No asistio</option>
            </select>
          </label>
          <label>Notas rapidas<textarea name="notes" rows="3" placeholder="Cliente VIP, corte preferido u observaciones">${escapeHTML(singleSelectedRecord?.notes || "")}</textarea></label>
          <div>
            <p class="eyebrow">Historial rapido</p>
            ${clientHistorySummary(singleSelectedRecord)}
          </div>
        </div>
        ${singleSelectedRecord?.whatsapp ? `<a class="inline-link" href="https://wa.me/${moneylessPhone(singleSelectedRecord.whatsapp)}" target="_blank" rel="noreferrer">Abrir WhatsApp del cliente</a>` : ""}
        <div class="button-row">
          <button class="secondary-action" type="button" data-close-dialog>Cancelar</button>
          ${app.adminSelectedSlots.length ? `<button class="icon-action danger" type="button" data-release-selected>Liberar espacio</button>` : ""}
          <button class="primary-action" value="confirm">Guardar</button>
        </div>
      </form>
    </dialog>

    <dialog id="release-confirm-dialog">
      <div class="modal-card confirm-card">
        <h3>Confirmar liberacion</h3>
        <p>¿Seguro que deseas liberar los horarios seleccionados?</p>
        <div class="button-row">
          <button class="secondary-action" type="button" data-cancel-release>Cancelar</button>
          <button class="primary-action danger-action" type="button" data-confirm-release>Liberar horarios</button>
        </div>
      </div>
    </dialog>
  `);
}

function adminHoursView(barber) {
  const counterSummary = buildCounterSummary(app.selectedDate);
  const rows = slotRowsForBarberDate(barber.id, app.selectedDate, currentBusinessId());
  const services = activeServicesForBusiness(currentBusinessId());
  return `<div class="agenda-toolbar">
    <div>
      <div class="section-title"><span>H</span><h2>Horarios del dia</h2></div>
      <p class="microcopy">${dayNameForISODate(app.selectedDate, true)} · ${app.selectedDate}</p>
    </div>
    <div class="button-row">
      <button class="secondary-action" data-admin-days>Retroceder</button>
      <button class="secondary-action" data-block-full-day>Bloquear dia completo</button>
      <button class="secondary-action" data-unblock-full-day>Desbloquear dia completo</button>
      <button class="primary-action" data-open-action ${app.adminSelectedSlots.length ? "" : "disabled"}>Accion (${app.adminSelectedSlots.length})</button>
    </div>
  </div>
  <div class="status-legend">
    ${Object.entries(STATUS).map(([, item]) => `<span class="${item.tone}"><i></i>${item.label}</span>`).join("")}
  </div>
  <div class="status-legend visit-legend">
    ${Object.entries(VISIT_STATE_META).map(([, item]) => `<span class="visit-state-pill ${item.tone}">${escapeHTML(item.label)}</span>`).join("")}
  </div>
  <div class="admin-slots selectable">
    ${rows
      .map(({ time, status, appointment, dayBlocked }) => {
        const unavailable = isUnavailableSlot(app.selectedDate, time, status);
        const chatPhone = appointment?.whatsapp ? moneylessPhone(appointment.whatsapp) : "";
        const serviceName = serviceNameForAppointment(appointment);
        const serviceValue = formatCOP(serviceValueForAppointment(appointment));
        const realized = isRealizedAppointment(appointment);
        const actionEnabled = appointment && COUNTABLE_STATUSES.has(appointment.status);
        const statusLabel = operationalStatusLabel({ appointment, status, dayBlocked, unavailable });
        return `
      <button class="slot-row ${realized ? "completed" : STATUS[status].tone} ${unavailable ? "unavailable" : ""} ${app.adminSelectedSlots.includes(time) ? "picked" : ""}" data-admin-slot="${time}">
        <div><strong>${slotRange(time)}</strong><span>${statusLabel}</span></div>
        <div class="slot-client">
          <strong>${escapeHTML(appointment?.clientName || "Sin cliente")}</strong>
          <small>${appointment?.whatsapp ? displayPhone(appointment.whatsapp) : "Sin WhatsApp"}</small>
          ${appointment ? `<small>Servicio: ${escapeHTML(serviceName)}</small>` : ""}
          ${appointment ? `<small>Valor: ${serviceValue}</small>` : ""}
          ${appointment ? `<small>Barbero: ${escapeHTML(barber.name)}</small>` : ""}
          ${appointment ? renderVisitStatePill(appointment.visitState) : ""}
        </div>
        ${
          chatPhone || actionEnabled
            ? `<div class="row-actions">
                ${chatPhone ? `<span class="icon-action client-chat-action" data-client-chat="${chatPhone}" role="link" tabindex="-1">Chatear con cliente</span>` : ""}
                ${actionEnabled ? `<span class="icon-action neutral-action" data-change-appointment-service="${appointment.id}" role="button" tabindex="-1">Modificar servicio</span>` : ""}
                ${actionEnabled && !realized ? `<span class="icon-action success-action" data-mark-done="${appointment.id}" role="button" tabindex="-1">Marcar como realizada</span>` : ""}
              </div>`
            : ""
        }
      </button>`;
      })
      .join("")}
  </div>
  <div class="day-counter-row">
    ${renderCounter(counterValue(counterSummary.dailyByBarber, barber.id), "day-counter")}
  </div>
  <dialog id="service-dialog">
    <form method="dialog" id="service-change-form" class="form-stack modal-card">
      <h3>Modificar servicio</h3>
      <label>Servicio
        <select name="serviceId">
          ${services
            .map((service) => {
              const selectedOption = service.id === (appointmentById(app.adminServiceEditAppointmentId)?.serviceId || "") ? "selected" : "";
              return `<option value="${escapeHTML(service.id)}" ${selectedOption}>${escapeHTML(service.name)} - ${formatCOP(service.value)}</option>`;
            })
            .join("")}
        </select>
      </label>
      <div class="button-row">
        <button class="secondary-action" type="button" data-close-service-dialog>Cancelar</button>
        <button class="primary-action" value="confirm">Guardar servicio</button>
      </div>
    </form>
  </dialog>`;
}

function renderBarberV2() {
  const businessResolution = currentBusinessResolution();
  if (businessResolution.status === "not_found") {
    return appShell(`
      <section class="login-view">
        <div class="login-panel">
          <p class="eyebrow">Acceso barbero</p>
          <h1>NEGOCIO NO ENCONTRADO</h1>
          <p class="microcopy">No existe una barberia registrada para este slug.</p>
        </div>
      </section>
    `);
  }
  if (businessResolution.status === "error") {
    return appShell(`
      <section class="login-view">
        <div class="login-panel">
          <p class="eyebrow">Acceso barbero</p>
          <h1>NO FUE POSIBLE CARGAR</h1>
          <p class="microcopy">${escapeHTML(businessResolution.error || "Error de conexion.")}</p>
          <button class="secondary-action" type="button" data-retry-business-resolution>Reintentar</button>
        </div>
      </section>
    `);
  }
  if (isCurrentBusinessLoading()) {
    return businessLoadingShell("Preparando panel barbero");
  }

  if (isSessionExpired(app.barberSession, { role: "barber", businessSlug: app.currentBusinessSlug, businessId: currentBusinessId() })) {
    app.barberSession = null;
    app.barberLoginError = "La sesion del barbero expiro. Inicia sesion nuevamente.";
    clearScopedBusinessSession(BARBER_SESSION_KEY, app.currentBusinessSlug);
    return renderBarber();
  }

  if (!app.barberSession) {
    return renderBarber();
  }

  if (app.barberSession.businessId && app.barberSession.businessId !== currentBusinessId()) {
    app.barberSession = null;
    app.barberLoginError = "";
    clearScopedBusinessSession(BARBER_SESSION_KEY, app.currentBusinessSlug);
    return renderBarber();
  }

  const barber = barberById(app.barberSession.id);
  if (!barber || !barber.active) {
    app.barberSession = null;
    app.barberLoginError = "Tu acceso ya no esta disponible en este negocio.";
    clearScopedBusinessSession(BARBER_SESSION_KEY, app.currentBusinessSlug);
    return renderBarber();
  }
  app.barberSession = refreshSessionHeartbeat(
    BARBER_SESSION_KEY,
    app.currentBusinessSlug,
    app.barberSession,
    { role: "barber", businessSlug: app.currentBusinessSlug, businessId: currentBusinessId() }
  );
  ensureRemoteSessionHealth("barber", app.barberSession);
  const rows = slotRowsForBarberDate(barber.id, app.barberDate, currentBusinessId());
  const counterSummary = buildCounterSummary(app.barberDate);
  const hasOperationalRows = rows.some(({ status, dayBlocked, appointment }) => dayBlocked || status !== "available" || appointment);
  const business = currentBusiness();
  const activeBarberModule = app.barberOpenPanel === "summary" ? "agenda" : app.barberOpenPanel || "agenda";

  return appShell(`
    ${renderBarberWelcomeCard(barber, business, counterSummary)}
    ${
      activeBarberModule
        ? renderBarberDedicatedModule(activeBarberModule, {
            barber,
            business,
            rows,
            counterSummary,
            hasOperationalRows,
          })
        : renderBarberModuleHub()
    }
  `);

  return appShell(`
    <section class="dashboard-head">
      <div class="barber-heading">
        ${avatar(barber, "lg")}
        <div class="barber-heading-copy">
          <p class="eyebrow">BARBEROS</p>
          <h1>${escapeHTML(barber.name)}</h1>
          <span>Usuario: ${escapeHTML(barber.user)} · ${escapeHTML(barber.specialty || "Servicio premium")}</span>
        </div>
        ${renderCounter(counterValue(counterSummary.weeklyByBarber, barber.id), "header-counter")}
      </div>
      <div class="button-row selected-admin-actions">
        <button class="secondary-action active-action" data-barber-agenda>Agenda</button>
        <button class="secondary-action" data-logout>Salir</button>
      </div>
    </section>
    <section class="barber-board">
      ${barberSummaryCards(barber, todayISO(), "barber")}
      ${
        app.barberScheduleView === "days"
          ? `<div class="section-title"><span>D</span><h2>Dias de la semana</h2></div>${renderWeekSelector(app.barberDate, "data-barber-date", { anchorDate: app.barberDate })}`
          : `<div class="agenda-toolbar">
            <div>
              <div class="section-title"><span>H</span><h2>Agenda del dia actual</h2></div>
              <p class="microcopy">${dayNameForISODate(app.barberDate, true)} · ${app.barberDate}</p>
            </div>
            <button class="secondary-action" data-barber-days>Retroceder</button>
          </div>
          <div class="status-legend">
            ${Object.entries(STATUS).map(([, item]) => `<span class="${item.tone}"><i></i>${item.label}</span>`).join("")}
          </div>
          <div class="status-legend visit-legend">
            ${Object.entries(VISIT_STATE_META).map(([, item]) => `<span class="visit-state-pill ${item.tone}">${escapeHTML(item.label)}</span>`).join("")}
          </div>
          ${
            !hasOperationalRows
              ? `<div class="empty-state-card">
                  <p>Aun no tienes citas, bloqueos ni citas fijadas para este dia.</p>
                  <p>Cuando el administrador o los clientes registren movimientos, apareceran aqui en tiempo real.</p>
                </div>`
              : ""
          }
          <div class="admin-slots readonly">
            ${rows
              .map(({ time, status, appointment, dayBlocked }) => {
                const unavailable = isUnavailableSlot(app.barberDate, time, status);
                const serviceName = serviceNameForAppointment(appointment);
                const statusLabel = operationalStatusLabel({ appointment, status, dayBlocked, unavailable });
                return `
              <article class="slot-row ${STATUS[status].tone} ${unavailable ? "unavailable" : ""}">
                <div><strong>${slotRange(time)}</strong><span>${statusLabel}</span></div>
                <div class="slot-client">
                  <strong>${escapeHTML(appointment?.clientName || (status === "available" ? "Disponible" : "Sin cliente"))}</strong>
                  <small>${appointment?.whatsapp ? displayPhone(appointment.whatsapp) : "Solo lectura"}</small>
                  ${appointment ? `<small>Servicio: ${escapeHTML(serviceName)}</small>` : ""}
                  ${appointment ? renderVisitStatePill(appointment.visitState) : ""}
                </div>
              </article>`;
              })
              .join("")}
          </div>
          <div class="day-counter-row">
            ${renderCounter(counterValue(counterSummary.dailyByBarber, barber.id), "day-counter")}
          </div>`
      }
    </section>
  `);
}

let renderFrame = 0;

function scheduleRender() {
  if (renderFrame) return;
  const flushRender = () => {
    renderFrame = 0;
    render();
  };
  if (document.visibilityState === "visible") {
    renderFrame = requestAnimationFrame(flushRender);
    window.setTimeout(() => {
      if (!renderFrame) return;
      cancelAnimationFrame(renderFrame);
      flushRender();
    }, 120);
    return;
  }
  renderFrame = window.setTimeout(flushRender, 16);
}

function syncSuperAdminMessageBanner(viewRoot) {
  if (!viewRoot || app.view !== "super-admin") return;
  const existing = viewRoot.querySelector(".super-admin-global-message");
  if (!app.superAdminMessage) {
    existing?.remove();
    return;
  }
  const messageMarkup = `<p class="form-note super-admin-global-message">${escapeHTML(app.superAdminMessage)}</p>`;
  if (existing) {
    existing.outerHTML = messageMarkup;
    return;
  }
  viewRoot.insertAdjacentHTML("afterbegin", messageMarkup);
}

async function handleDeleteBusinessSubmit(formElement) {
  const target = app.superAdminDeleteTarget;
  if (!target?.id || target.id === DEFAULT_BUSINESS_ID) {
    app.superAdminMessage = "No es posible eliminar esta barberia.";
    app.superAdminDeleteTarget = null;
    scheduleRender();
    return;
  }
  const confirmation = String(new FormData(formElement).get("confirmation") || "").trim();
  if (confirmation !== target.slug && confirmation !== target.name) {
    app.superAdminMessage = "La confirmacion no coincide. No se elimino la barberia.";
    scheduleRender();
    return;
  }
  app.superAdminDeleting = true;
  app.superAdminMessage = `Eliminando ${target.name || target.slug}...`;
  scheduleRender();
  try {
    if (app.superAdminSession?.role !== "super_admin" || !app.superAdminSession?.token) {
      throw new Error("Vuelve a iniciar sesion como Super Admin antes de eliminar.");
    }
    await deleteBusinessViaBackend(target.id, confirmation);
    const removed = store.deleteBusinessLocalOnly(target.id);
    if (!removed) throw new Error("No se pudo eliminar el negocio seleccionado.");
    saveAdminAccounts(loadAdminAccounts().filter((account) => account.businessId !== target.id));
    const visiblePasswords = loadVisibleAdminPasswords();
    Object.keys(visiblePasswords).forEach((accountId) => {
      if (visiblePasswords[accountId]?.businessId === target.id) {
        delete visiblePasswords[accountId];
      }
    });
    saveVisibleAdminPasswords(visiblePasswords);
    const environmentAttachments = loadBusinessEnvironmentAttachments();
    delete environmentAttachments[target.id];
    saveBusinessEnvironmentAttachments(environmentAttachments);
    delete app.superAdminPendingLogos[target.id];
    delete app.superAdminPendingLogoFiles[target.id];
    delete app.superAdminPendingEnvironmentArchives[target.id];
    if (app.superAdminOpenBusinessId === target.id) app.superAdminOpenBusinessId = "";
    app.superAdminDeleteTarget = null;
    app.superAdminDeleting = false;
    app.superAdminMessage = "Barberia eliminada correctamente.";
    store.queueRemoteSync({ quiet: true, origin: "delete-business:success", component: "SuperAdminDelete", hook: "handleDeleteBusinessSubmit" });
    scheduleRender();
  } catch (error) {
    console.error("Business delete failed", error);
    app.superAdminDeleting = false;
    app.superAdminMessage = `No fue posible eliminar la barberia: ${error.message || "error desconocido"}`;
    scheduleRender();
  }
}

function render() {
  const perf = perfMark("render");
  const root = document.querySelector("#app");
  ensureCanonicalLegacyPath();
  app.route = resolveRoute(location.pathname);
  app.view = app.route.view;
  app.currentBusinessSlug = app.route.businessSlug;
  if (app.view === "admin" && (!app.adminSession || app.adminSession.businessSlug !== app.currentBusinessSlug)) {
    app.adminSession = loadScopedBusinessSession(ADMIN_SESSION_KEY, app.currentBusinessSlug);
  }
  if (app.view === "barber" && (!app.barberSession || app.barberSession.businessSlug !== app.currentBusinessSlug)) {
    app.barberSession = loadScopedBusinessSession(BARBER_SESSION_KEY, app.currentBusinessSlug);
  }
  applyDeviceProfile();
  applyVisualRouteState();
  ensureCurrentBusinessResolution();
  document.title = currentDocumentTitle();
  const views = {
    public: renderPublic,
    admin: renderAdminV2,
    barber: renderBarberV2,
    "super-admin": renderSuperAdminV2,
    "business-test": renderBusinessPublicTest,
  };
  ensurePersistentBackground();
  app.backgroundMedia = currentBackgroundMedia();
  const shellSignature = app.view === "super-admin"
    ? ["super-admin", "global"].join("|")
    : [
        routeShellType(),
        app.view,
        app.currentBusinessSlug || DEFAULT_BUSINESS_SLUG,
      ].join("|");
  if (root.dataset.shellReady !== "true" || root.dataset.shellSignature !== shellSignature) {
    root.innerHTML = renderLayoutShell();
    root.dataset.shellReady = "true";
    root.dataset.shellSignature = shellSignature;
    root.dataset.chromeBound = "";
  }
  if (root.dataset.chromeBound !== "true") {
    bindChromeEvents();
    root.dataset.chromeBound = "true";
  }
  const remoteScopeKey = store.currentRealtimeScopeKey(app.route);
  if (root.dataset.remoteScopeKey !== remoteScopeKey || !store.remoteScopeKey) {
    store.subscribeRemote();
    root.dataset.remoteScopeKey = remoteScopeKey;
  }
  refreshPersistentShellBrand();
  document.querySelectorAll(".nav-tabs [data-view]").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === app.view);
  });
  const toast = document.querySelector(".realtime-toast");
  if (toast && getComputedStyle(toast).display !== "none") {
    const toastLabel = toast.querySelector("strong");
    if (toastLabel) {
      toastLabel.textContent = app.lastEvent;
    }
    toast.classList.toggle("is-empty", !app.lastEvent);
  }
  const viewRoot = document.querySelector("#view-root");
  if (!viewRoot) return;
  let nextMarkup = "";
  try {
    nextMarkup = views[app.view]();
  } catch (error) {
    console.error("Render fallback activated", error);
    nextMarkup = appShell(`
      <section class="booking-surface">
        <div class="section-title"><span>!</span><h2>Entorno no disponible</h2></div>
        <p class="microcopy">La barberia no pudo cargarse correctamente, pero el sistema evito una pantalla en blanco.</p>
        <p class="microcopy">Verifica que el negocio exista, este activo y tenga configuracion base valida.</p>
        ${app.currentBusinessSlug ? `<p class="microcopy">Slug solicitado: <strong>${escapeHTML(app.currentBusinessSlug)}</strong></p>` : ""}
      </section>
    `);
  }
  const viewChanged = viewRoot.__lastMarkup !== nextMarkup;
  if (viewChanged) {
    const previousScroll = { x: window.scrollX, y: window.scrollY };
    viewRoot.innerHTML = nextMarkup;
    viewRoot.__lastMarkup = nextMarkup;
    requestAnimationFrame(() => {
      window.scrollTo(previousScroll.x, previousScroll.y);
    });
  }
  syncSuperAdminMessageBanner(viewRoot);
  persistVisualRouteState();
  if (viewChanged) bindEvents();
  document.querySelector("#booking-confirm-dialog")?.showModal();
  requestAnimationFrame(fitPanelTitles);
  perfEnd(perf, `(${app.view}:${currentBusinessId() || "sin-negocio"})`);
}

function bindChromeEvents() {
  if (!document.__superAdminDeleteDelegated) {
    document.__superAdminDeleteDelegated = true;
    document.addEventListener("click", (event) => {
      const deleteButton = event.target.closest?.("[data-delete-business]");
      if (deleteButton) {
        event.preventDefault();
        event.stopImmediatePropagation();
        app.superAdminDeleteTarget = {
          id: deleteButton.dataset.deleteBusiness,
          slug: deleteButton.dataset.deleteBusinessSlug || "",
          name: deleteButton.dataset.deleteBusinessName || "",
        };
        app.superAdminMessage = "";
        scheduleRender();
        return;
      }
      if (event.target.closest?.("[data-cancel-delete-business]")) {
        event.preventDefault();
        app.superAdminDeleteTarget = null;
        app.superAdminDeleting = false;
        scheduleRender();
        return;
      }
      if (event.target.closest?.("[data-retry-business-resolution]")) {
        event.preventDefault();
        if (app.currentBusinessSlug) {
          store.businessResolutionBySlug.delete(app.currentBusinessSlug);
          store.remoteLastError = "";
          store.resolveBusinessBySlug(app.currentBusinessSlug).then(() => scheduleRender());
        }
        scheduleRender();
        return;
      }
      if (event.target.closest?.("[data-retry-public-services]")) {
        event.preventDefault();
        const businessId = currentBusinessId();
        if (businessId) {
          app.emptyBusinessDataRefreshAt = {
            ...(app.emptyBusinessDataRefreshAt || {}),
            [businessId]: 0,
          };
          store.remoteLastError = "";
          store.invalidateStableBusinessCache(businessId);
          store.invalidateRemoteCache(businessId);
          store.queueRemoteSync({
            quiet: true,
            force: true,
            origin: "public-services-retry",
            component: "BusinessRenderPublic",
            hook: "data-retry-public-services",
          });
        }
        scheduleRender();
        return;
      }
    }, { capture: true });

    document.addEventListener("submit", (event) => {
      if (event.target?.id !== "delete-business-form") return;
      event.preventDefault();
      event.stopImmediatePropagation();
      handleDeleteBusinessSubmit(event.target);
    }, { capture: true });
  }

  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      app.view = button.dataset.view;
      history.pushState(null, "", viewPath(app.view));
      scheduleRender();
    });
  });
  document.querySelector("[data-public-link]")?.addEventListener("click", (event) => {
    if (routeShellType() !== "internal") return;
    event.preventDefault();
    window.open(viewPath("public"), "_blank", "noopener,noreferrer");
  });
}

let titleFitFrame = 0;

function fitPanelTitles() {
  const compactViewport = window.innerWidth <= 760;
  const selectors = ".login-panel h1, .dashboard-head h1, .barber-heading h1";
  document.querySelectorAll(selectors).forEach((title) => {
    const parent = title.parentElement;
    if (!parent) return;

    title.style.whiteSpace = "nowrap";
    title.style.fontSize = "";
    title.style.lineHeight = compactViewport ? "1" : "0.98";

    let size = Number.parseFloat(window.getComputedStyle(title).fontSize);
    const minSize = compactViewport ? 16 : 24;
    const maxWidth = Math.max(120, parent.clientWidth);

    while (title.scrollWidth > maxWidth && size > minSize) {
      size -= 1;
      title.style.fontSize = `${size}px`;
    }

    if (title.scrollWidth > maxWidth) {
      title.style.whiteSpace = "normal";
      title.style.overflowWrap = "anywhere";
    }
  });
}

function bindEvents() {
  document.querySelector("#super-admin-login")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const user = String(form.get("user") || "").trim();
    const password = String(form.get("password") || "");
    const superAdminAttemptState = readAuthAttemptState("super_admin", DEFAULT_BUSINESS_SLUG, user);
    if (superAdminAttemptState.blockedUntil) {
      app.superAdminSession = null;
      app.superAdminLoginError = authBlockMessage("Acceso de super administrador", superAdminAttemptState.blockedUntil);
      render();
      return;
    }
    const hash = await sha256(password);

    if (user === SUPER_ADMIN_USER && hash === SUPER_ADMIN_PASSWORD_HASH) {
      app.superAdminSession = {
        id: "super_admin",
        user: SUPER_ADMIN_USER,
        role: "super_admin",
        token: randomSessionToken("super_admin"),
        deviceId: getDeviceId(),
        startedAt: new Date().toISOString(),
        lastSeenAt: new Date().toISOString(),
        businessSlug: DEFAULT_BUSINESS_SLUG,
        fingerprint: buildSessionFingerprint("super_admin", DEFAULT_BUSINESS_SLUG, ""),
      };
      app.superAdminLoginError = "";
      clearAuthAttemptState("super_admin", DEFAULT_BUSINESS_SLUG, user);
      await claimRemoteSession("super_admin", app.superAdminSession);
      saveSuperAdminSession(app.superAdminSession);
      render();
      return;
    }

    app.superAdminSession = null;
    const failedAttempt = registerFailedAuthAttempt("super_admin", DEFAULT_BUSINESS_SLUG, user);
    app.superAdminLoginError = failedAttempt.blockedUntil
      ? authBlockMessage("Acceso de super administrador", failedAttempt.blockedUntil)
      : `Credenciales invalidas. Intentos restantes: ${failedAttempt.remainingAttempts}.`;
    clearSuperAdminSession();
    render();
  });

  document.querySelector("[data-super-logout]")?.addEventListener("click", async () => {
    await closeRemoteSession("super_admin", app.superAdminSession, "manual_logout");
    app.superAdminSession = null;
    app.superAdminLoginError = "";
    clearSuperAdminSession();
    render();
  });

  document.querySelector("[data-clear-super-credentials]")?.addEventListener("click", () => {
    app.superAdminCredentialReveal = null;
    render();
  });

  document.querySelectorAll("[data-super-admin-view]").forEach((button) => {
    button.addEventListener("click", () => {
      app.superAdminView = button.dataset.superAdminView || "home";
      app.superAdminOpenBusinessId = "";
      app.superAdminCreateOpen = app.superAdminView === "create";
      render();
    });
  });

  document.querySelectorAll("[data-super-admin-back]").forEach((button) => {
    button.addEventListener("click", () => {
      app.superAdminView = "home";
      app.superAdminOpenBusinessId = "";
      app.superAdminCreateOpen = false;
      render();
    });
  });

  document.querySelectorAll("[data-toggle-super-business]").forEach((button) => {
    button.addEventListener("click", () => {
      const businessId = button.dataset.toggleSuperBusiness || "";
      app.superAdminView = "business-detail";
      app.superAdminOpenBusinessId = businessId;
      app.superAdminCreateOpen = false;
      render();
    });
  });

  document.querySelector("[data-toggle-super-create]")?.addEventListener("click", () => {
    app.superAdminView = "create";
    app.superAdminOpenBusinessId = "";
    app.superAdminCreateOpen = true;
    render();
  });

  document.querySelectorAll("[data-business-logo-input]").forEach((input) => {
    input.addEventListener("change", async (event) => {
      const file = event.currentTarget.files?.[0];
      if (!file) return;
      const targetKey = event.currentTarget.dataset.businessLogoInput || "create";
      const extension = archiveExtension(file.name);
      const validLogoType = /^image\/(png|jpeg|jpg|webp)$/i.test(file.type || "") || ["png", "jpg", "jpeg", "webp"].includes(extension);
      if (!validLogoType) {
        app.superAdminMessage = "Formato de logo no permitido.";
        render();
        return;
      }
      const src = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ""));
        reader.onerror = reject;
        reader.readAsDataURL(file);
      }).catch(() => "");
      if (!src) return;
      app.superAdminPendingLogos = {
        ...app.superAdminPendingLogos,
        [targetKey]: src,
      };
      app.superAdminPendingLogoFiles = {
        ...app.superAdminPendingLogoFiles,
        [targetKey]: file,
      };
      app.superAdminOpenBusinessId = targetKey !== "create" ? targetKey : app.superAdminOpenBusinessId;
      app.superAdminCreateOpen = targetKey === "create" ? true : app.superAdminCreateOpen;
      if (targetKey !== "create") {
        const business = store.businessById(targetKey);
        if (business) {
          app.superAdminMessage = `Subiendo logo de ${business.name}...`;
          render();
          try {
            const logoUrl = await store.uploadBusinessLogo(business.id, file);
            if (!logoUrl) {
              throw new Error("Supabase Storage no devolvio URL publica para el logo.");
            }
            store.saveBusiness({ ...business, logoUrl });
            await store.updateBusinessLogoRemote(business.id, logoUrl);
            await store.upsertBusinessSettingsRemote(business.id, {
              environment_archive_meta: { logoUrl },
            });
            app.superAdminPendingLogos = { ...app.superAdminPendingLogos, [targetKey]: "" };
            app.superAdminPendingLogoFiles = { ...app.superAdminPendingLogoFiles, [targetKey]: null };
            app.superAdminMessage = `Logo actualizado para ${business.name}.`;
          } catch (error) {
            app.superAdminMessage = "No fue posible subir el logo. Verifica el bucket logos-negocios y sus politicas en Supabase Storage.";
            console.error("Business logo upload failed", error);
          }
          render();
          return;
        }
      }
      render();
    });
  });

  document.querySelectorAll("[data-business-environment-input]").forEach((input) => {
    input.addEventListener("change", async (event) => {
      const file = event.currentTarget.files?.[0];
      const targetKey = event.currentTarget.dataset.businessEnvironmentInput || "create";
      if (targetKey === "create") {
        app.superAdminCreateOpen = true;
      }
      if (!file) {
        app.superAdminPendingEnvironmentArchives = {
          ...app.superAdminPendingEnvironmentArchives,
          [targetKey]: null,
        };
        render();
        return;
      }

      const validation = await validateEnvironmentArchive(file);
      if (!validation.valid) {
        app.superAdminMessage = validation.error;
        event.currentTarget.value = "";
        render();
        return;
      }

      app.superAdminPendingEnvironmentArchives = {
        ...app.superAdminPendingEnvironmentArchives,
        [targetKey]: validation.meta,
      };
      app.superAdminMessage =
        validation.meta.validationMode === "rar_basic"
          ? "Entorno adjunto aceptado. Para validacion completa se recomienda .zip."
          : "Entorno adjunto validado correctamente.";
      render();
    });
  });

  document.querySelectorAll("[data-service-icon-input]").forEach((input) => {
    input.addEventListener("change", async (event) => {
      const file = event.currentTarget.files?.[0];
      if (!file) {
        app.superAdminServiceIconDraft = null;
        render();
        return;
      }
      const prepared = await prepareServiceIconAsset(file);
      if (!prepared.valid) {
        app.superAdminServiceIconDraft = null;
        app.superAdminMessage = prepared.error || "No fue posible preparar el icono.";
        event.currentTarget.value = "";
        render();
        return;
      }
      app.superAdminServiceIconDraft = {
        previewSrc: prepared.previewSrc,
        imageData: prepared.imageData,
        mimeType: prepared.mimeType,
      };
      app.superAdminMessage = "Icono listo para guardarse en la base de datos.";
      render();
    });
  });

  document.querySelector("#service-icon-create-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const draft = app.superAdminServiceIconDraft;
    if (!name || !draft?.imageData || !draft?.mimeType) {
      app.superAdminMessage = "Escribe un nombre y selecciona una imagen valida.";
      render();
      return;
    }
    if ((store.state.serviceIcons || []).some((icon) => String(icon.name || "").trim().toLowerCase() === name.toLowerCase())) {
      app.superAdminMessage = "Ya existe un icono con ese nombre.";
      render();
      return;
    }
    const nextIcon = {
      id: uuidId(),
      name,
      imageData: draft.imageData,
      mimeType: draft.mimeType,
      active: true,
      createdAt: todayISO(),
    };
    app.superAdminServiceIconBusy = true;
    app.superAdminMessage = "Guardando icono global...";
    render();
    try {
      const saved = await store.upsertServiceIconRemote(nextIcon);
      if (!saved) {
        throw new Error("La tabla service_icons aun no esta disponible en Supabase.");
      }
      app.superAdminServiceIconDraft = null;
      app.superAdminServiceIconBusy = false;
      app.superAdminMessage = `Icono guardado: ${name}.`;
      render();
    } catch (error) {
      app.superAdminServiceIconBusy = false;
      app.superAdminMessage = error?.message || "No fue posible guardar el icono del servicio.";
      console.error("Service icon create failed", error);
      render();
    }
  });

  document.querySelectorAll("[data-toggle-service-icon]").forEach((button) => {
    button.addEventListener("click", async () => {
      const iconId = button.dataset.toggleServiceIcon || "";
      const currentIcon = serviceIconById(iconId);
      if (!currentIcon) return;
      const nextIcon = { ...currentIcon, active: !parseActiveFlag(currentIcon.active, true) };
      app.superAdminMessage = parseActiveFlag(nextIcon.active, true)
        ? `Activando icono ${currentIcon.name}...`
        : `Desactivando icono ${currentIcon.name}...`;
      render();
      try {
        const saved = await store.upsertServiceIconRemote(nextIcon);
        if (!saved) {
          throw new Error("La tabla service_icons aun no esta disponible en Supabase.");
        }
        app.superAdminMessage = parseActiveFlag(nextIcon.active, true)
          ? `Icono activado: ${currentIcon.name}.`
          : `Icono desactivado: ${currentIcon.name}.`;
      } catch (error) {
        app.superAdminMessage = error?.message || `No fue posible actualizar el icono ${currentIcon.name}.`;
        console.error("Service icon toggle failed", error);
      }
      render();
    });
  });

  document.querySelectorAll("[data-delete-service-icon]").forEach((button) => {
    button.addEventListener("click", async () => {
      const iconId = button.dataset.deleteServiceIcon || "";
      const currentIcon = serviceIconById(iconId);
      if (!currentIcon) return;
      if (serviceIconUsageCount(iconId) > 0) {
        app.superAdminMessage = "Este icono esta siendo usado por servicios y no puede eliminarse.";
        render();
        return;
      }
      app.superAdminMessage = `Eliminando icono ${currentIcon.name}...`;
      render();
      try {
        const result = await store.deleteServiceIconRemote(iconId);
        if (result?.inUse) {
          app.superAdminMessage = "Este icono esta siendo usado por servicios y no puede eliminarse.";
        } else if (result?.missingTable) {
          app.superAdminMessage = "La tabla service_icons aun no esta disponible en Supabase.";
        } else {
          app.superAdminMessage = `Icono eliminado: ${currentIcon.name}.`;
        }
      } catch (error) {
        app.superAdminMessage = error?.message || `No fue posible eliminar el icono ${currentIcon.name}.`;
        console.error("Service icon delete failed", error);
      }
      render();
    });
  });

  document.querySelector("#super-business-create")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const slug = uniqueBusinessSlug(form.get("slug") || name);
    const adminName = String(form.get("adminName") || "").trim();

    if (!name || !slug || !adminName) {
      app.superAdminMessage = "Completa todos los campos obligatorios.";
      render();
      return;
    }
    if (store.businessBySlug(slug)) {
      app.superAdminMessage = "Ese slug ya existe. Usa otro identificador.";
      render();
      return;
    }

    const theme = String(form.get("theme") || DEFAULT_BUSINESS_THEME_KEY);
    const themePatch = businessThemePatch(theme);
    const environmentAttachment = app.superAdminPendingEnvironmentArchives.create || null;
    let business = store.saveBusiness({
      name,
      slug,
      logoUrl: "",
      ...themePatch,
      active: form.get("active") === "on",
    });
    const logoFile = app.superAdminPendingLogoFiles.create || null;
    if (logoFile) {
      try {
        const logoUrl = await store.uploadBusinessLogo(business.id, logoFile);
        if (logoUrl) {
          business = store.saveBusiness({ ...business, logoUrl });
          await store.updateBusinessLogoRemote(business.id, logoUrl);
          await store.upsertBusinessSettingsRemote(business.id, {
            environment_archive_meta: { logoUrl },
          });
        }
      } catch (error) {
        store.deleteBusiness(business.id);
        app.superAdminMessage = "No fue posible subir el logo. Verifica el bucket logos-negocios en Supabase Storage.";
        console.error("Business logo upload failed", error);
        render();
        return;
      }
    }
    seedBusinessFromTemplate(business);

    const environmentAttachments = loadBusinessEnvironmentAttachments();
    environmentAttachments[business.id] = environmentAttachment
      ? {
          ...environmentAttachment,
          businessId: business.id,
          businessSlug: business.slug,
          mode: "attached_archive",
          associatedAt: new Date().toISOString(),
        }
      : {
          businessId: business.id,
          businessSlug: business.slug,
          mode: "dynamic_base",
          associatedAt: new Date().toISOString(),
          fileName: "",
          size: 0,
          validationMode: "dynamic_base",
          notes: "Sin archivo adjunto. Usa la plantilla base dinamica del sistema.",
        };
    saveBusinessEnvironmentAttachments(environmentAttachments);

    try {
      await store.ensureBusinessRemote(business, environmentAttachments[business.id]);
      await store.ensureBusinessStartsEmpty(business.id);
    } catch (error) {
      store.deleteBusiness(business.id);
      const repairedAttachments = loadBusinessEnvironmentAttachments();
      delete repairedAttachments[business.id];
      saveBusinessEnvironmentAttachments(repairedAttachments);
      app.superAdminMessage = `No fue posible preparar el entorno de ${business.name}. La barberia no se creo en remoto.`;
      console.error("Business remote bootstrap failed", error);
      render();
      return;
    }

    const generatedPassword = generateSecurePassword(10);
    const accounts = loadAdminAccounts();
    accounts.push({
      id: uid("admin"),
      businessId: business.id,
      businessSlug: business.slug,
      name: adminName,
      user: "Desarrollo",
      password: generatedPassword,
      passwordHash: "",
      role: "admin_negocio",
      active: true,
      createdAt: todayISO(),
    });
    const hash = await sha256(generatedPassword);
    accounts[accounts.length - 1].passwordHash = hash;
    saveAdminAccounts(accounts);
    setVisibleAdminPassword(accounts[accounts.length - 1].id, {
      businessId: business.id,
      businessName: business.name,
      user: "Desarrollo",
      password: generatedPassword,
    });
    try {
      await store.upsertAdminAccountRemote(accounts[accounts.length - 1]);
    } catch (error) {
      saveAdminAccounts(accounts.filter((account) => account.id !== accounts[accounts.length - 1].id));
      store.deleteBusiness(business.id);
      const repairedAttachments = loadBusinessEnvironmentAttachments();
      delete repairedAttachments[business.id];
      saveBusinessEnvironmentAttachments(repairedAttachments);
      app.superAdminMessage = `No fue posible guardar el administrador inicial de ${business.name}.`;
      console.error("Initial business admin remote bootstrap failed", error);
      render();
      return;
    }
    const urls = businessUrlSet(business);
    app.superAdminCredentialReveal = {
      businessName: business.name,
      publicUrl: urls.public,
      adminUrl: urls.panel,
      barberUrl: urls.barber,
      user: "Desarrollo",
      password: generatedPassword,
    };
    app.superAdminPendingLogos = { ...app.superAdminPendingLogos, create: "" };
    app.superAdminPendingLogoFiles = { ...app.superAdminPendingLogoFiles, create: null };
    app.superAdminPendingEnvironmentArchives = {
      ...app.superAdminPendingEnvironmentArchives,
      create: null,
    };
    app.superAdminOpenBusinessId = business.id;
    app.superAdminCreateOpen = false;
    app.superAdminView = "business-detail";
    app.superAdminMessage = environmentAttachment
      ? `Barberia creada: ${business.name}. El entorno adjunto quedo asociado y el negocio inicia sin datos operativos.`
      : `Barberia creada: ${business.name}. Se usara la plantilla base dinamica del sistema y el negocio inicia sin datos operativos.`;
    render();
  });

  document.querySelectorAll(".super-business-edit").forEach((formEl) => {
    formEl.addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const businessId = event.currentTarget.dataset.businessId;
      const current = store.businessById(businessId);
      if (!current) return;
      const slug = uniqueBusinessSlug(form.get("slug") || current.slug, current.id);
      const theme = String(form.get("theme") || current.theme || DEFAULT_BUSINESS_THEME_KEY);
      const themePatch = businessThemePatch(theme);
      let logoUrl = current.logoUrl;
      const logoFile = app.superAdminPendingLogoFiles[current.id] || null;
      if (logoFile) {
        try {
          logoUrl = await store.uploadBusinessLogo(current.id, logoFile);
          if (!logoUrl) {
            throw new Error("Supabase Storage no devolvio URL publica para el logo.");
          }
          await store.updateBusinessLogoRemote(current.id, logoUrl);
          await store.upsertBusinessSettingsRemote(current.id, {
            environment_archive_meta: { logoUrl },
          });
        } catch (error) {
          app.superAdminMessage = "No fue posible subir el logo. Verifica el bucket logos-negocios en Supabase Storage.";
          console.error("Business logo upload failed", error);
          render();
          return;
        }
      }
      const updated = store.saveBusiness({
        id: current.id,
        name: String(form.get("name") || "").trim(),
        slug,
        logoUrl,
        ...themePatch,
        active: form.get("active") === "on",
      });
      try {
        await store.upsertBusinessSettingsRemote(updated.id, {
          theme_override: updated.theme,
          environment_archive_meta: { themeColors: colorsForBusiness(updated) },
        });
      } catch (error) {
        console.warn("Business theme settings sync skipped", error);
      }
      saveAdminAccounts(
        loadAdminAccounts().map((account) =>
          account.businessId === updated.id ? { ...account, businessSlug: updated.slug } : account
        )
      );
      app.superAdminPendingLogos = { ...app.superAdminPendingLogos, [current.id]: "" };
      app.superAdminPendingLogoFiles = { ...app.superAdminPendingLogoFiles, [current.id]: null };
      app.superAdminMessage = `Negocio actualizado: ${updated.name}`;
      render();
    });
  });

  document.querySelectorAll("[data-delete-business]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      const businessId = button.dataset.deleteBusiness;
      const slug = button.dataset.deleteBusinessSlug || "";
      const name = button.dataset.deleteBusinessName || "";
      app.superAdminDeleteTarget = { id: businessId, slug, name };
      app.superAdminMessage = "";
      render();
    }, { capture: true });
  });

  document.querySelector("[data-cancel-delete-business]")?.addEventListener("click", () => {
    app.superAdminDeleteTarget = null;
    app.superAdminDeleting = false;
    render();
  });

  document.querySelector("#delete-business-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const target = app.superAdminDeleteTarget;
    if (!target?.id || target.id === DEFAULT_BUSINESS_ID) {
      app.superAdminMessage = "No es posible eliminar esta barberia.";
      app.superAdminDeleteTarget = null;
      render();
      return;
    }
    const confirmation = String(new FormData(event.currentTarget).get("confirmation") || "").trim();
    if (confirmation !== target.slug && confirmation !== target.name) {
      app.superAdminMessage = "La confirmacion no coincide. No se elimino la barberia.";
      render();
      return;
    }
    app.superAdminDeleting = true;
    app.superAdminMessage = `Eliminando ${target.name || target.slug}...`;
    render();
    try {
      if (app.superAdminSession?.role !== "super_admin" || !app.superAdminSession?.token) {
        throw new Error("Vuelve a iniciar sesion como Super Admin antes de eliminar.");
      }
      await deleteBusinessViaBackend(target.id, confirmation);
      const removed = store.deleteBusinessLocalOnly(target.id);
      if (!removed) throw new Error("No se pudo eliminar el negocio seleccionado.");
      saveAdminAccounts(loadAdminAccounts().filter((account) => account.businessId !== target.id));
      const visiblePasswords = loadVisibleAdminPasswords();
      Object.keys(visiblePasswords).forEach((accountId) => {
        if (visiblePasswords[accountId]?.businessId === target.id) {
          delete visiblePasswords[accountId];
        }
      });
      saveVisibleAdminPasswords(visiblePasswords);
      const environmentAttachments = loadBusinessEnvironmentAttachments();
      delete environmentAttachments[target.id];
      saveBusinessEnvironmentAttachments(environmentAttachments);
      delete app.superAdminPendingLogos[target.id];
      delete app.superAdminPendingLogoFiles[target.id];
      delete app.superAdminPendingEnvironmentArchives[target.id];
      if (app.superAdminOpenBusinessId === target.id) app.superAdminOpenBusinessId = "";
      app.superAdminView = "businesses";
      app.superAdminDeleteTarget = null;
      app.superAdminDeleting = false;
      app.superAdminMessage = "Barberia eliminada correctamente.";
      store.queueRemoteSync({ quiet: true, origin: "delete-business:success", component: "SuperAdminDelete", hook: "deleteBusinessForm" });
      render();
    } catch (error) {
      console.error("Business delete failed", error);
      app.superAdminDeleting = false;
      app.superAdminMessage = `No fue posible eliminar la barberia: ${error.message || "error desconocido"}`;
      render();
    }
  });

  document.querySelectorAll(".super-admin-account-create").forEach((formEl) => {
    formEl.addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const businessId = event.currentTarget.dataset.businessId;
      const business = store.businessById(businessId);
      const name = String(form.get("name") || "").trim();
      const user = String(form.get("user") || "").trim();
      if (!business || !name || !user) {
        app.superAdminMessage = "Completa nombre y usuario del administrador.";
        render();
        return;
      }
      const allAccounts = loadAdminAccounts();
      const businessAccounts = adminAccountsForBusiness(businessId);
      if (businessAccounts.some((account) => account.user === user && account.businessId === businessId)) {
        app.superAdminMessage = "Ese usuario ya existe en esta barberia.";
        render();
        return;
      }
      const generatedPassword = generateSecurePassword(10);
      const newAccount = {
        id: uid("admin"),
        businessId,
        businessSlug: business.slug,
        name,
        user,
        password: generatedPassword,
        passwordHash: "",
        role: "admin_negocio",
        active: form.get("active") === "on",
        createdAt: todayISO(),
      };
      allAccounts.push(newAccount);
      try {
        newAccount.passwordHash = await sha256(generatedPassword);
        saveAdminAccounts(allAccounts);
        setVisibleAdminPassword(newAccount.id, {
          businessId,
          businessName: business.name,
          user,
          password: generatedPassword,
        });
        await store.upsertAdminAccountRemote(newAccount);
        const urls = businessUrlSet(business);
        app.superAdminCredentialReveal = {
          businessName: business.name,
          publicUrl: urls.public,
          adminUrl: urls.panel,
          barberUrl: urls.barber,
          user,
          password: generatedPassword,
        };
        app.superAdminMessage = `Administrador creado para ${business.name}`;
      } catch (error) {
        allAccounts.pop();
        saveAdminAccounts(allAccounts);
        app.superAdminMessage = `No fue posible guardar el administrador de ${business.name}.`;
        console.error("Remote business admin create failed", error);
      }
      render();
    });
  });

  document.querySelectorAll(".super-admin-account-edit").forEach((formEl) => {
    const accountId = formEl.dataset.adminAccountId;
    const account = loadAdminAccounts().find((item) => item.id === accountId);
    const currentPassword = adminPasswordValue(account);
    const passwordVisible = isAdminPasswordVisible(accountId);
    if (account && !formEl.querySelector("[data-admin-password-row]")) {
      const toggleLine = formEl.querySelector(".toggle-line");
      const helperNote = formEl.querySelector(".form-note, .microcopy");
      const passwordBlock = document.createElement("label");
      passwordBlock.setAttribute("data-admin-password-row", "true");
      passwordBlock.innerHTML = `Contrasena fija
        <div class="password-inline">
          <input name="password" type="${passwordVisible ? "text" : "password"}" value="${escapeHTML(currentPassword)}" autocomplete="new-password" placeholder="Define una clave fija" />
          <button class="secondary-action inline-action" type="button" data-toggle-admin-password="${escapeHTML(account.id)}">${passwordVisible ? "Ocultar" : "Mostrar"}</button>
        </div>`;
      toggleLine?.before(passwordBlock);
      if (helperNote) {
        helperNote.className = "microcopy";
        helperNote.textContent = currentPassword
          ? "La clave visible pertenece solo a esta barberia y se valida con el login actual."
          : "Si la clave actual solo existe como hash, define una nueva contrasena fija para poder verla aqui.";
      }
    }
  });

  document.querySelectorAll("[data-toggle-admin-password]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const accountId = button.dataset.toggleAdminPassword;
      if (!accountId) return;
      const nextVisible = !isAdminPasswordVisible(accountId);
      setAdminPasswordVisibility(accountId, nextVisible);
      const form = button.closest(".super-admin-account-edit");
      const input = form?.querySelector('input[name="password"]');
      if (input) {
        input.type = nextVisible ? "text" : "password";
      }
      button.textContent = nextVisible ? "Ocultar" : "Mostrar";
    });
  });

  document.querySelectorAll(".super-admin-account-edit").forEach((formEl) => {
    formEl.addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const accountId = event.currentTarget.dataset.adminAccountId;
      const allAccounts = loadAdminAccounts();
      const account = allAccounts.find((item) => item.id === accountId);
      if (!account) return;
      const nextUser = String(form.get("user") || "").trim();
      if (
        allAccounts.some(
          (item) => item.id !== account.id && item.businessId === account.businessId && item.user === nextUser
        )
      ) {
        app.superAdminMessage = "Ese usuario ya existe en esta barberia.";
        render();
        return;
      }
      account.name = String(form.get("name") || "").trim();
      account.user = nextUser;
      account.active = form.get("active") === "on";
      const submittedPassword = String(form.get("password") || "").trim();
      const resolvedPassword = submittedPassword || adminPasswordValue(account);
      if (submittedPassword) {
        account.password = submittedPassword;
        account.passwordHash = await sha256(submittedPassword);
      } else {
        account.password = resolvedPassword || "";
      }
      if (resolvedPassword) {
        const business = store.businessById(account.businessId);
        setVisibleAdminPassword(account.id, {
          businessId: account.businessId,
          businessName: business?.name || "Barberia",
          user: account.user,
          password: resolvedPassword,
        });
      }
      saveAdminAccounts(allAccounts);
      try {
        await store.upsertAdminAccountRemote(account);
        app.superAdminMessage = submittedPassword
          ? `Administrador actualizado: ${account.name}. La nueva clave fija reemplazo la anterior.`
          : `Administrador actualizado: ${account.name}`;
      } catch (error) {
        app.superAdminMessage = `No fue posible actualizar el administrador ${account.name}.`;
        console.error("Remote business admin update failed", error);
      }
      render();
    });
  });

  document.querySelectorAll("[data-regenerate-admin-password]").forEach((button) => {
    button.addEventListener("click", async () => {
      const accountId = button.dataset.regenerateAdminPassword;
      const accounts = loadAdminAccounts();
      const account = accounts.find((item) => item.id === accountId);
      if (!account) return;
      const generatedPassword = generateSecurePassword(10);
      try {
        const hash = await sha256(generatedPassword);
        const business = store.businessById(account.businessId);
        account.password = generatedPassword;
        account.passwordHash = hash;
        saveAdminAccounts(accounts);
        setVisibleAdminPassword(account.id, {
          businessId: account.businessId,
          businessName: business?.name || "Barberia",
          user: account.user,
          password: generatedPassword,
        });
        await store.upsertAdminAccountRemote(account);
        const urls = businessUrlSet(business);
        app.superAdminCredentialReveal = {
          businessName: business?.name || "Barberia",
          publicUrl: urls.public,
          adminUrl: urls.panel,
          barberUrl: urls.barber,
          user: account.user,
          password: generatedPassword,
        };
        app.superAdminMessage = `Nueva clave temporal generada para ${account.name}`;
      } catch (error) {
        app.superAdminMessage = `No fue posible regenerar la clave de ${account.name}.`;
        console.error("Remote business admin password regenerate failed", error);
      }
      render();
    });
  });

  document.querySelectorAll("[data-select-service]").forEach((button) => {
    button.addEventListener("click", () => {
      app.selectedServiceId = button.dataset.selectService;
      app.selectedBarberId = "";
      app.publicDaySelected = false;
      app.selectedSlot = "";
      render();
    });
  });

  document.querySelectorAll("[data-select-barber]").forEach((button) => {
    button.addEventListener("click", () => {
      app.selectedBarberId = button.dataset.selectBarber;
      app.publicDaySelected = false;
      app.selectedSlot = "";
      render();
    });
  });

  document.querySelectorAll("[data-public-date]").forEach((button) => {
    button.addEventListener("click", () => {
      app.selectedDate = button.dataset.publicDate;
      store.state.meta.selectedDate = app.selectedDate;
      app.publicDaySelected = true;
      app.selectedSlot = "";
      store.queueRemoteSync({ quiet: true, origin: "public-date-change", component: "PublicAgenda", hook: "datePicker" });
      render();
    });
  });

  document.querySelectorAll("[data-slot]").forEach((button) => {
    button.addEventListener("click", () => {
      app.selectedSlot = button.dataset.slot;
      render();
    });
  });

  document.querySelectorAll("[data-client-chat]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const phone = event.currentTarget.dataset.clientChat;
      if (!phone) return;
      window.open(`https://wa.me/${phone}`, "_blank", "noopener,noreferrer");
    });
  });

  document.querySelectorAll("[data-change-appointment-service]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      app.adminServiceEditAppointmentId = button.dataset.changeAppointmentService;
      render();
      document.querySelector("#service-dialog")?.showModal();
    });
  });

  document.querySelectorAll("[data-mark-done]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const appointment = appointmentById(button.dataset.markDone);
      if (!appointment) return;
      store.upsertAppointment({
        ...appointment,
        visitState: "done",
      });
      render();
    });
  });

  document.querySelectorAll("[data-reset-barber]").forEach((button) => {
    button.addEventListener("click", () => {
      app.bookingError = "";
      app.selectedBarberId = "";
      app.publicDaySelected = false;
      app.selectedSlot = "";
      render();
    });
  });

  document.querySelectorAll("[data-reset-service]").forEach((button) => {
    button.addEventListener("click", () => {
      app.bookingError = "";
      app.selectedServiceId = "";
      app.selectedBarberId = "";
      app.publicDaySelected = false;
      app.selectedSlot = "";
      render();
    });
  });

  document.querySelectorAll("[data-reset-day]").forEach((button) => {
    button.addEventListener("click", () => {
      app.bookingError = "";
      app.publicDaySelected = false;
      app.selectedSlot = "";
      render();
    });
  });

  document.querySelectorAll("[data-reset-slot]").forEach((button) => {
    button.addEventListener("click", () => {
      app.bookingError = "";
      app.selectedSlot = "";
      render();
    });
  });

  document.querySelector("#public-booking-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (app.bookingSubmitting) return;
    if (!app.selectedServiceId || !app.selectedBarberId || !app.selectedSlot) return;
    app.bookingError = "";
    if (!isPublicSlotBookable(app.selectedBarberId, app.selectedDate, app.selectedSlot)) {
      app.bookingError = "Este horario ya no esta disponible. Por favor selecciona otro.";
      app.selectedSlot = "";
      render();
      return;
    }
    const form = new FormData(event.currentTarget);
    const barber = barberById(app.selectedBarberId);
    const service = serviceById(app.selectedServiceId);
    const clientName = String(form.get("clientName") || "").trim();
    const whatsapp = String(form.get("whatsapp") || "").trim();
    app.bookingSubmitting = true;
    render();
    try {
      const result = await store.reservePublicAppointment({
        negocioId: currentBusinessId(),
        serviceId: app.selectedServiceId,
        serviceName: service?.name || "",
        barberId: app.selectedBarberId,
        date: app.selectedDate,
        time: app.selectedSlot,
        status: "reserved",
        clientName,
        whatsapp,
        source: "public",
      });
      if (!result.ok) {
        app.bookingSubmitting = false;
        app.bookingError = result.message || "No fue posible completar la reserva en este momento.";
        app.selectedSlot = "";
        render();
        return;
      }
      app.bookingConfirmation = {
        clientName,
        whatsapp,
        serviceName: service?.name || "Servicio",
        barberName: barber?.name || "Barbero",
        date: app.selectedDate,
        range: slotRange(app.selectedSlot),
      };
      app.bookingSubmitting = false;
      render();
    } catch (error) {
      console.error(error);
      app.bookingSubmitting = false;
      app.bookingError = "No fue posible completar la reserva en este momento. Intenta nuevamente.";
      render();
    }
  });

  document.querySelector("[data-close-booking-confirm]")?.addEventListener("click", () => {
    app.bookingConfirmation = null;
    app.bookingError = "";
    app.bookingSubmitting = false;
    app.selectedBarberId = "";
    app.selectedServiceId = "";
    app.publicDaySelected = false;
    app.selectedSlot = "";
    render();
  });

  document.querySelector("#admin-login")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const user = String(form.get("user") || "").trim();
    const password = String(form.get("password") || "");
    const business = currentBusiness();
    if (isPlaceholderBusiness(business)) {
      app.adminSession = null;
      app.adminLoginError = "El entorno aun esta resolviendo este negocio. Intenta nuevamente en unos segundos.";
      clearScopedBusinessSession(ADMIN_SESSION_KEY, app.currentBusinessSlug);
      render();
      return;
    }
    if (!business?.active) {
      app.adminSession = null;
      app.adminLoginError = "Este negocio esta inactivo. No es posible iniciar sesion administrativa.";
      clearScopedBusinessSession(ADMIN_SESSION_KEY, app.currentBusinessSlug);
      render();
      return;
    }
    const backendAuth = await authenticateViaBackend("admin", user, password, app.currentBusinessSlug);
    const account = backendAuth.ok ? backendAuth.account : await findAdminAccount(user, password, currentBusiness()?.id);

    if (account) {
      const hydratedAccount = upsertLocalAdminAccount({
        ...account,
        businessId: account.businessId || currentBusinessId(),
        businessSlug: account.businessSlug || app.currentBusinessSlug,
        active: account.active !== false,
      }) || account;
      app.adminSession = {
        id: hydratedAccount.id,
        user: hydratedAccount.user,
        name: hydratedAccount.name,
        role: hydratedAccount.role,
        businessId: currentBusinessId(),
        token: randomSessionToken("admin"),
        deviceId: getDeviceId(),
        startedAt: new Date().toISOString(),
        lastSeenAt: new Date().toISOString(),
      };
      app.adminLoginError = "";
      app.adminAccountMessage = "";
      app.adminView = "home";
      app.adminBarberId = "";
      app.adminOpenPanel = "";
      app.adminScheduleView = "hours";
      app.selectedDate = todayISO();
      app.adminSelectedSlots = [];
      app.adminSession.businessSlug = app.currentBusinessSlug;
      app.adminSession.fingerprint = buildSessionFingerprint("admin", app.currentBusinessSlug, currentBusinessId());
      clearAuthAttemptState("admin", app.currentBusinessSlug, user);
      await claimRemoteSession("admin", app.adminSession);
      saveScopedBusinessSession(ADMIN_SESSION_KEY, app.currentBusinessSlug, app.adminSession);
      render();
      return;
    }

    app.adminSession = null;
    app.adminLoginError = "Usuario o contrasena incorrectos.";
    clearScopedBusinessSession(ADMIN_SESSION_KEY, app.currentBusinessSlug);
    render();
  });

  document.querySelector("[data-admin-logout]")?.addEventListener("click", async () => {
    await closeRemoteSession("admin", app.adminSession, "manual_logout");
    app.adminSession = null;
    app.adminLoginError = "";
    app.adminAccountMessage = "";
    app.adminView = "home";
    app.adminBarberId = "";
    app.adminOpenPanel = "";
    app.adminScheduleView = "hours";
    app.selectedDate = todayISO();
    app.adminSelectedSlots = [];
    clearScopedBusinessSession(ADMIN_SESSION_KEY, app.currentBusinessSlug);
    render();
  });

  document.querySelector("#admin-account-create")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!isPrincipalAdmin()) return;
    const form = new FormData(event.currentTarget);
    const allAccounts = loadAdminAccounts();
    const businessAccounts = adminAccountsForBusiness(currentBusinessId());
    const payload = {
      name: String(form.get("name") || "").trim(),
      user: String(form.get("user") || "").trim(),
      password: String(form.get("password") || ""),
      confirmPassword: String(form.get("confirmPassword") || ""),
      active: form.get("active") === "on",
    };
    const error = validateAdminAccountPayload(payload, businessAccounts, "", currentBusinessId());
    if (error) {
      app.adminAccountMessage = error;
      render();
      return;
    }

    const newAccount = {
      id: uid("admin"),
      businessId: currentBusiness().id,
      businessSlug: currentBusiness().slug,
      name: payload.name,
      user: payload.user,
      password: "",
      passwordHash: await sha256(payload.password),
      role: "administrador_secundario",
      active: payload.active,
    };
    allAccounts.push(newAccount);
    saveAdminAccounts(allAccounts);
    try {
      await store.upsertAdminAccountRemote(newAccount);
      app.adminAccountMessage = "Administrador creado correctamente.";
    } catch (error) {
      saveAdminAccounts(allAccounts.filter((account) => account.id !== newAccount.id));
      app.adminAccountMessage = "No fue posible guardar el administrador.";
      console.error("Remote admin create failed", error);
    }
    render();
  });

  document.querySelector("#public-price-visibility-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const business = currentBusiness();
    const businessId = currentWritableBusinessId();
    if (!businessId || isPlaceholderBusiness(business)) {
      app.adminServiceMessage = "El negocio aun se esta cargando. Intenta nuevamente en unos segundos.";
      render();
      return;
    }
    const form = new FormData(event.currentTarget);
    const showPublicPrices = form.get("showPublicPrices") === "on";
    try {
      await store.upsertBusinessSettingsRemote(businessId, {
        environment_archive_meta: { showPublicPrices },
      });
      app.adminServiceMessage = showPublicPrices
        ? "Los precios volveran a mostrarse en la agenda publica."
        : "Los precios se ocultaron en la agenda publica de esta barberia.";
    } catch (error) {
      app.adminServiceMessage = "No fue posible guardar la visibilidad de precios.";
      console.error("Public price visibility save failed", error);
    }
    render();
  });

  document.querySelector("#business-schedule-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const business = currentBusiness();
    const businessId = currentWritableBusinessId();
    if (!businessId || isPlaceholderBusiness(business)) {
      app.adminScheduleMessage = "El negocio aun se esta cargando. Intenta nuevamente en unos segundos.";
      render();
      return;
    }
    const form = new FormData(event.currentTarget);
    const openingTime = normalizeScheduleTime(form.get("openingTime"), "");
    const closingTime = normalizeScheduleTime(form.get("closingTime"), "");
    const slotDurationMinutes = normalizeSlotDuration(form.get("slotDurationMinutes"));
    if (!openingTime || !closingTime) {
      app.adminScheduleMessage = "Ingresa una hora de apertura y cierre validas.";
      render();
      return;
    }
    if (slotTimeToMinutes(closingTime) - slotTimeToMinutes(openingTime) < slotDurationMinutes) {
      app.adminScheduleMessage = "El rango debe permitir al menos una franja completa.";
      render();
      return;
    }
    const nextSchedule = normalizeBusinessScheduleConfig({
      openingTime,
      closingTime,
      slotDurationMinutes,
    });
    const openingMinutes = slotTimeToMinutes(nextSchedule.openingTime);
    const closingMinutes = slotTimeToMinutes(nextSchedule.closingTime);
    if (closingMinutes <= openingMinutes) {
      app.adminScheduleMessage = "La hora de cierre debe ser mayor a la hora de apertura.";
      render();
      return;
    }
    try {
      await store.upsertBusinessSettingsRemote(businessId, {
        environment_archive_meta: nextSchedule,
      });
      agendaMemo.slotRows.clear();
      agendaMemo.publicDateAvailability.clear();
      app.adminSelectedSlots = [];
      app.selectedSlot = "";
      app.adminScheduleMessage = "Horarios de atencion actualizados para esta barberia.";
    } catch (error) {
      app.adminScheduleMessage = "No fue posible guardar los horarios de atencion.";
      console.error("Business schedule save failed", error);
    }
    render();
  });

  document.querySelector("#service-create-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const business = currentBusiness();
    const businessId = currentWritableBusinessId();
    if (!businessId || isPlaceholderBusiness(business)) {
      app.adminServiceMessage = "El negocio aun se esta cargando. Intenta nuevamente en unos segundos.";
      render();
      return;
    }
    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") || "").trim(),
      value: String(form.get("value") || "").trim(),
      adminPercentage: Number(form.get("adminPercentage")),
      barberPercentage: Number(form.get("barberPercentage")),
      serviceIconId: submittedServiceIconId(form, ""),
      active: form.get("active") === "on",
    };
    const error = validateServicePayload(payload);
    if (error) {
      app.adminServiceMessage = error;
      render();
      return;
    }
    try {
      const serviceRecord = store.saveService(
        {
          ...payload,
          negocioId: businessId,
          value: Number(payload.value),
        },
        { skipRemote: true }
      );
      if (store.supabase && serviceRecord?.id) {
        await store.persistRemote({
          type: "INSERT",
          table: "services",
          record: serviceRecord,
        });
        store.invalidateStableBusinessCache(businessId);
        store.invalidateRemoteCache(businessId);
        store.queueRemoteSync({
          quiet: true,
          force: true,
          origin: "admin-service-create",
          component: "AdminServices",
          hook: "serviceCreateSubmit",
        });
      }
      app.adminServiceMessage = "Servicio creado correctamente.";
    } catch (saveError) {
      app.adminServiceMessage = "No fue posible guardar el servicio en este negocio.";
      console.error("Admin service create failed", {
        business_id: businessId,
        slug: app.currentBusinessSlug,
        error: saveError,
      });
    }
    render();
  });

  document.querySelectorAll(".service-edit-form").forEach((formElement) => {
    formElement.addEventListener("submit", async (event) => {
      event.preventDefault();
      const business = currentBusiness();
      const businessId = currentWritableBusinessId();
      if (!businessId || isPlaceholderBusiness(business)) {
        app.adminServiceMessage = "El negocio aun se esta cargando. Intenta nuevamente en unos segundos.";
        render();
        return;
      }
      const form = new FormData(event.currentTarget);
      const existingService =
        servicesForBusiness(businessId).find((service) => service.id === event.currentTarget.dataset.serviceId) || null;
      const payload = {
        id: event.currentTarget.dataset.serviceId,
        name: String(form.get("name") || "").trim(),
        value: String(form.get("value") || "").trim(),
        adminPercentage: Number(form.get("adminPercentage")),
        barberPercentage: Number(form.get("barberPercentage")),
        serviceIconId: submittedServiceIconId(form, existingService?.serviceIconId || ""),
        active: form.get("active") === "on",
      };
      const error = validateServicePayload(payload);
      if (error) {
        app.adminServiceMessage = error;
        render();
        return;
      }
      try {
        const serviceRecord = store.saveService(
          {
            ...payload,
            negocioId: businessId,
            value: Number(payload.value),
          },
          { skipRemote: true }
        );
        if (store.supabase && serviceRecord?.id) {
          await store.persistRemote({
            type: "UPDATE",
            table: "services",
            record: serviceRecord,
          });
          store.invalidateStableBusinessCache(businessId);
          store.invalidateRemoteCache(businessId);
          store.queueRemoteSync({
            quiet: true,
            force: true,
            origin: "admin-service-update",
            component: "AdminServices",
            hook: "serviceEditSubmit",
          });
        }
        app.adminServiceMessage = "Servicio actualizado correctamente.";
      } catch (saveError) {
        app.adminServiceMessage = "No fue posible actualizar el servicio en este negocio.";
        console.error("Admin service update failed", {
          business_id: businessId,
          slug: app.currentBusinessSlug,
          service_id: payload.id,
          error: saveError,
        });
      }
      render();
    });
  });

  document.querySelectorAll("[data-delete-service]").forEach((button) => {
    button.addEventListener("click", () => {
      store.deleteService(button.dataset.deleteService);
      app.adminServiceMessage = "Servicio eliminado correctamente.";
      render();
    });
  });

  document.querySelectorAll(".admin-account-edit").forEach((formElement) => {
    formElement.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!isPrincipalAdmin()) return;
      const id = event.currentTarget.dataset.adminAccountId;
      const form = new FormData(event.currentTarget);
      const allAccounts = loadAdminAccounts();
      const businessAccounts = adminAccountsForBusiness(currentBusinessId());
      const payload = {
        name: String(form.get("name") || "").trim(),
        user: String(form.get("user") || "").trim(),
        password: String(form.get("password") || ""),
        confirmPassword: String(form.get("confirmPassword") || ""),
        active: form.get("active") === "on",
      };
      const error = validateAdminAccountPayload(payload, businessAccounts, id, currentBusinessId());
      if (error) {
        app.adminAccountMessage = error;
        render();
        return;
      }
      const nextAccounts = allAccounts.map((account) =>
        account.id === id
          ? {
              ...account,
              name: payload.name,
              user: payload.user,
              password: "",
              passwordHash: payload.password ? account.passwordHash : account.passwordHash,
              active: payload.active,
            }
          : account
      );
      const updatedAccount = nextAccounts.find((account) => account.id === id);
      if (updatedAccount && payload.password) {
        updatedAccount.passwordHash = await sha256(payload.password);
      }
      saveAdminAccounts(nextAccounts);
      try {
        if (updatedAccount) {
          await store.upsertAdminAccountRemote(updatedAccount);
        }
        app.adminAccountMessage = "Administrador actualizado correctamente.";
      } catch (error) {
        app.adminAccountMessage = "No fue posible actualizar el administrador.";
        console.error("Remote admin update failed", error);
      }
      render();
    });
  });

  document.querySelectorAll("[data-delete-admin-account]").forEach((button) => {
    button.addEventListener("click", async () => {
      if (!isPrincipalAdmin()) return;
      const id = button.dataset.deleteAdminAccount;
      const account = loadAdminAccounts().find((item) => item.id === id);
      saveAdminAccounts(loadAdminAccounts().filter((accountItem) => accountItem.id !== id));
      setVisibleAdminPassword(id, null);
      try {
        await store.deleteAdminAccountRemote(id, account?.businessId || currentBusinessId());
        app.adminAccountMessage = "Administrador eliminado correctamente.";
      } catch (error) {
        app.adminAccountMessage = "No fue posible eliminar el administrador.";
        console.error("Remote admin delete failed", error);
      }
      render();
    });
  });

  document.querySelector("#background-form input[name='video']")?.addEventListener("change", async (event) => {
    const file = event.currentTarget.files?.[0];
    app.pendingBackgroundVideo = null;
    if (!file) {
      render();
      return;
    }
    if (!["video/mp4", "video/webm"].includes(file.type)) {
      app.backgroundMessage = "Formato no permitido. Usa MP4 o WEBM.";
      render();
      return;
    }
    if (file.size > MAX_BACKGROUND_VIDEO_BYTES) {
      app.backgroundMessage = "El video supera el limite de 10 MB.";
      render();
      return;
    }
    app.pendingBackgroundVideo = {
      type: "video",
      name: file.name,
      mime: file.type,
      size: file.size,
      file,
      src: await fileToDataURL(file),
      savedAt: new Date().toISOString(),
    };
    app.backgroundMessage = "Video listo para previsualizar y guardar.";
    render();
  });

  document.querySelector("#background-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!app.pendingBackgroundVideo) return;
    let nextBackgroundMedia = app.pendingBackgroundVideo;
    try {
      if (app.pendingBackgroundVideo.file) {
        nextBackgroundMedia = await store.uploadBusinessBackgroundVideo(currentBusinessId(), app.pendingBackgroundVideo.file);
        if (!nextBackgroundMedia?.src) {
          throw new Error("No fue posible obtener la URL publica del video.");
        }
      }
      await store.upsertBusinessSettingsRemote(currentBusinessId(), {
        environment_archive_meta: { backgroundMedia: nextBackgroundMedia },
      });
    } catch (error) {
      app.backgroundMessage = "No fue posible guardar el fondo de esta barberia.";
      console.error("Remote background save failed", error);
      render();
      return;
    }
    app.backgroundMedia = nextBackgroundMedia;
    saveBackgroundMedia(app.backgroundMedia);
    app.pendingBackgroundVideo = null;
    app.backgroundMessage = "Video guardado como fondo activo.";
    refreshBackgroundPresentation({ rerender: true });
  });

  document.querySelector("[data-reset-background]")?.addEventListener("click", async () => {
    app.backgroundMedia = null;
    app.pendingBackgroundVideo = null;
    saveBackgroundMedia(null);
    try {
      await store.upsertBusinessSettingsRemote(currentBusinessId(), {
        environment_archive_meta: { backgroundMedia: null },
      });
    } catch (error) {
      app.backgroundMessage = "No fue posible restaurar el fondo de esta barberia.";
      console.error("Remote background reset failed", error);
      render();
      return;
    }
    app.backgroundMessage = "Fondo estatico restaurado.";
    refreshBackgroundPresentation({ rerender: true });
  });

  document.querySelector("[data-sound-toggle]")?.addEventListener("change", (event) => {
    app.soundEnabled = event.currentTarget.checked;
    localStorage.setItem(SOUND_PREF_KEY, String(app.soundEnabled));
    app.lastEvent = app.soundEnabled ? "Sonido de reservas activado" : "Sonido de reservas desactivado";
    render();
  });

  document.querySelectorAll("[data-admin-barber]").forEach((button) => {
    button.addEventListener("click", () => {
      app.adminBarberId = button.dataset.adminBarber;
      app.adminView = "agenda";
      app.adminScheduleView = "hours";
      app.selectedDate = todayISO();
      store.state.meta.selectedDate = app.selectedDate;
      app.adminSelectedSlots = [];
      store.queueRemoteSync({ quiet: true, origin: "admin-barber-change", component: "AdminAgenda", hook: "barberPicker" });
      render();
    });
  });

  document.querySelectorAll("[data-admin-date]").forEach((button) => {
    button.addEventListener("click", () => {
      app.selectedDate = button.dataset.adminDate;
      store.state.meta.selectedDate = app.selectedDate;
      app.adminScheduleView = "hours";
      app.adminSelectedSlots = [];
      store.queueRemoteSync({ quiet: true, origin: "admin-date-change", component: "AdminAgenda", hook: "datePicker" });
      render();
    });
  });

  document.querySelector("[data-new-barber]")?.addEventListener("click", () => {
    app.adminBarberId = "";
    const form = document.querySelector("#barber-form");
    form.reset();
    form.elements.id.value = "";
    form.elements.password.value = "studio2026";
  });

  document.querySelector("#barber-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const editingExistingBarber = Boolean(data.get("id"));
    const business = currentBusiness();
    const businessId = currentWritableBusinessId();
    if (!businessId || isPlaceholderBusiness(business)) {
      app.adminBarberMessage = "El negocio aun se esta cargando. Intenta nuevamente en unos segundos.";
      render();
      return;
    }
    const payload = {
      id: data.get("id") || "",
      name: String(data.get("name") || "").trim(),
      user: String(data.get("user") || "").trim(),
      password: String(data.get("password") || ""),
      whatsapp: String(data.get("whatsapp") || "").trim(),
      specialty: String(data.get("specialty") || "").trim(),
      active: data.get("active") === "on",
    };
    const barberError = validateBarberPayload(payload, payload.id);
    if (barberError) {
      app.adminBarberMessage = barberError;
      render();
      return;
    }
    try {
      const selected = barberById(data.get("id"), businessId);
      const file = data.get("photo");
      const photo = file?.size ? await fileToDataURL(file) : selected?.photo || "";
      const passwordHash = payload.password ? await sha256(payload.password) : selected?.passwordHash || "";
      const barberRecord = store.saveBarber({
        id: payload.id || undefined,
        negocioId: businessId,
        name: payload.name,
        user: payload.user,
        password: payload.password ? "" : selected?.password || "",
        passwordHash,
        whatsapp: payload.whatsapp,
        specialty: payload.specialty,
        active: payload.active,
        photo,
      }, { skipRemote: true });
      const selectedServiceIds = data.getAll("serviceIds").map(String);
      const barberServiceRecords = barberRecord?.id
        ? store.saveBarberServices(barberRecord.id, selectedServiceIds, businessId, { skipRemote: true })
        : [];

      if (store.supabase && barberRecord?.id) {
        await store.persistRemote({
          type: editingExistingBarber ? "UPDATE" : "INSERT",
          table: "barbers",
          record: barberRecord,
        });
        await store.persistRemote({
          type: "REPLACE",
          table: "barber_services",
          barberId: barberRecord.id,
          businessId,
          records: barberServiceRecords,
        });
        store.invalidateStableBusinessCache(businessId);
        store.invalidateRemoteCache(businessId);
        store.queueRemoteSync({
          quiet: true,
          force: true,
          origin: editingExistingBarber ? "admin-barber-update" : "admin-barber-create",
          component: "AdminBarbers",
          hook: "barberFormSubmit",
        });
      }

      if (editingExistingBarber && barberRecord?.id) {
        app.adminBarberId = barberRecord.id;
        app.adminView = "profile";
        app.adminBarberMessage = "Perfil del barbero actualizado correctamente.";
      } else {
        app.adminBarberId = "";
        app.adminView = "home";
        app.adminOpenPanel = "";
        app.adminBarberMessage = "Barbero creado correctamente.";
      }
    } catch (error) {
      app.adminBarberMessage = "No fue posible guardar el barbero en este negocio.";
      console.error("Admin barber save failed", {
        business_id: businessId,
        slug: app.currentBusinessSlug,
        editingExistingBarber,
        error,
      });
    }
    render();
  });

  document.querySelector("[data-regenerate-barber-password]")?.addEventListener("click", async (event) => {
    const barberId = event.currentTarget.dataset.regenerateBarberPassword || "";
    const barber = barberById(barberId);
    if (!barber) {
      app.adminBarberMessage = "No fue posible encontrar el barbero en este negocio.";
      render();
      return;
    }
    try {
      const result = await regenerateBarberPassword(barber);
      app.adminBarberId = result.barber?.id || barber.id;
      app.adminView = "profile";
      app.adminBarberMessage = `Nueva clave temporal para ${barber.name}: ${result.password}`;
    } catch (error) {
      app.adminBarberMessage = `No fue posible regenerar la clave de ${barber.name}.`;
      console.error("Barber password regeneration UI failed", {
        barber_id: barber.id,
        business_id: barber.negocioId || currentBusinessId(),
        field: "password_hash",
        error,
      });
    }
    render();
  });

  document.querySelector("[data-block-day]")?.addEventListener("click", (event) => {
    if (!app.adminBarberId) return;
    event.currentTarget.dataset.blockDay === "on"
      ? store.blockDay(app.adminBarberId, app.selectedDate)
      : store.unblockDay(app.adminBarberId, app.selectedDate);
    render();
  });

  document.querySelectorAll("[data-free]").forEach((button) => {
    button.addEventListener("click", () => {
      store.deleteAppointment(button.dataset.free);
      render();
    });
  });

  ["manual", "fixed", "block"].forEach((action) => {
    document.querySelectorAll(`[data-${action}]`).forEach((button) => {
      button.addEventListener("click", () => openManualDialog(action, button.dataset[action]));
    });
  });

  document.querySelector("#manual-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const status = form.get("status");
    store.upsertAppointment({
      barberId: app.adminBarberId,
      date: app.selectedDate,
      time: form.get("time"),
      status,
      clientName: status === "blocked" ? form.get("clientName") || "Bloqueo operativo" : form.get("clientName"),
      whatsapp: status === "blocked" ? "" : form.get("whatsapp"),
      source: "admin",
    });
    document.querySelector("#manual-dialog").close();
    render();
  });

  document.querySelector("[data-close-dialog]")?.addEventListener("click", () => {
    document.querySelector("#manual-dialog")?.close();
    document.querySelector("#action-dialog")?.close();
    document.querySelector("#release-confirm-dialog")?.close();
  });

  document.querySelector("[data-close-service-dialog]")?.addEventListener("click", () => {
    app.adminServiceEditAppointmentId = "";
    document.querySelector("#service-dialog")?.close();
  });

  document.querySelector("#service-change-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const appointment = appointmentById(app.adminServiceEditAppointmentId);
    if (!appointment) return;
    const form = new FormData(event.currentTarget);
    const service = serviceById(String(form.get("serviceId") || ""));
    if (!service) return;
    store.upsertAppointment({
      ...appointment,
      serviceId: service.id,
      serviceName: service.name,
    });
    app.adminServiceEditAppointmentId = "";
    render();
  });

  document.querySelectorAll("[data-admin-panel]").forEach((button) => {
    button.addEventListener("click", async () => {
      const panel = button.dataset.adminPanel;
      app.adminOpenPanel = app.adminOpenPanel === panel ? "" : panel;
      if (app.adminOpenPanel === "admin-accounts") {
        try {
          await store.syncAdminAccountsFromRemote(currentBusinessId());
        } catch (error) {
          console.warn("Admin accounts lazy load skipped", error);
        }
      }
      render();
    });
  });

  document.querySelectorAll("[data-admin-module-back]").forEach((button) => {
    button.addEventListener("click", () => {
      app.adminOpenPanel = "";
      render();
    });
  });

  document.querySelectorAll("[data-admin-home]").forEach((button) => {
    button.addEventListener("click", () => {
      app.adminView = "home";
      app.adminBarberId = "";
      app.adminOpenPanel = "";
      app.adminScheduleView = "hours";
      app.selectedDate = todayISO();
      app.adminSelectedSlots = [];
      render();
    });
  });

  document.querySelector("[data-admin-profile]")?.addEventListener("click", () => {
    app.adminView = "profile";
    app.adminSelectedSlots = [];
    render();
  });

  document.querySelector("[data-admin-summary]")?.addEventListener("click", () => {
    app.adminView = "summary";
    app.adminSelectedSlots = [];
    render();
  });

  document.querySelector("[data-admin-agenda]")?.addEventListener("click", () => {
    app.adminView = "agenda";
    app.adminScheduleView = "hours";
    app.adminSelectedSlots = [];
    render();
  });

  document.querySelector("[data-admin-days]")?.addEventListener("click", () => {
    app.adminScheduleView = "days";
    app.adminSelectedSlots = [];
    render();
  });

  document.querySelector("[data-barber-agenda]")?.addEventListener("click", () => {
    app.barberScheduleView = "hours";
    app.barberOpenPanel = "agenda";
    render();
  });

  document.querySelectorAll("[data-barber-panel]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = button.dataset.barberPanel || "";
      app.barberOpenPanel = panel;
      if (panel === "days") app.barberScheduleView = "days";
      if (panel === "agenda") app.barberScheduleView = "hours";
      render();
    });
  });

  document.querySelectorAll("[data-barber-module-back]").forEach((button) => {
    button.addEventListener("click", () => {
      app.barberOpenPanel = "";
      render();
    });
  });

  document.querySelectorAll("[data-admin-slot]").forEach((button) => {
    button.addEventListener("click", () => {
      const time = button.dataset.adminSlot;
      app.adminSelectedSlots = app.adminSelectedSlots.includes(time)
        ? app.adminSelectedSlots.filter((slot) => slot !== time)
        : [...app.adminSelectedSlots, time];
      render();
    });
  });

  document.querySelector("[data-open-action]")?.addEventListener("click", () => {
    if (!app.adminSelectedSlots.length) return;
    document.querySelector("#action-dialog")?.showModal();
  });

  document.querySelector("#action-form select[name='status']")?.addEventListener("change", (event) => {
    const release = event.currentTarget.value === "release";
    const fields = document.querySelector("[data-client-fields]");
    if (!fields) return;
    fields.hidden = release;
    fields.querySelectorAll("input").forEach((input) => {
      input.disabled = release;
      if (release) input.value = "";
    });
  });

  document.querySelector("#action-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!app.adminBarberId || !app.adminSelectedSlots.length) return;
    const form = new FormData(event.currentTarget);
    const status = form.get("status");

    if (status === "release") {
      document.querySelector("#action-dialog")?.close();
      document.querySelector("#release-confirm-dialog")?.showModal();
      return;
      app.adminSelectedSlots.forEach((time) => {
        const appointment = store.getAppointment(app.adminBarberId, app.selectedDate, time);
        if (appointment) store.deleteAppointment(appointment.id);
      });
      app.adminActionMessage = "Turnos liberados correctamente.";
      app.adminSelectedSlots = [];
      document.querySelector("#action-dialog")?.close();
      render();
      return;
    }

    app.adminSelectedSlots.forEach((time) => {
      store.upsertAppointment({
        barberId: app.adminBarberId,
        date: app.selectedDate,
        time,
        status,
        blockOrigin: status === "blocked" ? "manual" : "",
        clientName: status === "blocked" ? form.get("clientName") || "Bloqueo operativo" : form.get("clientName"),
        whatsapp: status === "blocked" ? "" : form.get("whatsapp"),
        visitState: status === "blocked" ? "" : form.get("visitState"),
        notes: form.get("notes") || "",
        source: "admin",
      });
    });
    app.adminSelectedSlots = [];
    document.querySelector("#action-dialog")?.close();
    render();
  });

  document.querySelector("[data-release-selected]")?.addEventListener("click", () => {
      document.querySelector("#action-dialog")?.close();
      document.querySelector("#release-confirm-dialog")?.showModal();
      return;
    app.adminSelectedSlots.forEach((time) => {
      const appointment = store.getAppointment(app.adminBarberId, app.selectedDate, time);
      if (appointment) store.deleteAppointment(appointment.id);
    });
    app.adminActionMessage = "Turnos liberados correctamente.";
    app.adminSelectedSlots = [];
    document.querySelector("#action-dialog")?.close();
    render();
  });

  document.querySelector("[data-cancel-release]")?.addEventListener("click", () => {
    document.querySelector("#release-confirm-dialog")?.close();
  });

  document.querySelector("[data-confirm-release]")?.addEventListener("click", () => {
    releaseSelectedAdminSlots();
    document.querySelector("#release-confirm-dialog")?.close();
    render();
  });

  document.querySelector("[data-block-full-day]")?.addEventListener("click", () => {
    if (!app.adminBarberId) return;
    store.blockAvailableSlots(app.adminBarberId, app.selectedDate);
    app.adminSelectedSlots = [];
    render();
  });

  document.querySelector("[data-unblock-full-day]")?.addEventListener("click", () => {
    if (!app.adminBarberId) return;
    store.unblockBlockedSlots(app.adminBarberId, app.selectedDate);
    app.adminSelectedSlots = [];
    render();
  });

  document.querySelector("[data-delete-barber]")?.addEventListener("click", (event) => {
    const barberId = event.currentTarget.dataset.deleteBarber;
    store.deleteBarber(barberId);
    if (app.barberSession?.id === barberId) {
      app.barberSession = null;
      clearScopedBusinessSession(BARBER_SESSION_KEY, app.currentBusinessSlug);
    }
    app.adminBarberMessage = "Barbero eliminado correctamente.";
    app.adminBarberId = "";
    app.adminView = "home";
    render();
  });

  document.querySelector("[data-barber-days]")?.addEventListener("click", () => {
    app.barberScheduleView = "days";
    app.barberOpenPanel = "days";
    render();
  });

  document.querySelectorAll("[data-barber-date]").forEach((button) => {
    button.addEventListener("click", () => {
      app.barberDate = button.dataset.barberDate;
      store.state.meta.selectedDate = app.barberDate;
      app.barberScheduleView = "hours";
      app.barberOpenPanel = "agenda";
      store.queueRemoteSync({ quiet: true, origin: "barber-date-change", component: "BarberAgenda", hook: "datePicker" });
      render();
    });
  });

  document.querySelector("#barber-login")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const user = String(form.get("user") || "").trim();
    const business = currentBusiness();
    if (isPlaceholderBusiness(business)) {
      app.barberSession = null;
      app.barberLoginError = "El entorno aun esta resolviendo este negocio. Intenta nuevamente en unos segundos.";
      clearScopedBusinessSession(BARBER_SESSION_KEY, app.currentBusinessSlug);
      render();
      return;
    }
    if (!business?.active) {
      app.barberSession = null;
      app.barberLoginError = "Este negocio esta inactivo. No es posible iniciar sesion de barbero.";
      clearScopedBusinessSession(BARBER_SESSION_KEY, app.currentBusinessSlug);
      render();
      return;
    }
    const password = String(form.get("password") || "");
    const backendAuth = await authenticateViaBackend("barber", user, password, app.currentBusinessSlug);
    const barber = backendAuth.ok
      ? await resolveLoginBarber(backendAuth.barber, user, password, currentBusinessId())
      : await findBarberAccount(user, password, currentBusinessId());
    if (!barber) {
      app.barberLoginError = "Usuario o contrasena incorrectos para este negocio.";
      event.currentTarget.classList.add("shake");
      setTimeout(() => event.currentTarget.classList.remove("shake"), 500);
      render();
      return;
    }
    app.barberLoginError = "";
    app.barberSession = {
      id: barber.id,
      businessId: currentBusinessId(),
      businessSlug: app.currentBusinessSlug,
      token: randomSessionToken("barber"),
      deviceId: getDeviceId(),
      startedAt: new Date().toISOString(),
      lastSeenAt: new Date().toISOString(),
      role: "barber",
      fingerprint: buildSessionFingerprint("barber", app.currentBusinessSlug, currentBusinessId()),
    };
    clearAuthAttemptState("barber", app.currentBusinessSlug, user);
    app.barberDate = todayISO();
    store.state.meta.selectedDate = app.barberDate;
    app.barberOpenPanel = "agenda";
    app.barberScheduleView = "hours";
    await claimRemoteSession("barber", app.barberSession);
    saveScopedBusinessSession(BARBER_SESSION_KEY, app.currentBusinessSlug, app.barberSession);
    render();
  });

  document.querySelector("[data-logout]")?.addEventListener("click", async () => {
    await closeRemoteSession("barber", app.barberSession, "manual_logout");
    app.barberSession = null;
    app.barberLoginError = "";
    app.barberOpenPanel = "";
    clearScopedBusinessSession(BARBER_SESSION_KEY, app.currentBusinessSlug);
    render();
  });
}

function openManualDialog(action, time) {
  const dialog = document.querySelector("#manual-dialog");
  const form = document.querySelector("#manual-form");
  const status = action === "fixed" ? "fixed" : action === "block" ? "blocked" : "reserved";
  form.elements.time.value = time;
  form.elements.status.value = status;
  form.elements.clientName.required = status !== "blocked";
  form.elements.whatsapp.required = status !== "blocked";
  form.querySelector("#manual-title").textContent = `${STATUS[status].label} · ${slotRange(time)}`;
  dialog.showModal();
}

function releaseSelectedAdminSlots() {
  app.adminSelectedSlots.forEach((time) => {
    const appointment = store.getAppointment(app.adminBarberId, app.selectedDate, time);
    if (appointment) store.deleteAppointment(appointment.id);
  });
  app.adminActionMessage = "Turnos liberados correctamente.";
  app.adminSelectedSlots = [];
}

function playReservationSound() {
  if (!app.soundEnabled || app.view !== "admin") return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const gain = ctx.createGain();
    const first = ctx.createOscillator();
    const second = ctx.createOscillator();
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.045, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.42);
    first.frequency.setValueAtTime(660, ctx.currentTime);
    second.frequency.setValueAtTime(990, ctx.currentTime + 0.08);
    first.type = "sine";
    second.type = "sine";
    first.connect(gain);
    second.connect(gain);
    gain.connect(ctx.destination);
    first.start(ctx.currentTime);
    second.start(ctx.currentTime + 0.08);
    first.stop(ctx.currentTime + 0.26);
    second.stop(ctx.currentTime + 0.42);
  } catch {
    // Audio feedback is optional.
  }
}

function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function dataUrlParts(dataUrl = "") {
  const value = String(dataUrl || "");
  const match = value.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) return { mimeType: "", imageData: "" };
  return {
    mimeType: match[1] || "",
    imageData: match[2] || "",
  };
}

function validateServiceIconFile(file) {
  if (!file) {
    return { valid: false, error: "Debes seleccionar una imagen para el icono." };
  }
  const extension = archiveExtension(file.name);
  const validType = /^image\/(png|jpeg|jpg|webp)$/i.test(file.type || "") || ["png", "jpg", "jpeg", "webp"].includes(extension);
  if (!validType) {
    return { valid: false, error: "Formato no permitido. Usa PNG, JPG, JPEG o WEBP." };
  }
  if (file.size > MAX_SERVICE_ICON_BYTES) {
    return { valid: false, error: "El icono es demasiado pesado. Usa una imagen menor a 1 MB." };
  }
  return { valid: true };
}

async function optimizeServiceIconDataUrl(dataUrl, mimeType = "image/png") {
  if (typeof document === "undefined" || !dataUrl) return String(dataUrl || "");
  const image = await new Promise((resolve, reject) => {
    const element = new Image();
    element.onload = () => resolve(element);
    element.onerror = reject;
    element.src = String(dataUrl || "");
  }).catch(() => null);
  if (!image) return String(dataUrl || "");

  const maxSize = 160;
  const ratio = Math.min(1, maxSize / Math.max(image.width || maxSize, image.height || maxSize));
  const width = Math.max(1, Math.round((image.width || maxSize) * ratio));
  const height = Math.max(1, Math.round((image.height || maxSize) * ratio));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return String(dataUrl || "");
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(image, 0, 0, width, height);
  const outputMimeType = /png/i.test(mimeType) ? "image/png" : "image/webp";
  return canvas.toDataURL(outputMimeType, outputMimeType === "image/png" ? undefined : 0.9);
}

async function prepareServiceIconAsset(file) {
  const validation = validateServiceIconFile(file);
  if (!validation.valid) return validation;
  const sourceDataUrl = String((await fileToDataURL(file).catch(() => "")) || "");
  if (!sourceDataUrl) {
    return { valid: false, error: "No fue posible leer la imagen seleccionada." };
  }
  const optimizedDataUrl = await optimizeServiceIconDataUrl(sourceDataUrl, file.type || "image/png");
  const { mimeType, imageData } = dataUrlParts(optimizedDataUrl || sourceDataUrl);
  if (!imageData) {
    return { valid: false, error: "No fue posible convertir la imagen para guardarla." };
  }
  return {
    valid: true,
    previewSrc: optimizedDataUrl || sourceDataUrl,
    mimeType: mimeType || file.type || "image/png",
    imageData,
  };
}

store.subscribe((state, event) => {
  const action = event.type === "INSERT" ? "Creado" : event.type === "DELETE" ? "Eliminado" : "Actualizado";
  app.lastEvent =
    app.adminActionMessage ||
    (event.reason === "daily_reset"
      ? "Demo reiniciada para el nuevo dia"
      : event.reason === "weekly_cleanup"
        ? "Limpieza semanal aplicada"
      : event.reason === "remote_bootstrap"
        ? "Supabase sincronizado"
        : `${action}: ${event.table || "estado"}`);
  app.adminActionMessage = "";
  if (event.type === "INSERT" && event.table === "appointments" && event.record?.source === "public") {
    app.lastEvent = `Nueva reserva: ${event.record.clientName || "Cliente"}`;
    playReservationSound();
  }
  if (document.visibilityState === "visible") scheduleRender();
});

window.addEventListener("resize", () => {
  applyDeviceProfile();
  cancelAnimationFrame(titleFitFrame);
  titleFitFrame = requestAnimationFrame(fitPanelTitles);
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    ensureBackgroundPlayback();
    scheduleRender();
  }
});

window.setInterval(() => {
  if (document.visibilityState !== "visible") return;
  if (!app?.superAdminSession && !app?.adminSession && !app?.barberSession) return;
  scheduleRender();
}, REMOTE_SESSION_VALIDATE_MS);

render();






