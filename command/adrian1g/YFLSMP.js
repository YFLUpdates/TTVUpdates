import cooldownsList from "../../components/cooldownsList.js";

export default async function commandSMP(user, channelClean, smp, cooldown) {
  if (!["adrian1g__", "3xanax"].includes(channelClean)) {
    return null;
  }

  if (cooldown.classic > Date.now() - cooldownsList("classic")) {
    return null;
  }
  cooldown.classic = Date.now();

  return `${user}, aktualnie ${smp.streams.length} osób ma streama z serwera cokurwa `;
}
