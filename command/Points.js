import userData from "../apis/yfles/userData.js";
import pointsRanking from "../apis/yfles/pointsRanking.js";
import pointsToUser from "../apis/yfles/updates/pointsToUser.js";
import cooldownsList from "../components/cooldownsList.js";

export default async function commandPoints(
  user,
  argumentClean,
  channelClean,
  args,
  cooldown
) {
  if (["mrdzinold", "xmerghani", "banduracartel", "f1skacz", "xkaleson"].includes(channelClean)) {
    return null;
  }
  
  if (cooldown.classic > Date.now() - cooldownsList("classic")) {
    return null;
  }
  cooldown.classic = Date.now();
  const userName = argumentClean ? argumentClean : user;

  if (argumentClean === "ranking") {
    const ranking = await pointsRanking(channelClean);

    if (ranking === null) {
      return `${user}, nie udało sie pobrać danych użytkownika.`;
    }

    const format = ranking
      .slice(0, 3)
      .map((i) => {
        return `${i.user_login}(${i.points})`;
      })
      .join(", ");

    return `Najwięcej punktów mają: ${format} - https://yfl.es/streamer/${channelClean}`;
  }

  if (argumentClean === "send") {
    const receiver = args[1] ? args[1].replaceAll("@", "").toLowerCase() : null;
    const viewer = await userData(user, channelClean);

    if (receiver === null || user === args[1]) {
      return `${user}, zapomniałeś/aś podać osobe TPFufun`;
    }

    if (!args[2] || Number(args[2]) <= 0 || isNaN(args[2])) {
      return `${user}, zapomniałeś/aś o kwocie `;
    }

    if (viewer === null) {
      return `${user}, nie udało sie pobrać danych użytkownika.`;
    }

    const ammount = Number(args[2]);
    const points = viewer.points;

    if (ammount > points) {
      return `${user}, nie masz tylu punktów beka`;
    }

    const req = await pointsToUser(channelClean, {
      points: ammount,
      winner: receiver,
      loser: user,
    });

    if (req === null) {
      return `${user}, ${receiver} jeszcze nie został zarejestrowany, nie jesteś w stanie wysłać mu punktów`;
    }

    return `${user}, wysłałeś ${new Intl.NumberFormat("pl-PL").format(
      ammount
    )} punktów do ${receiver} GIGACHAD`;
  }
  const viewer = await userData(userName, channelClean);

  if (viewer === null) {
    return `${user}, nie udało sie pobrać danych użytkownika.`;
  }

  return `${userName}, posiada ${new Intl.NumberFormat("pl-PL").format(
    viewer.points
  )} punktów ok`;
}
