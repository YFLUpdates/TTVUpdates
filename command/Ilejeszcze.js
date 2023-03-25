import humanizeDuration from "humanize-duration";
import timeoutCheck from "../apis/yfles/timeoutCheck.js";
import cooldownsList from "../components/cooldownsList.js";

export default async function commandIlejeszcze(
  user,
  argumentClean,
  channelClean,
  cooldown
) {
  if (cooldown.longer > Date.now() - cooldownsList("longer")) {
    return null;
  }
  cooldown.longer = Date.now();
  const userName = argumentClean ? argumentClean : user;
  const viewer = await timeoutCheck(userName, channelClean);

  if (viewer === null) {
    return `${userName}, nie ma wykluczenia okok`;
  }

  const banDate = new Date(viewer.created_at);
  const kiedySieKonczy = new Date(+banDate + 1000 * viewer.duration);
  const todaysDate = new Date();

  const diff = Math.abs(new Date() - kiedySieKonczy);
  const minutes = Math.floor(diff / 1000 / 60);
  const endsIn = humanizeDuration(minutes * 60000, { language: "pl" });

  if (kiedySieKonczy <= todaysDate) {
    return `${userName}, nie ma już wykluczenia ok`;
  }

  return `${userName} jest wykluczony/a jeszcze na ${endsIn} jasperSad`;
}
