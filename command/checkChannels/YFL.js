import determineViewer from "../../components/checkChannels/determineViewer.js";

function responses(ratio){
    if (ratio.watchtime < 0.3){
        return "nie jest widzem yfl";
    }else if(ratio.watchtime < 0.5){
        // if(command_name != "yfl"){
        //     registerToBL(user, {mark: null, reason: command_name, top1: ratio.top1, registrator: "SYSTEM"})
        // }
        return "jest widzem yfl PogU";
    }else if(ratio.watchtime > 0.5){
        // if(command_name != "yfl"){
        //     registerToBL(user, {mark: null, reason: command_name, top1: ratio.top1, registrator: "SYSTEM"})
        // }
        return "jest giga koneserem yfl PogU FIRE";
    }else{
        return "nie jest widzem yf";
    }
}

export default async function commandYFL(user, argumentClean, cooldown) {
  if (cooldown.longer > Date.now() - cooldownsList("longer")) {
    return null;
  }
  cooldown.longer = Date.now();
  const channel_list = [
    "youngmulti",
    "xmerghani",
    "1wron3k",
    "mrdzinold",
    "mork",
    "banduracartel",
    "xspeedyq",
    "adrian1g__",
    "xkaleson",
  ];

  if (argumentClean && argumentClean.length >= 3) {
    const viewer = await determineViewer(argumentClean, channel_list);

    if (viewer === null) {
      return `${user}, nie udało sie pobrać danych watchtime.`;
    }

    return `${argumentClean} ${responses(viewer)}`;
  }

  const viewer = await determineViewer(user, channel_list);

  if (viewer === null) {
    return `${user}, nie udało sie pobrać danych watchtime.`;
  }

  return `${user}, ${responses(viewer)}`;
}
