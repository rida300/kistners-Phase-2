const templates = require('../lib/templates');

module.exports = function(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.end(templates.render("signup.html", {errorMessage: ""}));
}
