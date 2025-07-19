module.exports = {
  apps: [
    {
      name: "rentura-server",
      script: "./dist/src/index.js",

      env: {
        NODE_ENV: "development",
      },
    },
  ],
};
