var { expressjwt: jwt } = require("express-jwt");
const secret = process.env.secret_key;

function authJwt() {
  return jwt({
    secret,
    algorithms: ["HS256"],
  });
}

module.exports = authJwt;
