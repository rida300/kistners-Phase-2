const databaseFile = require('../data/database');
const db = databaseFile.db;
const serve403 = require('./serve403');

function serveSignup(req, res) {
  if (req.session) {
    console.log("req.user.role!!!", req.user.role, databaseFile.roles);
    if(req.user.role==databaseFile.roles.ADMIN) { 
      console.log("Im in the 2nd if staement now");
  var nav = res.templates.render("_nav.html", {url: req.url});
  var footer = res.templates.render("_footer.html", {});
  var content = res.templates.render("signup.html", {errorMessage: ""});
  var html = res.templates.render("_page.html", {
    page: "Sign Up",
    navigation: nav,
    content: content,
    footer: footer,
  });
  res.setHeader("Content-Type", "text/html");
  res.end(html);
}
else{
        serve403(req,res);
        res.end();
    }  
    
      
  }else {
        res.statusCode = 302; // temporary redirect
        res.setHeader("Location", "/signin");
        res.end()
  }
}
module.exports = serveSignup;