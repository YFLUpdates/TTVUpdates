import cooldownsList from "../../components/cooldownsList.js";

export default async function commandSettings(user, argumentClean, cooldown) {
  if (cooldown.classic > Date.now() - cooldownsList("classic")) {
    return null;
  }
  cooldown.classic = Date.now();
  
  if (argumentClean === "gta") {
    return `${user}, USTAWIENIA GTA FIRE https://clips.twitch.tv/LongEnjoyableTubersOMGScoots-0gEQyEMXY690Pv0m`;
  }
  if (argumentClean === "fortnite") {
    return `${user}, USTAWIENIA FORTNITE FIRE https://clips.twitch.tv/InventiveCrypticOilBIRB-yWwnEcUiOAHBB0W3`;
  }
  if (argumentClean === "citizen") {
    return `${user}, Citizen od fatka aok`;
  }

  return `${user}, zapomniałeś podać gre (gta, fortnite, citizen)`;
}
