import cooldownsList from "../../components/cooldownsList.js";

export default async function commandSettings(user, cooldown) {
  if (cooldown.classic > Date.now() - cooldownsList("classic")) {
    return null;
  }
  cooldown.classic = Date.now();
  return `${user}, kamerka z pokoju gieta: https://cam2.1giet.cf/ `;
}
