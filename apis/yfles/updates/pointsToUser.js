import fetch from "node-fetch";

export default async function pointsToUser(channel, json) {
  const res = await fetch("https://api.yfl.es/v1/user/duel/"+channel, {
    method: "PUT",
    body: JSON.stringify(json),
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
