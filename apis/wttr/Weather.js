import fetch from 'node-fetch';

export default async function Weather(city){
    const res = await fetch(`https://wttr.in/${city}?format=j1&lang=pl`);
    if(res.status !== 200){
        return null;
    }

    let data = await res.json();

    return data;
}