import xayoplMissing from "../../apis/watchtime/missing/Xayo.js";
import cooldownsList from "../../components/cooldownsList.js";

export default async function commandMissingall(user, argumentClean, cooldown) {
  if (cooldown.classic > Date.now() - cooldownsList("longer")) {
    return null;
  }
  cooldown.classic = Date.now();
  const userName = argumentClean ? argumentClean : user;
  const viewer = await xayoplMissing(userName);

  if (viewer === null || viewer === false) {
    return `${userName}, nie był(a) nigdzie widziany(a) aha`;
  }

  return `${userName}, ostatnio był(a) widzany(a) u ${
    viewer.streamer.login
  } (${new Date(viewer.timestamp).toLocaleString("pl")}) oho`;
}
