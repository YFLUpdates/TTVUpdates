import cooldownsList from "../../components/cooldownsList.js";

export default async function commandKogut(
  user,
  argumentClean,
  channelClean,
  api,
  cooldown
) {
  if (["neexcsgo"].includes(channelClean)) {
    return null;
  }
  if (cooldown.classic > Date.now() - cooldownsList("classic")) {
    return null;
  }
  cooldown.classic = Date.now();

  const getChannelID = await api.users
    .getUserByName(channelClean)
    .catch((e) => {
      return null;
    });
  const chatters = await api.chat
    .getChatters(getChannelID, "815978731", { limit: 1000 })
    .catch((e) => {
      return null;
    });

  if (chatters === null) {
    return `${user}, nie posiadam moderatora, nie jestem w stanie pobrać osób na czacie.`;
  }

  if (argumentClean && argumentClean.length >= 3) {
    return `${user} opierdolił(a) koguta ${argumentClean} jasperGaleczka`;
  }

  const random =
    chatters.data[Math.floor(Math.random() * chatters.data.length)];

  return `${user} opierdolił(a) koguta ${random.userDisplayName} jasperGaleczka`;
}
