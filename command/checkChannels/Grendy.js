import determineViewer from "../../components/checkChannels/determineViewer.js";
import blacklistRegister from "../../apis/yfles/blacklistRegister.js";
import cooldownsList from "../../components/cooldownsList.js";

function responses(ratio, user) {
  if (ratio.watchtime < 0.3) {
    return "nie jest widzem ekipy grendiego ";
  } else if (ratio.watchtime < 0.5) {
    blacklistRegister(user, {
      mark: null,
      reason: "!grendy",
      top1: ratio.top1,
      registrator: "SYSTEM",
    });
    return "jest widzem ekipy grendiego jasperSTARE";
  } else if (ratio.watchtime > 0.5) {
    blacklistRegister(user, {
      mark: null,
      reason: "!grendy",
      top1: ratio.top1,
      registrator: "SYSTEM",
    });
    return "jest giga koneserem ekipy grendiego jasperSTARE FIRE";
  } else {
    return "nie jest widzem ekipy grendiego ";
  }
}

export default async function commandGrendy(user, argumentClean, cooldown) {
  if (cooldown.longer > Date.now() - cooldownsList("longer")) {
    return null;
  }
  cooldown.longer = Date.now();
  const channel_list = ["grendy", "xghoost__", "nietoperzbyku", "sprytnyx"];

  if (argumentClean && argumentClean.length >= 3) {
    const viewer = await determineViewer(argumentClean, channel_list);

    if (viewer === null) {
      return `${user}, nie udało sie pobrać danych watchtime.`;
    }

    return `${argumentClean} ${responses(viewer, argumentClean)}`;
  }

  const viewer = await determineViewer(user, channel_list);

  if (viewer === null) {
    return `${user}, nie udało sie pobrać danych watchtime.`;
  }

  return `${user}, ${responses(viewer, user)}`;
}
