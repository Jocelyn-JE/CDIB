const { REST, Routes } = require('discord.js');
require('dotenv').config(); // To load environment variables
const { commands, clientId, botToken, guildId } = require('./commands.js'); // Import commands

const rest = new REST({ version: '10' }).setToken(botToken);

(async () => {
    try {
        console.log('Started deploying guild-specific application (/) commands one by one.');

        for (const command of commands) {
            try {
                // Deploy each command to the test guild
                command.name += '_test'
                await rest.post(Routes.applicationGuildCommands(clientId, guildId), { body: command });
                console.log(`Successfully deployed command: ${command.name}`);
            } catch (error) {
                console.error(`Error deploying command ${command.name}:`, error);
            }
        }

        console.log('Finished deploying all guild-specific commands.');
    } catch (error) {
        console.error('Unexpected error during deployment:', error);
    }
})();
