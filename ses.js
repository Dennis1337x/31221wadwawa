const Discord = require('discord.js');
const tokens = [
    "MTE4MDczMzM1ODU5NTExMzA2Mg.Gno7Fc.uiDT9ebAnI_oUBjF_aOXhHFu37pGAvzARskzl4"
];
const chnls = [
    "1180733120245407776"
];
const selamlı = [];
for (let index = 0; index < tokens.length; index++) {
    const token = tokens[index];
    const client = new Discord.Client();
    client.login(token);
    let concon;
    client.on('ready', async () => {
        console.log(client.user.username);
        client.user.setPresence({ activity: { name: "null voice" }, status: "idle" });
        concon = await client.channels.cache.get(chnls[index]).join().catch(err => console.error(err));
    });
    let ses;
    client.on('voiceStateUpdate', async (prev, cur) => {
        if (cur.member.user.bot) return;
        if (cur.channel && (cur.channel.id === chnls[index])) {
            if (cur.channelID === prev.channelID) return;
            if (selamlı.includes(cur.member.id) && (cur.member.roles.highest.rawPosition < cur.guild.roles.cache.get("1180742793270927410").rawPosition)) {
                console.log(selamlı);
                ses = await concon.play('./hg.mp3');
                return;
            }
            if ((cur.member.roles.highest.rawPosition < cur.guild.roles.cache.get("1180742793270927410").rawPosition)) {
                ses = await concon.play('./hg.mp3');
                selamlı.push(cur.member.user.id);
            } else if (cur.member.roles.highest.rawPosition > cur.guild.roles.cache.get("1180742793270927410").rawPosition) {
                ses = await concon.play('./yt.mp3');
                selamlı.push(cur.member.user.id);
            }
        }
        if (prev.channel && (prev.channel.id === chnls[index]) && (prev.channel.members.size === 1) && ses) ses.end();
    });
    client.on('voiceStateUpdate', async (prev, cur) => {
        if (cur.member.id === client.user.id) concon = await client.channels.cache.get(chnls[index]).join();
    })

    client.on('voiceStateUpdate', async (___, newState) => {
        if (
        newState.member.user.bot &&
        newState.channelID &&
        newState.member.user.id == client.user.id &&
        !newState.selfDeaf
        ) {
        newState.setSelfDeaf(true);
        }
        });
}
