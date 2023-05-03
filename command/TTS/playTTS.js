import redeemTTS from "../../components/TTS/Redeem.js";

export default async function commandTTS(
  user,
  args,
  channelClean,
  cooldown,
  isModUp,
  api,
  io
) {
  if (!isModUp) {
    return null;
  }

  if (!["adrian1g__", "3xanax"].includes(channelClean)) {
    return null;
  }

  if(!args[0]){
    return `${user}, zapomniałeś o tekście.`;
  }

  if (cooldown.tts > Date.now() - 15000) {
    return null;
  }
  cooldown.tts = Date.now();

  console.log(args.join(" "));
  
  const tts = await redeemTTS(
    channelClean,
    user,
    args.join(" "),
    { isRedemption: true },
    api,
    io
  );

  if (tts === null) {
    return `${user}, generowanie tekstu.`;
  }

  return tts;
}
