import humanizeDuration from "humanize-duration";
import userData from "../../apis/yfles/userData.js";
import cooldownsList from "../../components/cooldownsList.js";

export default async function commandWatchtime(
  user,
  argumentClean,
  channelClean,
  cooldown
) {
  if (["mrdzinold", "xmerghani", "mork", "neexcsgo", "banduracartel"].includes(channelClean)) {
    return null;
  }
  if (cooldown.classic > Date.now() - cooldownsList("classic")) {
    return null;
  }
  cooldown.classic = Date.now();
  const userName = argumentClean ? argumentClean : user;
  const viewer = await userData(userName, channelClean);

  if (viewer === null) {
    return `${user}, nie udało sie pobrać danych offlinetime.`;
  }
  
  const time = humanizeDuration(viewer.offlinetime * 10 * 60000, {
    language: "pl",
  });

  return `MrDestructoid ${userName} spędził/a ${time} na off-streamie.`;
}
