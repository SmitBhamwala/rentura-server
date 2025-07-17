module.exports = {
  apps: [
    {
      name: "rentura-server",
      script: "npm",
      args: "run dev",

      env: {
        NODE_ENV: "development",
      },
    },
  ],
};
