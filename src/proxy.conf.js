const PROXY_CONFIG = [
  {
    context: ["/"],
    target: "https://api-shardsquad-v2.vercel.app/",
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/": ""
    }
  }
];

module.exports = PROXY_CONFIG;
