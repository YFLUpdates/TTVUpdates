import Xayopl from "../../apis/watchtime/Xayo.js";
import humanizeDuration from "humanize-duration";

export default async function countWatchtime(user_login) {
  const channels = await Xayopl(user_login);
  let time_all = 0;

  if (channels === null) {
    return null;
  }

  await Promise.all(
    channels.map((i) => {
        time_all += i.count * 5;
    })
  );

  const date_math = Math.abs(new Date() - new Date(2021, 7, 26));
  const datediff_min = Math.floor((date_math / 1000) / 60);
  
  const percentage = Math.round((time_all / datediff_min) * 100, 2);
  const time = humanizeDuration(time_all * 60000, { language: "pl" });

  return {time: time, percentage: percentage};
}
