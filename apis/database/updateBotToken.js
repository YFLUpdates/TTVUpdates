import Sql from "./db.js";

function updateBotToken(json) {
  return new Promise(function (resolve) {
    Sql.query(
      `UPDATE twurple SET accessToken = "${
        json.accessToken
      }", refreshToken = "${json.refreshToken}", scope = '${JSON.stringify(
        json.scope
      )}', expiresIn = ${Number(
        json.expiresIn
      )}, obtainmentTimestamp = ${Number(
        json.obtainmentTimestamp
      )} WHERE id = 1`,
      (err, res) => {
        if (err) {
          return resolve(null);
        }
        return resolve(true);
      }
    );
  });
}
export default updateBotToken;
