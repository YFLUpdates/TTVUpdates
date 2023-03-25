import cooldownsList from "../../components/cooldownsList.js";

export default async function commandKamerki(
  user,
  channelClean,
  api,
  cooldown
) {
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
  const shuffled = [...chatters.data].sort(() => 0.5 - Math.random());
  const rolled = shuffled.slice(0, 2);

  return `${rolled[0].userDisplayName} i ${rolled[1].userDisplayName} bawią się na kamerkach jasperBoobsy`;
}
