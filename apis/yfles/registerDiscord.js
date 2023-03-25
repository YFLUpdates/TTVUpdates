import fetch from "node-fetch";

export default async function registerDiscord(user, channel, discord_id) {
  const res = await fetch(`https://api.yfl.es/v1/user/discord/${user}`, {
    method: "PUT",
    body: JSON.stringify({
        channel: channel,
        discord_id: discord_id,
        date: new Date().toJSON().slice(0, 19).replace('T', ' ')
    }),
    headers: {
        'Content-type': 'application/json',
        'clientID': process.env.YFL_CLIENT_ID,
        'token': process.env.YFL_TOKEN
    }
  });
  
  if (res.status !== 200) {
    return null;
  }

  let data = await res.json();

  return data;
}
