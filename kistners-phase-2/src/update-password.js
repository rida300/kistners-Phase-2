const bcrypt = require('bcrypt');
const sessions = require('../lib/sessions');
const templates = require('../lib/templates');
const parseBody = require('../lib/parse-body');
const databaseFile = require('../data/database');
const serve403= require('../src/serve403');
const serveSignin= require('../src/serve-signin');
const db = databaseFile.db;

const ENCRYPTION_PASSES = 12;//10

function saveUser(req, res, user) {
    console.log("in save user");
    db.run("UPDATE users SET cryptedPassword = ? WHERE username = ?",
    user.cryptedPassword,
    user.username,
    (err) => {
      if(err) failure(req, res, error);
      else {
          // Redirect to the home page 
          res.setHeader("Location", "/admin");
          res.statusCode = 302;
          res.end();
      }
    }); 
}

function success(req, res, user) {
  console.log("in success");
  console.log("new password = ", req.body.newPassword);
  bcrypt.hash(req.body.newPassword, ENCRYPTION_PASSES, (err, hash) => {
    if(err) {
        console.log("error hashing password");
        return failure(req, res);
    } 
    user.cryptedPassword = hash;
    saveUser(req, res, user);
  });
}


/** @function failure
 * Enpoint that renders the sign in form on a failure with an optional message.
 * @param {http.incomingMessage} req - the request object 
 * @param {http.serverResponse} res - the response object 
 * @param {string} errorMessage (optional) - an error message to display 
 */
function failure(req, res, errorMessage) {
  console.log("in failure");
  if(!errorMessage) errorMessage = "There was an error processing your request.  Please try again."
  var html = res.templates.render("signin.html", {errorMessage: errorMessage});
  res.setHeader("Content-Type", "text/html");
  res.end(html);
}

/** @function validatePassword
 * A helper function that determines if the supplied password matches 
 * the encrypted one stored in the user record.  Inovokes the success() 
 * or failure() function based on the validation.
 * @param {http.incomingMessage} req - the request object 
 * @param {http.serverResponse} res - the response object 
 * @param {object} user - the user object (with a cryptedPassoword property) 
 */
function validatePassword(req, res, user) {
  console.log("in validate password");
  console.log("user = ", user);
  console.log("username = ", user.username);
  console.log("old password from req = ", req.body.oldPassword);
  console.log("new password from req = ", req.body.newPassword);
  console.log("old password = ", user.oldPassword);
  console.log("new password = ", user.newPassword);
  console.log("password Confirmation = ", user.passwordConfirmation);
  console.log("in update password function");
  bcrypt.compare(req.body.oldPassword, user.cryptedPassword, (err, result) => {
      console.log("err, result", err, result);
    if(result) success(req, res, user);
    else failure(req, res, "Username/password combination not found.  Please try again");
  });
}


/** @function retrieveUser
 * A helper function that retrieves the user corresponding to the 
 * req.body.username value from the database.  Invokes the validateUser() 
 * on a successful retrieval, failure() on a failed one.
 * @param {http.incomingMessage} req - the request object 
 * @param {http.serverResponse} res - the response object 
 */
function retrieveUser(req, res) {
  console.log("in retrieve user");
  console.log("req.sessions.user"+ req.session.user);
  db.get("SELECT * FROM users WHERE username = ?",
    req.body.username,
    (err, user) => {
      if(err) {
          console.log("SQL error");
          return failure(req, res); // SQL error
      }
      if(!user) return failure(req, res, "Username/password combination not found.  Please try again");
      validatePassword(req, res, user);
    }
  );
}

/** @function createSession 
 * Creates a new session for the supplied sign in form values 
 * (Coming from the request body).  
 * @param {http.incomingMessage} req - the request object 
 * @param {http.serverResponse} res - the response object 
 */
function updatePassword(req, res) {
  parseBody(req, res, (req, res) => {
    console.log("finished parsing body");
    console.log("in update password, contents of the req object : "+ req);
    //console.log("in update password, contents of the req object params: "+ req.params);
    isAdmin(req, res);
  });
}

function isAdmin(req,res)
{
   
        if(req.session)
            {
                console.log("req.user.role" + req.user.role);
                if(req.user.role == db.USER || req.user.username == req.body.username)
                    {
                        retrieveUser(req, res);
                    }
                
                else
                    {
                        console.log("You are not authorized to update this password");
                        serve403(req,res); 
                    }
                   
            }
    else
    {
    console.log("Please sign in again:");
    serveSignin(req,res); 
    }
    
   }

/** @module createSession 
 * An endpoint for a POST request that creates a new session for the 
 * supplied sign in form values (in the request body) and redirects 
 * to the home page.
 */
module.exports = updatePassword;