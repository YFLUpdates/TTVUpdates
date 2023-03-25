import fetch from 'node-fetch';

export default async function twitchlogger(user_login){
    const res = await fetch(`https://twitchlogger.pl/Tracker/SerachUser/${user_login}`);
    if(res.status !== 200){
        return null;
    }

    let commonFormat = [];

    let data = await res.json();
    const {userChannels, channels} = data;
    userChannels.sort((a, b) => {
        return b.count - a.count;
    });

    
    await Promise.all(
        userChannels.map((i) => {
            const indexOfObject = channels.findIndex((object) => {
                return object.broadcasterId === i.broadcasterId;
            });

            commonFormat.push({
                streamer: channels[indexOfObject].broadcasterLogin,
                count: i.count
            })
        }
    ))

    return commonFormat;
}