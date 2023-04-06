import determineViewer from "../../components/checkChannels/determineViewer.js";
import blacklistRegister from "../../apis/yfles/blacklistRegister.js";
import cooldownsList from "../../components/cooldownsList.js";

function responses(ratio, user) {
  if (ratio.watchtime < 0.3) {
    return "nie jest z respa jasperKiss";
  } else if (ratio.watchtime < 0.5) {
    blacklistRegister(user, {
      mark: null,
      reason: "!ewron",
      top1: ratio.top1,
      registrator: "SYSTEM",
    });
    return "jest z respa jasperSad";
  } else if (ratio.watchtime > 0.5) {
    blacklistRegister(user, {
      mark: null,
      reason: "!ewron",
      top1: ratio.top1,
      registrator: "SYSTEM",
    });
    return "jest w chuj z respa Spit";
  } else {
    return "nie jest z respa jasperKiss";
  }
}

export default async function commandResp(user, argumentClean, cooldown) {
  if (cooldown.longer > Date.now() - cooldownsList("longer")) {
    return null;
  }
  cooldown.longer = Date.now();
  const channel_list = [
    "grendy",
    "nieuczesana",
    "ewroon", 
    "exhiie", 
    "xn0rth", 
    "xth0rek", 
    "angela35", 
    "diables",
    "czesio_invi",
    "meduska",
    "franio",
    "marcindubiel",
    "jacob4tv",
    "kubx",
    "mamm0n",
    "edenitoo",
    "demonzz1",
    "arquel",
    "my_zone_",
    "rudaninja"
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
