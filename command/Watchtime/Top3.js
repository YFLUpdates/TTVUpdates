import Xayopl from "../../apis/watchtime/Xayo.js";
import cooldownsList from "../../components/cooldownsList.js";

export default async function commandWatchtime(user, argumentClean, cooldown) {
  if (cooldown.longer > Date.now() - cooldownsList("longer")) {
    return null;
  }
  cooldown.longer = Date.now();

  const userName = argumentClean ? argumentClean : user;
  const viewer = await Xayopl(userName);
  let num = 0;
  let fav_streamer = [];

  if (viewer === null) {
    return `${user}, nie udało sie pobrać danych watchtime.`;
  }

  await Promise.all(
    viewer.map((i) => {
      if (num === 3) return;

      num += 1;

      fav_streamer.push(i.streamer);
    })
  );
  if (num > 0) {
    return `BRUHBRUH Ulubieni streamerzy ${userName}: ${fav_streamer.join(
      ", "
    )}`;
  }

  return `${userName} nigdy nie oglądał/a żadnego kanału twitch aha`;
}
