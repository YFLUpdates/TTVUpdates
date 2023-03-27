import userInfo from "../apis/twitchinsights/userInfo.js";
import xayopl from "../apis/watchtime/Xayo.js";
import cooldownsList from "../components/cooldownsList.js";

const kids = [
  "ewroon",
  "kasix",
  "kubx",
  "miszel",
  "xth0rek",
  "diables",
  "matek",
  "jacob4tv",
  "qlnek",
  "kamifn1",
  "setty__",
  "advisefn",
  "xayoo_",
  "popo",
  "japczan",
  "holak1337",
  "vysotzky",
  "dejvid_tibijski_zadymiarz",
  "lukisteve",
  "mlodziutki7",
  "youngmulti",
  "smerftv_",
  "pisicela",
  "grendy",
  "tiger_scot",
  "1wron3k",
  "sinmivak",
  "DMGPOLAND",
  "nieuczesana",
];

const teens = [
  "delordione",
  "franio",
  "szymoool",
  "lewus",
  "arquel",
  "slayproxx",
  "h2p_gucio",
  "demonzz1",
  "zony",
  "rybsonlol_",
  "vvarion",
  "cinkrofwest",
  "polsatgames",
  "xmerghani",
  "xntentacion",
  "kaseko",
  "ortis",
  "mandzio",
  "furazek",
  "mrdzinold",
  "sandrulaax",
  "szzalony",
  "mork",
  "randombrucetv",
  "tyrisftw",
  "mokrysuchar",
  "kozok",
  "xype1337",
  "zeekxd",
  "playboistarki",
];

const dinozaurs = [
  "rockalone",
  "izakooo",
  "gluhammer",
  "borys8",
  "mkrr3",
  "bixentehs",
  "blackfireice",
  "bonkol",
  "saju",
  "pago3",
  "roocket__",
  "overpow",
  "kubon_",
  "aikoiemil",
  "janusz0821",
  "indystarcraft",
  "dmajszi",
  "esl_csgo_pl",
  "kezman22",
  "kamileater",
  "chesscompl",
  "dawidczerw",
  "gmhikaru",
  "rajonesports",
  "gmpakleza",
  "jaskol95",
  "jacexdowozwideo",
  "grabagra",
];

// Bardzo możliwe że gdzieś się jebnąłem
// source: https://github.com/lewuss/TwitchAgeGuesser

export default async function commandWiek(user, argumentClean, channelClean, cooldown, modules) {
  if(["mrdzinold"].includes(channelClean)) return null;
  if (cooldown.classic > Date.now() - cooldownsList("classic")) {
    return null;
  }
  cooldown.classic = Date.now();

  if(modules.modules["wiek"] === false) return `${user}, Wiek został wyłączony. `;

  const userName = argumentClean ? argumentClean : user;
  const userData = await userInfo(userName);
  const viewer = await xayopl(userName);

  if (userData === null) {
    return `${userName}, nie udało sie pobrać danych użytkownika.`;
  }

  if (viewer === null) {
    return `${userName}, nie udało sie pobrać danych watchtime.`;
  }

  let account_age = 2022 - new Date(userData.createdAt).getFullYear();
  const numbers = user
    .replace(/\D+/g, " ")
    .trim()
    .split(" ")
    .map((e) => parseInt(e));
  let kid_num = 0;
  let teen_num = 0;
  let dinozaur_num = 0;

  //Age selecting
  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];

    if ([420, 69, 2137, 1337, 2115].includes(number)) {
      account_age = account_age + 13;
    } else if (number === 2 && 9 >= number >= 0) {
      account_age = (new Date().getFullYear() % 100) - number;
    } else if (number === 2 && 99 >= number >= 80) {
      account_age = new Date().getFullYear() - number - 1900;
    }
  }

  //XayoPL Data
  await Promise.all(
    viewer.reverse().map((i, index) => {
      if (index === 15) return;

      if (kids.includes(i.streamer)) {
        kid_num += i.count;
      } else if (teens.includes(i.streamer)) {
        teen_num += i.count;
      } else if (dinozaurs.includes(i.streamer)) {
        dinozaur_num += i.count;
      }
    })
  );

  const watchtime_all = kid_num + teen_num + dinozaur_num;
  const starting_age =
    10 +
    account_age +
    2 * (kid_num / watchtime_all) +
    4 * (teen_num / watchtime_all) +
    8 * (dinozaur_num / watchtime_all);

  return `Zgaduje że ${user} ma ${Math.round(starting_age)} lat jasperFajka `;
}
