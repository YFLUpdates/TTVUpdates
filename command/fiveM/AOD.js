import fivemServer from "../../apis/fiveM/fivemServer.js";
import cooldownsList from "../../components/cooldownsList.js";

export default async function commandAOD(
  user,
  argumentClean,
  cooldown
) {
  if (cooldown.special > Date.now() - cooldownsList("special")) {
    return null;
  }
  cooldown.special = Date.now();
  let server = null;
  let streamrsArray = [];
  const znaniHex = [
    "steam:11000013bcde738" /* - MRG */,
    "steam:110000112458d4d" /* - Speedy */,
    "steam:11000010395cc1b" /* - dobrypt */,
    "steam:1100001486c2726" /* - adrian1g */,
    "steam:11000010cce9caa" /* - MrDzinold */,
    "steam:11000010263929b" /* - multi */,
    "steam:1100001034b75af" /* - b4ndura */,
    "steam:11000010f085a81" /* - mork  */,
    "steam:1100001039e60a0" /* - neex  */,
    "steam:11000010c71021d" /* - wronek  */,
    "steam:11000010461422b" /* - tuszol  */,
  ];

  if (!argumentClean) {
    return `${user}, zapomniałeś/aś podać serwer (5city, notrp, cocorp, 77rp)`;
  }

  switch (argumentClean) {
    case "5city":
      server = await fivemServer("vp4rxq");
      break;
    case "notrp":
    case "nrp":
      server = await fivemServer("jqbq8m");
      break;
    case "coco":
    case "cocorp":
      server = await fivemServer("6d6rk8");
      break;
    case "77rp":
      server = await fivemServer("63blz4");
      break;
    default:
      server = null;
  }

  if (server === null) return `${user} coś się popsuło z Fivem jasperTragedia`;

  await Promise.all(
    server.players.map(async (i) => {
      if (znaniHex.includes(i.identifiers[0])) {
        if (i.name.toLowerCase() === "10x50") {
          return streamrsArray.push("neex");
        }
        streamrsArray.push(i.name.toLowerCase());
      }
    })
  );

  if (streamrsArray.length === 0)
    return `jasperLaskotanie ${user} nikt z AOD aktualnie nie gra na ${argumentClean} `;

  return `jasperUsmiech ${user} na ${argument} aktualnie grają ${streamrsArray.join(
    ", "
  )} `;
}
