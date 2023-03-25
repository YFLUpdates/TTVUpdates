import fetch from "node-fetch";

export default async function blacklistRegister(user, json) {
  const res = await fetch("https://api.yfl.es/v1/user/blacklist/create", {
    method: "POST",
    body: JSON.stringify({
      user_login: user,
      associated:
        json.mark === null
          ? (`${json.reason}, największy watchtime: ${json.top1} - ${json.registrator}`)
          : (`zarejestrowany przez ${json.registrator}`),
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
