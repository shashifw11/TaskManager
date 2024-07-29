const { createProxyMiddleware } = require('http-proxy-middleware');

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.API_BASE_URL || 'http://localhost:5000',
      changeOrigin: true,
      // pathRewrite: {
      //   '^/api': '', // Remove '/api' prefix when forwarding to the backend
      // },
    })
  );
};
