const templates = require('../lib/templates');

/** @function newSession
 * Endpoint for rendering a sign in form.
 * @param {http.incomingMessage} req - the request object 
 * @param {http.serverResponse} res - the response object 
 */
module.exports = function newSession(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.end(templates.render("signin.html", {errorMessage: ""}));
}