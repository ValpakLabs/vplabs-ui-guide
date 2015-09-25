module.exports = {
  development: {
    appContext: '/balefire-savoo',
    isProduction: false,
    port: process.env.PORT || 3000
  },
  production: {
    appContext: '',
    isProduction: true,
    port: process.env.PORT || 3000
  }
}[process.env.NODE_ENV || 'development'];
