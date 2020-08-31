const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/sign-in-user", "/create-user","/get-user","/current_user","/create-new-post","/fetch-posts","/fetch-all-posts","/create-comment",'/fetch-all-comments',"/update-post",'/edit-comment','/increase-like','/decrease-like','/increase-comment-like','/decrease-comment-like','/find-like-number','/fetch-favorites','/fetch-specific-post','/fetch-all-meals','/readCSV.js','/input-file','/find-meal','/update-meal','/payment','/fetch-user','/fetch-profile','/update-profile','/create-order','/create-payment-intent','/public-key','/send-sms','/send-driver','/fetch-all-orders','/fetch-alerts','/fetch-order-from-alert'],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};