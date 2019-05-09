const databaseFile = require('../data/database');
const db = databaseFile.db;
const serve403 = require('./serve403');

function serveUpdatePasswordAdmin(req, res) {
  if (req.session) {
    console.log("req.user.role!!!", req.user.role, databaseFile.roles);
    if(req.user.role==databaseFile.roles.ADMIN) { 
      console.log("Im in the 2nd if staement now");
      var nav = res.templates.render("_nav.html", {url: req.url});
      var footer = res.templates.render("_footer.html", {});
      var content = res.templates.render("update-password-admin.html", {errorMessage: ""});
      var html = res.templates.render("_page.html", {
        page: "Admin",//Update Password
        navigation: nav,
        content: content,
        footer: footer
      });
        console.log("about to exit");
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

module.exports = serveUpdatePasswordAdmin;