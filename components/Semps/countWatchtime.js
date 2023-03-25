import Xayopl from "../../apis/watchtime/Xayo.js";
import humanizeDuration from "humanize-duration";

export default async function countWatchtime(user_login, channel_list) {
  const searchFor = channel_list;
  const channels = await Xayopl(user_login);
  let time_all = 0;
  let time_female = 0;

  if (channels === null) {
    return null;
  }

  await Promise.all(
    channels.map((i) => {

      if (searchFor.includes(i.streamer)) {
        time_female += i.count * 5;
      }

      time_all += i.count * 5;
    })
  );
  const percentage = Math.round((time_female / time_all) * 100, 2);
  const time = humanizeDuration(time_female * 60000, { language: "pl" });

  return {time: time, percentage: percentage, time_female: time_female };
}
