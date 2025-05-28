const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "ARErKApD8O_bCPXx5kdt5eBXLY651Eq2-n3dUAbblClvtSNWMXUWDB86oT-zike61s-Wp7IHqjHEatRL",
  client_secret: "EPMmJF2cgurRvnsg5QIBWy92ySor-z4ORlnzmokVa5FmSLxr3CHMmG_-SXsetAsiZGbexFR2x_sU113W",
});

module.exports = paypal;