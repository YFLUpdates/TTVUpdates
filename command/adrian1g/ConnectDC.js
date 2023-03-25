import registerDiscord from "../../apis/yfles/registerDiscord.js";
import cooldownsList from "../../components/cooldownsList.js";

export default async function commandConnectDC(
  user,
  argumentClean,
  channelClean,
  cooldown
) {
  if (cooldown.classic > Date.now() - cooldownsList("classic")) {
    return null;
  }
  cooldown.classic = Date.now();

  if (!argumentClean || Number(argumentClean) <= 0 || isNaN(argumentClean)) {
    return `${user}, zapomniałeś/aś podać discord ID TPFufun`;
  }
  const request = await registerDiscord(user, channelClean, argumentClean);

  if (request === null) {
    return `${user}, nie udało się przypisać konta.`;
  }

  return `${user}, konto ${argumentClean} zostało przypisane jako twoje.`;
}
