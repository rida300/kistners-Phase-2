function serveAdmin(req, res) {
    //if session exists
  if (req.session) {
      var nav = res.templates.render("_nav.html", {url: req.url});
      var footer = res.templates.render("_footer.html", {});
      var content = res.templates.render("admin.html", {});
      var html = res.templates.render("_page.html", {
        page: "Admin",
        navigation: nav,
        content: content,
        footer: footer
      });
      res.setHeader("Content-Type", "text/html");
      res.end(html);
    }
    //session expired so sign in again
    else {
        res.statusCode = 302; // temporary redirect
        res.setHeader("Location", "/signin");
        res.end()
    }
}

module.exports = serveAdmin;