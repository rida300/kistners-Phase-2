const databaseFile = require('../data/database');
const db = databaseFile.db;

const serveUpdatePasswordAdmin = require('./serve-update-password-admin');

function serveUpdatePassword(req, res) {
  if (req.session) {
    console.log("req.user.role", req.user.role, databaseFile.roles.USER);
    if(req.user.role==databaseFile.roles.USER) { 
      console.log("In the if statement");
      var nav = res.templates.render("_nav.html", {url: req.url});
      var footer = res.templates.render("_footer.html", {});
      var content = res.templates.render("update-password.html", {errorMessage: ""});
      var html = res.templates.render("_page.html", {
        page: "Admin",//Update Password
        navigation: nav,
        content: content,
        footer: footer
      });
      res.setHeader("Content-Type", "text/html");
      res.end(html);
    }
      
    else if(req.user.role==databaseFile.roles.ADMIN)
        {
            serveUpdatePasswordAdmin(req,res);
        }
        
  } else {
        res.statusCode = 302; // temporary redirect
        res.setHeader("Location", "/signin");
        res.end()
  }
}

module.exports = serveUpdatePassword;