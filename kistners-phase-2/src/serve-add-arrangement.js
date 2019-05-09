const databaseFile = require('../data/database');
const db = databaseFile.db;

function serveAddArrangement(req, res) {
     if (req.session) {
    
    if(req.user.role==databaseFile.roles.ADMIN || req.user.role==databaseFile.roles.USER) { 
    console.log("Serve arrangement object = " + req.params);
    console.log("Serve arrangement id = " + req.params.id);
    databaseFile.arrangements.find(req.params.id, (err, arrangement) => {
        console.log(req.params, err, arrangement)
        var nav = res.templates.render("_nav.html", {url: req.url});
        var footer = res.templates.render("_footer.html", {});
        var content = res.templates.render("add-arrangement.html", arrangement);
        var html = res.templates.render("_page.html", {
        page: "Add Arrangement",
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

module.exports = serveAddArrangement;