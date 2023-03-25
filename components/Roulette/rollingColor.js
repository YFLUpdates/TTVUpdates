import sha256 from "sha256";
import * as math from "mathjs";
import randomStr from "../randomStr.js";

export default async function rollingColor() {
  const hash = randomStr(
    64,
    "123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"
  );
  const currentRolllotery = randomStr(7, "123456789");
  let roll = 0;
  let sh = sha256(hash + "-" + currentRolllotery);
  roll = sh.substr(0, 8);
  roll = parseInt(roll, 16);
  roll = math.abs(roll) % 19;
  let winColor = "";

  //1 = x14
  if (roll == 0) {
    winColor = "green";
  }
  //7 = x2
  if (roll > 0 && roll < 8) {
    winColor = "red";
  }
  //7 = x2
  if (roll > 7 && roll < 15) {
    winColor = "black";
  }
  //4 - 14 - 19
  if (roll > 14 && roll < 18) {
    winColor = "blue";
  }
  //1
  if (roll === 18) {
    winColor = "orange";
  }

  return winColor;
}
