import fetch from 'node-fetch';
import jsdom from 'jsdom';

const { JSDOM } = jsdom;
const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.on("error", () => {
  // No-op to skip console errors.
});

export default async function xayoplMissing(user_login){
    const res = await fetch('https://xayo.pl/'+user_login, {
        headers: {
            'Referer': `https://xayo.pl/${user_login}`,
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36'
        }
    });
    if(res.status !== 200){
        return null;
    }
    let data = await res.text();
    const dom = new JSDOM(data, { virtualConsole });
    const xayoJson = JSON.parse(dom.window.document.getElementById("__NEXT_DATA__").textContent);
    const lastSeen = xayoJson.props.pageProps.chatEntry.lastSeen;
    const determine = lastSeen ? lastSeen : null;


    return determine;
}