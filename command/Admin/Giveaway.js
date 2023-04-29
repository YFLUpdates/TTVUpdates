import pointsToVoid from "../../apis/yfles/updates/pointsToVoid.js";

async function gChatters(api, channelClean) {
  const getChannelID = await api.users
    .getUserByName(channelClean)
    .catch((e) => {
      return null;
    });
  const chatters = await api.chat
    .getChattersPaginated(getChannelID, "815978731")
    .getAll()
    .catch((e) => {
      return null;
    });

  if (chatters === null) {
    return null;
  }

  return chatters;
}

export default async function commandGiveaway(
  user,
  channelClean,
  argumentClean,
  isModUp,
  api
) {

  if (!isModUp) {
    return null;
  }

  if (argumentClean === "one") {
    const chatters = await gChatters(api, channelClean);

    if (chatters === null) {
      return `${user}, nie posiadam moderatora, nie jestem w stanie pobrać osób na czacie.`;
    }
    const random = chatters[Math.floor(Math.random() * chatters.length)];
    const updatePoints = await pointsToVoid(
      channelClean,
      `+800`,
      random.userDisplayName
    );
    if (updatePoints === null) {
      return `${random.userDisplayName}, wygrałeś ale nie udało sie zaktualizować punktów beka. `;
    }

    return `Gratulacje ${random.userDisplayName} wygrałeś darmowe 800 punktów BRUHBRUH FIRE `;
  }

  if (argumentClean === "multi") {
    const chatters = await gChatters(api, channelClean);

    if (chatters === null) {
      return `${user}, nie posiadam moderatora, nie jestem w stanie pobrać osób na czacie.`;
    }
    
    if(chatters.length < 5) return `${user}, na kanale jest za mało osób aha`;

    const random = [...chatters].sort(() => 0.5 - Math.random()).slice(0, 5);
    let winners = "";

    await Promise.all(
      random.map(async (i) => {
        winners += i.userDisplayName + ", ";

        await pointsToVoid(channelClean, `+160`, i.userDisplayName);
      })
    );
    
    return `Gratulacje ${winners} wygraliście darmowe 160 punktów BRUHBRUH FIRE `;
  }

  return `${user}, zapomniałeś/aś o rodzaju (one/multi)`;
}
