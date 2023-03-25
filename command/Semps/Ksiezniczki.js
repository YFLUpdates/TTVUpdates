import determineViewer from "../../components/Semps/determineViewer.js";
import cooldownsList from "../../components/cooldownsList.js";

export default async function commandKsiezniczki(
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
    const viewer = await determineViewer(argumentClean, girls);

    if (viewer === null) {
      return `${user}, nie udało sie pobrać danych watchtime.`;
    }

    if (viewer.num > 0) {
      return `PogO Ulubione streamerki ${user}: ${viewer.fav_streamer.join(
        ", "
      )}`;
    }

    return `FIRE ${argumentClean} nigdy nie oglądał/a żadnej polskiej streamerki GIGACHAD`;
  }

  const viewer = await determineViewer(user, girls);

  if (viewer === null) {
    return `${user}, nie udało sie pobrać danych watchtime.`;
  }

  if (viewer.num > 0) {
    return `PogO Ulubione streamerki ${user}: ${viewer.fav_streamer.join(
      ", "
    )}`;
  }

  return `FIRE ${user} nigdy nie oglądał/a żadnej polskiej streamerki GIGACHAD`;
}
