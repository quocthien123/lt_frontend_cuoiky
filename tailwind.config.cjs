module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue,svelte}'
  ],
  // JIT is the default in Tailwind v3; keep content patterns to scan for classes
  theme: {
    extend: {},
  },
  plugins: [],
};
