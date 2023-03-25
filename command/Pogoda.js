import weather from "../apis/wttr/Weather.js";
import cooldownsList from "../components/cooldownsList.js";
export default async function commandPogoda(user, argumentClean, cooldown) {
  if (cooldown.classic > Date.now() - cooldownsList("classic")) {
    return null;
  }
  cooldown.classic = Date.now();

  const weatherData = await weather(argumentClean ? argumentClean : "warsaw");

  if (
    weatherData === null ||
    (weatherData && weatherData.current_condition.length === 0) ||
    !weatherData.nearest_area
  ) {
    return `${userName}, nie udało sie pobrać danych pogodowych - WTTR.`;
  }
  const { current_condition, nearest_area } = weatherData;
  const pogoda = `${user} w ${nearest_area[0].areaName[0].value} aktualnie jest ${current_condition[0].FeelsLikeC} stopni, na zewnątrz jest ${current_condition[0].lang_pl[0].value} a prędkość wiatru wynosi ${current_condition[0].windspeedKmph} km/h`;

  if (pogoda.length < 480) {
    return pogoda;
  }

  return `${user}, ${current_condition[0].FeelsLikeC} stopni - ${current_condition[0].lang_pl[0].value} - ${current_condition[0].windspeedKmph} km/h`;
}
