module.exports = {
    apps: [
      {
        name: "voosh-backend",
        script: "./server.js",
        env: {
          NODE_ENV: "development",
          PORT: 5000,
        },
        env_production: {
          NODE_ENV: "production",
          PORT: 5000,
        },
      },
    ],
  };
  