module.export = {
  apps: [
    {
      name: "project-management",
      script: "npm",
      args: "run dev",

      env: {
        NODE_ENV: "development",
        PORT: 3001,
      },
    },
  ],
};
