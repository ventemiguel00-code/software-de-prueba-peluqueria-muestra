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
const THEME_CACHE_PREFIX = "theme_cache_";
const REMOTE_SYNC_DEBOUNCE_MS = 180;

const dayNames = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
const longDayNames = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
const OPEN_HOUR = 8;
const CLOSE_HOUR = 20;
const SLOT_MINUTES = 60;
const DEFAULT_BUSINESS_ID = "business_principal";
const DEFAULT_BUSINESS_SLUG = "barberia-principal";
const PRODUCTION_BASE_URL = "https://software-de-prueba-peluqueria-muest.vercel.app";
const SUPER_ADMIN_USER = "SDMcompany";
const SUPER_ADMIN_PASSWORD_HASH = "9c92c00e241ec0c78798834456113f123762afcb4ef84e337eafbcf7d372f2fc";
const baseSlots = Array.from({ length: CLOSE_HOUR - OPEN_HOUR }, (_, index) =>
  `${String(OPEN_HOUR + index).padStart(2, "0")}:00`
);
const BUSINESS_SELECT_COLUMNS =
  "id,business_name,slug,logo_url,theme,primary_color,secondary_color,background_url,active,created_at,updated_at";
const BUSINESS_SETTINGS_SELECT_COLUMNS =
  "business_id,environment_archive_meta,theme_override,environment_archive_url,environment_archive_name,public_path,custom_domain,notes,created_at";
const BARBER_SELECT_COLUMNS =
  "id,business_id,name,user,password,password_hash,whatsapp,active,photo,gradient,specialty,created_at";
const APPOINTMENT_SELECT_COLUMNS =
  "id,business_id,barber_id,date,time,status,client_name,whatsapp,source,week_key,block_origin,visit_state,notes";
const BLOCKED_DAY_SELECT_COLUMNS = "id,business_id,barber_id,date";
const SERVICE_SELECT_COLUMNS =
  "id,business_id,service_name,service_value,admin_percentage,barber_percentage,active,created_at";
const BARBER_SERVICE_SELECT_COLUMNS = "id,business_id,barber_id,service_id,active,created_at";
const ADMIN_ACCOUNT_SELECT_COLUMNS =
  "id,business_id,admin_name,admin_user,password_hash,role,active,created_at,updated_at";

const avatarGradients = [
  "linear-gradient(145deg, #0f2f38, #c7d0d2)",
  "linear-gradient(145deg, #191b1d, #447381)",
  "linear-gradient(145deg, #324044, #f1f5f4)",
  "linear-gradient(145deg, #0b1519, #8ca2a7)",
];
const DEFAULT_BUSINESS_THEME_KEY = "gold-prestige";
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
  background: "#070A0D",
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

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function nowMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

function toISO(date) {
  return date.toISOString().slice(0, 10);
}

function getWeekKey(date = new Date()) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
}

function getWeekDates(anchor = new Date()) {
  const date = new Date(anchor);
  const day = date.getDay() || 7;
  date.setDate(date.getDate() - day + 1);
  return Array.from({ length: 7 }, (_, index) => {
    const next = new Date(date);
    next.setDate(date.getDate() + index);
    return toISO(next);
  });
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

function slotRange(time) {
  const start = parseSlotTime(time);
  const end = addMinutesToSlot(time, SLOT_MINUTES);
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
  const id = businessId || DEFAULT_BUSINESS_ID;
  if (derivedBusinessCache.buckets.has(id)) return derivedBusinessCache.buckets.get(id);
  const bucket = buildBusinessBucketFromState(store.state, id);
  derivedBusinessCache.buckets.set(id, bucket);
  return bucket;
}

function isPastDate(date) {
  return date < todayISO();
}

function isTodayDate(date) {
  return date === todayISO();
}

function slotHasPassed(date, time) {
  if (!isTodayDate(date)) return false;
  const start = parseSlotTime(time);
  return start.hour * 60 + start.minute <= nowMinutes();
}

function isPublicSlotBookable(barberId, date, time) {
  const state = statusFor(barberId, date, time);
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
  try {
    const cached = JSON.parse(localStorage.getItem(`${THEME_CACHE_PREFIX}${cleanSlug}`) || "null");
    const theme = cached?.theme && BUSINESS_THEMES[cached.theme] ? cached.theme : "";
    const colors = cached?.colors && typeof cached.colors === "object" ? cached.colors : null;
    if (!theme || !colors) return null;
    return { theme, colors };
  } catch {
    return null;
  }
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
    active: false,
    createdAt: todayISO(),
    updatedAt: todayISO(),
  });
}

function normalizeThemeKey(themeKey = DEFAULT_BUSINESS_THEME_KEY) {
  const key = String(themeKey || DEFAULT_BUSINESS_THEME_KEY).trim();
  if (key === "loading-neutral") return key;
  return BUSINESS_THEMES[key] ? key : BUSINESS_THEME_ALIASES[key] || DEFAULT_BUSINESS_THEME_KEY;
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
    updatedAt: record.updatedAt || todayISO(),
  };
}

function normalizeTenantState(state = {}) {
  const business = normalizeBusiness((state.businesses || [defaultBusiness()])[0] || defaultBusiness());
  const businesses = (state.businesses?.length ? state.businesses : [business]).map(normalizeBusiness);
  const currentBusinessId = state.meta?.currentBusinessId || businesses[0]?.id || DEFAULT_BUSINESS_ID;
  const attachBusiness = (item) => ({ ...item, negocioId: item.negocioId || DEFAULT_BUSINESS_ID });
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
    barberServices: (state.barberServices || []).map(attachBusiness),
  };
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

function colorsForBusiness(business = currentBusiness()) {
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
  const colors = colorsForBusiness(business);
  try {
    localStorage.setItem(
      `${THEME_CACHE_PREFIX}${business.slug}`,
      JSON.stringify({ theme, colors, businessId: business.id || "", updatedAt: new Date().toISOString() })
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
      .map((row) => [row.business_id, row.environment_archive_meta || {}])
  );
  return (businesses || []).map((business) =>
    settingsByBusiness.has(business.id)
      ? normalizeBusiness({
          ...business,
          ...businessBrandingPatchFromMeta(settingsByBusiness.get(business.id)),
          ...businessThemePatchFromMeta(settingsByBusiness.get(business.id).themeColors),
        })
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
    const businessId = row.business_id || row.negocio_id || row.id || "";
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
      reservationsToday: Number(row.reservations_today ?? row.reservas_hoy ?? 0) || 0,
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
    { id: "service_corte_clasico", negocioId: DEFAULT_BUSINESS_ID, name: "Corte clasico", value: 20000, adminPercentage: 50, barberPercentage: 50, active: true },
    { id: "service_corte_barba", negocioId: DEFAULT_BUSINESS_ID, name: "Corte + barba", value: 30000, adminPercentage: 50, barberPercentage: 50, active: true },
    { id: "service_barba", negocioId: DEFAULT_BUSINESS_ID, name: "Barba", value: 18000, adminPercentage: 50, barberPercentage: 50, active: true },
    { id: "service_cejas", negocioId: DEFAULT_BUSINESS_ID, name: "Cejas", value: 12000, adminPercentage: 50, barberPercentage: 50, active: true },
    { id: "service_diseno", negocioId: DEFAULT_BUSINESS_ID, name: "Diseno", value: 15000, adminPercentage: 50, barberPercentage: 50, active: true },
  ],
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
    active: row.active !== false,
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

function mapServiceToRow(service) {
  return {
    id: service.id,
    business_id: service.negocioId || DEFAULT_BUSINESS_ID,
    service_name: service.name,
    service_value: Number(service.value) || 0,
    admin_percentage: Number(service.adminPercentage) || 0,
    barber_percentage: Number(service.barberPercentage) || 0,
    active: service.active ?? true,
  };
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
    negocioId: row.business_id || row.negocio_id || DEFAULT_BUSINESS_ID,
    name: row.name || "",
    user: row.user || "",
    password: row.password || "",
    passwordHash: row.password_hash || "",
    whatsapp: row.whatsapp || "",
    active: row.active ?? true,
    photo: row.photo || "",
    gradient: row.gradient || avatarGradients[index % avatarGradients.length],
    specialty: row.specialty || "Servicio premium",
  };
}

function mapRowToAppointment(row) {
  const parsedMeta = parseAppointmentNotes(row.notes || "");
  return {
    id: row.id,
    negocioId: row.business_id || row.negocio_id || DEFAULT_BUSINESS_ID,
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
    negocioId: row.business_id || row.negocio_id || DEFAULT_BUSINESS_ID,
    barberId: row.barber_id,
    date: row.date,
  };
}

function mapRowToService(row) {
  return {
    id: row.id,
    negocioId: row.business_id || row.negocio_id || DEFAULT_BUSINESS_ID,
    name: row.service_name || "",
    value: Number(row.service_value) || 0,
    adminPercentage: Number(row.admin_percentage) || 0,
    barberPercentage: Number(row.barber_percentage) || 0,
    active: row.active ?? true,
  };
}

function mapRowToBarberService(row) {
  return {
    id: row.id,
    negocioId: row.business_id || row.negocio_id || DEFAULT_BUSINESS_ID,
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
    password: "",
    passwordHash: row.password_hash || "",
    role: row.role || "admin_negocio",
    active: row.active !== false,
    createdAt: row.created_at || todayISO(),
  };
}

function mergeBusinessSettingsMeta(currentMeta, patchMeta) {
  return {
    ...(currentMeta && typeof currentMeta === "object" ? currentMeta : {}),
    ...(patchMeta && typeof patchMeta === "object" ? patchMeta : {}),
  };
}

class StudioStore {
  constructor() {
    this.listeners = new Set();
    this.channel = "BroadcastChannel" in window ? new BroadcastChannel(CHANNEL) : null;
    this.supabase = createSupabaseClient();
    this.remoteChannel = null;
    this.remoteScopeKey = "";
    this.remoteLoadedScopeKey = "";
    this.remoteReady = false;
    this.syncInFlight = false;
    this.syncQueued = false;
    this.syncQueuedQuiet = false;
    this.syncTimer = null;
    this.bucketCacheStateRef = null;
    this.bucketCache = new Map();
    this.applyingRemote = false;
    this.dailyResetPending = false;
    this.state = this.load();
    if (this.shouldIgnoreCrossScopeLocalSync(this.state)) {
      this.state = normalizeTenantState(defaultState());
    }
    this.applyDemoMaintenance();

    if (this.channel) {
      this.channel.onmessage = (event) => {
        if (!event.data?.type) return;
        const incomingState = this.loadLocalState();
        if (this.shouldIgnoreCrossScopeLocalSync(incomingState)) {
          this.queueRemoteSync();
          return;
        }
        this.state = incomingState;
        this.emit(event.data);
      };
    }

    window.addEventListener("storage", (event) => {
      if (event.key === APP_KEY) {
        const incomingState = this.loadLocalState();
        if (this.shouldIgnoreCrossScopeLocalSync(incomingState)) {
          this.queueRemoteSync();
          return;
        }
        this.state = incomingState;
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
    if (!raw) return normalizeTenantState(defaultState());
    try {
      return normalizeTenantState(JSON.parse(raw));
    } catch {
      return normalizeTenantState(defaultState());
    }
  }

  persist(event = { type: "UPDATE" }) {
    this.invalidateBusinessBuckets();
    invalidateDerivedBusinessCache();
    this.state = this.stateWithRuntimeScope(this.state);
    localStorage.setItem(APP_KEY, JSON.stringify(this.state));
    this.emit(event);
    this.channel?.postMessage(event);
    if (this.supabase && !this.applyingRemote) {
      this.persistRemote(event).catch((error) => {
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
      return `${route.view}:global:${route.businessSlug || DEFAULT_BUSINESS_SLUG}`;
    }
    const scopeView = route.shell === "internal" ? "internal" : route.view;
    const scopedBusiness = this.businessBySlug(route.businessSlug) || null;
    const scopedBusinessId =
      route.businessSlug === DEFAULT_BUSINESS_SLUG
        ? DEFAULT_BUSINESS_ID
        : scopedBusiness?.id || null;
    return `${scopeView}:${scopedBusinessId || "global"}:${route.businessSlug || DEFAULT_BUSINESS_SLUG}`;
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

  async bootstrapRemote() {
    if (this.dailyResetPending) {
      await this.persistRemote({ type: "RESET", table: "demo", reason: "daily_reset" });
      this.dailyResetPending = false;
    }
    await this.syncFromRemote({ quiet: true });
    if (!localStorage.getItem(MULTITENANT_SECONDARY_PURGE_KEY)) {
      await this.purgeSecondaryBusinessesOperationalData();
      localStorage.setItem(MULTITENANT_SECONDARY_PURGE_KEY, todayISO());
      await this.syncFromRemote({ quiet: true });
    }
    this.emit({ type: "SYNC", table: "remote", reason: "remote_bootstrap" });
    this.subscribeRemote();
  }

  queueRemoteSync({ quiet = false } = {}) {
    this.syncQueuedQuiet = this.syncQueued ? this.syncQueuedQuiet && quiet : quiet;
    if (this.syncInFlight) {
      this.syncQueued = true;
      return;
    }
    this.syncQueued = true;
    window.clearTimeout(this.syncTimer);
    this.syncTimer = window.setTimeout(() => {
      if (!this.syncQueued || this.syncInFlight) return;
      const nextQuiet = this.syncQueuedQuiet;
      this.syncQueued = false;
      this.syncQueuedQuiet = false;
      this.syncFromRemote({ quiet: nextQuiet }).catch((error) => console.error(error));
    }, REMOTE_SYNC_DEBOUNCE_MS);
  }

  async syncFromRemote({ quiet = false } = {}) {
    if (!this.supabase || this.syncInFlight) return;
    const perf = perfMark("syncFromRemote");
    this.syncInFlight = true;

    try {
      const localState = this.loadLocalState();
      const route = resolveRoute(location.pathname);
      const businessesQuery =
        route.view === "super-admin"
          ? this.supabase.from("businesses").select(BUSINESS_SELECT_COLUMNS).order("created_at", { ascending: true })
          : this.supabase.from("businesses").select(BUSINESS_SELECT_COLUMNS).eq("slug", route.businessSlug).limit(1);
      const businessesResult = await businessesQuery;
      if (businessesResult.error) throw businessesResult.error;
      const remoteBusinesses = (businessesResult.data || []).map(mapRowToBusiness);
      const missingBusinesses =
        route.view === "super-admin"
          ? (localState.businesses || []).filter(
              (business) => !remoteBusinesses.some((remoteBusiness) => remoteBusiness.id === business.id)
            )
          : [];
      if (route.view === "super-admin" && missingBusinesses.length) {
        const { error } = await this.supabase
          .from("businesses")
          .upsert(missingBusinesses.map(mapBusinessToRow), { onConflict: "id" });
        if (error) throw error;
      }
      const mergedBusinesses =
        route.view === "super-admin"
          ? mergeBusinessesById(remoteBusinesses, missingBusinesses)
          : mergeBusinessesById(
              (this.state.businesses || []).filter((business) => business.slug === route.businessSlug),
              (localState.businesses || []).filter((business) => business.slug === route.businessSlug),
              remoteBusinesses
            );

      const scopedBusiness =
        route.view === "super-admin"
          ? null
          : mergedBusinesses.find((business) => business.slug === route.businessSlug) ||
            (route.businessSlug === DEFAULT_BUSINESS_SLUG ? defaultBusiness() : placeholderBusinessForSlug(route.businessSlug));
      const scopedBusinessId =
        route.view === "super-admin"
          ? null
          : route.businessSlug === DEFAULT_BUSINESS_SLUG
            ? DEFAULT_BUSINESS_ID
            : scopedBusiness?.id || null;
      const syncScopeView = route.shell === "internal" ? "internal" : route.view;
      const syncScopeKey = `${syncScopeView}:${scopedBusinessId || "global"}:${route.businessSlug || ""}`;

      if (route.view === "super-admin") {
        const [businessSettingsResult, summaryRpcResult] = await Promise.all([
          this.supabase.from("business_settings").select(BUSINESS_SETTINGS_SELECT_COLUMNS).order("created_at", { ascending: true }),
          this.supabase.rpc("business_dashboard_summary", { target_date: todayISO() }),
        ]);

        if (businessSettingsResult.error && businessSettingsResult.error.code !== "42P01") {
          throw businessSettingsResult.error;
        }

        let businessSummaryById = {};
        if (!summaryRpcResult.error && Array.isArray(summaryRpcResult.data)) {
          businessSummaryById = buildBusinessSummaryMapFromRpcRows(mergedBusinesses, summaryRpcResult.data || []);
        } else {
          const [barbersSummaryResult, servicesSummaryResult, appointmentsSummaryResult] = await Promise.all([
            this.supabase.from("barbers").select("id,business_id"),
            this.supabase.from("services").select("id,business_id"),
            this.supabase
              .from("appointments")
              .select("id,business_id,date,status")
              .eq("date", todayISO()),
          ]);
          if (barbersSummaryResult.error) throw barbersSummaryResult.error;
          if (servicesSummaryResult.error && servicesSummaryResult.error.code !== "42P01") throw servicesSummaryResult.error;
          if (appointmentsSummaryResult.error) throw appointmentsSummaryResult.error;
          businessSummaryById = buildBusinessSummaryMap(mergedBusinesses, {
            barbers: (barbersSummaryResult.data || []).map((row) => ({ negocioId: row.business_id })),
            services: (servicesSummaryResult.data || []).map((row) => ({ negocioId: row.business_id })),
            appointments: (appointmentsSummaryResult.data || []).map((row) => ({
              negocioId: row.business_id,
              date: row.date,
              status: row.status,
            })),
          });
        }

        const businessSettingsRows = businessSettingsResult.data || [];
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
          businesses: themedBusinesses.length ? themedBusinesses : defaultState().businesses,
          barbers: localState.barbers || this.state.barbers || [],
          appointments: localState.appointments || this.state.appointments || [],
          blockedDays: localState.blockedDays || this.state.blockedDays || [],
          services: localState.services || this.state.services || [],
          barberServices: localState.barberServices || this.state.barberServices || [],
        };

        await this.syncAdminAccountsFromRemote(null, nextState.businesses);

        this.applyingRemote = true;
        this.state = nextState;
        localStorage.setItem(APP_KEY, JSON.stringify(this.state));
        this.remoteLoadedScopeKey = syncScopeKey;
        this.remoteReady = true;

        if (!quiet) {
          this.emit({ type: "SYNC", table: "remote" });
          this.channel?.postMessage({ type: "SYNC", table: "remote" });
        }
        perfEnd(perf, "(super-admin)");
        return;
      }

      const rangeAnchor = /^\d{4}-\d{2}-\d{2}$/.test(this.state.meta?.selectedDate || "")
        ? this.state.meta.selectedDate
        : todayISO();
      const activeWeekDates = getWeekDates(new Date(`${rangeAnchor}T00:00:00`));
      const weekStartDate = activeWeekDates[0];
      const weekEndDate = activeWeekDates[activeWeekDates.length - 1];

      const queryScoped = (table, orderColumn, ascending = true, tune = null) => {
        if (route.view !== "super-admin" && !scopedBusinessId) {
          return Promise.resolve({ data: [], error: null });
        }
        const columnMap = {
          barbers: BARBER_SELECT_COLUMNS,
          appointments: APPOINTMENT_SELECT_COLUMNS,
          blocked_days: BLOCKED_DAY_SELECT_COLUMNS,
          services: SERVICE_SELECT_COLUMNS,
          barber_services: BARBER_SERVICE_SELECT_COLUMNS,
          business_settings: BUSINESS_SETTINGS_SELECT_COLUMNS,
        };
        let query = this.supabase.from(table).select(columnMap[table] || "*");
        if (route.view !== "super-admin") {
          query = query.eq("business_id", scopedBusinessId);
        }
        if (typeof tune === "function") {
          query = tune(query);
        }
        return query.order(orderColumn, { ascending });
      };

      const [barbersResult, appointmentsBaseResult, blockedDaysResult, servicesResult, barberServicesResult, businessSettingsResult] = await Promise.all([
        queryScoped("barbers", "created_at", true),
        queryScoped("appointments", "date", true, (query) => query.gte("date", weekStartDate).lte("date", weekEndDate)),
        queryScoped("blocked_days", "date", true),
        queryScoped("services", "created_at", true),
        queryScoped("barber_services", "created_at", true),
        queryScoped("business_settings", "created_at", true),
      ]);

      if (barbersResult.error) throw barbersResult.error;
      if (appointmentsBaseResult.error) throw appointmentsBaseResult.error;
      if (blockedDaysResult.error) throw blockedDaysResult.error;
      if (servicesResult.error) throw servicesResult.error;
      if (barberServicesResult.error) throw barberServicesResult.error;
      if (businessSettingsResult.error && businessSettingsResult.error.code !== "42P01") throw businessSettingsResult.error;

      const appointmentsResult = {
        ...appointmentsBaseResult,
        data: (appointmentsBaseResult.data || []).sort((a, b) =>
          String(a.time || "").localeCompare(String(b.time || ""))
        ),
      };

      const servicesData = servicesResult.error ? [] : (servicesResult.data || []).map(mapRowToService);
      const barberServicesData = barberServicesResult.error ? [] : (barberServicesResult.data || []).map(mapRowToBarberService);
      const scopedBusinessSettingsRows = businessSettingsResult.data || [];
      const scopedBusinessList = mergedBusinesses.length ? mergedBusinesses : [scopedBusiness];
      const scopedThemedBusinesses = applyBusinessSettingsThemeColors(scopedBusinessList, scopedBusinessSettingsRows);
      cacheBusinessThemes(scopedThemedBusinesses);
      this.syncBusinessSettingsToLocal(scopedBusinessSettingsRows, route.view === "super-admin" ? null : scopedBusinessId);

      const currentWeek = getWeekKey();
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
        businesses: scopedThemedBusinesses.length ? scopedThemedBusinesses : [scopedBusiness],
        barbers: (barbersResult.data || []).map((row, index) => mapRowToBarber(row, index)),
        appointments: (appointmentsResult.data || [])
          .map(mapRowToAppointment)
          .filter((item) => item.status !== "reserved" || item.weekKey === currentWeek),
        blockedDays: (blockedDaysResult.data || []).map(mapRowToBlockedDay),
        services: servicesData,
        barberServices: barberServicesData,
      };

      await this.syncAdminAccountsFromRemote(route.view === "super-admin" ? null : scopedBusinessId, nextState.businesses);

      const replicatedBusinessIds = detectReplicatedBusinessIds(nextState);

      this.applyingRemote = true;
      this.state = nextState;
      localStorage.setItem(APP_KEY, JSON.stringify(this.state));
      this.remoteLoadedScopeKey = syncScopeKey;
      this.remoteReady = true;

      if (replicatedBusinessIds.length) {
        for (const businessId of replicatedBusinessIds) {
          await this.ensureBusinessStartsEmpty(businessId);
        }
        this.applyingRemote = false;
        this.syncInFlight = false;
        await this.syncFromRemote({ quiet });
        return;
      }

      if (!quiet) {
        this.emit({ type: "SYNC", table: "remote" });
        this.channel?.postMessage({ type: "SYNC", table: "remote" });
      }
      perfEnd(perf, `(${route.view}:${scopedBusinessId || "global"})`);
    } finally {
      this.applyingRemote = false;
      this.syncInFlight = false;
      if (this.syncQueued) {
        const queuedQuiet = this.syncQueuedQuiet || quiet;
        this.syncQueued = false;
        this.syncQueuedQuiet = false;
        this.queueRemoteSync({ quiet: queuedQuiet });
      }
    }
  }

  async seedRemoteFromLocal() {
    if (!this.supabase) return;

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

    await this.syncFromRemote();
  }

  subscribeRemote() {
    if (!this.supabase) return;
    const route = resolveRoute(location.pathname);
    const scopedBusiness =
      route.view === "super-admin"
        ? null
        : this.businessBySlug(route.businessSlug) || null;
    const scopedBusinessId =
      route.view === "super-admin"
        ? null
        : route.businessSlug === DEFAULT_BUSINESS_SLUG
          ? DEFAULT_BUSINESS_ID
          : scopedBusiness?.id || null;
    const scopeView = route.shell === "internal" ? "internal" : route.view;
    const scopeKey = `${scopeView}:${scopedBusinessId || "global"}:${route.businessSlug || ""}`;
    if (this.remoteChannel && this.remoteScopeKey === scopeKey) return;
    if (this.remoteChannel) {
      this.supabase.removeChannel(this.remoteChannel);
      this.remoteChannel = null;
    }
    this.remoteScopeKey = scopeKey;
    const scopeWasLoaded = this.remoteLoadedScopeKey === scopeKey;
    this.remoteReady = scopeWasLoaded;
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

    this.remoteChannel = this.supabase
      .channel(`barber-delux-realtime-${scopeKey}`)
      .on("postgres_changes", barbersConfig, () => {
        this.queueRemoteSync();
      })
      .on("postgres_changes", businessesConfig, () => {
        this.queueRemoteSync();
      })
      .on("postgres_changes", appointmentConfig, () => {
        this.queueRemoteSync();
      })
      .on("postgres_changes", blockedDaysConfig, () => {
        this.queueRemoteSync();
      })
      .on("postgres_changes", servicesConfig, () => {
        this.queueRemoteSync();
      })
      .on("postgres_changes", barberServicesConfig, () => {
        this.queueRemoteSync();
      })
      .on("postgres_changes", businessSettingsConfig, () => {
        this.queueRemoteSync();
      })
      .subscribe();
    if (!scopeWasLoaded) {
      this.queueRemoteSync();
    }
  }

  async persistRemote(event) {
    if (!this.supabase) return;
    if (event.reason === "daily_reset") {
      const appointmentsReset = await this.supabase
        .from("appointments")
        .delete()
        .eq("business_id", DEFAULT_BUSINESS_ID);
      if (appointmentsReset.error) throw appointmentsReset.error;

      const blockedDaysReset = await this.supabase
        .from("blocked_days")
        .delete()
        .eq("business_id", DEFAULT_BUSINESS_ID);
      if (blockedDaysReset.error) throw blockedDaysReset.error;

      const seedAppointments = this.state.appointments
        .filter((appointment) => appointment.negocioId === DEFAULT_BUSINESS_ID)
        .map(mapAppointmentToRow);
      if (seedAppointments.length) {
        const appointmentsSeed = await this.supabase
          .from("appointments")
          .upsert(seedAppointments, { onConflict: "id" });
        if (appointmentsSeed.error) throw appointmentsSeed.error;
      }
      return;
    }

    if (event.reason === "weekly_cleanup") {
      const currentWeek = getWeekKey();
      const { error } = await this.supabase
        .from("appointments")
        .delete()
        .eq("business_id", DEFAULT_BUSINESS_ID)
        .eq("status", "reserved")
        .neq("week_key", currentWeek);
      if (error) throw error;
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
        const businessId = event.id;
        if (!businessId) return;
        const [appointmentsDelete, blockedDaysDelete, barberServicesDelete, servicesDelete, barbersDelete, businessDelete] = await Promise.all([
          this.supabase.from("appointments").delete().eq("business_id", businessId),
          this.supabase.from("blocked_days").delete().eq("business_id", businessId),
          this.supabase.from("barber_services").delete().eq("business_id", businessId),
          this.supabase.from("services").delete().eq("business_id", businessId),
          this.supabase.from("barbers").delete().eq("business_id", businessId),
          this.supabase.from("businesses").delete().eq("id", businessId),
        ]);
        if (appointmentsDelete.error) throw appointmentsDelete.error;
        if (blockedDaysDelete.error) throw blockedDaysDelete.error;
        if (barberServicesDelete.error) throw barberServicesDelete.error;
        if (servicesDelete.error) throw servicesDelete.error;
        if (barbersDelete.error) throw barbersDelete.error;
        if (businessDelete.error) throw businessDelete.error;
        return;
      }
      if (event.type === "DELETE") {
        const { error } = await this.supabase.from("businesses").delete().eq("id", event.id);
        if (error) throw error;
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
      const { error } = await this.supabase
        .from("services")
        .upsert(mapServiceToRow(event.record), { onConflict: "id" });
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
    if (this.state.meta.dayKey === currentDay) {
      if (this.state.meta.weekKey !== currentWeek) {
        this.state.meta.weekKey = currentWeek;
        this.persist({ type: "SYNC", table: "meta" });
      }
      return;
    }

    const seededState = defaultState();
    this.state.appointments = [
      ...this.state.appointments.filter((appointment) => appointment.negocioId !== DEFAULT_BUSINESS_ID),
      ...seededState.appointments,
    ];
    this.state.blockedDays = [
      ...this.state.blockedDays.filter((blockedDay) => blockedDay.negocioId !== DEFAULT_BUSINESS_ID),
      ...seededState.blockedDays,
    ];
    this.state.meta.dayKey = currentDay;
    this.state.meta.weekKey = currentWeek;
    this.state.meta.selectedDate = currentDay;
    this.dailyResetPending = true;
    this.persist({ type: "RESET", table: "demo", reason: "daily_reset" });
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
      this.bucketCache.set(id, buildBusinessBucketFromState(this.state, id));
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
    return this.state.businesses.find((business) => business.slug === normalizedSlug) || null;
  }

  saveBusiness(payload) {
    if (payload.id) {
      this.state.businesses = this.state.businesses.map((business) =>
        business.id === payload.id ? normalizeBusiness({ ...business, ...payload, updatedAt: todayISO() }) : business
      );
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
    let query = this.supabase.from("admin_accounts").select(ADMIN_ACCOUNT_SELECT_COLUMNS).order("created_at", { ascending: true });
    if (businessId) {
      query = query.eq("business_id", businessId);
    }
    const { data, error } = await query;
    if (error) {
      if (error.code === "42P01") return false;
      throw error;
    }

    const remoteAccounts = (data || []).map((row) => mapRowToAdminAccount(row, businesses));
    const localAccounts = loadAdminAccounts().filter((account) => account.id !== PRINCIPAL_ADMIN.id);
    const preservedAccounts = businessId
      ? localAccounts.filter((account) => account.businessId !== businessId)
      : [];
    saveAdminAccounts([...preservedAccounts, ...remoteAccounts]);
    return true;
  }

  syncBusinessSettingsToLocal(rows = [], scopedBusinessId = null) {
    const map = loadBackgroundMediaMap();
    const businessesById = new Map(this.state.businesses.map((business) => [business.id, business]));
    const rowsByBusiness = new Map(
      (rows || []).map((row) => [row.business_id || DEFAULT_BUSINESS_ID, row])
    );

    if (scopedBusinessId) {
      const row = rowsByBusiness.get(scopedBusinessId);
      const meta = row?.environment_archive_meta || {};
      const backgroundMedia = meta?.backgroundMedia || null;
      if (backgroundMedia) {
        map[scopedBusinessId] = backgroundMedia;
      } else {
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
        const meta = row?.environment_archive_meta || {};
        const backgroundMedia = meta?.backgroundMedia || null;
        if (backgroundMedia) {
          map[business.id] = backgroundMedia;
        } else if (business.id !== DEFAULT_BUSINESS_ID) {
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
    return true;
  }

  async upsertAdminAccountRemote(account) {
    if (!this.supabase || !account?.id || account.id === PRINCIPAL_ADMIN.id) return true;
    const { error } = await this.supabase
      .from("admin_accounts")
      .upsert(mapAdminAccountToRow(account), { onConflict: "id" });
    if (error) {
      if (error.code === "42P01") return false;
      throw error;
    }
    return true;
  }

  async deleteAdminAccountRemote(id, businessId = null) {
    if (!this.supabase || !id || id === PRINCIPAL_ADMIN.id) return true;
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

  clearBusinessOperationalDataLocal(businessId) {
    if (!businessId || businessId === DEFAULT_BUSINESS_ID) return false;
    this.state.barbers = this.state.barbers.filter((barber) => barber.negocioId !== businessId);
    this.state.services = this.state.services.filter((service) => service.negocioId !== businessId);
    this.state.appointments = this.state.appointments.filter((appointment) => appointment.negocioId !== businessId);
    this.state.blockedDays = this.state.blockedDays.filter((blockedDay) => blockedDay.negocioId !== businessId);
    this.state.barberServices = this.state.barberServices.filter((relation) => relation.negocioId !== businessId);
    this.state = this.stateWithRuntimeScope(this.state);
    localStorage.setItem(APP_KEY, JSON.stringify(this.state));
    return true;
  }

  async ensureBusinessStartsEmpty(businessId) {
    if (!businessId || businessId === DEFAULT_BUSINESS_ID) return true;

    this.clearBusinessOperationalDataLocal(businessId);
    this.emit({ type: "SYNC", table: "businesses", reason: "empty_business_bootstrap" });

    if (!this.supabase) return true;

    const deletions = await Promise.all([
      this.supabase.from("appointments").delete().eq("business_id", businessId),
      this.supabase.from("blocked_days").delete().eq("business_id", businessId),
      this.supabase.from("barber_services").delete().eq("business_id", businessId),
      this.supabase.from("services").delete().eq("business_id", businessId),
      this.supabase.from("barbers").delete().eq("business_id", businessId),
    ]);

    deletions.forEach((result) => {
      if (result.error && result.error.code !== "42P01") {
        throw result.error;
      }
    });

    return true;
  }

  async purgeSecondaryBusinessesOperationalData() {
    const replicatedBusinessIds = detectReplicatedBusinessIds(this.state);
    if (!replicatedBusinessIds.length) return true;

    for (const businessId of replicatedBusinessIds) {
      await this.ensureBusinessStartsEmpty(businessId);
    }
    return true;
  }

  deleteBusiness(businessId) {
    if (!businessId || businessId === DEFAULT_BUSINESS_ID) return false;
    this.state.businesses = this.state.businesses.filter((business) => business.id !== businessId);
    this.state.barbers = this.state.barbers.filter((barber) => barber.negocioId !== businessId);
    this.state.services = this.state.services.filter((service) => service.negocioId !== businessId);
    this.state.appointments = this.state.appointments.filter((appointment) => appointment.negocioId !== businessId);
    this.state.blockedDays = this.state.blockedDays.filter((blockedDay) => blockedDay.negocioId !== businessId);
    this.state.barberServices = this.state.barberServices.filter((relation) => relation.negocioId !== businessId);
    this.persist({ type: "CASCADE_DELETE", table: "businesses", id: businessId });
    return true;
  }

  getAppointment(barberId, date, time, negocioId = currentBusinessId()) {
    return this.businessBucket(negocioId).appointmentBySlot.get(`${barberId}|${date}|${time}`);
  }

  isDayBlocked(barberId, date, negocioId = currentBusinessId()) {
    return this.businessBucket(negocioId).blockedDayKeys.has(`${barberId}|${date}`);
  }

  upsertAppointment(payload) {
    const negocioId = payload.negocioId || currentBusinessId();
    const existing = this.getAppointment(payload.barberId, payload.date, payload.time, negocioId);
    const appointment = {
      id: existing?.id || uid("apt"),
      negocioId,
      source: payload.source || "admin",
      weekKey: payload.status === "reserved" ? getWeekKey(new Date(`${payload.date}T00:00:00`)) : "permanent",
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
      weekKey: getWeekKey(new Date(`${payload.date}T00:00:00`)),
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
    localStorage.setItem(APP_KEY, JSON.stringify(this.state));
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

  saveBarber(payload) {
    if (payload.id) {
      this.state.barbers = this.state.barbers.map((barber) =>
        barber.id === payload.id && barber.negocioId === (payload.negocioId || currentBusinessId())
          ? { ...barber, ...payload }
          : barber
      );
      this.persist({
        type: "UPDATE",
        table: "barbers",
        record: this.state.barbers.find(
          (barber) => barber.id === payload.id && barber.negocioId === (payload.negocioId || currentBusinessId())
        ),
      });
      return this.state.barbers.find(
        (barber) => barber.id === payload.id && barber.negocioId === (payload.negocioId || currentBusinessId())
      );
    }

    const { id, ...barberPayload } = payload;
    const created = {
      id: uid("barber"),
      negocioId: payload.negocioId || currentBusinessId(),
      gradient: avatarGradients[this.state.barbers.length % avatarGradients.length],
      photo: "",
      active: true,
      specialty: "Servicio premium",
      ...barberPayload,
    };
    this.state.barbers.push(created);
    this.persist({ type: "INSERT", table: "barbers", record: created });
    return created;
  }

  blockDay(barberId, date) {
    if (!this.isDayBlocked(barberId, date)) {
      const record = { id: uid("day"), negocioId: currentBusinessId(), barberId, date };
      this.state.blockedDays.push(record);
      this.persist({ type: "INSERT", table: "blocked_days", record });
    }
  }

  unblockDay(barberId, date) {
    this.state.blockedDays = this.state.blockedDays.filter(
      (item) => !(item.barberId === barberId && item.date === date && item.negocioId === currentBusinessId())
    );
    this.persist({ type: "DELETE", table: "blocked_days", record: { barberId, date, negocioId: currentBusinessId() } });
  }

  blockAvailableSlots(barberId, date) {
    baseSlots.forEach((time) => {
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

  saveService(payload) {
    if (payload.id) {
      this.state.services = this.state.services.map((service) =>
        service.id === payload.id && service.negocioId === (payload.negocioId || currentBusinessId())
          ? { ...service, ...payload }
          : service
      );
      this.persist({
        type: "UPDATE",
        table: "services",
        record: this.state.services.find(
          (service) => service.id === payload.id && service.negocioId === (payload.negocioId || currentBusinessId())
        ),
      });
      return;
    }

    const created = {
      id: uid("service"),
      negocioId: payload.negocioId || currentBusinessId(),
      active: true,
      ...payload,
    };
    this.state.services.push(created);
    this.persist({ type: "INSERT", table: "services", record: created });
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

  saveBarberServices(barberId, serviceIds, negocioId = currentBusinessId()) {
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
    this.persist({ type: "REPLACE", table: "barber_services", barberId, businessId: negocioId, records });
    return records;
  }
}

const store = new StudioStore();
const ADMIN_SESSION_KEY = "barber-delux-admin-session";
const BARBER_SESSION_KEY = "noxora-barber-session";
const ADMIN_ACCOUNTS_KEY = "barber-delux-admin-accounts-v1";
const BUSINESS_ENV_ATTACHMENTS_KEY = "barber-delux-business-env-attachments-v1";
const VISUAL_NAV_STATE_KEY = "barber-delux-visual-nav-state-v1";
const SUPER_ADMIN_VISIBLE_PASSWORDS_KEY = "barber-delux-super-admin-visible-passwords-v1";
const SUPER_ADMIN_SESSION_KEY = "vision-barber-super-admin-session";
const BACKGROUND_MEDIA_KEY = "barber-delux-background-media-v1";
const BACKGROUND_MEDIA_BY_BUSINESS_KEY = "barber-delux-background-media-by-business-v1";
const MULTITENANT_SECONDARY_PURGE_KEY = "barber-delux-secondary-business-purge-v1";
const SOUND_PREF_KEY = "barber-delux-sound-enabled";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000;
const SESSION_IDLE_TTL_MS = 45 * 60 * 1000;
const SESSION_HEARTBEAT_MS = 60 * 1000;
const AUTH_ATTEMPTS_KEY = "barber-delux-auth-attempts-v1";
const AUTH_WINDOW_MS = 15 * 60 * 1000;
const AUTH_BLOCK_MS = 20 * 60 * 1000;
const AUTH_MAX_ATTEMPTS = 5;
const MAX_BACKGROUND_VIDEO_BYTES = 10 * 1024 * 1024;
const MAX_ENV_ARCHIVE_BYTES = 25 * 1024 * 1024;
const DEFAULT_BACKGROUND_VIDEO = {
  type: "video",
  src: "/assets/v2_watermarked-a5df2acc-b2b0-45a5-9132-e0006456c345.mp4",
};
const PRINCIPAL_ADMIN = {
  id: "admin_principal",
  name: "Administrador principal",
  user: "admin",
  password: "",
  passwordHash: "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9",
  role: "administrador_principal",
  businessId: DEFAULT_BUSINESS_ID,
  active: true,
};

function resolveRoute(pathname = location.pathname) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] === "super-admin" || parts[0] === "admin-global") {
    return { view: "super-admin", businessSlug: DEFAULT_BUSINESS_SLUG };
  }
  if (parts[0] === "barberia-test" && parts[1]) {
    return { view: "business-test", businessSlug: parts[1] };
  }
  if (parts[0] === "panel" && parts[1]) {
    const params = new URLSearchParams(location.search);
    return { view: params.get("modo") === "barbero" ? "barber" : "admin", businessSlug: parts[1], shell: "internal" };
  }
  if (parts[0] === "admin" && parts[1]) {
    return { view: "admin", businessSlug: parts[1], shell: "internal" };
  }
  if (parts[0] === "barbero" && parts[1]) {
    return { view: "barber", businessSlug: parts[1], shell: "internal" };
  }
  if ((parts[0] === "barberia" || parts[0] === "negocio") && parts[1]) {
    return { view: "public", businessSlug: parts[1], shell: "public" };
  }
  if (pathname === "/admin-vip") return { view: "admin", businessSlug: DEFAULT_BUSINESS_SLUG, shell: "internal" };
  if (pathname === "/gestion-equipo") return { view: "barber", businessSlug: DEFAULT_BUSINESS_SLUG, shell: "internal" };
  return { view: "public", businessSlug: DEFAULT_BUSINESS_SLUG, shell: "public" };
}

function loadAdminAccounts() {
  const raw = localStorage.getItem(ADMIN_ACCOUNTS_KEY);
  let accounts = [];
  try {
    accounts = raw ? JSON.parse(raw) : [];
  } catch {
    accounts = [];
  }

  const secondary = accounts.filter((account) => account.id !== PRINCIPAL_ADMIN.id);
  return [PRINCIPAL_ADMIN, ...secondary];
}

function adminAccountsForBusiness(businessId = currentBusinessId()) {
  return loadAdminAccounts().filter((account) => account.businessId === businessId);
}

function saveAdminAccounts(accounts) {
  const normalized = [
    PRINCIPAL_ADMIN,
    ...accounts.filter((account) => account.id !== PRINCIPAL_ADMIN.id),
  ];
  localStorage.setItem(ADMIN_ACCOUNTS_KEY, JSON.stringify(normalized));
}

function loadVisibleAdminPasswords() {
  const raw = localStorage.getItem(SUPER_ADMIN_VISIBLE_PASSWORDS_KEY);
  try {
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveVisibleAdminPasswords(map) {
  localStorage.setItem(SUPER_ADMIN_VISIBLE_PASSWORDS_KEY, JSON.stringify(map || {}));
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

function readStoredJSON(storage, key) {
  if (!storage || !key) return null;
  try {
    const raw = storage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function businessScopedSessionKey(baseKey, businessSlug = DEFAULT_BUSINESS_SLUG) {
  const slug = String(businessSlug || DEFAULT_BUSINESS_SLUG).trim().toLowerCase() || DEFAULT_BUSINESS_SLUG;
  return `${baseKey}:${slug}`;
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
  const scoped = readStoredJSON(sessionStorage, businessScopedSessionKey(baseKey, businessSlug));
  if (scoped) return scoped;
  return readStoredJSON(sessionStorage, legacyKey);
}

function saveScopedBusinessSession(baseKey, businessSlug, value, legacyKey = baseKey) {
  sessionStorage.setItem(businessScopedSessionKey(baseKey, businessSlug), JSON.stringify(value));
  if (legacyKey) {
    sessionStorage.removeItem(legacyKey);
  }
}

function clearScopedBusinessSession(baseKey, businessSlug, legacyKey = baseKey) {
  sessionStorage.removeItem(businessScopedSessionKey(baseKey, businessSlug));
  if (legacyKey) {
    sessionStorage.removeItem(legacyKey);
  }
}

function buildSessionFingerprint(role = "session", businessSlug = DEFAULT_BUSINESS_SLUG, businessId = "") {
  const host = window.location?.host || "local";
  const userAgent = window.navigator?.userAgent || "ua";
  return [
    String(role || "session").trim().toLowerCase(),
    String(businessSlug || DEFAULT_BUSINESS_SLUG).trim().toLowerCase(),
    String(businessId || "").trim().toLowerCase(),
    host,
    userAgent.slice(0, 160),
  ].join("|");
}

function isSessionExpired(session, context = {}) {
  if (!session?.startedAt) return false;
  const startedAt = new Date(session.startedAt).getTime();
  if (!Number.isFinite(startedAt)) return false;
  if (Date.now() - startedAt > SESSION_TTL_MS) return true;
  const lastSeenAt = new Date(session.lastSeenAt || session.startedAt).getTime();
  if (Number.isFinite(lastSeenAt) && Date.now() - lastSeenAt > SESSION_IDLE_TTL_MS) return true;
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
      sessionStorage.setItem(baseKey, JSON.stringify(nextSession));
    } else {
      saveScopedBusinessSession(baseKey, businessSlug, nextSession, legacyKey);
    }
  }
  return nextSession;
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
  if (app.currentBusinessSlug && app.currentBusinessSlug !== DEFAULT_BUSINESS_SLUG) {
    return requestedBusiness() || placeholderBusinessForSlug(app.currentBusinessSlug);
  }
  return store.businessById(DEFAULT_BUSINESS_ID) || defaultBusiness();
}

function requestedBusiness() {
  return store.businessBySlug(String(app.currentBusinessSlug || "").trim().toLowerCase()) || null;
}

function currentBusinessId() {
  return currentBusiness()?.id || null;
}

function expectedScopeForCurrentRoute() {
  const route = resolveRoute(location.pathname);
  if (route.view === "super-admin") return `super-admin:global:${DEFAULT_BUSINESS_SLUG}`;
  const business = requestedBusiness() || currentBusiness();
  const scopeView = route.shell === "internal" ? "internal" : route.view;
  return `${scopeView}:${business?.id || "global"}:${route.businessSlug || DEFAULT_BUSINESS_SLUG}`;
}

function isCurrentBusinessLoading() {
  if (!store.supabase) return false;
  if (app.view === "super-admin") return store.remoteLoadedScopeKey !== expectedScopeForCurrentRoute() && !store.remoteReady;
  if (app.currentBusinessSlug && app.currentBusinessSlug !== DEFAULT_BUSINESS_SLUG && !requestedBusiness()) {
    return !store.remoteReady;
  }
  return store.remoteLoadedScopeKey !== expectedScopeForCurrentRoute() && !store.remoteReady;
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
  if (app.adminSession.id === PRINCIPAL_ADMIN.id) {
    return currentBusinessId() === DEFAULT_BUSINESS_ID ? PRINCIPAL_ADMIN : null;
  }
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
  return getBusinessBucket(businessId).services;
}

function activeServicesForBusiness(businessId = currentBusinessId()) {
  return getBusinessBucket(businessId).activeServices;
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

function businessUrlSet(business) {
  const slug = business?.slug || DEFAULT_BUSINESS_SLUG;
  if (business?.id === DEFAULT_BUSINESS_ID) {
    return {
      public: PRODUCTION_BASE_URL,
      panel: `${PRODUCTION_BASE_URL}/panel/${DEFAULT_BUSINESS_SLUG}`,
      admin: `${PRODUCTION_BASE_URL}/panel/${DEFAULT_BUSINESS_SLUG}?modo=admin`,
      barber: `${PRODUCTION_BASE_URL}/panel/${DEFAULT_BUSINESS_SLUG}?modo=barbero`,
    };
  }
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

  const legacyMatch =
    candidates.find(
      (account) =>
        String(account.user || "").trim().toLowerCase() === normalizedUser &&
        account.password &&
        account.password === password
    ) || null;
  if (!legacyMatch) return null;

  if (legacyMatch.id !== PRINCIPAL_ADMIN.id) {
    legacyMatch.passwordHash = passwordHash;
    legacyMatch.password = "";
    saveAdminAccounts(loadAdminAccounts().map((account) => (account.id === legacyMatch.id ? legacyMatch : account)));
    try {
      await store.upsertAdminAccountRemote(legacyMatch);
    } catch (error) {
      console.warn("Legacy admin hash upgrade skipped", error);
    }
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
      await store.syncFromRemote({ quiet: true });
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
  localStorage.setItem(APP_KEY, JSON.stringify(store.state));
  return fallbackBarber;
}

function isPrincipalAdmin() {
  return app.adminSession?.role === PRINCIPAL_ADMIN.role;
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

function currentBackgroundMedia() {
  const businessId = currentBusinessId();
  if (!businessId) return null;
  return loadBackgroundMedia(businessId);
}

function loadSoundPreference() {
  return localStorage.getItem(SOUND_PREF_KEY) === "true";
}

const initialRoute = resolveRoute(location.pathname);

const app = {
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
  superAdminSession: JSON.parse(sessionStorage.getItem(SUPER_ADMIN_SESSION_KEY) || "null"),
  superAdminLoginError: "",
  superAdminMessage: "",
  superAdminCredentialReveal: null,
  superAdminPendingLogos: {},
  superAdminPendingLogoFiles: {},
  superAdminPendingEnvironmentArchives: {},
  superAdminOpenBusinessId: "",
  superAdminCreateOpen: false,
  adminLoginError: "",
  adminAccountMessage: "",
  adminActionMessage: "",
  adminBarberMessage: "",
  adminServiceMessage: "",
  backgroundMedia: loadBackgroundMedia(DEFAULT_BUSINESS_ID),
  backgroundMessage: "",
  pendingBackgroundVideo: null,
  soundEnabled: loadSoundPreference(),
  barberDate: todayISO(),
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

function businessTodayReservationCount(businessId) {
  const summary = businessSummaryById(businessId);
  if (summary) return summary.reservationsToday || 0;
  const today = todayISO();
  return getBusinessBucket(businessId).appointments.filter(
    (appointment) =>
      appointment.date === today && COUNTABLE_STATUSES.has(appointment.status)
  ).length;
}

function statusFor(barberId, date, time) {
  if (store.isDayBlocked(barberId, date)) return { status: "blocked", dayBlocked: true };
  const appointment = store.getAppointment(barberId, date, time);
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
  return new Date(`${date}T00:00:00`);
}

function isCountableAppointment(item) {
  return item && COUNTABLE_STATUSES.has(item.status);
}

function buildCounterSummary(anchorDate) {
  const activeWeekDates = new Set(getWeekDates(dateAnchor(anchorDate)));
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
  return `<section class="admin-main accordion-panel ${open ? "open" : ""}">
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
  if (slug === DEFAULT_BUSINESS_SLUG) return "/";
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
  const isVideo = backgroundMedia?.type === "video";
  const videoMarkup = !useStaticSuperAdminBg && isVideo
    ? `<video class="global-bg-video" src="${backgroundMedia.src}" autoplay muted loop playsinline preload="auto" poster="/assets/atelier-luxury-hero.png"></video>`
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
  const backgroundScope = app.view === "super-admin" ? "super-admin" : currentBusinessId();
  const signature = `${backgroundScope}|${backgroundMedia?.type || "image"}|${backgroundMedia?.src || ""}`;
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
  const business = currentBusiness();
  const shellType = routeShellType();
  const tabs = shellType === "internal"
    ? [
        ["admin", "Admin"],
        ["barber", "Barbero"],
      ]
    : [];
  return `
    <header class="topbar" style="${businessThemeStyle(business)}">
      <button class="brand" data-public-link aria-label="Ir a agenda publica">
        ${businessLogoMarkup(business)}
        <span><strong>${escapeHTML(business?.name || "Vision")}</strong><small>${escapeHTML(business?.slug || "Barber")}</small></span>
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
  const colors = colorsForBusiness(business);
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
  return business?.logoUrl
    ? `<span class="brand-mark business-logo-mark has-logo"><img src="${escapeHTML(business.logoUrl)}" alt="Logo ${escapeHTML(business.name || "barberia")}" loading="eager" /></span>`
    : `<span class="brand-mark business-logo-mark empty-logo">${escapeHTML((business?.name || "B").slice(0, 1).toUpperCase())}</span>`;
}

function refreshPersistentShellBrand() {
  if (app.view === "super-admin") {
    applyThemeColorsToRoot(colorsForBusiness(defaultBusiness()));
    return;
  }
  const business = currentBusiness();
  const colors = colorsForBusiness(business);
  applyThemeColorsToRoot(colors);
  const topbar = document.querySelector(".topbar");
  const brand = document.querySelector(".brand");
  if (topbar) topbar.setAttribute("style", businessThemeStyle(business));
  if (!brand) return;
  brand.innerHTML = `
    ${businessLogoMarkup(business)}
    <span><strong>${escapeHTML(business?.name || "Barberia")}</strong><small>${escapeHTML(business?.slug || "entorno")}</small></span>
  `;
}

function barberWhatsappLink(barber) {
  const phone = moneylessPhone(barber?.whatsapp);
  return phone ? `<a class="inline-link" href="https://wa.me/${phone}" target="_blank" rel="noreferrer">WhatsApp</a>` : `<span>Sin WhatsApp</span>`;
}

function weekButtons(selected, attr = "data-admin-date") {
  return `<div class="week-cards">${getWeekDates()
    .map((date) => {
      const d = new Date(`${date}T00:00:00`);
      const past = isPastDate(date);
      return `<button class="${date === selected ? "active" : ""} ${past ? "past-date" : ""}" ${attr}="${date}">
        <span>${longDayNames[d.getDay()]}</span>
        <strong>${String(d.getDate()).padStart(2, "0")}</strong>
      </button>`;
    })
    .join("")}</div>`;
}

function dateStrip(selected, onClickAttr = "data-date") {
  return `<div class="date-strip">${getWeekDates().map((date) => {
    const d = new Date(`${date}T00:00:00`);
    const disabled = onClickAttr === "data-date" && isPastDate(date);
    return `<button class="${date === selected ? "active" : ""} ${disabled ? "past-date" : ""}" ${onClickAttr}="${date}" ${disabled ? "disabled" : ""}>
      <span>${dayNames[d.getDay()]}</span>
      <strong>${String(d.getDate()).padStart(2, "0")}</strong>
    </button>`;
  }).join("")}</div>`;
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

function serviceById(id, businessId = currentBusinessId()) {
  return getBusinessBucket(businessId).servicesById.get(id) || null;
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
  const weekDates = new Set(getWeekDates(new Date(`${anchorDate}T00:00:00`)).filter((date) => date <= anchorDate));
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
  return activeServicesForBusiness(currentBusinessId()).filter(
    (service) => barberOffersService(barberId, service.id)
  );
}

function isPublicDateAvailable(barberId, date) {
  if (!barberId || isPastDate(date)) return false;
  return baseSlots.some((time) => isPublicSlotBookable(barberId, date, time));
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
  businessHasNoServices,
  businessHasNoBarbers,
}) {
  const backgroundMedia = currentBackgroundMedia();
  return appShell(`
    <section class="hero">
      <div class="hero-bg ${backgroundMedia?.type === "video" ? "video-backed" : ""}"></div>
      <div class="hero-copy">
        <p class="eyebrow">Reservas premium para barberias modernas</p>
        <h1>${escapeHTML(business?.name || "Vision Barber")}</h1>
        <p>Agenda publica, control operativo y sincronizacion en tiempo real con una experiencia rapida para clientes, administradores y barberos.</p>
      </div>
    </section>

    <section class="workspace public-flow">
      <section class="flow-card open single-booking-card">
        <div class="flow-card-head">
          <div class="booking-card-top">
            <div>
              <div class="section-title">
                <span>${currentStep === "services" ? "01" : currentStep === "barbers" ? "02" : currentStep === "days" ? "03" : currentStep === "slots" ? "04" : "05"}</span>
                <h2>${bookingCardTitle}</h2>
              </div>
              <p class="microcopy">${escapeHTML(bookingCardMicrocopy)}</p>
            </div>
            ${bookingStepper}
          </div>
          ${bookingCardSummary ? `<div class="flow-summary">${bookingCardSummary}</div>` : ""}
          ${bookingCardActions ? `<div class="step-toolbar flow-toolbar">${bookingCardActions}</div>` : ""}
        </div>
        <div class="flow-card-body booking-card-body">
          ${bookingCardBody}
          ${
            currentStep === "services" && (businessHasNoServices || businessHasNoBarbers)
              ? `<div class="empty-state-card">
                  ${businessHasNoServices ? `<p>Aun no hay servicios disponibles.</p>` : ""}
                  ${businessHasNoBarbers ? `<p>Aun no hay barberos disponibles.</p>` : ""}
                  <p>Este negocio todavia no tiene horarios configurados.</p>
                </div>`
              : ""
          }
        </div>
      </section>
    </section>
    ${
      app.bookingConfirmation
        ? `<dialog id="booking-confirm-dialog">
          <div class="modal-card confirm-card booking-confirm-card">
            <h3>Cita reservada</h3>
            <p>Estimado/a ${escapeHTML(app.bookingConfirmation.clientName)}, su cita fue reservada exitosamente.</p>
            <div class="confirmation-summary">
              <span>Barbero</span><strong>${escapeHTML(app.bookingConfirmation.barberName)}</strong>
              <span>Servicio</span><strong>${escapeHTML(app.bookingConfirmation.serviceName)}</strong>
              <span>Fecha</span><strong>${escapeHTML(app.bookingConfirmation.date)}</strong>
              <span>Horario</span><strong>${escapeHTML(app.bookingConfirmation.range)}</strong>
              <span>WhatsApp</span><strong>${escapeHTML(app.bookingConfirmation.whatsapp)}</strong>
            </div>
            <div class="button-row">
              <button class="primary-action" type="button" data-close-booking-confirm>Entendido</button>
            </div>
          </div>
        </dialog>`
        : ""
    }
  `);
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
  const services = servicesForBusiness(businessId);
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
  const business = currentBusiness();
  const requested = requestedBusiness();
  const businessDataLoading =
    isCurrentBusinessLoading() ||
    Boolean(app.currentBusinessSlug && app.currentBusinessSlug !== DEFAULT_BUSINESS_SLUG && !requested && !store.remoteReady);
  if (app.currentBusinessSlug && app.currentBusinessSlug !== DEFAULT_BUSINESS_SLUG && !requested && !businessDataLoading) {
    return appShell(`
      <section class="booking-surface">
        <div class="section-title"><span>!</span><h2>Entorno no disponible</h2></div>
        <p class="microcopy">Negocio no encontrado.</p>
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
  if (isPastDate(app.selectedDate)) {
    app.selectedDate = todayISO();
    app.publicDaySelected = false;
    app.selectedSlot = "";
  }
  const businessId = business.id;
  const publicServices = activeServicesForBusiness(businessId);
  const activeBarbers = app.selectedServiceId ? barbersForService(app.selectedServiceId) : store.activeBarbersByBusiness(businessId);
  const businessHasNoServices = !businessDataLoading && publicServices.length === 0;
  const businessHasNoBarbers = !businessDataLoading && store.activeBarbersByBusiness(businessId).length === 0;
  const selected = activeBarbers.find((barber) => barber.id === app.selectedBarberId) || null;
  const hasSelectedBarber = Boolean(selected);
  const selectedService = publicServices.find((service) => service.id === app.selectedServiceId) || null;
  const hasSelectedService = Boolean(selectedService);
  const hasSelectedDay = hasSelectedBarber && app.publicDaySelected;
  const hasSelectedSlot = hasSelectedDay && Boolean(app.selectedSlot);
  const availability = hasSelectedDay
    ? baseSlots.map((time) => ({ time, ...statusFor(selected.id, app.selectedDate, time) }))
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
    ? `${longDayNames[new Date(`${app.selectedDate}T00:00:00`).getDay()]} · ${app.selectedDate}`
    : "";
  const bookingStepper = `<div class="booking-stepper">
      <span class="${currentStep === "services" ? "active" : hasSelectedService ? "done" : ""}">1</span>
      <span class="${currentStep === "barbers" ? "active" : hasSelectedBarber ? "done" : ""}">2</span>
      <span class="${currentStep === "days" ? "active" : hasSelectedDay || hasSelectedSlot ? "done" : ""}">3</span>
      <span class="${currentStep === "slots" ? "active" : hasSelectedSlot ? "done" : ""}">4</span>
      <span class="${currentStep === "details" ? "active" : ""}">5</span>
    </div>`;
  let bookingCardTitle = "Seleccionar servicio";
  let bookingCardMicrocopy = "Elige el servicio que deseas reservar.";
  let bookingCardActions = "";
  let bookingCardSummary = "";
  let bookingCardBody = "";

  if (currentStep === "services") {
    bookingCardTitle = "Seleccionar servicio";
    bookingCardMicrocopy = businessDataLoading
      ? "Preparando servicios, barberos y agenda del negocio."
      : "Elige el servicio que deseas reservar.";
    bookingCardBody = `<div class="barber-list">
      ${
        businessDataLoading
          ? `<div class="business-component-skeleton public-component-skeleton"><span></span><span></span><span></span></div>`
          : publicServices.length
          ? publicServices
        .map(
          (service) => `
          <div class="barber-option">
            <button class="barber-card ${service.id === app.selectedServiceId ? "active" : ""}" data-select-service="${service.id}">
              <div class="summary-badge service-badge">$</div>
              <span><strong>${escapeHTML(service.name)}</strong><small>${formatCOP(service.value)}</small></span>
            </button>
          </div>`
        )
        .join("")
          : `<div class="empty-state-card"><p>Aun no hay servicios disponibles.</p></div>`
      }
    </div>`;
  }

  if (currentStep === "barbers") {
    bookingCardTitle = "Elegir barbero";
    bookingCardMicrocopy = "Selecciona el profesional disponible para este servicio.";
    bookingCardSummary = `<div class="selected-card compact-selected">
      <div class="summary-badge service-badge">$</div>
      <div>
        <strong>${escapeHTML(selectedService?.name || "")}</strong>
        <small>${selectedService ? formatCOP(selectedService.value) : ""}</small>
      </div>
    </div>`;
    bookingCardActions = `<button class="secondary-action" type="button" data-reset-service>Cambiar servicio</button>`;
    bookingCardBody = `<div class="barber-list public-barber-grid">
      ${
        activeBarbers.length
          ? activeBarbers
              .map(
                (barber) => `
          <button class="barber-card public-barber-card ${barber.id === app.selectedBarberId ? "active" : ""}" data-select-barber="${barber.id}">
            ${avatar(barber, "lg")}
            <span class="public-barber-copy">
              <strong>${escapeHTML(barber.name)}</strong>
            </span>
          </button>`
              )
              .join("")
          : `<div class="empty-state-card"><p>No hay barberos disponibles para este servicio.</p><button class="secondary-action" type="button" data-reset-service>Cambiar servicio</button></div>`
      }
    </div>`;
  }

  if (currentStep === "days") {
    bookingCardTitle = "Seleccionar dia";
    bookingCardMicrocopy = "Elige el dia para consultar horarios disponibles.";
    bookingCardSummary = `<div class="booking-selection-stack">
      <div class="selected-card compact-selected">
        <div class="summary-badge service-badge">$</div>
        <div>
          <strong>${escapeHTML(selectedService?.name || "")}</strong>
          <small>${selectedService ? formatCOP(selectedService.value) : ""}</small>
        </div>
      </div>
      <div class="selected-card compact-selected">
        ${selected ? avatar(selected, "md") : ""}
        <div>
          <strong>${escapeHTML(selected?.name || "")}</strong>
          <small>${escapeHTML(selected?.specialty || "Servicio premium")}</small>
        </div>
      </div>
    </div>`;
    bookingCardActions = `<button class="secondary-action" type="button" data-reset-service>Cambiar servicio</button><button class="secondary-action" type="button" data-reset-barber>Cambiar barbero</button>`;
    bookingCardBody = `<div class="date-strip">${getWeekDates()
      .map((date) => {
        const d = new Date(`${date}T00:00:00`);
        const disabled = !isPublicDateAvailable(selected.id, date);
        return `<button class="${date === app.selectedDate ? "active" : ""} ${disabled ? "past-date" : ""}" data-public-date="${date}" ${disabled ? "disabled" : ""}>
          <span>${dayNames[d.getDay()]}</span>
          <strong>${String(d.getDate()).padStart(2, "0")}</strong>
        </button>`;
      })
      .join("")}</div>`;
  }

  if (currentStep === "slots") {
    bookingCardTitle = "Seleccionar horario";
    bookingCardMicrocopy = selectedDayLabel;
    bookingCardSummary = `<div class="booking-selection-stack">
      <div class="selected-card compact-selected">
        <div class="summary-badge service-badge">$</div>
        <div>
          <strong>${escapeHTML(selectedService?.name || "")}</strong>
          <small>${selectedService ? formatCOP(selectedService.value) : ""}</small>
        </div>
      </div>
      <div class="selected-card compact-selected">
        ${selected ? avatar(selected, "md") : ""}
        <div>
          <strong>${escapeHTML(selected?.name || "")}</strong>
          <small>${escapeHTML(selected?.specialty || "Servicio premium")}</small>
        </div>
      </div>
      <div class="selected-card compact-selected">
        <div class="summary-badge">${dayNames[new Date(`${app.selectedDate}T00:00:00`).getDay()]}</div>
        <div>
          <strong>${escapeHTML(selectedDayLabel)}</strong>
          <small>Dia seleccionado</small>
        </div>
      </div>
    </div>`;
    bookingCardActions = `<button class="secondary-action" type="button" data-reset-service>Cambiar servicio</button><button class="secondary-action" type="button" data-reset-barber>Cambiar barbero</button><button class="secondary-action" type="button" data-reset-day>Cambiar fecha</button>`;
    bookingCardBody = `<div class="slot-grid public-slots">
      ${availability
        .map(({ time, status, appointment, dayBlocked }) => {
          const unavailable = isUnavailableSlot(app.selectedDate, time, status);
          const disabled = status !== "available" || unavailable;
          return `<button class="slot ${STATUS[status].tone} ${unavailable ? "unavailable" : ""} ${time === app.selectedSlot ? "picked" : ""}" data-slot="${time}" ${disabled ? "disabled" : ""}>
            <small class="slot-state">${publicSlotStateTag(status, dayBlocked, unavailable && status === "available")}</small>
            <strong>${slotRange(time)}</strong>
            <span>${unavailable && status === "available" ? "No disponible" : publicSlotLabel(status, dayBlocked)}</span>
          </button>`;
        })
        .join("")}
    </div>`;
  }

  if (currentStep === "details") {
    bookingCardTitle = "Confirmar reserva";
    bookingCardMicrocopy = "Completa tus datos para confirmar la reserva.";
    bookingCardSummary = `<div class="booking-selection-stack">
      <div class="selected-card compact-selected">
        <div class="summary-badge service-badge">$</div>
        <div>
          <strong>${escapeHTML(selectedService?.name || "")}</strong>
          <small>${selectedService ? formatCOP(selectedService.value) : ""}</small>
        </div>
      </div>
      <div class="selected-card compact-selected">
        ${selected ? avatar(selected, "md") : ""}
        <div>
          <strong>${escapeHTML(selected?.name || "")}</strong>
          <small>${escapeHTML(selectedDayLabel)}</small>
        </div>
      </div>
      <div class="selected-card compact-selected">
        <div class="summary-badge">03</div>
        <div>
          <strong>${slotRange(app.selectedSlot)}</strong>
          <small>Horario seleccionado</small>
        </div>
      </div>
    </div>`;
    bookingCardActions = `<button class="secondary-action" type="button" data-reset-service>Cambiar servicio</button><button class="secondary-action" type="button" data-reset-barber>Cambiar barbero</button><button class="secondary-action" type="button" data-reset-day>Cambiar fecha</button><button class="secondary-action" type="button" data-reset-slot>Cambiar hora</button>`;
    bookingCardBody = `<form id="public-booking-form" class="form-stack">
        ${app.bookingError ? `<p class="form-feedback error">${escapeHTML(app.bookingError)}</p>` : ""}
        <div class="confirmation-summary">
          <span>Servicio</span><strong>${escapeHTML(selectedService?.name || "")}</strong>
          <span>Barbero</span><strong>${escapeHTML(selected?.name || "")}</strong>
          <span>Fecha</span><strong>${escapeHTML(app.selectedDate)}</strong>
          <span>Hora</span><strong>${slotRange(app.selectedSlot || "08:00")}</strong>
        </div>
        <label>Nombre<input name="clientName" required placeholder="Tu nombre" /></label>
        <label>WhatsApp<input name="whatsapp" required inputmode="tel" placeholder="300 123 4567" /></label>
        <button class="primary-action" ${app.bookingSubmitting ? "disabled" : ""}>${app.bookingSubmitting ? "Reservando..." : "Confirmar cita"}</button>
      </form>
      <p class="microcopy">Disponibilidad validada en tiempo real para evitar reservas duplicadas en el mismo horario.</p>`;
  }

  const backgroundMedia = currentBackgroundMedia();
  return appShell(`
    <section class="hero">
      <div class="hero-bg ${backgroundMedia?.type === "video" ? "video-backed" : ""}"></div>
      <div class="hero-copy">
        <p class="eyebrow">Reservas premium para barberias modernas</p>
        <h1>${escapeHTML(business?.name || "Vision Barber")}</h1>
        <p>Agenda publica, control operativo y sincronizacion en tiempo real con una experiencia rapida para clientes, administradores y barberos.</p>
      </div>
    </section>

    <section class="workspace public-flow">
      <section class="flow-card open single-booking-card">
        <div class="flow-card-head">
          <div class="booking-card-top">
            <div>
              <div class="section-title">
                <span>${currentStep === "services" ? "01" : currentStep === "barbers" ? "02" : currentStep === "days" ? "03" : currentStep === "slots" ? "04" : "05"}</span>
                <h2>${bookingCardTitle}</h2>
              </div>
              <p class="microcopy">${escapeHTML(bookingCardMicrocopy)}</p>
            </div>
            ${bookingStepper}
          </div>
          ${bookingCardSummary ? `<div class="flow-summary">${bookingCardSummary}</div>` : ""}
          ${bookingCardActions ? `<div class="step-toolbar flow-toolbar">${bookingCardActions}</div>` : ""}
        </div>
        <div class="flow-card-body booking-card-body">
          ${bookingCardBody}
          ${
            currentStep === "services" && (businessHasNoServices || businessHasNoBarbers)
              ? `<div class="empty-state-card">
                  ${businessHasNoServices ? `<p>Aun no hay servicios disponibles.</p>` : ""}
                  ${businessHasNoBarbers ? `<p>Aun no hay barberos disponibles.</p>` : ""}
                  <p>Este negocio todavia no tiene horarios configurados.</p>
                </div>`
              : ""
          }
        </div>
      </section>
    </section>
    ${
      app.bookingConfirmation
        ? `<dialog id="booking-confirm-dialog">
          <div class="modal-card confirm-card booking-confirm-card">
            <h3>Cita reservada</h3>
            <p>Estimado/a ${escapeHTML(app.bookingConfirmation.clientName)}, su cita fue reservada exitosamente.</p>
            <div class="confirmation-summary">
              <span>Barbero</span><strong>${escapeHTML(app.bookingConfirmation.barberName)}</strong>
              <span>Servicio</span><strong>${escapeHTML(app.bookingConfirmation.serviceName)}</strong>
              <span>Fecha</span><strong>${escapeHTML(app.bookingConfirmation.date)}</strong>
              <span>Horario</span><strong>${escapeHTML(app.bookingConfirmation.range)}</strong>
              <span>WhatsApp</span><strong>${escapeHTML(app.bookingConfirmation.whatsapp)}</strong>
            </div>
            <div class="button-row">
              <button class="primary-action" type="button" data-close-booking-confirm>Entendido</button>
            </div>
          </div>
        </dialog>`
        : ""
    }
  `);
}

function renderAdmin() {
  const selected = barberById(app.adminBarberId) || barbersForBusiness(currentBusinessId())[0];
  const businessId = currentBusinessId();
  const businessBarbers = barbersForBusiness(businessId);
  const businessAppointments = store.state.appointments.filter((appointment) => appointment.negocioId === businessId);
  const businessBlockedDays = store.state.blockedDays.filter((blockedDay) => blockedDay.negocioId === businessId);
  const rows = selected
    ? baseSlots.map((time) => ({ time, ...statusFor(selected.id, app.selectedDate, time) }))
    : [];
  const blocked = selected ? store.isDayBlocked(selected.id, app.selectedDate) : false;

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
          <div>${dateStrip(app.selectedDate, "data-admin-date")}</div>
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
  const rows = baseSlots.map((time) => ({ time, ...statusFor(barber.id, date, time) }));
  return appShell(`
    <section class="dashboard-head">
      <div class="barber-heading">
        ${avatar(barber, "lg")}
        <div>
          <p class="eyebrow">Agenda del dia actual</p>
          <h1>${escapeHTML(barber.name)}</h1>
          <span>${longDayNames[new Date(`${date}T00:00:00`).getDay()]} · ${date}</span>
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
  return `<form id="barber-form" class="editor-card">
    <input type="hidden" name="id" value="${escapeHTML(barber?.id || "")}" />
    ${app.adminBarberMessage ? `<p class="form-note">${escapeHTML(app.adminBarberMessage)}</p>` : ""}
    <label>Nombre<input name="name" required value="${escapeHTML(barber?.name || "")}" /></label>
    <label>WhatsApp<input name="whatsapp" inputmode="tel" value="${escapeHTML(barber?.whatsapp || "")}" placeholder="300 123 4567" /></label>
    <label>Usuario<input name="user" required value="${escapeHTML(barber?.user || "")}" /></label>
    <label>Clave<input name="password" ${barber ? "" : "required"} value="" placeholder="${escapeHTML(barber ? "Deja vacio para conservar la clave actual" : "studio2026")}" /></label>
    <label>Especialidad<input name="specialty" value="${escapeHTML(barber?.specialty || "Servicio premium")}" /></label>
    <label class="file-control">Fotografia<input name="photo" type="file" accept="image/*" /></label>
    <div class="service-checklist-block">
      <span class="field-label">Servicios disponibles</span>
      ${
        services.length
          ? `<div class="checklist-grid">
              ${services
                .map(
                  (service) => `<label class="check-item">
                    <input type="checkbox" name="serviceIds" value="${escapeHTML(service.id)}" ${selectedServiceIds.has(service.id) ? "checked" : ""} />
                    <span>${escapeHTML(service.name)}</span>
                  </label>`
                )
                .join("")}
            </div>`
          : `<p class="microcopy">Primero crea servicios en el modulo Servicios para poder asignarlos.</p>`
      }
    </div>
    <label class="toggle-line"><input name="active" type="checkbox" ${barber?.active ?? true ? "checked" : ""} /> Barbero activo</label>
    <div class="button-row">
      <button class="primary-action">${submitLabel}</button>
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
  return `<section class="admin-main dashboard-lite">
    <div class="section-title"><span>R</span><h2>${title}</h2></div>
    <div class="dashboard-cards">
      <div><span>Reservas de hoy</span><strong>${summary.reservationsToday}</strong></div>
      <div><span>Ganancias de hoy</span><strong>${formatCOP(summary.barberGainToday)}</strong></div>
      <div><span>Ganancias semanales</span><strong>${formatCOP(summary.barberGainWeek)}</strong></div>
    </div>
  </section>`;
}

function adminAccountsSection() {
  const accounts = adminAccountsForBusiness(currentBusinessId());
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
          const principal = account.id === PRINCIPAL_ADMIN.id;
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
  return `<article class="service-card">
    <form class="service-edit-form form-stack" data-service-id="${escapeHTML(service.id)}">
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
  return `<section class="admin-main">
    <div class="section-title"><span>S</span><h2>Servicios</h2></div>
    <p class="microcopy">Crea y administra servicios sin tocar todavia el flujo actual de reservas.</p>
    ${app.adminServiceMessage ? `<p class="form-note">${escapeHTML(app.adminServiceMessage)}</p>` : ""}
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
          : `<p class="microcopy">Aun no hay servicios creados.</p>`
      }
    </div>
  </section>`;
}

function renderSuperAdmin() {
  const businesses = [...store.state.businesses].sort((a, b) => a.name.localeCompare(b.name, "es"));
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
        (account) => account.businessId === business.id && account.role !== PRINCIPAL_ADMIN.role
      );
      const admin = admins[0] || null;
      const adminList = admins.length
        ? admins
            .map(
              (account) => {
                const visiblePassword = visibleAdminPassword(account.id);
                return `<form class="super-admin-account-edit form-stack" data-admin-account-id="${escapeHTML(account.id)}">
                <div class="form-grid">
                  <label>Nombre<input name="name" required value="${escapeHTML(account.name || "")}" /></label>
                  <label>Usuario<input name="user" required value="${escapeHTML(account.user || "")}" /></label>
                  <label>Creado<input value="${escapeHTML(account.createdAt || todayISO())}" disabled /></label>
                </div>
                ${
                  visiblePassword
                    ? `<p class="form-note">Clave visible: <strong>${escapeHTML(visiblePassword.password || "")}</strong> · Usuario: <strong>${escapeHTML(visiblePassword.user || account.user || "")}</strong></p>`
                    : `<p class="microcopy">No hay clave temporal visible guardada para este administrador.</p>`
                }
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
          <div class="super-admin-logo-preview">${business.logoUrl || app.superAdminPendingLogos[business.id] ? `<img src="${escapeHTML(app.superAdminPendingLogos[business.id] || business.logoUrl)}" alt="Logo ${escapeHTML(business.name)}" />` : `<span>Sin logo cargado</span>`}</div>
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
  const createBusinessPanel = `<article class="admin-account-card super-business-card ${app.superAdminCreateOpen ? "is-open" : ""}">
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
    <div class="super-business-panel" ${app.superAdminCreateOpen ? "" : "hidden"}>
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
        <div class="super-admin-logo-preview">${app.superAdminPendingLogos.create ? `<img src="${escapeHTML(app.superAdminPendingLogos.create)}" alt="Vista previa logo" />` : `<span>Vista previa del logo</span>`}</div>
        <div class="super-admin-environment-preview">${app.superAdminPendingEnvironmentArchives.create ? `<strong>${escapeHTML(app.superAdminPendingEnvironmentArchives.create.fileName)}</strong><span>${escapeHTML(summarizeEnvironmentAttachment(app.superAdminPendingEnvironmentArchives.create))}</span>` : `<span>Si no adjuntas entorno, la barberia usara la plantilla base dinamica.</span>`}</div>
        <p class="microcopy">El usuario administrador inicial se crea automaticamente como <strong>Desarrollo</strong> y el sistema genera una clave temporal segura.</p>
        <label class="toggle-line"><input name="active" type="checkbox" checked /> Negocio activo</label>
        <div class="button-row">
          <button class="primary-action">Crear barberia</button>
        </div>
      </form>
    </div>
  </article>`;

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
        <div class="dashboard-cards">
          <div><span>Total negocios</span><strong>${businesses.length}</strong></div>
          <div><span>Negocios activos</span><strong>${businesses.filter((item) => item.active).length}</strong></div>
          <div><span>URL base</span><strong>/barberia/:slug</strong></div>
        </div>
      </section>
      <section class="admin-main">
        <div class="section-title"><span>+</span><h2>Nuevo negocio</h2></div>
        ${createBusinessPanel}
      </section>
      <section class="admin-main">
        <div class="section-title"><span>L</span><h2>Listado de negocios</h2></div>
        <div class="admin-account-list">
          ${businessCards || `<p class="microcopy">Aun no hay negocios registrados.</p>`}
        </div>
      </section>
    </section>
  `);
}

function renderSuperAdminV2() {
  if (isSessionExpired(app.superAdminSession, { role: "super_admin", businessSlug: DEFAULT_BUSINESS_SLUG })) {
    app.superAdminSession = null;
    app.superAdminLoginError = "La sesion del super administrador expiro. Inicia sesion nuevamente.";
    sessionStorage.removeItem(SUPER_ADMIN_SESSION_KEY);
  }
  app.superAdminSession = refreshSessionHeartbeat(
    SUPER_ADMIN_SESSION_KEY,
    DEFAULT_BUSINESS_SLUG,
    app.superAdminSession,
    { role: "super_admin", businessSlug: DEFAULT_BUSINESS_SLUG }
  );

  const expectedSuperAdminScope = `super-admin:global:${DEFAULT_BUSINESS_SLUG}`;
  if (app.superAdminSession && store.supabase && (!store.remoteReady || store.remoteLoadedScopeKey !== expectedSuperAdminScope)) {
    return appShell(`
      <section class="dashboard-head">
        <div>
          <p class="eyebrow">Control SaaS</p>
          <h1>SUPER ADMINISTRADOR</h1>
        </div>
        <button class="secondary-action" data-super-logout>Cerrar sesion</button>
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
  if (app.superAdminSession && store.supabase && businesses.length <= 1 && !store.syncInFlight) {
    store.queueRemoteSync();
  }
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
      const serviceCount = businessServiceCount(business.id);
      const reservationCount = businessTodayReservationCount(business.id);
      const environmentAttachment = businessEnvironmentAttachment(business.id);
      const admins = loadAdminAccounts().filter(
        (account) => account.businessId === business.id && account.role !== PRINCIPAL_ADMIN.role
      );
      const admin = admins[0] || null;
      const adminList = admins.length
        ? admins
            .map(
              (account) => {
                const visiblePassword = visibleAdminPassword(account.id);
                return `<form class="super-admin-account-edit form-stack" data-admin-account-id="${escapeHTML(account.id)}">
                <div class="form-grid">
                  <label>Nombre<input name="name" required value="${escapeHTML(account.name || "")}" /></label>
                  <label>Usuario<input name="user" required value="${escapeHTML(account.user || "")}" /></label>
                  <label>Creado<input value="${escapeHTML(account.createdAt || todayISO())}" disabled /></label>
                </div>
                ${
                  visiblePassword
                    ? `<p class="form-note">Clave visible: <strong>${escapeHTML(visiblePassword.password || "")}</strong> · Usuario: <strong>${escapeHTML(visiblePassword.user || account.user || "")}</strong></p>`
                    : `<p class="microcopy">No hay clave temporal visible guardada para este administrador.</p>`
                }
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
              ${business.logoUrl || app.superAdminPendingLogos[business.id] ? `<img src="${escapeHTML(app.superAdminPendingLogos[business.id] || business.logoUrl)}" alt="Logo ${escapeHTML(business.name)}" />` : `<span>${escapeHTML((business.name || "B").slice(0, 1).toUpperCase())}</span>`}
            </div>
            <div class="super-business-summary__copy">
              <h3>${escapeHTML(business.name)}</h3>
              <p>${business.active ? "Activa" : "Inactiva"} · /barberia/${escapeHTML(business.slug)}</p>
            </div>
          </div>
          <div class="super-business-summary__stats">
            <span><strong>${barberCount}</strong> barberos</span>
            <span><strong>${serviceCount}</strong> servicios</span>
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
            <div class="super-admin-logo-preview">${business.logoUrl || app.superAdminPendingLogos[business.id] ? `<img src="${escapeHTML(app.superAdminPendingLogos[business.id] || business.logoUrl)}" alt="Logo ${escapeHTML(business.name)}" />` : `<span>Sin logo cargado</span>`}</div>
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
  const createBusinessPanel = `<article class="admin-account-card super-business-card ${app.superAdminCreateOpen ? "is-open" : ""}">
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
    <div class="super-business-panel" ${app.superAdminCreateOpen ? "" : "hidden"}>
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
        <div class="super-admin-logo-preview">${app.superAdminPendingLogos.create ? `<img src="${escapeHTML(app.superAdminPendingLogos.create)}" alt="Vista previa logo" />` : `<span>Vista previa del logo</span>`}</div>
        <div class="super-admin-environment-preview">${app.superAdminPendingEnvironmentArchives.create ? `<strong>${escapeHTML(app.superAdminPendingEnvironmentArchives.create.fileName)}</strong><span>${escapeHTML(summarizeEnvironmentAttachment(app.superAdminPendingEnvironmentArchives.create))}</span>` : `<span>Si no adjuntas entorno, la barberia usara la plantilla base dinamica.</span>`}</div>
        <p class="microcopy">El usuario administrador inicial se crea automaticamente como <strong>Desarrollo</strong> y el sistema genera una clave temporal segura.</p>
        <label class="toggle-line"><input name="active" type="checkbox" checked /> Negocio activo</label>
        <div class="button-row">
          <button class="primary-action">Crear barberia</button>
        </div>
      </form>
    </div>
  </article>`;

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
        <div class="dashboard-cards">
          <div><span>Total negocios</span><strong>${businesses.length}</strong></div>
          <div><span>Negocios activos</span><strong>${businesses.filter((item) => item.active).length}</strong></div>
          <div><span>URL base</span><strong>/barberia/:slug</strong></div>
        </div>
      </section>
      <section class="admin-main">
        <div class="section-title"><span>+</span><h2>Nuevo negocio</h2></div>
        ${createBusinessPanel}
      </section>
      <section class="admin-main">
        <div class="section-title"><span>L</span><h2>Listado de negocios</h2></div>
        <div class="admin-account-list">
          ${businessCards || `<p class="microcopy">Aun no hay negocios registrados.</p>`}
        </div>
      </section>
    </section>
  `);
}

function backgroundSettingsSection() {
  return `<section class="admin-main">
    <div class="section-title"><span>V</span><h2>Fondo dinamico</h2></div>
    <p class="microcopy">Carga un video corto MP4 o WEBM de maximo 10 MB. Recomendado: 10 a 15 segundos.</p>
    ${app.backgroundMessage ? `<p class="form-note">${escapeHTML(app.backgroundMessage)}</p>` : ""}
    <form id="background-form" class="editor-card">
      <label>Video de fondo<input name="video" type="file" accept="video/mp4,video/webm" /></label>
      ${
        app.pendingBackgroundVideo
          ? `<video class="background-preview" src="${app.pendingBackgroundVideo.src}" controls muted loop playsinline></video>`
          : app.backgroundMedia?.type === "video"
            ? `<video class="background-preview" src="${app.backgroundMedia.src}" controls muted loop playsinline></video>`
            : `<div class="background-preview static-preview"><span>Fondo estatico activo</span></div>`
      }
      <div class="button-row">
        <button class="primary-action" type="submit" ${app.pendingBackgroundVideo ? "" : "disabled"}>Guardar video como fondo</button>
        <button class="secondary-action" type="button" data-reset-background>Volver al fondo estatico</button>
      </div>
    </form>
  </section>`;
}

function adminDashboardSection() {
  const businessId = currentBusinessId();
  const today = todayISO();
  const businessAppointments = store.state.appointments.filter((item) => item.negocioId === businessId);
  const todayAppointments = businessAppointments.filter((item) => item.date === today);
  const currentWeekDates = getWeekDates(new Date(`${today}T00:00:00`)).filter((date) => date <= today);
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

  return `<section class="admin-main dashboard-lite">
    <div class="section-title"><span>D</span><h2>Resumen de hoy</h2></div>
    <div class="dashboard-cards">
      <div><span>Reservas de hoy</span><strong>${reservedToday}</strong></div>
      <div><span>Ingresos de hoy</span><strong>${formatCOP(incomeToday)}</strong></div>
      <div><span>Ingresos de la semana actual</span><strong>${formatCOP(incomeWeek)}</strong></div>
      <div><span>Ganancias del administrador</span><strong>${formatCOP(gainsToday.admin)}</strong></div>
      <div><span>Ganancias de los barberos</span><strong>${formatCOP(gainsToday.barber)}</strong></div>
    </div>
    <label class="toggle-line sound-toggle"><input type="checkbox" data-sound-toggle ${app.soundEnabled ? "checked" : ""} /> Sonido sutil para nueva reserva</label>
  </section>`;
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
    app.adminLoginError = "Tu sesion administrativa pertenece a otro negocio.";
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

  const selected = barberById(app.adminBarberId);
  const businessBarbers = [...barbersForBusiness(currentBusinessId())].sort((a, b) => a.name.localeCompare(b.name, "es"));
  const counterSummary = buildCounterSummary(app.selectedDate);
  const selectedRecords = app.adminSelectedSlots
    .map((time) => selected && store.getAppointment(selected.id, app.selectedDate, time))
    .filter(Boolean);
  const singleSelectedRecord = selectedRecords.length === 1 ? selectedRecords[0] : null;

  return appShell(`
    <section class="dashboard-head">
      <div>
        <p class="eyebrow">Centro de operaciones</p>
        <h1>ADMINISTRADOR</h1>
        <span>${escapeHTML(app.adminSession.name || "Administrador")} · ${escapeHTML(app.adminSession.user || "")}</span>
      </div>
      <button class="secondary-action" data-admin-logout>Cerrar sesión</button>
    </section>

    ${
      !selected || app.adminView === "home"
        ? `<section class="admin-stack">
        ${adminDashboardSection()}
        <section class="admin-main">
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
              : `<div class="empty-state-card">
                  <p>Aun no hay barberos creados en este negocio.</p>
                  <p>Crea el primer barbero desde el modulo Nuevo barbero para empezar a gestionar la agenda.</p>
                </div>`
          }
        </section>
        ${renderAccordionPanel("new-barber", "+", "Nuevo barbero", barberEditorForm(null, "Crear barbero"), app.adminOpenPanel === "new-barber")}
        ${renderAccordionPanel("services", "S", "Servicios", servicesSection(), app.adminOpenPanel === "services")}
        ${renderAccordionPanel("dynamic-bg", "U", "Fondo dinamico", backgroundSettingsSection(), app.adminOpenPanel === "dynamic-bg")}
        ${isPrincipalAdmin() ? renderAccordionPanel("admin-accounts", "U", "Gestionar administradores", adminAccountsSection(), app.adminOpenPanel === "admin-accounts") : ""}
      </section>`
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
                <p>Usuario: ${escapeHTML(selected.user)} · Clave: ${escapeHTML(selected.password)}</p>
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
                ? `<div class="section-title"><span>D</span><h2>Dias de la semana</h2></div>${weekButtons(app.selectedDate, "data-admin-date")}`
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
  const rows = baseSlots.map((time) => ({ time, ...statusFor(barber.id, app.selectedDate, time) }));
  const services = activeServicesForBusiness(currentBusinessId());
  return `<div class="agenda-toolbar">
    <div>
      <div class="section-title"><span>H</span><h2>Horarios del dia</h2></div>
      <p class="microcopy">${longDayNames[new Date(`${app.selectedDate}T00:00:00`).getDay()]} · ${app.selectedDate}</p>
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
    app.barberLoginError = "Tu sesion de barbero pertenece a otro negocio.";
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
  const rows = baseSlots.map((time) => ({ time, ...statusFor(barber.id, app.barberDate, time) }));
  const counterSummary = buildCounterSummary(app.barberDate);
  const hasOperationalRows = rows.some(({ status, dayBlocked, appointment }) => dayBlocked || status !== "available" || appointment);

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
          ? `<div class="section-title"><span>D</span><h2>Dias de la semana</h2></div>${weekButtons(app.barberDate, "data-barber-date")}`
          : `<div class="agenda-toolbar">
            <div>
              <div class="section-title"><span>H</span><h2>Agenda del dia actual</h2></div>
              <p class="microcopy">${longDayNames[new Date(`${app.barberDate}T00:00:00`).getDay()]} · ${app.barberDate}</p>
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
  renderFrame = requestAnimationFrame(() => {
    renderFrame = 0;
    render();
  });
}

function render() {
  const perf = perfMark("render");
  const root = document.querySelector("#app");
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
  store.subscribeRemote();
  const views = {
    public: renderPublic,
    admin: renderAdminV2,
    barber: renderBarberV2,
    "super-admin": renderSuperAdminV2,
    "business-test": renderBusinessPublicTest,
  };
  ensurePersistentBackground();
  app.backgroundMedia = currentBackgroundMedia();
  const shellSignature = routeShellType();
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
  refreshPersistentShellBrand();
  document.querySelectorAll(".nav-tabs [data-view]").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === app.view);
  });
  const toastLabel = document.querySelector(".realtime-toast strong");
  const toast = document.querySelector(".realtime-toast");
  if (toastLabel) {
    toastLabel.textContent = app.lastEvent;
  }
  toast?.classList.toggle("is-empty", !app.lastEvent);
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
  persistVisualRouteState();
  if (viewChanged) bindEvents();
  document.querySelector("#booking-confirm-dialog")?.showModal();
  requestAnimationFrame(fitPanelTitles);
  perfEnd(perf, `(${app.view}:${currentBusinessId() || "sin-negocio"})`);
}

function bindChromeEvents() {
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
        user: SUPER_ADMIN_USER,
        role: "super_admin",
        startedAt: new Date().toISOString(),
        lastSeenAt: new Date().toISOString(),
        businessSlug: DEFAULT_BUSINESS_SLUG,
        fingerprint: buildSessionFingerprint("super_admin", DEFAULT_BUSINESS_SLUG, ""),
      };
      app.superAdminLoginError = "";
      clearAuthAttemptState("super_admin", DEFAULT_BUSINESS_SLUG, user);
      sessionStorage.setItem(SUPER_ADMIN_SESSION_KEY, JSON.stringify(app.superAdminSession));
      render();
      return;
    }

    app.superAdminSession = null;
    const failedAttempt = registerFailedAuthAttempt("super_admin", DEFAULT_BUSINESS_SLUG, user);
    app.superAdminLoginError = failedAttempt.blockedUntil
      ? authBlockMessage("Acceso de super administrador", failedAttempt.blockedUntil)
      : `Credenciales invalidas. Intentos restantes: ${failedAttempt.remainingAttempts}.`;
    sessionStorage.removeItem(SUPER_ADMIN_SESSION_KEY);
    render();
  });

  document.querySelector("[data-super-logout]")?.addEventListener("click", () => {
    app.superAdminSession = null;
    app.superAdminLoginError = "";
    sessionStorage.removeItem(SUPER_ADMIN_SESSION_KEY);
    render();
  });

  document.querySelector("[data-clear-super-credentials]")?.addEventListener("click", () => {
    app.superAdminCredentialReveal = null;
    render();
  });

  document.querySelectorAll("[data-toggle-super-business]").forEach((button) => {
    button.addEventListener("click", () => {
      const businessId = button.dataset.toggleSuperBusiness || "";
      app.superAdminOpenBusinessId = app.superAdminOpenBusinessId === businessId ? "" : businessId;
      render();
    });
  });

  document.querySelector("[data-toggle-super-create]")?.addEventListener("click", () => {
    app.superAdminCreateOpen = !app.superAdminCreateOpen;
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
    button.addEventListener("click", () => {
      const businessId = button.dataset.deleteBusiness;
      const slug = button.dataset.deleteBusinessSlug || "";
      const name = button.dataset.deleteBusinessName || "";
      const confirmation = window.prompt(`¿Seguro que deseas eliminar esta barberia? Esta accion eliminara todo su entorno y no se podra deshacer.\n\nPara confirmar, escribe:\n${slug}`);
      if (confirmation !== slug) {
        app.superAdminMessage = "La confirmacion no coincide. No se elimino la barberia.";
        render();
        return;
      }
      const removed = store.deleteBusiness(businessId);
      if (!removed) {
        app.superAdminMessage = "No fue posible eliminar la barberia seleccionada.";
        render();
        return;
      }
      saveAdminAccounts(loadAdminAccounts().filter((account) => account.businessId !== businessId));
      const visiblePasswords = loadVisibleAdminPasswords();
      Object.keys(visiblePasswords).forEach((accountId) => {
        if (visiblePasswords[accountId]?.businessId === businessId) {
          delete visiblePasswords[accountId];
        }
      });
      saveVisibleAdminPasswords(visiblePasswords);
      const environmentAttachments = loadBusinessEnvironmentAttachments();
      delete environmentAttachments[businessId];
      saveBusinessEnvironmentAttachments(environmentAttachments);
      delete app.superAdminPendingLogos[businessId];
      if (app.superAdminOpenBusinessId === businessId) {
        app.superAdminOpenBusinessId = "";
      }
      app.superAdminMessage = `Barberia eliminada: ${name}`;
      render();
    });
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
      saveAdminAccounts(allAccounts);
      try {
        await store.upsertAdminAccountRemote(account);
        app.superAdminMessage = `Administrador actualizado: ${account.name}`;
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
        account.password = "";
        account.passwordHash = hash;
        saveAdminAccounts(accounts);
        setVisibleAdminPassword(account.id, {
          businessId: account.businessId,
          businessName: business?.name || "Barberia",
          user: account.user,
          password: generatedPassword,
        });
        await store.upsertAdminAccountRemote(account);
        const business = store.businessById(account.businessId);
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
      app.publicDaySelected = true;
      app.selectedSlot = "";
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
      app.adminSession = {
        id: account.id,
        user: account.user,
        name: account.name,
        role: account.role,
        businessId: currentBusinessId(),
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
      saveScopedBusinessSession(ADMIN_SESSION_KEY, app.currentBusinessSlug, app.adminSession);
      render();
      return;
    }

    app.adminSession = null;
    app.adminLoginError = "Usuario o contrasena incorrectos.";
    clearScopedBusinessSession(ADMIN_SESSION_KEY, app.currentBusinessSlug);
    render();
  });

  document.querySelector("[data-admin-logout]")?.addEventListener("click", () => {
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

  document.querySelector("#service-create-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") || "").trim(),
      value: String(form.get("value") || "").trim(),
      adminPercentage: Number(form.get("adminPercentage")),
      barberPercentage: Number(form.get("barberPercentage")),
      active: form.get("active") === "on",
    };
    const error = validateServicePayload(payload);
    if (error) {
      app.adminServiceMessage = error;
      render();
      return;
    }
    store.saveService({
      ...payload,
      value: Number(payload.value),
    });
    app.adminServiceMessage = "Servicio creado correctamente.";
    render();
  });

  document.querySelectorAll(".service-edit-form").forEach((formElement) => {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const payload = {
        id: event.currentTarget.dataset.serviceId,
        name: String(form.get("name") || "").trim(),
        value: String(form.get("value") || "").trim(),
        adminPercentage: Number(form.get("adminPercentage")),
        barberPercentage: Number(form.get("barberPercentage")),
        active: form.get("active") === "on",
      };
      const error = validateServicePayload(payload);
      if (error) {
        app.adminServiceMessage = error;
        render();
        return;
      }
      store.saveService({
        ...payload,
        value: Number(payload.value),
      });
      app.adminServiceMessage = "Servicio actualizado correctamente.";
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
      if (id === PRINCIPAL_ADMIN.id) return;
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
      if (id === PRINCIPAL_ADMIN.id) return;
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
      src: await fileToDataURL(file),
      savedAt: new Date().toISOString(),
    };
    app.backgroundMessage = "Video listo para previsualizar y guardar.";
    render();
  });

  document.querySelector("#background-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!app.pendingBackgroundVideo) return;
    app.backgroundMedia = app.pendingBackgroundVideo;
    saveBackgroundMedia(app.backgroundMedia);
    try {
      await store.upsertBusinessSettingsRemote(currentBusinessId(), {
        environment_archive_meta: { backgroundMedia: app.backgroundMedia },
      });
    } catch (error) {
      app.backgroundMessage = "No fue posible guardar el fondo de esta barberia.";
      console.error("Remote background save failed", error);
      render();
      return;
    }
    app.pendingBackgroundVideo = null;
    app.backgroundMessage = "Video guardado como fondo activo.";
    render();
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
    render();
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
      app.adminSelectedSlots = [];
      render();
    });
  });

  document.querySelectorAll("[data-admin-date]").forEach((button) => {
    button.addEventListener("click", () => {
      app.selectedDate = button.dataset.adminDate;
      app.adminScheduleView = "hours";
      app.adminSelectedSlots = [];
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
    const selected = barberById(data.get("id"));
    const file = data.get("photo");
    const photo = file?.size ? await fileToDataURL(file) : selected?.photo || "";
    const passwordHash = payload.password ? await sha256(payload.password) : selected?.passwordHash || "";
    const barberRecord = store.saveBarber({
      id: payload.id || undefined,
      name: payload.name,
      user: payload.user,
      password: payload.password ? "" : selected?.password || "",
      passwordHash,
      whatsapp: payload.whatsapp,
      specialty: payload.specialty,
      active: payload.active,
      photo,
    });
    const selectedServiceIds = data.getAll("serviceIds").map(String);
    if (barberRecord?.id) {
      store.saveBarberServices(barberRecord.id, selectedServiceIds);
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
    button.addEventListener("click", () => {
      const panel = button.dataset.adminPanel;
      app.adminOpenPanel = app.adminOpenPanel === panel ? "" : panel;
      render();
    });
  });

  document.querySelectorAll("[data-admin-home]").forEach((button) => {
    button.addEventListener("click", () => {
      app.adminView = "home";
      app.adminBarberId = "";
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
    render();
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
    render();
  });

  document.querySelectorAll("[data-barber-date]").forEach((button) => {
    button.addEventListener("click", () => {
      app.barberDate = button.dataset.barberDate;
      app.barberScheduleView = "hours";
      render();
    });
  });

  document.querySelector("#barber-login")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const user = String(form.get("user") || "").trim();
    const business = currentBusiness();
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
      startedAt: new Date().toISOString(),
      lastSeenAt: new Date().toISOString(),
      role: "barber",
      fingerprint: buildSessionFingerprint("barber", app.currentBusinessSlug, currentBusinessId()),
    };
    clearAuthAttemptState("barber", app.currentBusinessSlug, user);
    app.barberDate = todayISO();
    app.barberScheduleView = "hours";
    saveScopedBusinessSession(BARBER_SESSION_KEY, app.currentBusinessSlug, app.barberSession);
    render();
  });

  document.querySelector("[data-logout]")?.addEventListener("click", () => {
    app.barberSession = null;
    app.barberLoginError = "";
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
  }
});

render();
