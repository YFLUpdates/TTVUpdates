import cooldownsList from "../../components/cooldownsList.js";
import randomNumber from "../../components/randomNumber.js";

export default async function commandMarry(
  user,
  argumentClean,
  cooldown
) {

  if (cooldown.classic > Date.now() - cooldownsList("classic")) {
    return null;
  }
  cooldown.classic = Date.now();

  if(argumentClean){
    return `${user} jest zakochany(a) na ${randomNumber(0, 100)}% w ${argumentClean} <3`;
  }

  return `${user} jest zakochany(a) na ${randomNumber(0, 100)}% w sobie aha`;
}
