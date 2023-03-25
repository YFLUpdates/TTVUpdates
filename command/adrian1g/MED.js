import cooldownsList from "../../components/cooldownsList.js";

export default async function commandMed(user, isModUp, args, cooldown) {
  if (cooldown.classic > Date.now() - cooldownsList("classic")) {
    return null;
  }
  cooldown.classic = Date.now();
  if (isModUp || user === "3xanax") {
    if (!args[0]) {
      return `${user}, zapomniałeś/aś o treści.`;
    }

    return `MED: ${args.join(" ")}`;
  }

  return null;
}
