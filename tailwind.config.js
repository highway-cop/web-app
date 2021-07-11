module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'primary': '#4527A0'
            }
        },
        fontFamily: {
            sans: ['Roboto', 'sans-serif']
        }
    },
    variants: {
        extend: {}
    },
    plugins: []
};
