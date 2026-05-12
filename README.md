# Barber Delux

Plataforma web premium para barberias modernas. Esta version local esta completa para validar experiencia, flujos y logica de negocio antes de conectar Supabase.

## Ejecutar local

```bash
node server.mjs
```

Abrir `http://localhost:4173`.

## Modulos incluidos

- Agenda publica para clientes.
- Panel administrador.
- Panel de barbero con login simulado.
- Gestion de barberos, fotos, estados activos e inactivos.
- Reservas manuales y publicas.
- Bloqueos, liberaciones, citas fijas y bloqueo de dia completo.
- Persistencia semanal: limpia reservas normales al cambiar de semana y conserva bloqueos/citas fijas.
- Sincronizacion local en tiempo real con `BroadcastChannel` y eventos `INSERT`, `UPDATE`, `DELETE`.
- Capa preparada para reemplazar el mock por Supabase Realtime.
- Archivo `supabase-adapter.example.js` con suscripcion Realtime para `INSERT`, `UPDATE` y `DELETE`.

## Credenciales demo

- Admin: acceso directo desde la pestaña Admin.
- Barbero: usar usuario `mateo`, `dante`, `elias` o `simon` con clave `studio2026`.

## Integracion futura con Supabase

La app centraliza operaciones en `StudioStore`. Para produccion:

1. Crear tablas `barbers`, `appointments`, `blocked_days`.
2. Mover fotos a Supabase Storage.
3. Reemplazar persistencia `localStorage` por queries Supabase.
4. Conectar Realtime con eventos `postgres_changes` para `INSERT`, `UPDATE`, `DELETE`.
5. Ejecutar la limpieza semanal mediante Edge Function o cron diario.
