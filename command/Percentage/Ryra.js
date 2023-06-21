import cooldownsList from "../../components/cooldownsList.js";
import randomNumber from "../../components/randomNumber.js";

export default async function commandRyra(user, channelClean, cooldown) {
  if (channelClean !== "xkaleson") {
    return null;
  }

  if (cooldown.classic > Date.now() - cooldownsList("classic")) {
    return null;
  }
  cooldown.classic = Date.now();

  const inRange = (num, min, max) => num >= min && num <= max;
  const percentage = randomNumber(1, 100);

  if (inRange(percentage, 1, 25)) {
    return `pulok ${user} na ${percentage}% ale gigant beka`;
  }

  if (inRange(percentage, 26, 50)) {
    return `BOOBA pulok ${user} na ${percentage}% ale gigant beka`;
  }

  if (inRange(percentage, 51, 75)) {
    return `ryra ${user} na ${percentage}% ale gigant beka`;
  }

  if (inRange(percentage, 76, 100)) {
    return `ryra CUM ${user} na ${percentage}% ale gigant beka`;
  }

  return null;
}
