module.exports = {
  apps: [
    {
      name: 'tanxEnd',
      script: 'dist/main.js',
      env: {
        NODE_ENV: 'production', // 设置生产环境
      },
    },
  ],
};
