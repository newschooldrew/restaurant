const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/create-user"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
