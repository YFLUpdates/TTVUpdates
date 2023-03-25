import channelStats from "../../apis/streamelements/channelStats.js";
import cooldownsList from "../../components/cooldownsList.js";

export default async function commandTopmsgs(
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
  const ignore = [
    "yflupdates",
    "ttvupdates",
    "streamelements",
    "okayegbot",
    "lewusbot",
    "fossabot",
  ];

  if (viewer === null) {
    return `${userName}, nie udało sie pobrać statystyk - StreamElements.`;
  }
  let num = 0;
  let chatters = [];

  await Promise.all(
    viewer.chatters.map((i) => {
      if (num === 5 || ignore.includes(i.name)) return;

      num += 1;

      chatters.push(i.name);
    })
  );

  if (num > 0) {
    return `BRUHBRUH Najwięcej wiadomości u ${channelClean} mają: ${chatters.join(
      ", "
    )}`;
  }

  return `Ranking ${channelClean} jest pusty aha`;
}
