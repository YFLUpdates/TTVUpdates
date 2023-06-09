import generateVoice from "../../apis/ai/generateVoice.js";
import aiCooldown from "../aiCooldown.js";

export default async function redeemTTS(channel, user, msg, tags, api, io, free) {

  if (tags.isRedemption === true) {
    
    if(msg.includes("https://steamcommunity.com")){

      return null;
    }

    console.log("new TTS: ", channel, tags.isRedemption);

    if (msg.length > 500) {
      return `${user}, zbyt długa wiadomość aha7`;
    }
    const channelClean = channel.replaceAll("#", "").toLowerCase();
    const isLive = await api.streams.getStreamByUserName(channelClean);

    if (!isLive?.userDisplayName) {
      return null;
    }

    if(["d3tzki", "adrian1g__"].includes(channelClean) || free === true && !["neexcsgo", "grubamruwa"].includes(channel)){

      io.emit( "new-free-tts", {
        msg: msg,
        channel: channelClean,
      });

      return null;
    }

    const request = await generateVoice(msg, channelClean);

    if (request === null) {
      return `${user}, błąd generowania głosu mhm`;
    }

    setTimeout(() => {
      io.emit("new-tts", {
        channel: channelClean,
      });
    }, aiCooldown(msg.length));

    return null;
  }
  return null;
}
