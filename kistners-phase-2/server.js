var http = require('http');
const Router = require('./lib/router');
const Templates = require('./lib/templates');
const serveFile = require('./src/serve-file');
const serveHome = require('./src/serve-home');
const serveAnniversary = require('./src/serve-anniversary');
const serveBaby = require('./src/serve-baby');
const serveBirthday = require('./src/serve-birthday');
const serveProm = require('./src/serve-prom');
const serveSororitySisterhood = require('./src/serve-sorority-sisterhood');
const serveSympathy = require('./src/serve-sympathy');
const serveWedding = require('./src/serve-wedding');
const serveArrangement = require('./src/serve-arrangement');
const serveArrangementImage = require('./src/serve-arrangement-image');
const serve404 = require('./src/serve404');
const serveAdmin = require('./src/serve-admin');

const addArrangement = require('./src/add-arrangement');
const serveAddArrangement = require('./src/serve-add-arrangement');
const serveUpdateArrangement = require('./src/serve-update-arrangement');
const updateArrangementForm = require('./src/serve-update-arrangement-form');
const updateArrangement = require('./src/update-arrangement');

const serveSignup = require('./src/serve-signup');
const serveSignin = require('./src/serve-signin');
const createUser = require('./src/create-user');
const createSession = require('./src/create-session');
const loadSession = require('./lib/load-session');
const serveUpdatePassword = require('./src/serve-update-password');
const updatePassword = require('./src/update-password');

const PORT = 3000;

var router = new Router(serve404);
var templates = new Templates("./templates");

router.addRoute("GET", "/static/:filename", serveFile);
router.addRoute("GET", "/", serveHome);
router.addRoute("GET", "/index", serveHome);
router.addRoute("GET", "/index.html", serveHome);
router.addRoute("GET", "/anniversary", serveAnniversary);
router.addRoute("GET", "/baby", serveBaby);
router.addRoute("GET", "/birthday", serveBirthday);
router.addRoute("GET", "/prom", serveProm);
router.addRoute("GET", "/sorority-sisterhood", serveSororitySisterhood);
router.addRoute("GET", "/sympathy", serveSympathy);
router.addRoute("GET", "/weddings", serveWedding);
router.addRoute("GET", "/arrangements/:id", serveArrangement);
router.addRoute("GET", "/arrangement-images/:id", serveArrangementImage);

router.addRoute("GET", "/admin", serveAdmin);
router.addRoute("GET", "/signup", serveSignup);//gets the form and publishes it for the admin
router.addRoute("POST", "/signup", createUser);
//wheen the admin submits this form (i.e: POSTs it), this route sends the info on the form to createUser
router.addRoute("GET", "/signin", serveSignin);
router.addRoute("POST", "/signin", createSession);
router.addRoute("GET", "/update-password", serveUpdatePassword);
router.addRoute("POST", "/update-password", updatePassword);
router.addRoute("POST", "/add-arrangement", addArrangement);
router.addRoute("GET", "/add-arrangement", serveAddArrangement);
router.addRoute("GET", "/update-arrangement", serveUpdateArrangement);
router.addRoute("GET", "/update-arrangement-form/:id", updateArrangementForm);
router.addRoute("POST", "/update-arrangement", updateArrangement);


var server = http.createServer({}, (req, res) => {
  res.templates = templates;
  // Attempt to load the session before routing
  loadSession(req, res, (req, res) => {
    // Route the request
    router.route(req, res);
  });
});

// Begin listening for requests
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});