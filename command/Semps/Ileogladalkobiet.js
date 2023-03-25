import countWatchtime from "../../components/Semps/countWatchtime.js";
import cooldownsList from "../../components/cooldownsList.js";

export default async function commandIleogladalkobiet(
  user,
  argumentClean,
  girls,
  cooldown
) {
  if (cooldown.longer > Date.now() - cooldownsList("longer")) {
    return null;
  }
  cooldown.longer = Date.now();

  if (argumentClean && argumentClean.length >= 3) {
    const viewer = await countWatchtime(argumentClean, girls);

    if (viewer === null) {
      return `${user}, nie udało sie pobrać danych watchtime.`;
    }

    if (viewer.time_female === 0) {
      return `FIRE ${argumentClean} nigdy nie oglądał/a żadnej polskiej streamerki GIGACHAD`;
    }

    return `PogO ${argumentClean} oglądał/a streamerki przez ${viewer.time}, co sprawia, że oglądał/a streamerki przez ${viewer.percentage}% swojego czasu na PL Twitch.`;
  }

  const viewer = await countWatchtime(user, girls);

  if (viewer === null) {
    return `${user}, nie udało sie pobrać danych watchtime.`;
  }

  if (viewer.time_female === 0) {
    return `FIRE ${user} nigdy nie oglądał/a żadnej polskiej streamerki GIGACHAD`;
  }

  return `PogO ${user} oglądał/a streamerki przez ${viewer.time}, co sprawia, że oglądał/a streamerki przez ${viewer.percentage}% swojego czasu na PL Twitch.`;
}
