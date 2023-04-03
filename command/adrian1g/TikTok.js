import pointsToVoid from "../../apis/yfles/updates/pointsToVoid.js";
import userData from "../../apis/yfles/userData.js";
import Names from "../../components/TikTok/Names.js";
import Prices from "../../components/TikTok/Prices.js";

export default async function commandTikTok(
  user,
  argumentClean,
  channelClean,
  args,
  io,
  cooldown,
  modules
) {
  if (["mrdzinold", "xmerghani", "banduracartel"].includes(channelClean)) {
    return null;
  }

  if (cooldown.tiktok > Date.now() - 6000) {
    return null;
  }
  cooldown.tiktok = Date.now();

  if(modules.modules["tiktok"] === false) return `${user}, TikToki zostały wyłączone. `;

  if (!argumentClean) {
    return `${user}, zapomniałeś/aś o rodzaju -> !tiktok list aha`;
  }

  if (argumentClean === "list") {
    return `${user}, rose - 1k, coffe - 2,5k, koniczynka - 5k, kiss - 7,5k, szampan - 10k, diamonds - 20k, duck - 30k, dice - 50k, lean - 100k, ziolo - 110k -> https://yfl.es/alerts.png `;
  }

  if (argumentClean === "alerty") {
    return `${user}, autorem sound alertów jest @Majhel FIRE GagriGagri `;
  }

  if (
    ![
      "coffe",
      "diamonds",
      "dice",
      "kiss",
      "koniczynka",
      "rose",
      "szampan",
      "lean",
      "ziolo",
      "duck",
    ].includes(argumentClean)
  ) {
    return `${user}, nieznany rodzaj -> !tiktok list aha`;
  }

  if (!args[1] || Number(args[1]) <= 0 || isNaN(args[1])) {
    return `${user}, nie podałeś/aś ilości mhm`;
  }

  if (Number(args[1]) !== Math.floor(args[1])) {
    return `${user}, ale jestem mondry wyśle liczbe po przecinku 3Heading`;
  }

  if (Number(args[1]) > 10000) {
    return `${user}, maksymalnie można przesłać 10000 hehe`;
  }

  const viewer = await userData(user, channelClean);

  if (viewer === null) {
    return `${user}, nie udało sie pobrać danych użytkownika.`;
  }

  const prices = Prices(argumentClean);
  const cost = prices * Number(args[1]);

  if (viewer.points < cost) {
    return `${user}, nie masz tylu punktów aha`;
  }

  const updatePoints = await pointsToVoid(channelClean, `-${cost}`, user);

  if (updatePoints === null) {
    return `${user} nie udało sie zaktualizować punktów użytkownika. `;
  }

  io.emit("new-alert", {
    user_login: user,
    amount: args[1],
    type: argumentClean,
    channel: channelClean,
  });

  return `${user}, przesyła ${Names(argumentClean)} x${
    args[1]
  } za ${new Intl.NumberFormat("pl-PL").format(cost)} punktów okurwa FIRE`;
}
