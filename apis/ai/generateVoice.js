import fetch from "node-fetch";

export default async function generateVoice(text) {
  const res = await fetch("https://ai.docchi.pl/tts/generator", {
    method: "POST",
    body: JSON.stringify({
      "text": text
  }),
    headers: {
        'Content-type': 'application/json',
        'docchi-authorization': process.env.DOCCHI_AUTHORIZATION,
        'client-id': process.env.DOCCHI_CLIENTID
    }
  });
  
  if (res.status !== 200) {
    return null;
  }

  //console.log(await res.json());
  
  return true;
}
