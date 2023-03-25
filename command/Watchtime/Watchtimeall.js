import countWatchtime from "../../components/Watchtime/countWatchtime.js";
import cooldownsList from "../../components/cooldownsList.js";

export default async function commandWatchtimeall(user, argumentClean, cooldown) {
  if (cooldown.longer > Date.now() - cooldownsList("longer")) {
    return null;
  }
  cooldown.longer = Date.now();
  if (argumentClean && argumentClean.length >= 3) {
    const viewer = await countWatchtime(argumentClean);

    if (viewer === null) {
      return `${user}, nie udało sie pobrać danych watchtime.`;
    }

    return `PogO ${argumentClean} spedził/a ${viewer.time}, na PL twitch od 26 lipca, co daje ${viewer.percentage}% jego/j życia.`;
  }

  const viewer = await countWatchtime(user);

  if (viewer === null) {
    return `${user}, nie udało sie pobrać danych watchtime.`;
  }

  return `PogO ${user} spedził/a ${viewer.time}, na PL twitch od 26 lipca, co daje ${viewer.percentage}% jego/j życia.`;
}
