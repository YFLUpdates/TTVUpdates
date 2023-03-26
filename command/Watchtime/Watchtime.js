import humanizeDuration from "humanize-duration";
import Xayopl from "../../apis/watchtime/Xayo.js";
import cooldownsList from "../../components/cooldownsList.js";

export default async function commandWatchtime(
  user,
  argumentClean,
  channelClean,
  args,
  cooldown
) {

  if(["xspeedyq", "grubamruwa", "dobrycsgo", "mrdzinold", "xmerghani", "xkaleson", "neexcsgo", "banduracartel", "shavskyyy"].includes(channelClean)) return null;

  if (cooldown.longer > Date.now() - cooldownsList("longer")) {
    return null;
  }
  cooldown.longer = Date.now();
  const userName = argumentClean ? argumentClean : user;
  const channelName = args && args[1] ? args[1] : channelClean;
  const viewer = await Xayopl(userName);

  if (viewer === null) {
    return `${user}, nie udało sie pobrać danych watchtime.`;
  }

  const indexOfObject = viewer.findIndex((object) => {
    return object.streamer === channelName;
  });

  if (indexOfObject === -1) {
    return `MrDestructoid ${userName} nie oglądał(a) w ogóle kanału ${channelName}.`;
  }
  
  const time = humanizeDuration(viewer[indexOfObject].count * 5 * 60000, {
    language: "pl",
  });

  return `MrDestructoid ${userName} ogladał(a) kanał ${channelName} przez ${time}.`;
}
