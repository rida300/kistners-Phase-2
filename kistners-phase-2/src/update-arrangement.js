const database = require('../data/database');
const serve500 = require('../src/serve500');
const serveHome = require('../src/serve-home')
const parseBody = require('../lib/parse-body');

function updateArrangement(req, res) {
    // Parse the body
    console.log("In update arrangement before parsing");
    console.log(req.params);
    console.log("Entering parse");
    parseBody(req, res, (req, res) => {
        // Update arrangement 
        database.arrangements.update(req.body, (err) => {
            if(err) return serve500(req, res);
            serveHome(req, res);
        });
    });
}
module.exports = updateArrangement;