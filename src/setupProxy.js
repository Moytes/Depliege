const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // Esto intercepta todas las llamadas que comiencen con /api
    createProxyMiddleware({
      target: 'https://api-scci.happyglacier-792390d3.westus2.azurecontainerapps.io',
      changeOrigin: true,
      // Si tu API usa HTTPS con un certificado de desarrollo,
      // podrías necesitar esto, pero pruébalo primero sin 'secure'.
      // secure: false, 
    })
  );
};