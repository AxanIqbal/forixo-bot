import {Client, GatewayIntentBits, Partials,MessageType} from "discord.js";
import axios from "axios";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ],
    partials: [Partials.Message], // allow fetching partial messages
})

client.once('ready', () => console.log(`Logged in as ${client.user?.tag}`));

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    const botId = client.user?.id;

    // 1️⃣ Check if the bot is mentioned
    const isMentioned = message.mentions.has(botId ?? "");


    // 2️⃣ Check if it's a reply to *your* bot
    let isReplyToOurBot = false;
    if (message.type === MessageType.Reply && message.reference?.messageId) {
        try {
            const replied = await message.fetchReference(); // original message
            if (replied.author?.id === botId) {
                isReplyToOurBot = true;
            }
        } catch (err) {
            console.error('Could not fetch replied-to message:', err);
        }
    }

    if (!isMentioned && !isReplyToOurBot) return;

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
            roles: message.member?.roles.cache.map(role => role.name) || []
        })
    } catch (err) {
        console.error('Fetch failed:', err);
        return;
    }

    console.log('Got new message:', message.content);
});

client.login(process.env.TOKEN);


Bun.serve({
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
    routes: {
        "/": {
            GET: () => {
                return new Response("Hello");
            },
        },
    },
})
