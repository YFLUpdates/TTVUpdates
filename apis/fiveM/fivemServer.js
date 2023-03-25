import fetch from "node-fetch";

export default async function fivemServer(serverID) {
  const res = await fetch(`https://servers-frontend.fivem.net/api/servers/single/${serverID}`, {
    method: "get",
    headers: {
        'Content-type': 'application/json',
        'User-Agent': 'YFLUpdates/2.0'
    }
  });
  
  if (res.status !== 200) {
    return null;
  }

  let data = await res.json();

  return data.Data;
}
