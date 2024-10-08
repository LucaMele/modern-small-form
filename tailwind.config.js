export default {
    content: ['src/**/*.{ts,html,css,scss}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#F0F4FF', // Light Blue (Background)
                    DEFAULT: '#007BFF', // Primary Blue
                    dark: '#0056b3', // Darker shade of Primary Blue
                },
                secondary: '#FFCC00', // Accent color (Yellow)
                gray: {
                    light: '#f5f5f5', // Light Gray for cards or backgrounds
                    DEFAULT: '#6c757d', // Medium Gray for text or UI elements
                    dark: '#343a40', // Dark Gray for text
                },
            },
        },
    },
    plugins: [],
};
