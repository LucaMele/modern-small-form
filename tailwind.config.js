export default {
    content: ['src/**/*.{ts,html,css,scss}'],
    theme: {
        extend: {
            keyframes: {
                dropIn: {
                    '0%': { transform: 'translateY(-40%)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            },
            animation: {
                'drop-in': 'dropIn 0.5s ease-out forwards',
                'fade-in': 'fadeIn 0.8s ease-out forwards',
            },
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
