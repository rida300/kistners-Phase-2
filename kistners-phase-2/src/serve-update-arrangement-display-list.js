const serve500 = require('./serve500');
const databaseFile = require('../data/database');
const db = databaseFile.db;

function serveUpdateArrangementDisplayList(req, res) {
    if (req.session) {
    
    if(req.user.role==databaseFile.roles.ADMIN || req.user.role==databaseFile.roles.USER) { 
  databaseFile.arrangements.getAll((err, arrangements) => {
    if(err) {
      console.log(`Could not retrieve arrangements: ${err}`);
      serve500(req, res);
      return;
    }
    var arrangementList = res.templates.render("_arrangement-update-list.html", {arrangements: arrangements});
    var nav = res.templates.render("_nav.html", {url: req.url});
    var footer = res.templates.render("_footer.html", {});
    var content = res.templates.render("update-arrangement-display-list.html", {arrangements: arrangementList});
    var html = res.templates.render("_page.html", {
      page: "Home",
      navigation: nav,
      content: content,
      footer: footer
    });
    res.setHeader("Content-Type", "text/html");
    res.end(html);
  });
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

module.exports = serveUpdateArrangementDisplayList;