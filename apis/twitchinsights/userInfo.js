import fetch from "node-fetch";

export default async function userInfo(user) {
  const res = await fetch(`https://api.twitchinsights.net/v1/user/status/${user}`, {
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
