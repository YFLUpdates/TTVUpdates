import fetch from "node-fetch";

export default async function blacklistUnRegister(user) {
  const res = await fetch("https://api.yfl.es/v1/user/blacklist/remove", {
    method: "POST",
    body: JSON.stringify({
      user_login: user
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
