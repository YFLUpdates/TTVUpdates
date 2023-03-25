import sha256 from "sha256";
import * as math from "mathjs";
import randomStr from "../randomStr.js";

export default async function rollingDice() {
  const hash = randomStr(
    64,
    "123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"
  );
  const currentRolllotery = randomStr(7, "123456789");
  let roll = 0;
  let sh = sha256(hash + "-" + currentRolllotery);
  roll = sh.substr(0, 8);
  roll = parseInt(roll, 16);
  roll = math.abs(roll) % 6;

  return roll + 1;
}
