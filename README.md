# 🤖 Generador de Excusas con IA

> Genera la excusa perfecta para cualquier situación — impulsado por OpenAI GPT-4.1-mini.

Este es un proyecto personal que construí para practicar desarrollo web moderno. La idea es simple y divertida: el usuario elige una categoría y la inteligencia artificial genera una excusa creativa, graciosa y creíble en segundos. También puede guardar sus favoritas, copiarlas al portapapeles y cambiar el idioma entre inglés y español.

---

## ✨ Demo

> Sigue los pasos de [Instalación](#-instalación) y abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🚀 Características

- 🧠 **Excusas generadas por IA** — Creatividad real gracias a OpenAI GPT-4.1-mini
- 🗂️ **6 categorías disponibles** — Universidad, Trabajo, Amigos, Familia, Pareja y Absurdo
- 🌐 **Soporte bilingüe** — Cambia entre inglés y español con un solo clic
- ❤️ **Excusas favoritas** — Guarda las mejores y accede a ellas cuando quieras
- 📋 **Copiar al portapapeles** — Un clic y lista para pegar
- ⌨️ **Efecto máquina de escribir** — Cada excusa aparece letra por letra
- 🎨 **Diseño oscuro y moderno** — Inspirado en Vercel y Linear
- 📱 **Diseño responsive** — Funciona bien en celular, tablet y computadora
- 💾 **Persistencia con localStorage** — Tus favoritas y el idioma se recuerdan al recargar
- 🎞️ **Animaciones fluidas** — Usando Framer Motion para una experiencia más linda

---

## 🛠️ Tecnologías utilizadas

| Capa | Tecnología |
|---|---|
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router) |
| **Lenguaje** | [TypeScript](https://www.typescriptlang.org/) |
| **Estilos** | [TailwindCSS v4](https://tailwindcss.com/) |
| **Animaciones** | [Framer Motion](https://www.framer-motion.com/) |
| **Íconos** | [Lucide React](https://lucide.dev/) |
| **Notificaciones** | [Sonner](https://sonner.emilkowal.ski/) |
| **Inteligencia Artificial** | [OpenAI API](https://platform.openai.com/) — `gpt-4.1-mini` |
| **Persistencia** | `localStorage` del navegador |

---

## 📦 Instalación

### Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- npm o yarn
- Una API Key de OpenAI → [Obtenerla aquí](https://platform.openai.com/api-keys)

### Pasos

1. **Clona el repositorio**

```bash
git clone https://github.com/tu-usuario/generador-de-excusas.git
cd generador-de-excusas
```

2. **Instala las dependencias**

```bash
npm install
```

3. **Configura las variables de entorno** (ver la sección siguiente)

4. **Inicia el servidor de desarrollo**

```bash
npm run dev
```

5. **Abre la app en el navegador**

```
http://localhost:3000
```

---

## 🔑 Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto y agrega tu API Key de OpenAI:

```env
OPENAI_API_KEY=tu_api_key_aquí
```

> ⚠️ **Importante:** No compartas ni subas este archivo a GitHub. Ya está incluido en el `.gitignore`.

Para conseguir tu API Key:
1. Entra a [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Haz clic en **Create new secret key**
3. Copia la clave y pégala en `.env.local`

---

## 💡 Cómo usar la app

### Generar una excusa

1. **Elige una categoría** del selector (Universidad, Trabajo, Amigos, etc.)
2. Haz clic en el botón **Generar Excusa**
3. Espera unos segundos mientras la IA genera tu excusa
4. La excusa aparece en una tarjeta con animación de escritura

### Guardar favoritas

- Haz clic en el botón **Guardar** en la tarjeta de la excusa
- Aparece en la lista de favoritas al final de la página
- Puedes eliminarla individualmente con el ícono de papelera, o borrar todas con **Borrar todo**

### Copiar una excusa

- Haz clic en **Copiar** en cualquier tarjeta
- El texto se copia automáticamente al portapapeles
- Una notificación confirma que se copió correctamente

### Cambiar de idioma

- Haz clic en el botón **🌐 EN | ES** en la esquina superior derecha
- Toda la interfaz cambia de idioma al instante
- Las excusas que generes después del cambio saldrán en el idioma seleccionado
- La preferencia de idioma se guarda y persiste al recargar la página

---

## 📁 Estructura del proyecto

```
generador-de-excusas/
│
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Layout raíz, fuentes, metadata y Toaster
│   ├── page.tsx                  # Página principal — orquesta todos los componentes
│   ├── globals.css               # Estilos globales (dark mode, scrollbar, etc.)
│   └── api/
│       └── generate-excuse/
│           └── route.ts          # POST /api/generate-excuse → llama a OpenAI
│
├── components/                   # Componentes reutilizables de UI
│   ├── Header.tsx                # Título, subtítulo, contador y botón de idioma
│   ├── CategorySelector.tsx      # Selector de categorías en cuadrícula
│   ├── GenerateButton.tsx        # Botón principal con efecto shimmer y loading
│   ├── ExcuseCard.tsx            # Tarjeta con la excusa y efecto typewriter
│   └── FavoritesList.tsx         # Lista de excusas guardadas con acciones
│
├── hooks/                        # Hooks personalizados de React
│   ├── useFavorites.ts           # Estado de favoritas + persistencia en localStorage
│   └── useLanguage.ts            # Estado del idioma + localStorage + función t()
│
├── lib/                          # Utilidades y servicios externos
│   ├── openai.ts                 # Cliente de OpenAI + función generateExcuse()
│   ├── translations.ts           # Diccionario de traducciones EN/ES
│   └── utils.ts                  # Función cn() para combinar clases de Tailwind
│
├── types/                        # Definiciones de tipos TypeScript
│   └── index.ts                  # ExcuseCategory, Language, Excuse, etc.
│
├── .env.local                    # Variables de entorno (no se sube a GitHub)
├── next.config.ts                # Configuración de Next.js
└── tsconfig.json                 # Configuración de TypeScript
```

---

## 🔌 API

### `POST /api/generate-excuse`

Genera una excusa usando la API de OpenAI.

**Cuerpo de la petición:**

```json
{
  "category": "Work",
  "language": "es"
}
```

| Campo | Tipo | Valores posibles | Descripción |
|---|---|---|---|
| `category` | `string` | `University` \| `Work` \| `Friends` \| `Family` \| `Relationship` \| `Absurd` | Categoría de la excusa |
| `language` | `string` | `en` \| `es` | Idioma de la respuesta |

**Respuesta exitosa `200`:**

```json
{
  "excuse": "Mi perro envió accidentalmente mi renuncia mientras yo dormía la siesta.",
  "category": "Work"
}
```

**Respuesta de error `400` / `500`:**

```json
{
  "error": "Invalid or missing category"
}
```

---

## 🔮 Ideas a futuro

- [ ] 🔗 **Botón para compartir** — Compartir excusas por redes sociales o link
- [ ] 🔊 **Texto a voz** — Escuchar la excusa en voz alta
- [ ] 🎭 **Selector de tono** — Formal, casual, dramático, poético
- [ ] 🕒 **Historial** — Ver todas las excusas generadas en la sesión
- [ ] 🌍 **Más idiomas** — Francés, portugués, alemán
- [ ] 📱 **PWA** — Instalar la app en el celular

---

## 👨‍💻 Autor

**José** — Desarrollador en formación

Hola, soy José. Estoy dando mis primeros pasos en el mundo del desarrollo web y este proyecto es parte de mi proceso de aprendizaje. Lo construí para practicar Next.js, TypeScript y la integración con APIs externas de manera real y divertida.

Si tienes algún feedback o sugerencia, ¡me encantaría escucharte! 🙌

- 🐙 GitHub: [@tu-usuario](https://github.com/tu-usuario)
- 📺 YouTube: [tu-canal](https://www.youtube.com/@tu-canal)

---

<p align="center">
  Hecho con ❤️ y muchas excusas creativas · <strong>Generador de Excusas con IA</strong>
</p>
