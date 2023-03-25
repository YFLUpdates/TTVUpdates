import Sql from "./db.js";

function botToken() {
  return new Promise(function (resolve) {
    Sql.query(
      `SELECT accessToken, refreshToken, scope, expiresIn, obtainmentTimestamp FROM twurple WHERE id=1`,
      (err, res) => {
        if (err) {
          return resolve(null);
        }

        if (res.length) {
          return resolve({ ...res[0], scope: JSON.parse(res[0].scope) });
        }

        return resolve(null);
      }
    );
  });
}
export default botToken;
