/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT')

module.exports = withMT({
    content: [
        './src/**/*.{ts,tsx}',
        'path-to-your-node_modules/@material-tailwind/react/components/**/*.{ts,tsx}',
        'path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{ts,tsx}'
    ],
    theme: {
        extend: {
            boxShadow: {
                'outline-gray': '0 0 0 3px rgba(59, 130, 246, 0.5)',
                base: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;'
            },
            colors: {
                primary: '#ff89a1'
            },
            fontFamily: {
                popins: ['Poppins', 'sans-serif']
            }
        }
    },
    plugins: []
})
