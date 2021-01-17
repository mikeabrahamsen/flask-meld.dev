// postcss.config.js
module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
