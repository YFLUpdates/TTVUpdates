import Sql from "./db.js";

function subInsert(id, customer){
  Sql.query(`INSERT INTO lastseen (user_login, channel, date, watchtime, offlinetime, points) VALUES(?, ?, ?, 0, 0, ${customer.points}) ON DUPLICATE KEY UPDATE date = VALUES(date), points = points+${customer.points}`, 
  [id, customer.channel, customer.date], (err, res) => {
      if (err) {
        console.log(err);
        return;
      }
      //console.log(res)

      return {status: 200, message: "updated"};
  });
}
export default subInsert;