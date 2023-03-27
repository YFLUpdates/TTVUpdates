export default async function commandModules(
  user,
  argumentClean,
  channelClean,
  args,
  isModUp,
  io,
  session_settings
) {
  if (!isModUp) {
    return null;
  }

  if (
    !argumentClean ||
    !["enable", "disable", "list", "clearduels", "refreshoverlay"].includes(
      argumentClean
    )
  ) {
    return `${user}, nie znany rodzaj komendy (enable/disable/list/clearduels/refreshoverlay).`;
  }

  if (argumentClean === "enable") {
    if (!args[1]) {
      return `${user}, zapomniałeś/aś o nazwie modułu.`;
    }

    if (args[1] === "duels" || args[1] === "duel") {
      session_settings.duels_list = [];
    }

    session_settings.modules[`${args[1]}`] = true;

    return `${user}, włączyłeś/aś moduł ${args[1]}`;
  }

  if (argumentClean === "disable") {
    if (!args[1]) {
      return `${user}, zapomniałeś/aś o nazwie modułu.`;
    }

    if (args[1] === "duels" || args[1] === "duel") {
      session_settings.duels_list = [];
    }

    session_settings.modules[`${args[1]}`] = false;

    return `${user}, wyłączyłeś/aś moduł ${args[1]}`;
  }

  if(argumentClean === "list"){
    return `${user}, dostępne moduły: duels, dice, roulette, top3, wiek`;
  }

  if(argumentClean === "clearduels"){
    session_settings.duels_list = [];

    return `${user}, wyczyściłeś trwające pojedynki na kanale.`;
  }

  if(argumentClean === "refreshoverlay"){

    io.emit('refresh-overlay', channelClean);

    return `${user}, odświeżyłeś/aś overlay OBS dla różyczek.`
  }

  return `${user}, nie znany rodzaj komendy (enable/disable/list/clearduels/refreshoverlay).`;


}
