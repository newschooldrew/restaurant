const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/sign-in-user", "/create-user","/get-user","/current_user","/create-new-post","/fetch-posts","/fetch-all-posts","/create-comment",'/fetch-all-comments'],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};