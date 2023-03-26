import humanizeDuration from "humanize-duration";
import cooldownsList from "../../components/cooldownsList.js";
import randomNumber from "../../components/randomNumber.js";

export default async function commandMarry(
  user,
  argumentClean,
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

  if(argumentClean){
    return `${user} weźmie ślub z ${argumentClean} za ${humanizeDuration(randomNumber(1440, 1051200) * 60000, { language: "pl" })} jupijej`
  }
  const random = chatters.data[Math.floor(Math.random() * chatters.data.length)];
  return `${user} weźmie ślub z ${random.userDisplayName} za ${humanizeDuration(randomNumber(1440, 1051200) * 60000, { language: "pl" })} jupijej `
}
