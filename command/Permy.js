import todayPerms from "../apis/yfles/todayPerms.js";
import cooldownsList from "../components/cooldownsList.js";

export default async function commandPermy(
  user,
  argumentClean,
  channelClean,
  cooldown
) {
  if (cooldown.classic > Date.now() - cooldownsList("classic")) {
    return null;
  }
  cooldown.classic = Date.now();
  const channelName = argumentClean ? argumentClean : channelClean;
  const viewer = await todayPerms(channelName);

  if (viewer === null) {
    return `${user}, nie udało sie pobrać danych osób zbanowanych.`;
  }

  const lastDate = viewer.pop();

  if (new Date(lastDate.created_at).getDate() !== new Date().getDate()) {
    return `${user}, nikt nie dostał dzisiaj perma na kanale ${channelName} jasperSad `;
  }

  return `${user}, na kanale ${channelName} zostało dzisiaj rozdane: ${lastDate.bans} permów jasperRADOSC `;
}
