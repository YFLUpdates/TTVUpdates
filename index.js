import { RefreshingAuthProvider } from "@twurple/auth";
import { ApiClient } from "@twurple/api";
import { ChatClient } from "@twurple/chat";

import express from "express";
import http from "http";
import { Server } from "socket.io";

import dotenv from "dotenv";

//Commands
import {
  commandKogut,
  commandOpluj,
  commandPrzytul,
  commandZaprasza,
  commandCalus,
  commandKamerki,
} from "./command/rollFromChat/index.js";
import {
  commandYFL,
  commandEwron,
  commandGrendy,
  commandResp,
} from "./command/checkChannels/index.js";
import {
  commandKto,
  commandWiek,
  commandIlejeszcze,
  commandPogoda,
  commandPoints,
  commandChatters,
  commandZjeb,
  commandPermy,
  commandAvatar,
} from "./command/index.js";
import {
  commandKsiezniczki,
  commandIleogladalkobiet,
} from "./command/Semps/index.js";
import {
  commandTop3,
  commandWatchtime,
  commandWatchtimeall,
  commandOfflinetime,
} from "./command/Watchtime/index.js";
import { commandMissing, commandMissingall } from "./command/Missing/index.js";
import dataFromFiles from "./files/readFile.js";
import { commandMsgs, commandTopmsgs } from "./command/Msgs/index.js";
import { commandServerInfo, commandAOD } from "./command/fiveM/index.js";
import {
  commandCam2,
  commandSettings,
  commandMed,
  commandConnectDC,
  commandTikTok,
  commandSMP,
  commandFaceitLVL,
} from "./command/adrian1g/index.js";
import {
  commandDice,
  commandDuel,
  commandRoulette,
} from "./command/Hazard/index.js";
import { commandMarry, commandLove, commandRyra } from "./command/Percentage/index.js";
import SubscriptionReward from "./components/SubscriptionReward.js";
import { botToken, insertActions, subInsert } from "./apis/database/index.js";
import PointsEarning from "./components/PointsEarning.js";
import cooldownsList from "./components/cooldownsList.js";
import updateBotToken from "./apis/database/updateBotToken.js";
import commandModules from "./command/Admin/Modules.js";
import commandGiveaway from "./command/Admin/Giveaway.js";
import redeemTTS from "./components/TTS/Redeem.js";
import moderate1G from "./components/Moderate/adrian1g.js";
import commandTTS from "./command/TTS/playTTS.js";
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://overlay.kochamfortnite.pl",
  },
});
const PORT = process.env.PORT || 3000;

const famous = await dataFromFiles("./files/famous.json");
const girls = await dataFromFiles("./files/girls.json");
const bad_words = await dataFromFiles("./files/bad_words.json");
const session_settings = await dataFromFiles("./files/channels_settings.json");

const channels = ["adrian1g__","grubamruwa","xspeedyq","dobrycsgo","mrdzinold","xmerghani","xkaleson","neexcsgo","banduracartel","sl3dziv","xmevron","shavskyyy","grabyyolo","tuszol","1wron3k","mejnyy", "wodoglowie_", "f1skacz", "xganiaa", "minesekk", "shnycell", "petunia098", "kruciutki", "ciiorny", "d3tzki"];
//const channels = ["xkaleson"];

const clientId = process.env.TWITCH_CLIENT_ID;
const clientSecret = process.env.TWITCH_CLIENT_SECRET;

let tokenData = {};

await token();
async function token() {
  const request = await botToken();
  if (request === null) {
    await token();
  }

  tokenData = request;
}

const authProvider = new RefreshingAuthProvider(
  {
    clientId,
    clientSecret,
    onRefresh: async (userId, newTokenData) =>
      await updateBotToken(newTokenData),
  },
  tokenData
);

await authProvider.addUserForToken(tokenData, ["chat"]);

const chatClient = new ChatClient({ authProvider, channels: channels });
const api = new ApiClient({ authProvider });

await chatClient.connect();

app.set("json spaces", 2);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Bot successfully started",
    build_name: process.env.npm_package_name,
    version: process.env.npm_package_version,
  });
});

app.get("/streams", (req, res) => {
  res.json({
    last_update: new Date(),
    streams: [],
  });
});

// app.get("/giveaway", (req, res) => {
//   res.json({
//     keyword: `!${adrian1g_keyword}`,
//     data: adrian1g_giveaway_list,
//   });
// });

app.use((req, res, next) => {
  res.status(404).json({
    message: `Route ${req.method}:${req.url} not found`,
    error: "Not Found",
    statusCode: 404,
  });
});

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(PORT, () => console.log(`API Server listening on port ${PORT}`));

setInterval(async () => {
  await PointsEarning(channels, api);
}, 10 * 60 * 1000);

chatClient.onBan((channel, user) => {
  insertActions({
    user: user,
    channel: channel,
    channel_group: "YFL",
    action: "ban",
  });
});

chatClient.onTimeout((channel, user, duration) => {
  insertActions({
    user: user,
    channel: channel,
    channel_group: "YFL",
    action: "timeout",
    duration: duration,
  });
});

chatClient.onSub((channel, user, subInfo) => {
  if (
    ["#xmerghani", "#mrdzinold", "#mork", "#banduracartel", "#neexcsgo", "#xkaleson"].includes(channel)
  ) {
    return;
  }

  const channelClean = channel.replaceAll("#", "").toLowerCase();

  subInsert(user.toLowerCase(), {
    channel: channelClean,
    date: new Date().toJSON().slice(0, 19).replace("T", " "),
    points: 250 * SubscriptionReward(subInfo.plan),
  });

  chatClient.say(
    channel,
    `${user}, darmowe 250 punktów dodane lebronJAM FIRE `
  );
});

chatClient.onResub((channel, user, subInfo) => {
  if (
    ["#xmerghani", "#mrdzinold", "#mork", "#banduracartel", "#neexcsgo", "#xkaleson"].includes(channel)
  ) {
    return;
  }

  const channelClean = channel.replaceAll("#", "").toLowerCase();

  subInsert(user.toLowerCase(), {
    channel: channelClean,
    date: new Date().toJSON().slice(0, 19).replace("T", " "),
    points: 250 * SubscriptionReward(subInfo.plan),
  });

  chatClient.say(
    channel,
    `${user}, darmowe 250 punktów dodane lebronJAM FIRE `
  );
});

chatClient.onSubGift((channel, user, subInfo) => {
  if (
    ["#xmerghani", "#mrdzinold", "#mork", "#banduracartel", "#neexcsgo", "#xkaleson"].includes(channel)
  ) {
    return;
  }

  const channelClean = channel.replaceAll("#", "").toLowerCase();

  subInsert(user.toLowerCase(), {
    channel: channelClean,
    date: new Date().toJSON().slice(0, 19).replace("T", " "),
    points: 250 * SubscriptionReward(subInfo.plan),
  });

  chatClient.say(
    channel,
    `${user}, darmowe 250 punktów dodane lebronJAM FIRE `
  );
});

chatClient.onMessage(async (channel, user, msg, tags) => {

  if(["#adrian1g__", "#grubamruwa", "#neexcsgo"].includes(channel)){

    const tts = await redeemTTS(channel, user, msg, tags, api, io);

    if(tts){
      return chatClient.say(channel, tts);
    }

    if(channel === "#adrian1g__"){
      await moderate1G(msg, api, user);
    }

  }

  if (!msg.startsWith("!")) return;

  const args = msg.slice(1).split(" ");
  const command = args.shift().toLowerCase();
  const channelClean = channel.replaceAll("#", "").toLowerCase();
  const argumentClean = args[0]
    ? args[0].replaceAll("@", "").toLowerCase()
    : null;

  if (
    bad_words.includes(args[0]) ||
    bad_words.includes(args[1]) ||
    bad_words.includes(args[2]) ||
    bad_words.includes(args[3])
  )
    return;

  //TODO
  //!mogemoda
  //!losowanie
  switch (command) {
    case "opluj": {
      const command = await commandOpluj(
        user,
        argumentClean,
        channelClean,
        api,
        session_settings[channelClean].cooldowns
      );

      if (command === null) {
        break;
      }
      chatClient.say(channel, command);

      break;
    }
    case "kogut": {
      const command = await commandKogut(
        user,
        argumentClean,
        channelClean,
        api,
        session_settings[channelClean].cooldowns
      );
      if (command === null) {
        break;
      }
      chatClient.say(channel, command);

      break;
    }
    case "hug":
    case "przytul": {
      const command = await commandPrzytul(
        user,
        argumentClean,
        channelClean,
        api,
        session_settings[channelClean].cooldowns
      );
      if (command === null) {
        break;
      }
      chatClient.say(channel, command);

      break;
    }
    case "zaprasza": {
      const command = await commandZaprasza(
        user,
        argumentClean,
        channelClean,
        api,
        session_settings[channelClean].cooldowns
      );
      if (command === null) {
        break;
      }
      chatClient.say(channel, command);

      break;
    }
    case "kamerki": {
      const command = await commandKamerki(
        user,
        channelClean,
        api,
        session_settings[channelClean].cooldowns
      );
      if (command === null) {
        break;
      }
      chatClient.say(channel, command);

      break;
    }
    case "calus":
    case "kiss": {
      const command = await commandCalus(
        user,
        argumentClean,
        channelClean,
        api,
        session_settings[channelClean].cooldowns
      );
      if (command === null) {
        break;
      }
      chatClient.say(channel, command);

      break;
    }
    case "yflwatchtime":
    case "yfl": {
      const command = await commandYFL(
        user,
        argumentClean,
        session_settings[channelClean].cooldowns
      );
      if (command === null) {
        break;
      }
      chatClient.say(channel, command);

      break;
    }
    case "ewron":
    case "ewroniarz": {
      const command = await commandEwron(
        user,
        argumentClean,
        session_settings[channelClean].cooldowns
      );
      if (command === null) {
        break;
      }
      chatClient.say(channel, command);

      break;
    }
    case "grendy": {
      const command = await commandGrendy(
        user,
        argumentClean,
        session_settings[channelClean].cooldowns
      );
      if (command === null) {
        break;
      }
      chatClient.say(channel, command);

      break;
    }
    case "resp": {
      const command = await commandResp(
        user,
        argumentClean,
        session_settings[channelClean].cooldowns
      );
      if (command === null) {
        break;
      }
      chatClient.say(channel, command);

      break;
    }
    case "kto": {
      const command = await commandKto(
        user,
        argumentClean,
        channelClean,
        api,
        famous,
        session_settings[channelClean].cooldowns
      );
      if (command === null) {
        break;
      }
      chatClient.say(channel, command);

      break;
    }
    case "topdupeczki":
    case "topsemp":
    case "ksiezniczki": {
      const command = await commandKsiezniczki(
        user,
        argumentClean,
        girls,
        session_settings[channelClean].cooldowns
      );
      if (command === null) {
        break;
      }
      chatClient.say(channel, command);

      break;
    }
    case "ileogladalkobiet":
    case "semp": {
      const command = await commandIleogladalkobiet(
        user,
        argumentClean,
        girls,
        session_settings[channelClean].cooldowns
      );
      if (command === null) {
        break;
      }
      chatClient.say(channel, command);

      break;
    }
    case "watchtimeall": {
      const command = await commandWatchtimeall(
        user,
        argumentClean,
        session_settings[channelClean].cooldowns
      );
      if (command === null) {
        break;
      }
      chatClient.say(channel, command);

      break;
    }
    case "watchtime":
    case "twitchlogger":
    case "xayopl": {
      const command = await commandWatchtime(
        user,
        argumentClean,
        channelClean,
        args,
        session_settings[channelClean].cooldowns
      );
      if (command === null) {
        break;
      }
      chatClient.say(channel, command);

      break;
    }
    case "timeoffline":
    case "offlinetime":
    case "offtime": {
      const command = await commandOfflinetime(
        user,
        argumentClean,
        channelClean,
        session_settings[channelClean].cooldowns
      );
      if (command === null) {
        break;
      }
      chatClient.say(channel, command);

      break;
    }
    case "top3":
    case "top3watchtime": {
      const command = await commandTop3(
        user,
        argumentClean,
        session_settings[channelClean].cooldowns,
        session_settings[channelClean]
      );
      if (command === null) {
        break;
      }
      chatClient.say(channel, command);

      break;
    }
    case "wruc":
    case "ilejeszcze": {
      const command = await commandIlejeszcze(
        user,
        argumentClean,
        channelClean,
        session_settings[channelClean].cooldowns
      );
      if (command === null) {
        break;
      }
      chatClient.say(channel, command);

      break;
    }
    case "missingall":
    case "kiedyall":
    case "ostatnioall": {
      const command = await commandMissingall(
        user,
        argumentClean,
        session_settings[channelClean].cooldowns
      );
      if (command === null) {
        break;
      }
      chatClient.say(channel, command);

      break;
    }
    case "missing":
    case "ostatnio":
    case "lastseen":
    case "kiedy": {
      const command = await commandMissing(
        user,
        argumentClean,
        channelClean,
        session_settings[channelClean].cooldowns
      );
      if (command === null) {
        break;
      }
      chatClient.say(channel, command);

      break;
    }
    case "wiadomosci":
    case "messsages":
    case "msgs": {
      const command = await commandMsgs(
        user,
        argumentClean,
        channelClean,
        session_settings[channelClean].cooldowns
      );
      if (command === null) {
        break;
      }
      chatClient.say(channel, command);

      break;
    }
    case "top5msgs":
    case "topmsgs": {
      const command = await commandTopmsgs(
        user,
        argumentClean,
        channelClean,
        session_settings[channelClean].cooldowns
      );
      if (command === null) {
        break;
      }
      chatClient.say(channel, command);

      break;
    }
    case "wiek":
    case "ilemamlat": {
      const command = await commandWiek(
        user,
        argumentClean,
        channelClean,
        session_settings[channelClean].cooldowns,
        session_settings[channelClean]
      );
      if (command === null) {
        break;
      }
      chatClient.say(channel, command);

      break;
    }
    case "weather":
    case "pogoda": {
      const command = await commandPogoda(
        user,
        argumentClean,
        session_settings[channelClean].cooldowns
      );
      if (command === null) {
        break;
      }
      chatClient.say(channel, command);

      break;
    }
    case "yflpoints":
    case "points":
    case "punkty": {
      const command = await commandPoints(
        user,
        argumentClean,
        channelClean,
        args,
        session_settings[channelClean].cooldowns
      );
      if (command === null) {
        break;
      }
      chatClient.say(channel, command);

      break;
    }
    case "pomoc":
    case "komendy":
    case "commands":
    case "help": {
      if (
        session_settings[channelClean].cooldowns.classic >
        Date.now() - cooldownsList("classic")
      ) {
        break;
      }
      session_settings[channelClean].cooldowns.classic = Date.now();

      chatClient.say(
        channel,
        `!hug, !opluj, !ewron, !yfl, !kogut, !watchtimeall, !watchtime, !ileogladalkobiet, !ksiezniczki, !kto, !ilejeszcze, !missing i wiele więcej na https://yfl.es/bot ok`
      );
      break;
    }
    case "chatters": {
      const command = await commandChatters(
        user,
        channelClean,
        api,
        session_settings[channelClean].cooldowns
      );
      if (command === null) {
        break;
      }
      chatClient.say(channel, command);

      break;
    }
    case "blacklist":
    case "zjeb": {
      const userInfo = tags.userInfo;
      const { isMod, isVip, isBroadcaster } = userInfo;
      const isModUp = isBroadcaster || isMod || isVip;

      const command = await commandZjeb(
        user,
        argumentClean,
        isModUp,
        args,
        session_settings[channelClean].cooldowns
      );
      if (command === null) {
        break;
      }
      chatClient.say(channel, command);

      break;
    }
    case "5city":
    case "nrp":
    case "notrp":
    case "cocorp":
    case "coco":
    case "fivem": {
      const command = await commandServerInfo(
        user,
        argumentClean,
        session_settings[channelClean].cooldowns
      );
      if (command === null) {
        break;
      }
      chatClient.say(channel, command);

      break;
    }
    case "aod": {
      const command = await commandAOD(
        user,
        argumentClean,
        session_settings[channelClean].cooldowns
      );
      if (command === null) {
        break;
      }
      chatClient.say(channel, command);

      break;
    }
    case "ustawienia":
    case "settings": {
      if (!["adrian1g__", "3xanax"].includes(channelClean)) break;

      const command = await commandSettings(
        user,
        argumentClean,
        session_settings[channelClean].cooldowns
      );
      if (command === null) {
        break;
      }
      chatClient.say(channel, command);

      break;
    }
    case "cam2": {
      if (!["adrian1g__", "3xanax"].includes(channelClean)) break;

      const command = await commandCam2(
        user,
        session_settings[channelClean].cooldowns
      );
      if (command === null) {
        break;
      }
      chatClient.say(channel, command);

      break;
    }
    case "med": {
      if (!["adrian1g__", "3xanax"].includes(channelClean)) break;
      const userInfo = tags.userInfo;
      const { isMod, isVip, isBroadcaster } = userInfo;
      const isModUp = isBroadcaster || isMod || isVip;

      const command = await commandMed(
        user,
        isModUp,
        args,
        session_settings[channelClean].cooldowns
      );

      if (command === null) {
        break;
      }
      chatClient.say(channel, command);

      break;
    }
    case "passport":
    case "paszport": {
      if (!["adrian1g__", "3xanax"].includes(channelClean)) break;
      if (
        session_settings[channelClean].cooldowns.classic >
        Date.now() - cooldownsList("classic")
      ) {
        break;
      }
      session_settings[channelClean].cooldowns.classic = Date.now();
      chatClient.say(
        channel,
        `${user}, paszport możesz odebrać pod URL https://passport.1giet.cf/${user} chciwy`
      );

      break;
    }
    case "perm":
    case "permy": {
      const command = await commandPermy(
        user,
        argumentClean,
        channelClean,
        session_settings[channelClean].cooldowns
      );
      if (command === null) {
        break;
      }
      chatClient.say(channel, command);

      break;
    }
    case "connectdc": {
      if (!["adrian1g__", "3xanax"].includes(channelClean)) break;

      const command = await commandConnectDC(
        user,
        argumentClean,
        channelClean,
        session_settings[channelClean].cooldowns
      );
      if (command === null) {
        break;
      }
      chatClient.say(channel, command);

      break;
    }
    case "buy":
    case "redeem":
    case "tiktok": {
      const command = await commandTikTok(
        user,
        argumentClean,
        channelClean,
        args,
        io,
        session_settings[channelClean].cooldowns,
        session_settings[channelClean]
      );

      if (command === null) {
        break;
      }

      chatClient.say(channel, command);

      break;
    }
    case "kosci":
    case "dice": {
      const command = await commandDice(
        user,
        argumentClean,
        channelClean,
        session_settings[channelClean].cooldowns,
        session_settings[channelClean]
      );

      if (command === null) {
        break;
      }

      chatClient.say(channel, command);

      break;
    }
    case "gamble":
    case "roulette":
    case "ruletka": {
      const command = await commandRoulette(
        user,
        argumentClean,
        channelClean,
        args,
        session_settings[channelClean].cooldowns,
        session_settings[channelClean]
      );

      if (command === null) {
        break;
      }

      chatClient.say(channel, command);

      break;
    }
    case "pojedynek":
    case "duel": {
      const command = await commandDuel(
        user,
        argumentClean,
        channelClean,
        args,
        session_settings,
        session_settings[channelClean].cooldowns,
        session_settings[channelClean]
      );

      if (command === null) {
        break;
      }

      chatClient.say(channel, command);

      break;
    }
    case "ping": {
      if (
        session_settings[channelClean].cooldowns.classic >
        Date.now() - cooldownsList("classic")
      ) {
        break;
      }
      session_settings[channelClean].cooldowns.classic = Date.now();

      chatClient.say(
        channel,
        `Build name: ${process.env.npm_package_name} - version: ${process.env.npm_package_version}`
      );

      break;
    }
    case "avatar": {
      const command = await commandAvatar(
        user,
        argumentClean,
        channelClean,
        api,
        session_settings[channelClean].cooldowns
      );

      if (command === null) {
        break;
      }

      chatClient.say(channel, command);

      break;
    }
    case "slub":
    case "marry": {
      const command = await commandMarry(
        user,
        argumentClean,
        channelClean,
        api,
        session_settings[channelClean].cooldowns
      );

      if (command === null) {
        break;
      }

      chatClient.say(channel, command);

      break;
    }
    case "love": {
      const command = await commandLove(
        user,
        argumentClean,
        channelClean,
        session_settings[channelClean].cooldowns
      );

      if (command === null) {
        break;
      }

      chatClient.say(channel, command);

      break;
    }
    case "modules":
    case "module": {
      const userInfo = tags.userInfo;
      const { isMod, isBroadcaster } = userInfo;
      const isModUp = isBroadcaster || isMod;

      const command = await commandModules(
        user,
        argumentClean,
        channelClean,
        args,
        isModUp,
        io,
        session_settings[channelClean]
      );

      if (command === null) {
        break;
      }

      chatClient.say(channel, command);

      break;
    }
    case "yflsmp":
    case "smp": {

      const command = await commandSMP(
        user,
        channelClean,
        YFLSMP,
        session_settings[channelClean].cooldowns
      );

      if (command === null) {
        break;
      }

      chatClient.say(channel, command);

      break;
    }
    // case "lvl":
    // case "faceit":
    // case "elo": {
    //   const command = await commandFaceitLVL(
    //     user,
    //     channelClean,
    //     args[0],
    //     session_settings[channelClean].cooldowns
    //   );
    //   if (command === null) {
    //     break;
    //   }
    //   chatClient.say(channel, command);

    //   break;
    // }
    case "gw":
    case "giveaway": {
      const userInfo = tags.userInfo;
      const { isMod, isBroadcaster } = userInfo;
      const isModUp = isBroadcaster || isMod;

      const command = await commandGiveaway(
        user,
        channelClean,
        argumentClean,
        isModUp,
        api
      );

      if (command === null) {
        break;
      }
      chatClient.say(channel, command);

      break;
    }
    case "skiptts": {
      if (!["adrian1g__", "3xanax", "grubamruwa", "neexcsgo", "d3tzki"].includes(channelClean)) break;

      const userInfo = tags.userInfo;
      const { isMod, isBroadcaster } = userInfo;
      const isModUp = isBroadcaster || isMod;

      if(!isModUp){
        break;
      }
      
      io.emit("skip-tts", {
        channel: channel.replaceAll("#", "").toLowerCase(),
      });

      chatClient.say(channel, `${user}, TTS skipped ok`);

      break;
    }
    case "playtts":
    case "tts": {
      const userInfo = tags.userInfo;
      const { isMod, isBroadcaster, isVip, isSubscriber } = userInfo;
      let isModUp = isBroadcaster || isMod || isVip;

      if(channelClean === "grubamruwa"){
        isModUp = isBroadcaster || isMod || isVip || isSubscriber;
      }

      const command = await commandTTS(
        user,
        args,
        channelClean,
        session_settings[channelClean].cooldowns,
        isModUp,
        api, 
        io
      );

      if (command === null) {
        break;
      }

      chatClient.say(channel, command);

      break;
    }
    case "ryra": {
      const command = await commandRyra(
        user,
        channelClean,
        session_settings[channelClean].cooldowns
      );

      if (command === null) {
        break;
      }

      chatClient.say(channel, command);

      break;
    }
    default:
      break;
  }
});
