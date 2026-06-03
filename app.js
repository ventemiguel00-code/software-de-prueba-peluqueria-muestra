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
const COUNTABLE_STATUSES = new Set(["reserved", "fixed"]);

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

const avatarGradients = [
  "linear-gradient(145deg, #0f2f38, #c7d0d2)",
  "linear-gradient(145deg, #191b1d, #447381)",
  "linear-gradient(145deg, #324044, #f1f5f4)",
  "linear-gradient(145deg, #0b1519, #8ca2a7)",
];
const BUSINESS_THEMES = {
  gold_black: { label: "Dorado + Negro", primary: "#d4af37", secondary: "#111111" },
  blue_black: { label: "Azul + Negro", primary: "#3f7cff", secondary: "#111111" },
  red_black: { label: "Rojo + Negro", primary: "#d14b4b", secondary: "#111111" },
  green_black: { label: "Verde + Negro", primary: "#2ea36f", secondary: "#111111" },
  purple_black: { label: "Morado + Negro", primary: "#7b4bd1", secondary: "#111111" },
  white_black: { label: "Blanco + Negro", primary: "#f4f7f6", secondary: "#111111" },
  gray_black: { label: "Gris + Negro", primary: "#8f969b", secondary: "#111111" },
  orange_black: { label: "Naranja + Negro", primary: "#e28a2d", secondary: "#111111" },
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
  return {
    id: DEFAULT_BUSINESS_ID,
    name: "Vision Barber",
    slug: DEFAULT_BUSINESS_SLUG,
    logoUrl: "./assets/vision-barber-logo.avif",
    theme: "gold_black",
    primaryColor: "#d4af37",
    secondaryColor: "#111111",
    backgroundUrl: "",
    active: true,
    createdAt: todayISO(),
    updatedAt: todayISO(),
  };
}

function normalizeBusiness(record = {}) {
  const base = defaultBusiness();
  const theme = record.theme || base.theme || "gold_black";
  const palette = BUSINESS_THEMES[theme] || BUSINESS_THEMES.gold_black;
  return {
    ...base,
    ...record,
    id: record.id || base.id,
    slug: String(record.slug || base.slug).trim().toLowerCase(),
    theme,
    primaryColor: record.primaryColor || palette.primary,
    secondaryColor: record.secondaryColor || palette.secondary,
    updatedAt: record.updatedAt || todayISO(),
  };
}

function normalizeTenantState(state = {}) {
  const business = normalizeBusiness((state.businesses || [defaultBusiness()])[0] || defaultBusiness());
  const businesses = (state.businesses?.length ? state.businesses : [business]).map(normalizeBusiness);
  const currentBusinessId = state.meta?.currentBusinessId || businesses[0]?.id || DEFAULT_BUSINESS_ID;
  const attachBusiness = (item) => ({ ...item, negocioId: item.negocioId || currentBusinessId });
  return {
    ...state,
    meta: {
      dayKey: todayISO(),
      weekKey: getWeekKey(),
      selectedDate: todayISO(),
      ...state.meta,
      currentBusinessId,
    },
    businesses,
    barbers: (state.barbers || []).map(attachBusiness),
    appointments: (state.appointments || []).map(attachBusiness),
    blockedDays: (state.blockedDays || []).map(attachBusiness),
    services: (state.services || []).map(attachBusiness),
    barberServices: (state.barberServices || []).map(attachBusiness),
  };
}

const defaultState = () => ({
  meta: { dayKey: todayISO(), weekKey: getWeekKey(), selectedDate: todayISO(), currentBusinessId: DEFAULT_BUSINESS_ID },
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

function createSupabaseClient() {
  if (!hasSupabaseBrowserClient) return null;
  return window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function mapBarberToRow(barber) {
  return {
    id: barber.id,
    name: barber.name,
    user: barber.user,
    password: barber.password,
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
    barber_id: appointment.barberId,
    date: appointment.date,
    time: appointment.time,
    status: appointment.status,
    client_name: appointment.clientName || "",
    whatsapp: appointment.whatsapp || "",
    source: appointment.source || "admin",
    week_key: appointment.weekKey || "permanent",
    visit_state: appointment.visitState || "",
    notes: composeAppointmentNotes(appointment),
  };
}

function mapBlockedDayToRow(day) {
  return {
    id: day.id,
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

class StudioStore {
  constructor() {
    this.listeners = new Set();
    this.channel = "BroadcastChannel" in window ? new BroadcastChannel(CHANNEL) : null;
    this.supabase = createSupabaseClient();
    this.remoteChannel = null;
    this.remoteReady = false;
    this.syncInFlight = false;
    this.applyingRemote = false;
    this.dailyResetPending = false;
    this.state = this.load();
    this.applyDemoMaintenance();

    if (this.channel) {
      this.channel.onmessage = (event) => {
        if (!event.data?.type) return;
        this.state = this.loadLocalState();
        this.emit(event.data);
      };
    }

    window.addEventListener("storage", (event) => {
      if (event.key === APP_KEY) {
        this.state = this.loadLocalState();
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
      return normalizeTenantState({ ...defaultState(), ...JSON.parse(raw) });
    } catch {
      return normalizeTenantState(defaultState());
    }
  }

  persist(event = { type: "UPDATE" }) {
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

  async bootstrapRemote() {
    if (this.dailyResetPending) {
      await this.persistRemote({ type: "RESET", table: "demo", reason: "daily_reset" });
      this.dailyResetPending = false;
    }
    await this.syncFromRemote({ quiet: true });
    this.emit({ type: "SYNC", table: "remote", reason: "remote_bootstrap" });
    this.subscribeRemote();
  }

  async syncFromRemote({ quiet = false } = {}) {
    if (!this.supabase || this.syncInFlight) return;
    this.syncInFlight = true;

    try {
      const [barbersResult, appointmentsResult, blockedDaysResult, servicesResult, barberServicesResult] = await Promise.all([
        this.supabase.from("barbers").select("*").order("created_at", { ascending: true }),
        this.supabase.from("appointments").select("*").order("date", { ascending: true }).order("time", { ascending: true }),
        this.supabase.from("blocked_days").select("*").order("date", { ascending: true }),
        this.supabase.from("services").select("*").order("created_at", { ascending: true }),
        this.supabase.from("barber_services").select("*").order("created_at", { ascending: true }),
      ]);

      if (barbersResult.error) throw barbersResult.error;
      if (appointmentsResult.error) throw appointmentsResult.error;
      if (blockedDaysResult.error) throw blockedDaysResult.error;
      if (barberServicesResult.error) throw barberServicesResult.error;
      const servicesData =
        servicesResult.error || !servicesResult.data?.length
          ? defaultState().services
          : (servicesResult.data || []).map(mapRowToService);
      const barberServicesData =
        !barberServicesResult.data?.length
          ? defaultState().barberServices
          : (barberServicesResult.data || []).map(mapRowToBarberService);

      if (!barbersResult.data?.length) {
        await this.seedRemoteFromLocal();
        return;
      }

      const currentWeek = getWeekKey();
      const nextState = {
        ...defaultState(),
        meta: {
          ...this.state.meta,
          dayKey: todayISO(),
          weekKey: currentWeek,
          selectedDate: this.state.meta.selectedDate || todayISO(),
        },
        barbers: (barbersResult.data || []).map((row, index) => mapRowToBarber(row, index)),
        appointments: (appointmentsResult.data || [])
          .map(mapRowToAppointment)
          .filter((item) => item.status !== "reserved" || item.weekKey === currentWeek),
        blockedDays: (blockedDaysResult.data || []).map(mapRowToBlockedDay),
        services: servicesData,
        barberServices: barberServicesData,
      };

      this.applyingRemote = true;
      this.state = nextState;
      localStorage.setItem(APP_KEY, JSON.stringify(this.state));
      this.remoteReady = true;
      if (!quiet) {
        this.emit({ type: "SYNC", table: "remote" });
        this.channel?.postMessage({ type: "SYNC", table: "remote" });
      }
    } finally {
      this.applyingRemote = false;
      this.syncInFlight = false;
    }
  }

  async seedRemoteFromLocal() {
    if (!this.supabase) return;

    const seedState = this.loadLocalState();
    const [barbersInsert, appointmentsInsert, blockedDaysInsert, servicesInsert, barberServicesInsert] = await Promise.all([
      this.supabase.from("barbers").upsert(seedState.barbers.map(mapBarberToRow), { onConflict: "id" }),
      this.supabase.from("appointments").upsert(seedState.appointments.map(mapAppointmentToRow), { onConflict: "id" }),
      this.supabase.from("blocked_days").upsert(seedState.blockedDays.map(mapBlockedDayToRow), { onConflict: "id" }),
      this.supabase.from("services").upsert(seedState.services.map(mapServiceToRow), { onConflict: "id" }),
      this.supabase.from("barber_services").upsert(seedState.barberServices.map(mapBarberServiceToRow), { onConflict: "id" }),
    ]);

    if (barbersInsert.error) throw barbersInsert.error;
    if (appointmentsInsert.error) throw appointmentsInsert.error;
    if (blockedDaysInsert.error) throw blockedDaysInsert.error;
    if (servicesInsert.error) console.warn("Supabase services seed skipped", servicesInsert.error);
    if (barberServicesInsert.error) console.warn("Supabase barber services seed skipped", barberServicesInsert.error);

    await this.syncFromRemote();
  }

  subscribeRemote() {
    if (!this.supabase || this.remoteChannel) return;
    this.remoteChannel = this.supabase
      .channel("barber-delux-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "barbers" }, () => {
        this.syncFromRemote().catch((error) => console.error(error));
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "appointments" }, () => {
        this.syncFromRemote().catch((error) => console.error(error));
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "blocked_days" }, () => {
        this.syncFromRemote().catch((error) => console.error(error));
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "services" }, () => {
        this.syncFromRemote().catch((error) => console.error(error));
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "barber_services" }, () => {
        this.syncFromRemote().catch((error) => console.error(error));
      })
      .subscribe();
  }

  async persistRemote(event) {
    if (!this.supabase) return;
    if (event.reason === "daily_reset") {
      const appointmentsReset = await this.supabase.from("appointments").delete().not("id", "is", null);
      if (appointmentsReset.error) throw appointmentsReset.error;

      const blockedDaysReset = await this.supabase.from("blocked_days").delete().not("id", "is", null);
      if (blockedDaysReset.error) throw blockedDaysReset.error;

      const seedAppointments = this.state.appointments.map(mapAppointmentToRow);
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
        .eq("status", "reserved")
        .neq("week_key", currentWeek);
      if (error) throw error;
      return;
    }

    if (event.table === "appointments") {
      if (event.type === "DELETE") {
        const { error } = await this.supabase.from("appointments").delete().eq("id", event.id);
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
        const { error } = await this.supabase.from("barbers").delete().eq("id", event.id);
        if (error) throw error;
        return;
      }
      if (!event.record) return;
      const record = this.state.barbers.find((barber) => barber.id === event.record.id) || event.record;
      const { error } = await this.supabase.from("barbers").upsert(mapBarberToRow(record), { onConflict: "id" });
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
          .eq("date", record.date);
        if (error) throw error;
        return;
      }
      if (!event.record) return;
      const existing =
        this.state.blockedDays.find(
          (item) => item.barberId === event.record.barberId && item.date === event.record.date
        ) || event.record;
      const { error } = await this.supabase
        .from("blocked_days")
        .upsert(mapBlockedDayToRow(existing), { onConflict: "id" });
      if (error) throw error;
    }

    if (event.table === "services") {
      if (event.type === "DELETE") {
        const { error } = await this.supabase.from("services").delete().eq("id", event.id);
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
        const removeExisting = await this.supabase.from("barber_services").delete().eq("barber_id", event.barberId);
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
    this.state.appointments = seededState.appointments;
    this.state.blockedDays = seededState.blockedDays;
    this.state.meta.dayKey = currentDay;
    this.state.meta.weekKey = currentWeek;
    this.state.meta.selectedDate = currentDay;
    this.dailyResetPending = true;
    this.persist({ type: "RESET", table: "demo", reason: "daily_reset" });
  }

  activeBarbers() {
    return this.state.barbers.filter((barber) => barber.active);
  }

  businessById(id) {
    return this.state.businesses.find((business) => business.id === id) || null;
  }

  businessBySlug(slug) {
    return this.state.businesses.find((business) => business.slug === slug) || null;
  }

  saveBusiness(payload) {
    if (payload.id) {
      this.state.businesses = this.state.businesses.map((business) =>
        business.id === payload.id ? normalizeBusiness({ ...business, ...payload, updatedAt: todayISO() }) : business
      );
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
    this.persist({ type: "INSERT", table: "businesses", record: created });
    return created;
  }

  getAppointment(barberId, date, time) {
    return this.state.appointments.find(
      (item) => item.barberId === barberId && item.date === date && item.time === time
    );
  }

  isDayBlocked(barberId, date) {
    return this.state.blockedDays.some((item) => item.barberId === barberId && item.date === date);
  }

  upsertAppointment(payload) {
    const existing = this.getAppointment(payload.barberId, payload.date, payload.time);
    const appointment = {
      id: existing?.id || uid("apt"),
      negocioId: payload.negocioId || DEFAULT_BUSINESS_ID,
      source: payload.source || "admin",
      weekKey: payload.status === "reserved" ? getWeekKey(new Date(`${payload.date}T00:00:00`)) : "permanent",
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

  deleteAppointment(id) {
    this.state.appointments = this.state.appointments.filter((item) => item.id !== id);
    this.persist({ type: "DELETE", table: "appointments", id });
  }

  deleteBarber(id) {
    this.state.barbers = this.state.barbers.filter((barber) => barber.id !== id);
    this.state.appointments = this.state.appointments.filter((item) => item.barberId !== id);
    this.state.blockedDays = this.state.blockedDays.filter((item) => item.barberId !== id);
    this.state.barberServices = this.state.barberServices.filter((item) => item.barberId !== id);
    this.persist({ type: "DELETE", table: "barbers", id });
  }

  saveBarber(payload) {
    if (payload.id) {
      this.state.barbers = this.state.barbers.map((barber) =>
        barber.id === payload.id ? { ...barber, ...payload } : barber
      );
      this.persist({
        type: "UPDATE",
        table: "barbers",
        record: this.state.barbers.find((barber) => barber.id === payload.id),
      });
      return this.state.barbers.find((barber) => barber.id === payload.id);
    }

    const { id, ...barberPayload } = payload;
    const created = {
      id: uid("barber"),
      negocioId: payload.negocioId || DEFAULT_BUSINESS_ID,
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
      const record = { id: uid("day"), negocioId: DEFAULT_BUSINESS_ID, barberId, date };
      this.state.blockedDays.push(record);
      this.persist({ type: "INSERT", table: "blocked_days", record });
    }
  }

  unblockDay(barberId, date) {
    this.state.blockedDays = this.state.blockedDays.filter(
      (item) => !(item.barberId === barberId && item.date === date)
    );
    this.persist({ type: "DELETE", table: "blocked_days", record: { barberId, date } });
  }

  blockAvailableSlots(barberId, date) {
    baseSlots.forEach((time) => {
      if (!this.getAppointment(barberId, date, time)) {
        this.upsertAppointment({
          barberId,
          date,
          time,
          status: "blocked",
          clientName: "Bloqueo operativo",
          whatsapp: "",
          source: "admin",
        });
      }
    });
  }

  unblockBlockedSlots(barberId, date) {
    const blocked = this.state.appointments.filter(
      (item) => item.barberId === barberId && item.date === date && item.status === "blocked"
    );
    blocked.forEach((item) => this.deleteAppointment(item.id));
    this.unblockDay(barberId, date);
  }

  saveService(payload) {
    if (payload.id) {
      this.state.services = this.state.services.map((service) =>
        service.id === payload.id ? { ...service, ...payload } : service
      );
      this.persist({
        type: "UPDATE",
        table: "services",
        record: this.state.services.find((service) => service.id === payload.id),
      });
      return;
    }

    const created = {
      id: uid("service"),
      negocioId: payload.negocioId || DEFAULT_BUSINESS_ID,
      active: true,
      ...payload,
    };
    this.state.services.push(created);
    this.persist({ type: "INSERT", table: "services", record: created });
  }

  deleteService(id) {
    this.state.services = this.state.services.filter((service) => service.id !== id);
    this.state.barberServices = this.state.barberServices.filter((item) => item.serviceId !== id);
    this.persist({ type: "DELETE", table: "services", id });
  }

  getBarberServiceIds(barberId) {
    return this.state.barberServices
      .filter((item) => item.barberId === barberId && item.active)
      .map((item) => item.serviceId);
  }

  saveBarberServices(barberId, serviceIds) {
    const uniqueIds = [...new Set((serviceIds || []).filter(Boolean))];
    this.state.barberServices = this.state.barberServices.filter((item) => item.barberId !== barberId);
    const records = uniqueIds.map((serviceId) => ({
      id: uid("barber_service"),
      negocioId: DEFAULT_BUSINESS_ID,
      barberId,
      serviceId,
      active: true,
    }));
    this.state.barberServices.push(...records);
    this.persist({ type: "REPLACE", table: "barber_services", barberId, records });
    return records;
  }
}

const store = new StudioStore();
const ADMIN_SESSION_KEY = "barber-delux-admin-session";
const ADMIN_ACCOUNTS_KEY = "barber-delux-admin-accounts-v1";
const SUPER_ADMIN_SESSION_KEY = "vision-barber-super-admin-session";
const BACKGROUND_MEDIA_KEY = "barber-delux-background-media-v1";
const SOUND_PREF_KEY = "barber-delux-sound-enabled";
const MAX_BACKGROUND_VIDEO_BYTES = 10 * 1024 * 1024;
const DEFAULT_BACKGROUND_VIDEO = {
  type: "video",
  src: "./assets/v2_watermarked-a5df2acc-b2b0-45a5-9132-e0006456c345.mp4",
};
const PRINCIPAL_ADMIN = {
  id: "admin_principal",
  name: "Administrador principal",
  user: "admin",
  password: "admin123",
  role: "administrador_principal",
  businessId: DEFAULT_BUSINESS_ID,
  active: true,
};

function resolveRoute(pathname = location.pathname) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] === "super-admin" || parts[0] === "admin-global") {
    return { view: "super-admin", businessSlug: DEFAULT_BUSINESS_SLUG };
  }
  if (parts[0] === "admin" && parts[1]) {
    return { view: "admin", businessSlug: parts[1] };
  }
  if (parts[0] === "barbero" && parts[1]) {
    return { view: "barber", businessSlug: parts[1] };
  }
  if ((parts[0] === "barberia" || parts[0] === "negocio") && parts[1]) {
    return { view: "public", businessSlug: parts[1] };
  }
  if (pathname === "/admin-vip") return { view: "admin", businessSlug: DEFAULT_BUSINESS_SLUG };
  if (pathname === "/gestion-equipo") return { view: "barber", businessSlug: DEFAULT_BUSINESS_SLUG };
  return { view: "public", businessSlug: DEFAULT_BUSINESS_SLUG };
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

function saveAdminAccounts(accounts) {
  const normalized = [
    PRINCIPAL_ADMIN,
    ...accounts.filter((account) => account.id !== PRINCIPAL_ADMIN.id),
  ];
  localStorage.setItem(ADMIN_ACCOUNTS_KEY, JSON.stringify(normalized));
}

function currentBusiness() {
  return store.businessBySlug(app.currentBusinessSlug) || store.businessById(DEFAULT_BUSINESS_ID) || defaultBusiness();
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

function businessUrlSet(business) {
  const slug = business?.slug || DEFAULT_BUSINESS_SLUG;
  const businessName = String(business?.name || "").trim().toLowerCase();
  const isVisionBarber = businessName === "vision barber" || slug === "vision-barber" || slug === DEFAULT_BUSINESS_SLUG;
  return {
    public: isVisionBarber ? `${PRODUCTION_BASE_URL}/` : `${PRODUCTION_BASE_URL}/barberia/${slug}`,
    admin: `${PRODUCTION_BASE_URL}/admin/${slug}`,
    barber: `${PRODUCTION_BASE_URL}/barbero/${slug}`,
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

async function findAdminAccount(user, password, businessId = null) {
  const candidates = loadAdminAccounts().filter(
    (account) =>
      account.active &&
      account.user === user &&
      (!businessId || account.role === PRINCIPAL_ADMIN.role || account.businessId === businessId)
  );
  if (!candidates.length) return null;

  const passwordHash = await sha256(password);
  return (
    candidates.find((account) => account.passwordHash && account.passwordHash === passwordHash) ||
    candidates.find((account) => account.password && account.password === password) ||
    null
  );
}

function isPrincipalAdmin() {
  return app.adminSession?.role === PRINCIPAL_ADMIN.role;
}

function loadBackgroundMedia() {
  const raw = localStorage.getItem(BACKGROUND_MEDIA_KEY);
  if (!raw) return DEFAULT_BACKGROUND_VIDEO;
  try {
    return JSON.parse(raw);
  } catch {
    return DEFAULT_BACKGROUND_VIDEO;
  }
}

function saveBackgroundMedia(media) {
  if (!media) {
    localStorage.removeItem(BACKGROUND_MEDIA_KEY);
    return;
  }
  localStorage.setItem(BACKGROUND_MEDIA_KEY, JSON.stringify(media));
}

function loadSoundPreference() {
  return localStorage.getItem(SOUND_PREF_KEY) === "true";
}

const app = {
  route: resolveRoute(location.pathname),
  view: resolveRoute(location.pathname).view,
  currentBusinessSlug: resolveRoute(location.pathname).businessSlug,
  selectedServiceId: "",
  selectedBarberId: "",
  selectedDate: store.state.meta.selectedDate,
  publicDaySelected: false,
  selectedSlot: "",
  bookingConfirmation: null,
  adminBarberId: "",
  adminView: "home",
  adminOpenPanel: "",
  adminScheduleView: "hours",
  adminSelectedSlots: [],
  adminModalMode: "reserved",
  adminServiceEditAppointmentId: "",
  adminSession: JSON.parse(sessionStorage.getItem(ADMIN_SESSION_KEY) || "null"),
  superAdminSession: JSON.parse(sessionStorage.getItem(SUPER_ADMIN_SESSION_KEY) || "null"),
  superAdminLoginError: "",
  superAdminMessage: "",
  superAdminCredentialReveal: null,
  superAdminPendingLogos: {},
  superAdminOpenBusinessId: "",
  adminLoginError: "",
  adminAccountMessage: "",
  adminActionMessage: "",
  adminServiceMessage: "",
  backgroundMedia: loadBackgroundMedia(),
  backgroundMessage: "",
  pendingBackgroundVideo: null,
  soundEnabled: loadSoundPreference(),
  barberDate: todayISO(),
  barberScheduleView: "hours",
  barberSession: JSON.parse(sessionStorage.getItem("noxora-barber-session") || "null"),
  lastEvent: "",
};

function barberById(id) {
  return store.state.barbers.find((barber) => barber.id === id);
}

function businessBarberCount(businessId) {
  return store.state.barbers.filter((barber) => barber.negocioId === businessId).length;
}

function businessTodayReservationCount(businessId) {
  const today = todayISO();
  return store.state.appointments.filter(
    (appointment) =>
      appointment.negocioId === businessId && appointment.date === today && COUNTABLE_STATUSES.has(appointment.status)
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
  return store.state.appointments.reduce(
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
  if (view === "admin") return slug === DEFAULT_BUSINESS_SLUG ? "/admin-vip" : `/admin/${slug}`;
  if (view === "barber") return slug === DEFAULT_BUSINESS_SLUG ? "/gestion-equipo" : `/barbero/${slug}`;
  return slug === DEFAULT_BUSINESS_SLUG ? "/" : `/barberia/${slug}`;
}

function avatar(barber, size = "lg") {
  const style = barber.photo
    ? `background-image:url('${barber.photo}')`
    : `background:${barber.gradient}`;
  return `<div class="avatar ${size}" style="${style}"><span>${escapeHTML(
    barber.name
      .split(" ")
      .map((item) => item[0])
      .join("")
      .slice(0, 2)
  )}</span></div>`;
}

function renderGlobalBackground() {
  const useStaticSuperAdminBg = app.view === "super-admin";
  const isVideo = app.backgroundMedia?.type === "video";
  const videoMarkup = !useStaticSuperAdminBg && isVideo
    ? `<video class="global-bg-video" src="${app.backgroundMedia.src}" autoplay muted loop playsinline preload="auto" poster="./assets/atelier-luxury-hero.png"></video>`
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
  const signature = `${app.view}|${app.backgroundMedia?.type || "image"}|${app.backgroundMedia?.src || ""}`;
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
  const tabs = [
    ["public", "Agenda"],
    ["admin", "Admin"],
    ["barber", "Barbero"],
  ];
  return `
    <header class="topbar">
      <button class="brand" data-view="public" aria-label="Ir a agenda publica">
        <span class="brand-mark"></span>
        <span><strong>${escapeHTML(business?.name || "Vision")}</strong><small>${escapeHTML(business?.slug || "Barber")}</small></span>
      </button>
      <nav class="nav-tabs" aria-label="Navegacion principal">
        ${tabs.map(([id, label]) => `<button class="${app.view === id ? "active" : ""}" data-view="${id}">${label}</button>`).join("")}
      </nav>
    </header>
    <main><div id="view-root"></div></main>
    <div class="realtime-toast">
      <span></span>
      <strong></strong>
    </div>
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

function serviceById(id) {
  return store.state.services.find((service) => service.id === id);
}

function serviceNameForAppointment(appointment) {
  if (!appointment) return "Sin servicio";
  return appointment.serviceName || serviceById(appointment.serviceId)?.name || "Sin servicio";
}

function serviceValueForAppointment(appointment) {
  if (!appointment) return 0;
  const byId = serviceById(appointment.serviceId);
  if (byId) return Number(byId.value) || 0;
  const byName = store.state.services.find((service) => service.name === appointment.serviceName);
  return Number(byName?.value) || 0;
}

function serviceShareForAppointment(appointment) {
  const service =
    serviceById(appointment?.serviceId) ||
    store.state.services.find((item) => item.name === appointment?.serviceName);
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
  const todayReservations = store.state.appointments.filter(
    (item) => item.barberId === barberId && item.date === anchorDate && COUNTABLE_STATUSES.has(item.status)
  );
  const realizedToday = todayReservations.filter(isRealizedAppointment);
  const weekDates = new Set(getWeekDates(new Date(`${anchorDate}T00:00:00`)).filter((date) => date <= anchorDate));
  const weekAppointments = store.state.appointments.filter(
    (item) => item.barberId === barberId && weekDates.has(item.date) && COUNTABLE_STATUSES.has(item.status)
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
  const allRelations = store.state.barberServices || [];
  const barberRelations = allRelations.filter((item) => item.barberId === barberId && item.active);
  if (!allRelations.length || !barberRelations.length) return true;
  return barberRelations.some((item) => item.serviceId === serviceId);
}

function barbersForService(serviceId) {
  return store.activeBarbers().filter((barber) => barberOffersService(barber.id, serviceId));
}

function servicesForBarber(barberId) {
  return store.state.services.filter(
    (service) => service.active && barberOffersService(barberId, service.id)
  );
}

function isPublicDateAvailable(barberId, date) {
  if (!barberId || isPastDate(date)) return false;
  return baseSlots.some((time) => isPublicSlotBookable(barberId, date, time));
}

function renderPublic() {
  const business = currentBusiness();
  if (isPastDate(app.selectedDate)) {
    app.selectedDate = todayISO();
    app.publicDaySelected = false;
    app.selectedSlot = "";
  }
  const publicServices = store.state.services.filter((service) => service.active);
  const activeBarbers = app.selectedServiceId ? barbersForService(app.selectedServiceId) : store.activeBarbers();
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
    bookingCardMicrocopy = "Elige el servicio que deseas reservar.";
    bookingCardBody = `<div class="barber-list">
      ${
        publicServices.length
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
          : `<p class="microcopy">Aun no hay servicios disponibles.</p>`
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
        <div class="confirmation-summary">
          <span>Servicio</span><strong>${escapeHTML(selectedService?.name || "")}</strong>
          <span>Barbero</span><strong>${escapeHTML(selected?.name || "")}</strong>
          <span>Fecha</span><strong>${escapeHTML(app.selectedDate)}</strong>
          <span>Hora</span><strong>${slotRange(app.selectedSlot || "08:00")}</strong>
        </div>
        <label>Nombre<input name="clientName" required placeholder="Tu nombre" /></label>
        <label>WhatsApp<input name="whatsapp" required inputmode="tel" placeholder="300 123 4567" /></label>
        <button class="primary-action">Confirmar cita</button>
      </form>
      <p class="microcopy">Confirmacion inmediata en esta version local. La integracion real se conecta despues con Supabase.</p>`;
  }

  return appShell(`
    <section class="hero">
      <div class="hero-bg ${app.backgroundMedia?.type === "video" ? "video-backed" : ""}"></div>
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
  const selected = barberById(app.adminBarberId) || store.state.barbers[0];
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
        <div><strong>${store.state.barbers.length}</strong><span>Barberos</span></div>
        <div><strong>${store.state.appointments.filter((a) => a.date === app.selectedDate).length}</strong><span>Citas hoy</span></div>
        <div><strong>${store.state.blockedDays.length}</strong><span>Dias bloqueados</span></div>
      </div>
    </section>

    <section class="admin-layout">
      <aside class="admin-sidebar">
        <div class="section-title"><span>A</span><h2>Barberos</h2></div>
        <div class="barber-list compact">
          ${store.state.barbers
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
            <button class="primary-action">Entrar</button>
          </form>
        </div>
      </section>
    `);
  }

  const barber = barberById(app.barberSession.id);
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
  const services = [...store.state.services].filter((service) => service.active);
  const storedServiceIds = barber ? store.getBarberServiceIds(barber.id) : [];
  const selectedServiceIds = new Set(
    storedServiceIds.length ? storedServiceIds : services.map((service) => service.id)
  );
  return `<form id="barber-form" class="editor-card">
    <input type="hidden" name="id" value="${escapeHTML(barber?.id || "")}" />
    <label>Nombre<input name="name" required value="${escapeHTML(barber?.name || "")}" /></label>
    <label>WhatsApp<input name="whatsapp" inputmode="tel" value="${escapeHTML(barber?.whatsapp || "")}" placeholder="300 123 4567" /></label>
    <label>Usuario<input name="user" required value="${escapeHTML(barber?.user || "")}" /></label>
    <label>Clave<input name="password" required value="${escapeHTML(barber?.password || "studio2026")}" /></label>
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
  const accounts = loadAdminAccounts();
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

function validateAdminAccountPayload(payload, accounts, editingId = "") {
  if (!payload.name || !payload.user || !payload.password || !payload.confirmPassword) {
    return "Todos los campos son obligatorios.";
  }
  if (payload.password !== payload.confirmPassword) {
    return "Las contrasenas no coinciden.";
  }
  const duplicate = accounts.find(
    (account) => account.user === payload.user && account.id !== editingId
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
  const services = [...store.state.services].sort((a, b) => a.name.localeCompare(b.name, "es"));
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
              (account) => `<form class="super-admin-account-edit form-stack" data-admin-account-id="${escapeHTML(account.id)}">
                <div class="form-grid">
                  <label>Nombre<input name="name" required value="${escapeHTML(account.name || "")}" /></label>
                  <label>Usuario<input name="user" required value="${escapeHTML(account.user || "")}" /></label>
                  <label>Creado<input value="${escapeHTML(account.createdAt || todayISO())}" disabled /></label>
                </div>
                <label class="toggle-line"><input name="active" type="checkbox" ${account.active ? "checked" : ""} /> Activo</label>
                <div class="button-row">
                  <button class="primary-action">Guardar admin</button>
                  <button class="secondary-action" type="button" data-regenerate-admin-password="${escapeHTML(account.id)}">Regenerar contrasena</button>
                </div>
              </form>`
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
            <a class="secondary-action inline-action" href="${escapeHTML(urls.public)}" target="_blank" rel="noreferrer">Abrir barberia</a>
            <a class="secondary-action inline-action" href="${escapeHTML(urls.admin)}" target="_blank" rel="noreferrer">Abrir admin</a>
            <a class="secondary-action inline-action" href="${escapeHTML(urls.barber)}" target="_blank" rel="noreferrer">Abrir barbero</a>
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
        <div class="section-title"><span>+</span><h2>Crear barberia</h2></div>
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
            <label>Administrador principal<input name="adminName" required placeholder="Nombre administrador" /></label>
          </div>
          <div class="super-admin-logo-preview">${app.superAdminPendingLogos.create ? `<img src="${escapeHTML(app.superAdminPendingLogos.create)}" alt="Vista previa logo" />` : `<span>Vista previa del logo</span>`}</div>
          <p class="microcopy">El usuario administrador inicial se crea automaticamente como <strong>Desarrollo</strong> y el sistema genera una clave temporal segura.</p>
          <label class="toggle-line"><input name="active" type="checkbox" checked /> Negocio activo</label>
          <div class="button-row">
            <button class="primary-action">Crear barberia</button>
          </div>
        </form>
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
      const isOpen = app.superAdminOpenBusinessId === business.id;
      const barberCount = businessBarberCount(business.id);
      const reservationCount = businessTodayReservationCount(business.id);
      const admins = loadAdminAccounts().filter(
        (account) => account.businessId === business.id && account.role !== PRINCIPAL_ADMIN.role
      );
      const admin = admins[0] || null;
      const adminList = admins.length
        ? admins
            .map(
              (account) => `<form class="super-admin-account-edit form-stack" data-admin-account-id="${escapeHTML(account.id)}">
                <div class="form-grid">
                  <label>Nombre<input name="name" required value="${escapeHTML(account.name || "")}" /></label>
                  <label>Usuario<input name="user" required value="${escapeHTML(account.user || "")}" /></label>
                  <label>Creado<input value="${escapeHTML(account.createdAt || todayISO())}" disabled /></label>
                </div>
                <label class="toggle-line"><input name="active" type="checkbox" ${account.active ? "checked" : ""} /> Activo</label>
                <div class="button-row">
                  <button class="primary-action">Guardar admin</button>
                  <button class="secondary-action" type="button" data-regenerate-admin-password="${escapeHTML(account.id)}">Regenerar contrasena</button>
                </div>
              </form>`
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
            <span><strong>${reservationCount}</strong> reservas hoy</span>
          </div>
          </button>
          <div class="super-business-summary__actions">
            <a class="secondary-action inline-action" href="${escapeHTML(urls.public)}" target="_blank" rel="noreferrer">Entorno</a>
            <span class="super-business-summary__toggle">${isOpen ? "-" : "+"}</span>
          </div>
        </div>
        <div class="super-business-panel" ${isOpen ? "" : "hidden"}>
          <div class="super-business-panel__meta">
            <p class="eyebrow">${business.active ? "Negocio activo" : "Negocio inactivo"}</p>
            <p>Slug: ${escapeHTML(business.slug)}</p>
            <p>Admin principal: ${escapeHTML(admin?.name || "Pendiente")} · Usuario: ${escapeHTML(admin?.user || "Desarrollo")}</p>
            <p>Entorno publico: <a class="inline-link" href="${escapeHTML(urls.public)}" target="_blank" rel="noreferrer">${escapeHTML(urls.public)}</a></p>
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
              <a class="secondary-action inline-action" href="${escapeHTML(urls.public)}" target="_blank" rel="noreferrer">Entorno</a>
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
        <div class="section-title"><span>+</span><h2>Crear barberia</h2></div>
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
            <label>Administrador principal<input name="adminName" required placeholder="Nombre administrador" /></label>
          </div>
          <div class="super-admin-logo-preview">${app.superAdminPendingLogos.create ? `<img src="${escapeHTML(app.superAdminPendingLogos.create)}" alt="Vista previa logo" />` : `<span>Vista previa del logo</span>`}</div>
          <p class="microcopy">El usuario administrador inicial se crea automaticamente como <strong>Desarrollo</strong> y el sistema genera una clave temporal segura.</p>
          <label class="toggle-line"><input name="active" type="checkbox" checked /> Negocio activo</label>
          <div class="button-row">
            <button class="primary-action">Crear barberia</button>
          </div>
        </form>
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
  const today = todayISO();
  const todayAppointments = store.state.appointments.filter((item) => item.date === today);
  const currentWeekDates = getWeekDates(new Date(`${today}T00:00:00`)).filter((date) => date <= today);
  const currentWeekSet = new Set(currentWeekDates);
  const reservedToday = todayAppointments.filter((item) => COUNTABLE_STATUSES.has(item.status)).length;
  const realizedToday = todayAppointments.filter(isRealizedAppointment);
  const realizedWeek = store.state.appointments.filter(
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
  const keyPhone = moneylessPhone(record.whatsapp);
  const keyName = String(record.clientName || "").trim().toLowerCase();
  const visits = store.state.appointments
    .filter((item) => {
      const samePhone = keyPhone && moneylessPhone(item.whatsapp) === keyPhone;
      const sameName = keyName && String(item.clientName || "").trim().toLowerCase() === keyName;
      return (samePhone || sameName) && item.id !== record.id;
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

  const selected = barberById(app.adminBarberId);
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
      </div>
      <button class="secondary-action" data-admin-logout>Cerrar sesión</button>
    </section>

    ${
      !selected || app.adminView === "home"
        ? `<section class="admin-stack">
        ${adminDashboardSection()}
        <section class="admin-main">
          <div class="section-title"><span>A</span><h2>Barberos</h2></div>
          <div class="admin-barber-grid">
            ${store.state.barbers
              .map(
                (barber) => `<button class="barber-card admin-person-card ${barber.active ? "" : "inactive"}" data-admin-barber="${barber.id}">
                  ${avatar(barber, "md")}
                  <span class="barber-card-copy">
                    <strong>${escapeHTML(barber.name)}</strong>
                    <small>${barber.whatsapp ? displayPhone(barber.whatsapp) : "Sin WhatsApp"}</small>
                    <small>Usuario: ${escapeHTML(barber.user)} · Clave: ${escapeHTML(barber.password)}</small>
                  </span>
                  ${renderCounter(counterValue(counterSummary.weeklyByBarber, barber.id))}
                </button>`
              )
              .join("")}
          </div>
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
  const services = store.state.services.filter((service) => service.active);
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
  <div class="admin-slots selectable">
    ${rows
      .map(({ time, status, appointment, dayBlocked }) => {
        const unavailable = isUnavailableSlot(app.selectedDate, time, status);
        const chatPhone = appointment?.whatsapp ? moneylessPhone(appointment.whatsapp) : "";
        const serviceName = serviceNameForAppointment(appointment);
        const serviceValue = formatCOP(serviceValueForAppointment(appointment));
        const realized = isRealizedAppointment(appointment);
        const actionEnabled = appointment && COUNTABLE_STATUSES.has(appointment.status);
        const statusLabel = realized
          ? "Realizada"
          : dayBlocked
            ? "Dia completo bloqueado"
            : unavailable && status === "available"
              ? "No disponible"
              : STATUS[status].label;
        return `
      <button class="slot-row ${realized ? "completed" : STATUS[status].tone} ${unavailable ? "unavailable" : ""} ${app.adminSelectedSlots.includes(time) ? "picked" : ""}" data-admin-slot="${time}">
        <div><strong>${slotRange(time)}</strong><span>${statusLabel}</span></div>
        <div class="slot-client">
          <strong>${escapeHTML(appointment?.clientName || "Sin cliente")}</strong>
          <small>${appointment?.whatsapp ? displayPhone(appointment.whatsapp) : "Sin WhatsApp"}</small>
          ${appointment ? `<small>Servicio: ${escapeHTML(serviceName)}</small>` : ""}
          ${appointment ? `<small>Valor: ${serviceValue}</small>` : ""}
          ${appointment ? `<small>Barbero: ${escapeHTML(barber.name)}</small>` : ""}
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
              const selectedOption = service.id === (store.state.appointments.find((item) => item.id === app.adminServiceEditAppointmentId)?.serviceId || "") ? "selected" : "";
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
  if (!app.barberSession) {
    return renderBarber();
  }

  const barber = barberById(app.barberSession.id);
  if (!barber) {
    app.barberSession = null;
    sessionStorage.removeItem("noxora-barber-session");
    return renderBarber();
  }
  const rows = baseSlots.map((time) => ({ time, ...statusFor(barber.id, app.barberDate, time) }));
  const counterSummary = buildCounterSummary(app.barberDate);

  return appShell(`
    <section class="dashboard-head">
      <div class="barber-heading">
        ${avatar(barber, "lg")}
        <div class="barber-heading-copy">
          <p class="eyebrow">BARBEROS</p>
          <h1>${escapeHTML(barber.name)}</h1>
          <span>Usuario: ${escapeHTML(barber.user)}</span>
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
          <div class="admin-slots readonly">
            ${rows
              .map(({ time, status, appointment, dayBlocked }) => {
                const unavailable = isUnavailableSlot(app.barberDate, time, status);
                return `
              <article class="slot-row ${STATUS[status].tone} ${unavailable ? "unavailable" : ""}">
                <div><strong>${slotRange(time)}</strong><span>${dayBlocked ? "Dia bloqueado" : unavailable && status === "available" ? "No disponible" : STATUS[status].label}</span></div>
                <div class="slot-client">
                  <strong>${escapeHTML(appointment?.clientName || (status === "available" ? "Disponible" : "Sin cliente"))}</strong>
                  <small>${appointment?.whatsapp ? displayPhone(appointment.whatsapp) : "Solo lectura"}</small>
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

function render() {
  const root = document.querySelector("#app");
  const views = { public: renderPublic, admin: renderAdminV2, barber: renderBarberV2, "super-admin": renderSuperAdminV2 };
  ensurePersistentBackground();
  if (root.dataset.shellReady !== "true") {
    root.innerHTML = renderLayoutShell();
    root.dataset.shellReady = "true";
  }
  if (root.dataset.chromeBound !== "true") {
    bindChromeEvents();
    root.dataset.chromeBound = "true";
  }
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
  viewRoot.innerHTML = views[app.view]();
  bindEvents();
  document.querySelector("#booking-confirm-dialog")?.showModal();
  requestAnimationFrame(fitPanelTitles);
}

function bindChromeEvents() {
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      app.view = button.dataset.view;
      history.pushState(null, "", viewPath(app.view));
      render();
    });
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
    const hash = await sha256(password);

    if (user === SUPER_ADMIN_USER && hash === SUPER_ADMIN_PASSWORD_HASH) {
      app.superAdminSession = {
        user: SUPER_ADMIN_USER,
        role: "super_admin",
        startedAt: new Date().toISOString(),
      };
      app.superAdminLoginError = "";
      sessionStorage.setItem(SUPER_ADMIN_SESSION_KEY, JSON.stringify(app.superAdminSession));
      render();
      return;
    }

    app.superAdminSession = null;
    app.superAdminLoginError = "Credenciales invalidas";
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

  document.querySelectorAll("[data-business-logo-input]").forEach((input) => {
    input.addEventListener("change", async (event) => {
      const file = event.currentTarget.files?.[0];
      if (!file) return;
      if (!/^image\/(png|jpeg|jpg|webp)$/i.test(file.type)) {
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
        [event.currentTarget.dataset.businessLogoInput]: src,
      };
      render();
    });
  });

  document.querySelector("#super-business-create")?.addEventListener("submit", (event) => {
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

    const theme = String(form.get("theme") || "gold_black");
    const palette = BUSINESS_THEMES[theme] || BUSINESS_THEMES.gold_black;
    const business = store.saveBusiness({
      name,
      slug,
      logoUrl: app.superAdminPendingLogos.create || "",
      theme,
      primaryColor: palette.primary,
      secondaryColor: palette.secondary,
      active: form.get("active") === "on",
    });

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
    Promise.resolve(sha256(generatedPassword)).then((hash) => {
      accounts[accounts.length - 1].passwordHash = hash;
      saveAdminAccounts(accounts);
      const urls = businessUrlSet(business);
      app.superAdminCredentialReveal = {
        businessName: business.name,
        publicUrl: urls.public,
        adminUrl: urls.admin,
        barberUrl: urls.barber,
        user: "Desarrollo",
        password: generatedPassword,
      };
      app.superAdminPendingLogos = { ...app.superAdminPendingLogos, create: "" };
      app.superAdminOpenBusinessId = business.id;
      app.superAdminMessage = `Barberia creada: ${business.name}`;
      render();
    });
  });

  document.querySelectorAll(".super-business-edit").forEach((formEl) => {
    formEl.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const businessId = event.currentTarget.dataset.businessId;
      const current = store.businessById(businessId);
      if (!current) return;
      const slug = uniqueBusinessSlug(form.get("slug") || current.slug, current.id);
      const theme = String(form.get("theme") || current.theme || "gold_black");
      const palette = BUSINESS_THEMES[theme] || BUSINESS_THEMES.gold_black;
      const updated = store.saveBusiness({
        id: current.id,
        name: String(form.get("name") || "").trim(),
        slug,
        logoUrl: app.superAdminPendingLogos[current.id] || current.logoUrl,
        theme,
        primaryColor: palette.primary,
        secondaryColor: palette.secondary,
        active: form.get("active") === "on",
      });
      saveAdminAccounts(
        loadAdminAccounts().map((account) =>
          account.businessId === updated.id ? { ...account, businessSlug: updated.slug } : account
        )
      );
      app.superAdminPendingLogos = { ...app.superAdminPendingLogos, [current.id]: "" };
      app.superAdminMessage = `Negocio actualizado: ${updated.name}`;
      render();
    });
  });

  document.querySelectorAll(".super-admin-account-create").forEach((formEl) => {
    formEl.addEventListener("submit", (event) => {
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
      const accounts = loadAdminAccounts();
      if (accounts.some((account) => account.user === user && account.businessId === businessId)) {
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
      accounts.push(newAccount);
      Promise.resolve(sha256(generatedPassword)).then((hash) => {
        newAccount.passwordHash = hash;
        saveAdminAccounts(accounts);
        const urls = businessUrlSet(business);
        app.superAdminCredentialReveal = {
          businessName: business.name,
          publicUrl: urls.public,
          adminUrl: urls.admin,
          barberUrl: urls.barber,
          user,
          password: generatedPassword,
        };
        app.superAdminMessage = `Administrador creado para ${business.name}`;
        render();
      });
    });
  });

  document.querySelectorAll(".super-admin-account-edit").forEach((formEl) => {
    formEl.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const accountId = event.currentTarget.dataset.adminAccountId;
      const accounts = loadAdminAccounts();
      const account = accounts.find((item) => item.id === accountId);
      if (!account) return;
      const nextUser = String(form.get("user") || "").trim();
      if (
        accounts.some(
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
      saveAdminAccounts(accounts);
      app.superAdminMessage = `Administrador actualizado: ${account.name}`;
      render();
    });
  });

  document.querySelectorAll("[data-regenerate-admin-password]").forEach((button) => {
    button.addEventListener("click", () => {
      const accountId = button.dataset.regenerateAdminPassword;
      const accounts = loadAdminAccounts();
      const account = accounts.find((item) => item.id === accountId);
      if (!account) return;
      const generatedPassword = generateSecurePassword(10);
      Promise.resolve(sha256(generatedPassword)).then((hash) => {
        account.password = "";
        account.passwordHash = hash;
        saveAdminAccounts(accounts);
        const business = store.businessById(account.businessId);
        const urls = businessUrlSet(business);
        app.superAdminCredentialReveal = {
          businessName: business?.name || "Barberia",
          publicUrl: urls.public,
          adminUrl: urls.admin,
          barberUrl: urls.barber,
          user: account.user,
          password: generatedPassword,
        };
        app.superAdminMessage = `Nueva clave temporal generada para ${account.name}`;
        render();
      });
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
      const appointment = store.state.appointments.find((item) => item.id === button.dataset.markDone);
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
      app.selectedBarberId = "";
      app.publicDaySelected = false;
      app.selectedSlot = "";
      render();
    });
  });

  document.querySelectorAll("[data-reset-service]").forEach((button) => {
    button.addEventListener("click", () => {
      app.selectedServiceId = "";
      app.selectedBarberId = "";
      app.publicDaySelected = false;
      app.selectedSlot = "";
      render();
    });
  });

  document.querySelectorAll("[data-reset-day]").forEach((button) => {
    button.addEventListener("click", () => {
      app.publicDaySelected = false;
      app.selectedSlot = "";
      render();
    });
  });

  document.querySelectorAll("[data-reset-slot]").forEach((button) => {
    button.addEventListener("click", () => {
      app.selectedSlot = "";
      render();
    });
  });

  document.querySelector("#public-booking-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!app.selectedServiceId || !app.selectedBarberId || !app.selectedSlot) return;
    if (!isPublicSlotBookable(app.selectedBarberId, app.selectedDate, app.selectedSlot)) {
      app.selectedSlot = "";
      render();
      return;
    }
    const form = new FormData(event.currentTarget);
    const barber = barberById(app.selectedBarberId);
    const service = serviceById(app.selectedServiceId);
    const clientName = String(form.get("clientName") || "").trim();
    const whatsapp = String(form.get("whatsapp") || "").trim();
    store.upsertAppointment({
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
    app.bookingConfirmation = {
      clientName,
      whatsapp,
      serviceName: service?.name || "Servicio",
      barberName: barber?.name || "Barbero",
      date: app.selectedDate,
      range: slotRange(app.selectedSlot),
    };
    render();
  });

  document.querySelector("[data-close-booking-confirm]")?.addEventListener("click", () => {
    app.bookingConfirmation = null;
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
    const account = await findAdminAccount(user, password, currentBusiness()?.id);

    if (account) {
      app.adminSession = {
        id: account.id,
        user: account.user,
        name: account.name,
        role: account.role,
        startedAt: new Date().toISOString(),
      };
      app.adminLoginError = "";
      app.adminAccountMessage = "";
      app.adminView = "home";
      app.adminBarberId = "";
      app.adminSelectedSlots = [];
      sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(app.adminSession));
      render();
      return;
    }

    app.adminSession = null;
    app.adminLoginError = "Usuario o contrasena incorrectos";
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    render();
  });

  document.querySelector("[data-admin-logout]")?.addEventListener("click", () => {
    app.adminSession = null;
    app.adminLoginError = "";
    app.adminAccountMessage = "";
    app.adminView = "home";
    app.adminBarberId = "";
    app.adminSelectedSlots = [];
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    render();
  });

  document.querySelector("#admin-account-create")?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!isPrincipalAdmin()) return;
    const form = new FormData(event.currentTarget);
    const accounts = loadAdminAccounts();
    const payload = {
      name: String(form.get("name") || "").trim(),
      user: String(form.get("user") || "").trim(),
      password: String(form.get("password") || ""),
      confirmPassword: String(form.get("confirmPassword") || ""),
      active: form.get("active") === "on",
    };
    const error = validateAdminAccountPayload(payload, accounts);
    if (error) {
      app.adminAccountMessage = error;
      render();
      return;
    }

    accounts.push({
      id: uid("admin"),
      businessId: currentBusiness().id,
      businessSlug: currentBusiness().slug,
      name: payload.name,
      user: payload.user,
      password: payload.password,
      role: "administrador_secundario",
      active: payload.active,
    });
    saveAdminAccounts(accounts);
    app.adminAccountMessage = "Administrador creado correctamente.";
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
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!isPrincipalAdmin()) return;
      const id = event.currentTarget.dataset.adminAccountId;
      if (id === PRINCIPAL_ADMIN.id) return;
      const form = new FormData(event.currentTarget);
      const accounts = loadAdminAccounts();
      const payload = {
        name: String(form.get("name") || "").trim(),
        user: String(form.get("user") || "").trim(),
        password: String(form.get("password") || ""),
        confirmPassword: String(form.get("confirmPassword") || ""),
        active: form.get("active") === "on",
      };
      const error = validateAdminAccountPayload(payload, accounts, id);
      if (error) {
        app.adminAccountMessage = error;
        render();
        return;
      }

      saveAdminAccounts(
        accounts.map((account) =>
          account.id === id
            ? {
                ...account,
                name: payload.name,
                user: payload.user,
                password: payload.password,
                active: payload.active,
              }
            : account
        )
      );
      app.adminAccountMessage = "Administrador actualizado correctamente.";
      render();
    });
  });

  document.querySelectorAll("[data-delete-admin-account]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!isPrincipalAdmin()) return;
      const id = button.dataset.deleteAdminAccount;
      if (id === PRINCIPAL_ADMIN.id) return;
      saveAdminAccounts(loadAdminAccounts().filter((account) => account.id !== id));
      app.adminAccountMessage = "Administrador eliminado correctamente.";
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

  document.querySelector("#background-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!app.pendingBackgroundVideo) return;
    app.backgroundMedia = app.pendingBackgroundVideo;
    saveBackgroundMedia(app.backgroundMedia);
    app.pendingBackgroundVideo = null;
    app.backgroundMessage = "Video guardado como fondo activo.";
    render();
  });

  document.querySelector("[data-reset-background]")?.addEventListener("click", () => {
    app.backgroundMedia = null;
    app.pendingBackgroundVideo = null;
    saveBackgroundMedia(null);
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
    const selected = barberById(data.get("id"));
    const file = data.get("photo");
    const photo = file?.size ? await fileToDataURL(file) : selected?.photo || "";
    const barberRecord = store.saveBarber({
      id: data.get("id") || undefined,
      name: data.get("name"),
      user: data.get("user"),
      password: data.get("password"),
      whatsapp: data.get("whatsapp"),
      specialty: data.get("specialty"),
      active: data.get("active") === "on",
      photo,
    });
    const selectedServiceIds = data.getAll("serviceIds").map(String);
    if (barberRecord?.id) {
      store.saveBarberServices(barberRecord.id, selectedServiceIds);
    }
    if (!app.adminBarberId && barberRecord?.id) app.adminBarberId = barberRecord.id;
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
    const appointment = store.state.appointments.find((item) => item.id === app.adminServiceEditAppointmentId);
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
    store.deleteBarber(event.currentTarget.dataset.deleteBarber);
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

  document.querySelector("#barber-login")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const barber = store.state.barbers.find(
      (item) => item.user === form.get("user") && item.password === form.get("password") && item.active
    );
    if (!barber) {
      event.currentTarget.classList.add("shake");
      setTimeout(() => event.currentTarget.classList.remove("shake"), 500);
      return;
    }
    app.barberSession = { id: barber.id };
    app.barberDate = todayISO();
    app.barberScheduleView = "hours";
    sessionStorage.setItem("noxora-barber-session", JSON.stringify(app.barberSession));
    render();
  });

  document.querySelector("[data-logout]")?.addEventListener("click", () => {
    app.barberSession = null;
    sessionStorage.removeItem("noxora-barber-session");
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
  if (document.visibilityState === "visible") render();
});

window.addEventListener("resize", () => {
  cancelAnimationFrame(titleFitFrame);
  titleFitFrame = requestAnimationFrame(fitPanelTitles);
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    ensureBackgroundPlayback();
  }
});

render();
