import updateUser from "../apis/database/updateUser.js";
import waitforme from "./waitforme.js";
import randomNumber from "./randomNumber.js";
import _ from "lodash";

export default async function PointsEarning(channels, api) {
  const botAccounts = [
    "socialstreamergrowth",
    "streamelements",
    "moobot",
    "discordstreamercommunity",
    "commanderroot",
    "smallstreamersdccommunity",
    "ssgdcserver",
    "yflupdates",
    "lewusbot",
    "official_tubebot",
    "creatisbot",
    "robohubby",
  ];

  const streams = await api.streams.getStreamsByUserNames(channels);
  let liveChannels = [];

  await Promise.all(
    streams.map(async (i) => {
      if (["xmerghani", "mrdzinold", "mork", "banduracartel"].includes(i.userName)) {
        return;
      }

      liveChannels.push(i.userName);

      const chatters = await api.chat
        .getChattersPaginated(i.userId, "815978731").getAll()
        .catch((e) => {
          return null;
        });

      if (chatters === null) {
        return;
      }

      await waitforme(randomNumber(60000, 240000));

      await Promise.all(
        chatters.map(async (x) => {
          if (botAccounts.includes(x.userName)) return;

          await waitforme(300);

          updateUser(x.userName, {
            channel: i.userName,
            date: new Date().toJSON().slice(0, 19).replace("T", " "),
            watchtime: true,
          });
        })
      );
    })
  );

  const offstream = _.difference(channels, liveChannels);
  const userIDS = await api.users.getUsersByNames(offstream);

  await Promise.all(
    userIDS.map(async (i) => {
      if (["xmerghani", "mrdzinold", "mork", "banduracartel"].includes(i.name)) {
        return;
      }

      const chatters = await api.chat
        .getChattersPaginated(i.id, "815978731").getAll()
        .catch((e) => {
          return null;
        });

      if (chatters === null) {
        return;
      }

      await waitforme(randomNumber(60000, 240000));

      await Promise.all(
        chatters.map(async (x) => {
          if (botAccounts.includes(x.userName)) return;

          await waitforme(300);

          updateUser(x.userName, {
            channel: i.name,
            date: new Date().toJSON().slice(0, 19).replace("T", " "),
            watchtime: null
          });

        })
      );
    })
  );
}
