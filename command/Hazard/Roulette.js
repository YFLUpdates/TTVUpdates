import pointsToVoid from "../../apis/yfles/updates/pointsToVoid.js";
import userData from "../../apis/yfles/userData.js";
import rollingColor from "../../components/Roulette/rollingColor.js";
import emojisList from "../../components/Roulette/emojisList.js";
import multiplyList from "../../components/Roulette/multiplyList.js";
import cooldownsList from "../../components/cooldownsList.js";

export default async function commandRoulette(
  user,
  argumentClean,
  channelClean,
  args,
  cooldown,
  modules
) {
  if (
    ["mrdzinold", "xmerghani", "mork", "neexcsgo", "banduracartel", "xkaleson"].includes(
      channelClean
    )
  ) {
    return null;
  }

  if (cooldown.longer > Date.now() - cooldownsList("longer")) {
    return null;
  }
  cooldown.longer = Date.now();

  if (modules.modules["roulette"] === false) {
    if (channelClean === "xkaleson") {
      return null;
    }

    return `${user}, ruletka została wyłączona. `;
  }

  if (
    !argumentClean ||
    !["red", "black", "green", "blue", "orange"].includes(argumentClean)
  ) {
    return `${user}, zapomniałeś/aś o kolorze 🟥red - (x2), ⬛black - (x2), 🟦blue - (x3), 🟧orange - (x5), 🟩green - (x14) `;
  }

  if (!args[1]) {
    return `${user}, zapomniałeś/aś o kwocie `;
  }

  const betPoints = Number(args[1]);

  if (betPoints > 5000 || betPoints <= 0 || isNaN(args[1])) {
    return `${user}, maksymalnie można obstawić 5000 punktów `;
  }

  const userInfo = await userData(user, channelClean);

  if (betPoints > userInfo.points) {
    return `${user} nie masz tylu punktów aha `;
  }

  const winnerColor = await rollingColor();

  if (winnerColor !== argumentClean) {
    const updatePoints = await pointsToVoid(
      channelClean,
      `-${betPoints}`,
      user
    );

    if (updatePoints === null) {
      return `${user}, nie udało sie zaktualizować punktów użytkownika. `;
    }

    return `${user} przegrałeś/aś wszystko beka - ${emojisList(winnerColor)}`;
  }

  const winPrize = betPoints * multiplyList(winnerColor);
  const updatePoints = await pointsToVoid(
    channelClean,
    `+${winPrize - betPoints}`,
    user
  );

  if (updatePoints === null) {
    return `${user}, nie udało sie zaktualizować punktów użytkownika. `;
  }

  return `${user}, wygrałeś/aś ${winPrize} punktów okurwa FIRE - ${emojisList(
    winnerColor
  )}`;
}
