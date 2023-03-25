import fetch from "node-fetch";

export default async function todayPerms(channel) {
  const res = await fetch(`https://api.yfl.es/v1/channel/charts/${channel}`, {
    method: "get",
    headers: {
        'Content-type': 'application/json'
    }
  });
  
  if (res.status !== 200) {
    return null;
  }

  let data = await res.json();

  return data;
}
