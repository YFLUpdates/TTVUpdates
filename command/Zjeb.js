import blacklistRegister from "../apis/yfles/blacklistRegister.js";
import blacklistUnRegister from "../apis/yfles/blacklistUnRegister.js";
import isBlacklisted from "../apis/yfles/isBlacklisted.js";
import cooldownsList from "../components/cooldownsList.js";

export default async function commandZjeb(
  user,
  argumentClean,
  isModUp,
  args,
  cooldown
) {
  const userName = argumentClean ? argumentClean : user;

  if (argumentClean === "mark" && (isModUp || user === "3xanax")) {
    const receiver = args[1] ? args[1].replaceAll("@", "").toLowerCase() : null;

    if (receiver === null || user === args[1]) {
      return `${user}, zapomniałeś/aś podać osobe TPFufun`;
    }

    const request = blacklistRegister(receiver, {
      mark: true,
      registrator: user,
    });

    if (request === null) {
      return client.say(
        channel,
        `${tags.username}, nie udało się zarejestrować zjeba jasperSad `
      );
    }

    return `${user}, zarejestrowałeś/aś ${receiver}, jako zjeba aok`;
  }

  if (argumentClean === "unmark" && (isModUp || user === "3xanax")) {
    const receiver = args[1] ? args[1].replaceAll("@", "").toLowerCase() : null;

    if (receiver === null || user === args[1]) {
      return `${user}, zapomniałeś/aś podać osobe TPFufun`;
    }

    const request = blacklistUnRegister(receiver);

    if (request === null) {
      return client.say(
        channel,
        `${tags.username}, nie udało się wyrejestrować zjeba jasperSad `
      );
    }

    return `${user}, wyrejestrowałeś/aś ${receiver} aok`;
  }

  if (cooldown.classic > Date.now() - cooldownsList("classic")) {
    return null;
  }
  cooldown.classic = Date.now();

  const viewer = await isBlacklisted(userName);

  if (viewer === null) {
    return `${userName}, nie jest zjebem jasperSerduszko`;
  }

  return `${userName}, został/a zarejestrowany/a jako zjeb dnia ${new Date(
    viewer.when_added
  ).toLocaleDateString("en-CA")} powód: ${viewer.associated}`;
}
