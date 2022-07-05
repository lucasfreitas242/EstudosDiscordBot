const {Client, Intents} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require('./config.json');
const axios = require('axios');
var character = 15;
const BASE_URL = "https://rickandmortyapi.com/api/character/";
let charName = '';
let charImage = '';

(async () => {
	axios.get(BASE_URL + character)
  .then(response => {
    charName = response.data.name;
    charImage = response.data.image;
    return charName, charImage;
  })
  .catch(error => {
    console.log(error);
  });
})();

client.on("ready", () => {
    console.log(`O bot foi iniciado, com ${client.users.cache.size} usuários e em ${client.guilds.cache.size} servidores.`);
    client.user.setActivity(`${client.guilds.cache.size} servidores`);
  });

client.on("guildCreate", guild => {
    console.log(`O Bot entrou no servidore: ${guild.name} (id: ${guild.id}). População: ${guild.memberCount} membros!`);
    client.user.setActivity(`Estou em ${client.guilds.size} servidores!`)
});

client.on("guildDelete", guild => {
    console.log(`O Bot foi removido do servidor: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`Serving ${client.guild.size} servers`);
})

client.on("messageCreate", async message => {
    if(message.author.bot) return;
    if(message.channel.type == 'DM') return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase();
    const m = await message.channel;
    console.log(args);

    if (comando === "ping") {
        m.send(`Pong! A Latência é ${m.createdTimestamp}ms!`);
    }
    if(comando === "hello") {
        m.send(`Olá, ${(charName)}, ${args}!`);
        m.send({
            files: [`${charImage}`]
        });
    }
});

client.login(config.token);