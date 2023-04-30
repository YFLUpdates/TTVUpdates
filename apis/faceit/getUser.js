import fetch from "node-fetch";

export default async function fivemServer(nickname) {
  const res = await fetch(`https://api.satont.dev/faceit?nick=${nickname}`, {
    method: "get",
    headers: {
        'Content-type': 'application/json',
        'User-Agent': 'YFLUpdates/2.0'
    }
  });
  
  if (res.status !== 200) {
    return null;
  } 

  if(res.headers.get("content-type") === "text/html; charset=utf-8"){
    return null;
  }

  let data = await res.json();

  return data;
}
