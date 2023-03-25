import fetch from "node-fetch";

export default async function userData(user, channel) {
  const res = await fetch(`https://api.yfl.es/v1/user/find/${user}?channel=${channel}`, {
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
