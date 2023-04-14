import cooldownsList from "../../components/cooldownsList.js";
import getUser from "../../apis/faceit/getUser.js";

export default async function commandfaceitLVL(
  user,
  channelClean,
  cooldown
) {
  if (!["adrian1g__", "wodoglowie_"].includes(channelClean)) {
    return null;
  }

  if (cooldown.classic > Date.now() - cooldownsList("classic")) {
    return null;
  }
  cooldown.classic = Date.now();

  const request = await getUser(channelClean === "adrian1g__" ? "1gLOTTA" : "ForeverPL");

  if (request === null) {
    return `${user}, nie udało sie pobrać statystyk - FACEIT.`;
  }

  return `${user}, LEVEL: ${request.lvl} || ELO: ${request.elo} || Win Rate: ${request.stats.lifetime["Win Rate %"]}% || K/D Ratio: ${request.stats.lifetime["Average K/D Ratio"]} beka`
}
