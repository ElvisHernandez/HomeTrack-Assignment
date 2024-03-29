/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.tsx"],
    theme: {
        extend: {},
    },
    // eslint-disable-next-line no-undef
    plugins: [require("daisyui")],
    daisyui: {
        themes: ["corporate"],
    },
};
