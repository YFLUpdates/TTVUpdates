import cooldownsList from "../../components/cooldownsList.js";

export default async function commandOpluj(
  user,
  argumentClean,
  channelClean,
  api,
  cooldown
) {
  if (
    ["adrian1g__", "xmerghani", "xkaleson", "banduracartel", "ciiorny"].includes(
      channelClean
    )
  ) {
    return null;
  }
  if (cooldown.classic > Date.now() - cooldownsList("classic")) {
    return null;
  }
  cooldown.classic = Date.now();

  if (argumentClean && argumentClean.length >= 3) {
    return `${user} pluje na ${argumentClean} Spit`;
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

  if (chatters === null) {
    return `${user}, nie posiadam moderatora, nie jestem w stanie pobrać osób na czacie.`;
  }

  const random =
    chatters[Math.floor(Math.random() * chatters.length)];

  return `${user} pluje na ${random.userDisplayName} Spit`;
}
