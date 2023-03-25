import fetch from "node-fetch";

export default async function pointsToVoid(channel, points, user) {
  const res = await fetch(`https://api.yfl.es/v1/user/gamble/${channel}`, {
    method: "PUT",
    body: JSON.stringify({
        points: points,
        who: user
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
