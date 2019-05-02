const database = require('../data/database');
const serve500 = require('../src/serve500');
const serveAdmin = require('../src/serve-admin')
const parseBody = require('../lib/parse-body');

function uploadArrangement(req, res) {
    // Parse the body
    console.log("In upload arrangement before parsing");
    parseBody(req, res, (req, res) => {
        // Create arrangement 
        console.log(req.body);
        database.arrangements.create(req.body, (err) => {
            console.log(req.body);
            if(err) return serve500(req, res);
            // Serve the updated admin
            serveAdmin(req, res);
        });
    });
}
module.exports = uploadArrangement;