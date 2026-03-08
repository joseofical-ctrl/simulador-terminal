# 💻 Hacker Terminal Simulator

Un simulador de terminal realista con temática hacker que se ejecuta completamente en el navegador.

## About this project

Este es un proyecto personal construido como parte de mi aprendizaje en desarrollo web.
El objetivo de este proyecto es practicar programación, arquitectura de proyectos y recrear la experiencia exacta de una terminal dentro del navegador.

El objetivo principal es mejorar mis habilidades mientras construyo aplicaciones web reales e interactivas.

## ✨ Features

- Interfaz de terminal interactiva
- Comandos simulados con respuestas realistas
- Historial de comandos (navega usando las flechas Arriba/Abajo)
- Interfaz de usuario personalizada estilo terminal con efectos de escritura
- Animación de fondo de "lluvia de Matrix"
- Soporte bilingüe (Inglés y Español)
- Diseño responsive en todos los dispositivos

## 🛠️ Tech Stack

- **Next.js**
- **React**
- **TypeScript**
- **TailwindCSS**
- **Framer Motion**
- **Zustand**

## 🚀 Installation

Para ejecutar este proyecto localmente, ejecuta los siguientes comandos en tu terminal:

```bash
git clone https://github.com/your-username/simulador-terminal.git
cd simulador-terminal
npm install
npm run dev
```

Luego, abre [http://localhost:3000](http://localhost:3000) en tu navegador web.

## 🕹️ Usage

Una vez que la aplicación esté en marcha, escribe dentro de la terminal y presiona Enter.

- Usa el comando `help` para listar todos los comandos disponibles.
- Usa el comando `clear` para limpiar la pantalla de la terminal.
- Presiona las flechas **Arriba** y **Abajo** para navegar por los comandos que has usado recientemente.
- Haz clic en el botón de cambio de idioma para alternar la interfaz y las respuestas de la terminal entre Inglés y Español.

## 📂 Project Structure

- `app/` - Páginas principales de la aplicación Next.js, layout y estilos globales.
- `components/` - Componentes reutilizables de React (`Terminal`, `CommandInput`, `MatrixRain`, etc.).
- `lib/` - Lógica de soporte que incluye el analizador de comandos personalizado y el diccionario multi-idioma.
- `store/` - Gestión del estado global utilizando Zustand para el historial de la terminal y la configuración de idioma.
- `types/` - Interfaces y definiciones personalizadas de TypeScript.

## 🎯 Learning Goals

A través de este proyecto, me estoy enfocando activamente en:

- Construir interfaces de usuario complejas e interactivas
- Trabajar con componentes modulares de React
- Gestionar el estado global de la aplicación
- Crear simulaciones de interfaces realistas y ricas animaciones
- Escribir código TypeScript moderno y limpio

## 💡 Future Improvements

Algunas ideas que planeo implementar en un futuro:

- Más comandos interactivos y secretos ocultos (easter eggs)
- Autocompletado de comandos (usando la tecla Tab)
- Sistema de archivos simulado (`cd`, `ls`, `cat`)
- Mejores animaciones y estados de carga
- Comportamiento mejorado de la terminal

## 👨‍💻 Author

**José**  
_Desarrollador Web en Aprendizaje_
