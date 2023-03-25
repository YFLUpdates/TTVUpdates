import channelStats from "../../apis/streamelements/channelStats.js";
import cooldownsList from "../../components/cooldownsList.js";

export default async function commandMsgs(
  user,
  argumentClean,
  channelClean,
  cooldown
) {
  if (cooldown.classic > Date.now() - cooldownsList("longer")) {
    return null;
  }
  cooldown.classic = Date.now();
  const userName = argumentClean ? argumentClean : user;
  const viewer = await channelStats(channelClean);

  if (viewer === null) {
    return `${userName}, nie udało sie pobrać statystyk - StreamElements.`;
  }

  const indexOfObject = viewer.chatters.findIndex((object) => {
    return object.name === userName;
  });

  if (indexOfObject === -1) {
    return `${userName} nie znajduje się w TOP 100 jasperSad`;
  }

  return `${userName}, napisał/a ${
    viewer.chatters[indexOfObject].amount
  } wiadomości, zajmuje ${indexOfObject + 1} miejsce jasperSmile`;
}
