/** @type {import('tailwindcss').Config} */
export default {
  //es para que dentro de index o cualquier archivo con esta extension puede utilizar los estilos y propiedades de tailwind
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  
  theme: {
    extend: {},
  },
  plugins: [],
}

