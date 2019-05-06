/** @function serve403
  * Endpoint serving 404 errors 
  * @param {http.IncomingMessage} req - the request object
  * @param {http.ServerResponse} res - the response object
  */
function serve403(req, res) {
  // Log the 403 error
  console.error(`403 Error: Unable to serve ${req.url}`);
  // Set the status code & message
  res.statusCode = 403;
  res.statusMessage = "Not Found";
  // Render a pretty error page
  var html = res.templates.render('404.html',{});
  res.setHeader("Content-Type", "text/html");
  res.end(html);
}

module.exports = serve403;
