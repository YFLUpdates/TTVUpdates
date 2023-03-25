import cooldownsList from "../components/cooldownsList.js";

export default async function commandAvatar(
  user,
  argumentClean,
  channelClean,
  api,
  cooldown
) {
  if (!["adrian1g__", "3xanax"].includes(channelClean)) {
    return null;
  }
  if (cooldown.longer > Date.now() - cooldownsList("longer")) {
    return null;
  }
  cooldown.longer = Date.now();

  const userName = argumentClean ? argumentClean : user;
  const userData = await api.users.getUserByName(userName).catch((e) => {
    return null;
  });

  if (userData === null) {
    return `${user}, nie udało sie pobrać danych - Twitch API`;
  }

  return `Avatar ${userName} - ${userData.profilePictureUrl} hehe`;
}
