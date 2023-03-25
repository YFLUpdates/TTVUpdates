import fetch from 'node-fetch';

export default async function xayopl(user_login){
    const res = await fetch('https://xayo.pl/api/mostWatched/'+user_login);
    if(res.status !== 200){
        return null;
    }

    let data = await res.json();

    return data;
}