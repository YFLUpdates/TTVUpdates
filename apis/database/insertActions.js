import Sql from "./db.js";

function insertActions(newCustomer) {
  Sql.query(`INSERT INTO bans SET ?`, newCustomer, (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
  });
}
export default insertActions;
