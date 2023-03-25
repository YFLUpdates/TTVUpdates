import userData from "../../apis/yfles/userData.js";
import rollingDice from "../../components/Dice/rollingDice.js";
import multiplyList from "../../components/Dice/multiplyList.js";
import pointsToVoid from "../../apis/yfles/updates/pointsToVoid.js";
import cooldownsList from "../../components/cooldownsList.js";

export default async function commandDice(user, argumentClean, channelClean, cooldown) {

  if (["mrdzinold", "xmerghani", "mork", "neexcsgo", "banduracartel"].includes(channelClean)) {
    return null;
  }

  if (cooldown.longer > Date.now() - cooldownsList("longer")) {
    return null;
  }
  cooldown.longer = Date.now();

  if (!argumentClean) {
    return `${user}, zapomniałeś/aś o kwocie `;
  }

  const betPoints = Number(argumentClean);

  if (betPoints > 5000 || betPoints <= 0 || isNaN(argumentClean)) {
    return `${user}, maksymalnie można obstawić 5000 punktów `;
  }

  const userInfo = await userData(user, channelClean);

  if (betPoints > userInfo.points) {
    return `${user} nie masz tylu punktów aha `;
  }

  const diceNumber1 = await rollingDice();
  const diceNumber2 = await rollingDice();
  const diceNumber3 = await rollingDice();
  const multiplyNumber = multiplyList(diceNumber1, diceNumber2, diceNumber3);

  if (multiplyNumber === null) {
    const updatePoints = await pointsToVoid(
      channelClean,
      `-${betPoints}`,
      user
    );

    if (updatePoints === null) {
      return `${user}, nie udało sie zaktualizować punktów użytkownika. `;
    }

    return `${user}, przegrałeś/aś wszystko jasperSmiech - 🎲${diceNumber1} 🎲${diceNumber2} 🎲${diceNumber3}`;
  }

  const winPrize = betPoints * multiplyNumber;
  const updatePoints = await pointsToVoid(
    channelClean,
    `+${winPrize - betPoints}`,
    user
  );

  if (updatePoints === null) {
    return `${user}, nie udało sie zaktualizować punktów użytkownika. `;
  }

  if (multiplyNumber === 66) {
    return `${user}, szatańska wygrana ${new Intl.NumberFormat("pl-PL").format(
      winPrize
    )} okurwa FIRE x66 - 🎲${diceNumber1} 🎲${diceNumber2} 🎲${diceNumber3} `;
  }

  if (multiplyNumber === 33) {
    return `${user}, szczęśliwa trójka ${new Intl.NumberFormat("pl-PL").format(
      winPrize
    )} jasperAktywacja 🍀 🍀 x33 - 🎲${diceNumber1} 🎲${diceNumber2} 🎲${diceNumber3} `;
  }

  return `${user}, wygrałeś/aś ${new Intl.NumberFormat("pl-PL").format(
    winPrize
  )} punktów okurwa - 🎲${diceNumber1} 🎲${diceNumber2} 🎲${diceNumber3}`;
}
