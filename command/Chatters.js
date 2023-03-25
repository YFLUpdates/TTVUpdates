import cooldownsList from "../components/cooldownsList.js";

export default async function commandChatters(
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

  if (getChannelID === null) {
    return `${user}, nie udało sie pobrać danych - Twitch API`;
  }

  const chatters = await api.chat
    .getChatters(getChannelID, "815978731", { limit: 1000 })
    .catch((e) => {
      return null;
    });

  if (chatters === null) {
    return `${user}, nie posiadam moderatora, nie jestem w stanie pobrać osób na czacie.`;
  }

  return `Current Chatters: ${chatters.data.length}`;
}
