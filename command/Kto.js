import cooldownsList from "../components/cooldownsList.js";

export default async function commandKto(
  user,
  argumentClean,
  channelClean,
  api,
  famous,
  cooldown
) {
  if (cooldown.longer > Date.now() - cooldownsList("longer")) {
    return null;
  }
  cooldown.longer = Date.now();
  if (
    argumentClean &&
    (argumentClean === "pytał" || argumentClean === "pytal")
  ) {
    return `Ty pytałeś dzbanie ${user}`;
  }

  const getChannelID = await api.users
    .getUserByName(channelClean)
    .catch((e) => {
      return null;
    });
  const chatters = await api.chat
    .getChattersPaginated(getChannelID, "815978731").getAll()
    .catch((e) => {
      return null;
    });
  let usersToReturn = [];

  if (chatters === null) {
    return `${user}, nie posiadam moderatora, nie jestem w stanie pobrać osób na czacie.`;
  }

  await Promise.all(
    chatters.map((i) => {
      if (famous.includes(i.userDisplayName)) {
        if (i.userDisplayName === channelClean) return;

        usersToReturn.push(i.userDisplayName);
      }
    })
  );

  if (usersToReturn.length === 0) {
    return `Nikt z listy nie oglada streama ${channelClean} jasperSad`;
  }

  if (usersToReturn.length < 480) {
    return `${usersToReturn.join(", ")} oglada stream ${channelClean} ok`;
  }

  return `${channelClean} ogląda tyle osób, że nie da się ich wypisać na czacie. Sadge`;
}
