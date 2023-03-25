import fetch from "node-fetch";

export default async function missing(channel) {
  const res = await fetch(`https://api.streamelements.com/kappa/v2/chatstats/${channel}/stats?limit=100`, {
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
