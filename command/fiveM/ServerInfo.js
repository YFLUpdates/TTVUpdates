import dataFromFiles from "../../files/readFile.js";
import fivemServer from "../../apis/fiveM/fivemServer.js";
import cooldownsList from "../../components/cooldownsList.js";

export default async function commandServerInfo(user, argumentClean, cooldown) {
  if (cooldown.special > Date.now() - cooldownsList("special")) {
    return null;
  }
  cooldown.special = Date.now();
  let server = null;
  let streamers = 0;
  let streamrsArray = [];
  const znaniHex = await dataFromFiles("./files/famous_fivem.json");

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
        streamrsArray.push(i.name.toLowerCase());
        streamers += 1;
      }
    })
  );
  const shuffled = [...streamrsArray].sort(() => 0.5 - Math.random());
  const random = shuffled.slice(0, 3);

  return `ok ${user} na ${argumentClean} aktualnie jest ${
    server.players.length
  } osób${
    streamers
      ? `, z czego ${streamers} to znane osoby np. ${random.join(", ")}`
      : ""
  }`;
}
