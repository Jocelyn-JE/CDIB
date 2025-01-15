import { Client, GatewayIntentBits, ActivityType } from 'discord.js';
import * as api from './apiCalls.js';
import 'dotenv/config';

// Initialize bot client
const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});
// Bot login
client.login(process.env.DISCORD_BOT_TOKEN);

// Register slash commands and handle interactions
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    // Check if the user has the required role to use the stopserver command
    const adminRole = process.env.ADMIN_ROLE_ID;
    const hasRole = interaction.member.roles.cache.has(adminRole);

    // Handle 'startserver' command
    if (commandName === 'start' || commandName === 'start_test') {
        const response = await api.sendServerAction('start_server', 'Serveur démarré!', 'Le démarrage à échoué: ');
        await interaction.reply(response);
    }

    // Handle 'stats' command
    if (commandName === 'stats' || commandName === 'stats_test') {
        const response = await api.getServerStats('La récupération des statistiques à échoué @<328210913645559809>');
        let msg = 'Server status: ';
        if (response.data.data.running === true) {
            msg += 'ON :green_circle:\n';
            const date = new Date(response.data.data.started);
            const epochTimestamp = Math.floor(date.getTime() / 1000) + 3600;
            msg += `Started <t:${epochTimestamp}:R>\n`;
            msg += 'Players online: **' + response.data.data.online + '/' + response.data.data.max + '**';
            client.user.setActivity('mc.firebuildworld.ovh', {
                type: ActivityType.Playing,
            });
        }
        else {
            msg += 'OFF :red_circle:\n';
        }
        await interaction.reply(msg);
    }

    // Handle 'stopserver' command
    if (commandName === 'stop' || commandName === 'stop_test') {
        if (!hasRole) {
            return await interaction.reply('You do not have permission to stop the server.');
        };
        const response = await api.sendServerAction('stop_server', 'Serveur éteint!', 'L\'arrêt à échoué: ');
        await interaction.reply(response);
    }

    // Handle 'restart' command
    if (commandName === 'restart' || commandName === 'restart_test') {
        if (!hasRole) {
            return await interaction.reply('You do not have permission to restart the server.');
        };
        const response = await sendServerAction('restart_server', 'Serveur redémarré!', 'Le redémarrage à échoué: ');
        await interaction.reply(response);
    }

    // Handle 'run' command
    if (commandName === 'run' || commandName === 'run_test') {
        if (!hasRole) {
            return await interaction.reply('You do not have permission to run a command.');
        }
        // Get the 'command' option from the interaction
        const command = interaction.options.getString('command');

        const response = await api.sendServerSTDIn(command, 'Commande: **/' + command + '**, envoyée', 'La commande à échoué: ');
        await interaction.reply(response);
    }
});
