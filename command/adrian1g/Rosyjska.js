import cooldownsList from "../../components/cooldownsList.js";
import Rolling from "../../components/Rosyjska/Rolling.js";

export default async function commandRosyjska(user, api, cooldown) {
  if (cooldown.classic > Date.now() - cooldownsList("classic")) {
    return null;
  }
  cooldown.classic = Date.now();

  const roll = await Rolling();

  if (roll === "perm") {
    const getChannelID = await api.users.getUserByName(user).catch((e) => {
      return `${user}, miał/abyś perma ale coś sie rozjebało aok `;
    });

    if (getChannelID === null) {
      return `${user}, miał/abyś perma ale coś sie rozjebało aok `;
    }

    api.moderation.banUser(244310065, 815978731, {
      reason: "przegrał rosyjska rulete",
      user: getChannelID,
      duration: 600
    });

    return `${user}, co za zjeb, przegrał w rosyjskiej ruletce beka2 `;
  }

  return `${user}, udało ci się, masz farta PogO `;
}
