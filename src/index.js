import { Client, GatewayIntentBits, ActivityType } from 'discord.js';
import * as api from './apiCalls.js';
import 'dotenv/config';
import { statsRefreshRate } from './commands.js';

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
        const sentMsg = await interaction.reply("Fetching stats...");
        let counter = 0;
        const interval = setInterval(async () => {
            if (counter >= 240) {
                clearInterval(interval);
                return;
            }
            try {
                const response = await api.getServerStats('La récupération des statistiques à échoué @<328210913645559809>');
                const date = new Date(response.data.data.started);
                const epochTimestamp = Math.floor(date.getTime() / 1000) + 3600;
                let msg;
                if (response.data.data.running === true && response.data.data.max === 0) {
                    msg = `Server status: Starting :yellow_circle:\nStarted <t:${epochTimestamp}:R>\n`;
                }
                else if (response.data.data.running === true) {
                    msg = `Server status: ON :green_circle:\nStarted <t:${epochTimestamp}:R>\nPlayers online: **${response.data.data.online}/${response.data.data.max}**\nCPU: **${response.data.data.cpu}%** RAM: **${response.data.data.mem}**\n`;
                    client.user.setActivity('mc.firebuildworld.ovh', {
                        type: ActivityType.Playing,
                    });
                }
                else {
                    msg = 'Server status: OFF :red_circle:\n';
                }
                await sentMsg.edit(msg);
            } catch (error) {
                console.error('Failed to update stats message:', error);
                clearInterval(interval);
            }
            counter++;
        }, statsRefreshRate * 1000);
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
        const response = await api.sendServerAction('restart_server', 'Serveur redémarré!', 'Le redémarrage à échoué: ');
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
