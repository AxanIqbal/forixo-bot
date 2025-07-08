import {Client, GatewayIntentBits, Partials} from "discord.js";
import axios from "axios";

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
    partials: [Partials.Message], // allow fetching partial messages
})

client.once('ready', () => console.log(`Logged in as ${client.user?.tag}`));

client.on('messageCreate', async message => {
    if (message.author.bot) return;

        try {
            await axios.post("https://forixo.app.n8n.cloud/webhook/discord",{
                content: message.content,
                attachments: message.attachments,
                messageId: message.id,
                channelId: message.channel.id,
                guildId: message.guild?.id,
                userId: message.author.id,
                username: message.author.username,
                name: message.author.displayName,
            })
        } catch (err) {
            console.error('Fetch failed:', err);
            return;
        }

    console.log('Got new message:', message.content);
});

client.login(process.env.TOKEN);


Bun.serve({
    routes: {
        "/": {
            GET: () => {
                return new Response("Hello");
            },
        },
    },
})
