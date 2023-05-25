export default async function moderate1G(msg, api, user){
    const args = msg.split(" ");

    if(args.includes("kingfvxq")){
      const getChannelID = await api.users
      .getUserByName(user)
      .catch((e) => {
        return null;
      });

      if(getChannelID === null){
        return;
      }

      api.moderation.banUser(244310065, 815978731, {
        reason: "antispam",
        user: getChannelID
      });
    }
}