import cooldownsList from "../../components/cooldownsList.js";
import getUser from "../../apis/faceit/getUser.js";
import faceitSwitch from "../../components/Faceit/Switch.js";

export default async function commandfaceitLVL(
  user,
  channelClean,
  argumentClean,
  cooldown
) {
  if (!["adrian1g__", "wodoglowie_", "3xanax"].includes(channelClean)) {
    return null;
  }

  if (cooldown.classic > Date.now() - cooldownsList("classic")) {
    return null;
  }
  cooldown.classic = Date.now();

  const userName = argumentClean ? argumentClean : faceitSwitch(channelClean);
  const request = await getUser(userName);

  if (request === null) {
    return `${user}, nie udało sie pobrać statystyk - FACEIT.`;
  }

  return `${user}, LVL: ${request.lvl} || ELO: ${request.elo} || WR: ${request.stats.lifetime["Win Rate %"]}% || K/D Ratio: ${request.stats.lifetime["Average K/D Ratio"]} || Bilans: ${request.todayEloDiff} ||  Mecze: ${request.latestMatchesTrend.score.wins}W / ${request.latestMatchesTrend.score.loses}L beka`
}
