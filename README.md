# 🧥 Guardarropas CAP
> Sistema Premium y veloz para gestión de guardarropas en eventos masivos.

Guardarropas CAP es una aplicación web full-stack, optimizada para tablets o pantallas touch (en su módulo Staff) y móviles (en su módulo Client). 
Se enfoca en registrar e indexar prendas de vestir o accesorios de manera extremadamente rápida en eventos con mucha concurrencia.

## 🚀 Features Core

1. **Client App (Pre-reserva/Registro)**: Acelera las filas permitiendo a los invitados pre-registrarse en la landing y generar su código QR que llevarán al evento.
2. **Staff App (Operativa en Tiempo Real)**: Diseñada para registrar ingresos en _2 clics_ mediante ingresos "Quick Add" o validando códigos QR rápidamente. Posée un _Dark Mode_ permanente ideal para eventos nocturnos.
3. **Admin Dashboard**: Analytics en tiempo real, gestión de transacciones mockeadas y generador de "Pases VIP" para pases gratuitos controlados.

## 🛠 Tech Stack

- **Frontend:** React + Vite
- **Navegación:** React Router (v6)
- **State Management:** Zustand
- **Estilos:** Vanilla CSS (CSS Variables) orientado a Glassmorphism + Dark Base.
- **Backend/DB:** Supabase (PostgreSQL, Auth, RLS, Edge Functions). Configurada la estructura en `supabase_schema.sql`.

## 📦 Inicialización Rápida
Sigue estos pasos en tu terminal para correr la app:

```bash
# 1. Clona/Mueve este directorio
cd Guardarropa CAP

# 2. Instala las dependencias
npm install

# 3. Configura el .env local con tus datos de Supabase
#  -> renombra .env.example a .env

# 4. (Opcional - Backend) Corre el script /supabase_schema.sql en el dashboard de Supabase (SQL Editor)

# 5. Inicia el servidor de desarrollo en http://localhost:5173
npm run dev
```

> **Nota:** La aplicación cuenta con un Mock Mode incorporado vía Zustand. Si no conectas tu `.env` de Supabase inmediatamente, la app usará estados efímeros en RAM simulando la transacción de base de datos para que no se caiga en vivo si hay un problema en la red o si aún no completaste el setup del backend.

## 🗂 Estructura de Directorios (src/)
- **`/components`**: Componentes puramente visuales y reutilizables.
- **`/layouts`**: Layouts globales de wrappers.
- **`/pages`**: Vistas organizadas por Módulo (`/admin`, `/client`, `/staff`).
- **`/store`**: Store global de Zustand configurada local/remoto (`useCloakroomStore.js`).
- **`/lib`**: Clientes de terceros (Supabase).
- **`/styles/index.css`**: Tokens y variables estructurales del glassmorphism.

## 🔒 Consideraciones de Seguridad
La estructura SQL provista tiene las bases para _Row Level Security (RLS)_ en Supabase, asegúrate de activar y configurar estrictamente las Request y Updates si el software será público en el futuro, por ahora el `uid` maneja gran parte del trust en las peticiones. Y recuerda, no comitees tu `.env`.
