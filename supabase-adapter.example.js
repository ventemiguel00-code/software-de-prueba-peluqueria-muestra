// Ejemplo de adaptador para produccion.
// Requiere @supabase/supabase-js y variables VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY.

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export function subscribeStudioRealtime(onChange) {
  const tables = ["barbers", "appointments", "blocked_days"];

  return supabase
    .channel("noxora-studioos")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "appointments" },
      (payload) => onChange({ table: "appointments", ...payload })
    )
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "blocked_days" },
      (payload) => onChange({ table: "blocked_days", ...payload })
    )
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "barbers" },
      (payload) => onChange({ table: "barbers", ...payload })
    )
    .subscribe((status) => {
      if (status === "SUBSCRIBED") {
        onChange({ eventType: "SYNC", table: tables.join(",") });
      }
    });
}

export async function disposeStudioRealtime(channel) {
  if (channel) await supabase.removeChannel(channel);
}
