var { expressjwt: jwt } = require("express-jwt");
const secret = process.env.secret_key;
const API = process.env.API_URL;

function authJwt() {
  return jwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] },
      `${API}/users/login`,
      `${API}/users/register`,
    ],
  });
}

async function isRevoked(req, token) {
  // console.log('log payload:',token);
  if (!token.payload.isAdmin) {
    return true;
  }
  return undefined;
}
module.exports = authJwt;
