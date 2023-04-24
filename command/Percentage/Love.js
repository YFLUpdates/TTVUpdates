import cooldownsList from "../../components/cooldownsList.js";
import randomNumber from "../../components/randomNumber.js";

export default async function commandLove(
  user,
  argumentClean,
  channelClean,
  cooldown
) {
  if(["grubamruwa", "xmerghani", "f1skacz"].includes(channelClean)) return null;
  if (cooldown.classic > Date.now() - cooldownsList("classic")) {
    return null;
  }
  cooldown.classic = Date.now();

  if(argumentClean){
    return `${user} jest zakochany(a) na ${randomNumber(0, 100)}% w ${argumentClean} <3`;
  }

  return `${user} jest zakochany(a) na ${randomNumber(0, 100)}% w sobie aha`;
}
