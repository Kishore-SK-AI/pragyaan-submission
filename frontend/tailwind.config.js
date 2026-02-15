/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#1E40AF", // Hero Blue
                secondary: "#0EA5E9", // Teal Accent
                accent: "#F59E0B", // Warning Orange
                success: "#10B981", // Success Green
                danger: "#EF4444", // Danger Red
                background: "#F8FAFC",
                surface: "rgba(255, 255, 255, 0.9)",
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Poppins', 'sans-serif'],
            },
            boxShadow: {
                'soft': '0 10px 25px rgba(0,0,0,0.1)',
            }
        },
    },
    plugins: [],
}
