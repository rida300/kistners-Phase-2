// Check the process environment to determine if we are in 
// the development (default), test, production, or other environemnt
const ENV = process.env.GALLERY_ENVIRONMENT || 'development';

// Initialize sqlite3 in verbose mode for development, 
// non-verbose for other enviornments
var sqlite3;
if(ENV === 'development') sqlite3 = require('sqlite3').verbose();
else sqlite3 = require('sqlite3');

// Create and export the database (as we are using commonJS, 
// this is effectively a singleton)
module.exports = new sqlite3.Database(`./data/${ENV}.sqlite3`);