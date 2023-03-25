import Xayopl from "../../apis/watchtime/Xayo.js";

export default async function determineViewer(user_login, channel_list) {
  const searchFor = channel_list;
  const channels = await Xayopl(user_login);
  let time_all = 0;
  let channels_time = 0;
  let top1 = "zero";

  if (channels === null) {
    return null;
  }

  await Promise.all(
    channels.map((i, index) => {
      time_all += i.count * 5;

      if(index === 0){
        top1 = i.streamer;
      }

      if (searchFor.includes(i.streamer)) {
        channels_time += i.count * 5;
      }
    })
  );

  return {watchtime: channels_time / time_all, top1: top1}
}
