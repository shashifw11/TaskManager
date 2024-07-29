const { createProxyMiddleware } = require('http-proxy-middleware');

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: API_BASE_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Remove '/api' prefix when forwarding to the backend
      },
    })
  );
};
