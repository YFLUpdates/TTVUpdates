import determineViewer from "../../components/checkChannels/determineViewer.js";
import blacklistRegister from "../../apis/yfles/blacklistRegister.js";
import cooldownsList from "../../components/cooldownsList.js";

function responses(ratio, user) {
  if (ratio.watchtime < 0.3) {
    return "jest czysty(a) okok";
  } else if (ratio.watchtime < 0.5) {
    blacklistRegister(user, {
      mark: null,
      reason: "!ewron",
      top1: ratio.top1,
      registrator: "SYSTEM",
    });
    return "jest widzem ewrona jasperSTARE";
  } else if (ratio.watchtime > 0.5) {
    blacklistRegister(user, {
      mark: null,
      reason: "!ewron",
      top1: ratio.top1,
      registrator: "SYSTEM",
    });
    return "jest ultra zaklinowany(a) papa";
  } else {
    return "jest czysty(a) okok";
  }
}

export default async function commandEwron(user, argumentClean, cooldown) {
  if (cooldown.longer > Date.now() - cooldownsList("longer")) {
    return null;
  }
  cooldown.longer = Date.now();

  const channel_list = [
    "ewroon",
    "exhiie",
    "xn0rth",
    "xth0rek",
    "angela35",
    "diables",
    "edenitoo",
  ];

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
