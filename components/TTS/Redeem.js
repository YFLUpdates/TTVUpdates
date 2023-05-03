import generateVoice from "../../apis/ai/generateVoice.js";
import aiCooldown from "../aiCooldown.js";

export default async function redeemTTS(channel, user, msg, tags, api, io) {

  if (tags.isRedemption === true) {
    
    console.log("new TTS: ", tags.isRedemption);

    if (msg.length > 500) {
      return `${user}, zbyt długa wiadomość aha7`;
    }

    const isLive = api.streams.getStreamByUserName("adrian1g__").name;

    if (!isLive) {
      return null;
    }

    const request = await generateVoice(msg);

    if (request === null) {
      return `${user}, błąd generowania głosu mhm`;
    }

    setTimeout(() => {
      io.emit("new-tts", {
        channel: channel.replaceAll("#", "").toLowerCase(),
      });
    }, aiCooldown(msg.length));

    return null;
  }
  return null;
}
