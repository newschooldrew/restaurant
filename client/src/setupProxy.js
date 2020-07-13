const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/sign-in-user", "/create-user","/get-user"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};