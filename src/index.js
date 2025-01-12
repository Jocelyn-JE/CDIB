const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');
const https = require('https');
require('dotenv').config(); // To load environment variables

// Initialize a custom agent that ignores SSL certificate validation
const agent = new https.Agent({  
    rejectUnauthorized: false  // Disable SSL verification
});

// Initialize bot client
const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

const API_URL = 'https://'+process.env.CRAFTY_API_URL+':8443/api/v2/servers';
const SERVER_ID = process.env.CRAFTY_SERVER_ID;  // Replace with actual server ID

// Helper function to send server control commands
async function sendServerAction(action, sucessmsg, errormsg) {
    try {
        const response = await axios.post(`${API_URL}/${SERVER_ID}/action/${action}`, {}, {
            headers: {
                Authorization: `Bearer ${process.env.CRAFTY_API_TOKEN}`,
            },
            httpsAgent: agent  // Use the custom agent
        });

        if (response.data.status === 'ok') {
            return sucessmsg;
        } else {
            return errormsg + JSON.stringify(response.data);
        }
    } catch (error) {
        console.error(error);
        return `Error performing action '${action}': ${error.message}`;
    }
}

// Register slash commands and handle interactions
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    // Check if the user has the required role to use the stopserver command
    const requiredRole = '1187879262989058058'; // Replace with the role name or ID you want to allow
    const hasRole = interaction.member.roles.cache.has(requiredRole); // Check if the member has the role

    // Handle 'startserver' command
    if (commandName === 'start') {
        const response = await sendServerAction('start_server', 'Serveur démarré!', 'Le démarrage à échoué: ');
        await interaction.reply(response);
    }

    // Handle 'stopserver' command
    if (commandName === 'stop') {
        if (!hasRole) {
            return await interaction.reply('You do not have permission to stop the server.');
        }

        const response = await sendServerAction('stop_server', 'Serveur éteint!', "L'arrêt à échoué: ");
        await interaction.reply(response);
    }

    // Handle 'stopserver' command
    if (commandName === 'restart') {
        if (!hasRole) {
            return await interaction.reply('You do not have permission to restart the server.');
        }

        const response = await sendServerAction('restart_server', 'Serveur redémarré!', 'Le redémarrage à échoué: ');
        await interaction.reply(response);
    }
});

// Bot login
client.login(process.env.DISCORD_BOT_TOKEN);
