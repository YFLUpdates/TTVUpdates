import Xayopl from "../../apis/watchtime/Xayo.js";

export default async function determineViewer(user_login, channel_list) {
  const searchFor = channel_list;
  const channels = await Xayopl(user_login);
  let num = 0;
  let fav_streamer = [];

  if (channels === null) {
    return null;
  }

  await Promise.all(
    channels.map((i) => {
      if (num === 3) return;

      if (searchFor.includes(i.streamer) && i.count > 12) {
        num += 1;
        fav_streamer.push(i.streamer)
      }
    })
  );

  return {num: num, fav_streamer: fav_streamer};
}
