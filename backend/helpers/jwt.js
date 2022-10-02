var { expressjwt: jwt } = require("express-jwt");
const secret = process.env.secret_key;
const API = process.env.API_URL;

function authJwt() {
  return jwt({
    secret,
    algorithms: ["HS256"],
  }).unless({
    path: [
      {url: /\/api\/v1\/products(.*)/ , methods : ['GET', 'OPTIONS']},
      {url: /\/api\/v1\/categories(.*)/ , methods : ['GET', 'OPTIONS']},
      `${API}/users/login`,
      `${API}/users/register`

    ]
  });
}

module.exports = authJwt;
