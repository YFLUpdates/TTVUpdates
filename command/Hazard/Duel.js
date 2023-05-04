import pointsToUser from "../../apis/yfles/updates/pointsToUser.js";
import userData from "../../apis/yfles/userData.js";
import rollingNumber from "../../components/Duel/rollingNumber.js";
import Truncate from "../../components/Truncate.js";
import cooldownsList from "../../components/cooldownsList.js";

export default async function commandDuel(
  user,
  argumentClean,
  channelClean,
  args,
  session_settings,
  cooldown,
  modules
) {
  if (
    ["mrdzinold", "xmerghani", "mork", "neexcsgo", "banduracartel"].includes(
      channelClean
    )
  ) {
    return null;
  }
  const duelsList = session_settings[`${channelClean}`].duels_list;

  if (["accept", "akceptuje"].includes(argumentClean)) {
    const duelCreator = args[1]
      ? args[1].replaceAll("@", "").toLowerCase()
      : null;

    if (!args[1] || duelCreator === null || user === args[1]) {
      return `${user}, zapomniałeś podać osobe TPFufun `;
    }
    const indexOfObject = duelsList.findIndex((object) => {
      return object.id === `${duelCreator}-${user}`;
    });

    if (indexOfObject === -1) {
      return `${user}, taki pojedynek nie istnieje mhm `;
    }
    const duelInfo = session_settings[channelClean].duels_list[indexOfObject];
    const userInfo = userData(user, channelClean);
    const duelCreatorData = userData(duelCreator, channelClean);

    if (duelInfo.expires < new Date()) {
      duelsList.splice(indexOfObject, 1);

      return `${user}, pojedynek wygasł :( `;
    }

    if (duelInfo.points > userInfo.points) {
      duelsList.splice(indexOfObject, 1);

      return `${duelCreator}, nie posiadasz tylu punktów mhm`;
    }

    if (duelInfo.points > duelCreatorData.points) {
      duelsList.splice(indexOfObject, 1);

      return `${duelCreator}, nie posiada już punktów mhm`;
    }

    duelsList.splice(indexOfObject, 1);
    const rolledNumber = await rollingNumber();

    if (rolledNumber === 1) {
      const request = pointsToUser(channelClean, {
        points: duelInfo.points,
        winner: duelInfo.user,
        loser: duelInfo.invited,
      });

      if (request === null) {
        return `${user}, nie udało sie zaktualizować punktów użytkownika. `;
      }

      return `${duelInfo.user}, wygrałeś/aś pojedynek z ${
        duelInfo.invited
      }, zakład wynosił ${duelInfo.points * 2} punktów jasperczekoladka`;
    }

    const request = pointsToUser(channelClean, {
      points: duelInfo.points,
      winner: duelInfo.invited,
      loser: duelInfo.user,
    });

    if (request === null) {
      return `${user}, nie udało sie zaktualizować punktów użytkownika. `;
    }

    return `${duelInfo.invited}, wygrałeś/aś pojedynek z ${
      duelInfo.user
    }, zakład wynosił ${duelInfo.points * 2} punktów jasperczekoladka`;
  }

  if (["list", "lista"].includes(argumentClean)) {
    if (cooldown.classic > Date.now() - cooldownsList("classic")) {
      return null;
    }
    cooldown.classic = Date.now();

    const makeShort = Truncate(duelsList.map((i) => i.id).join(", "), 200);

    return `Aktualne pojedynki: ${makeShort.length === 0 ? "Brak" : makeShort}`;
  }

  if (cooldown.longer > Date.now() - cooldownsList("longer")) {
    return null;
  }
  cooldown.longer = Date.now();

  if (modules.modules["duels"] === false)
    return `${user}, pojedynki zostały wyłączone. `;

  if (!argumentClean || argumentClean === user) {
    return `${user}, zapomniałeś podać osobe TPFufun `;
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

  const indexOfObject = duelsList.findIndex((object) => {
    return object.id === `${user}-${argumentClean}`;
  });

  if (indexOfObject !== -1) {
    return `${user} taki pojedynek już istnieje TOPILNE `;
  }

  duelsList.push({
    id: `${user}-${argumentClean}`,
    user: user,
    invited: argumentClean,
    points: betPoints,
    expires: new Date(+new Date() + 60000 * 2),
  });

  return `${argumentClean}, jeśli akceptujesz pojedynek na kwotę ${betPoints} punktów, wpisz !duel accept ${user}`;
}
