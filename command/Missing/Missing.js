import missing from "../../apis/yfles/missing.js";
import cooldownsList from "../../components/cooldownsList.js";

export default async function commandMissingall(
  user,
  argumentClean,
  channelClean,
  cooldown
) {
  if (
    ["mrdzinold", "xmerghani", "mork", "banduracartel"].includes(channelClean)
  ) {
    return null;
  }
  if (cooldown.classic > Date.now() - cooldownsList("longer")) {
    return null;
  }
  cooldown.classic = Date.now();
  const userName = argumentClean ? argumentClean : user;
  const viewer = await missing(userName, channelClean);

  if (viewer === null) {
    return `${userName}, nie był(a) jeszcze widziany(a) u ${channelClean} aha`;
  }

  return `${userName}, ostatnio był(a) widziany(a) (${new Date(
    viewer.date
  ).toLocaleString("pl")}) oho`;
}
