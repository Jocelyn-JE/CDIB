const { REST, Routes } = require('discord.js');
require('dotenv').config();
const { clientId, botToken, guildId } = require('./commands.js');

const rest = new REST({ version: '10' }).setToken(botToken);

(async () => {
    try {
        console.log(`Started clearing all commands for guild: ${guildId}.`);

        // Fetch all existing guild commands
        const existingCommands = await rest.get(Routes.applicationGuildCommands(clientId, guildId));

        if (existingCommands.length === 0) {
            console.log('No commands to delete.');
            return;
        }

        // Delete each command
        for (const command of existingCommands) {
            await rest.delete(Routes.applicationGuildCommand(clientId, guildId, command.id));
            console.log(`Deleted command: ${command.name}`);
        }

        console.log('Successfully cleared all commands for the guild.');
    }
    catch (error) {
        console.error('Error clearing commands:', error);
    }
})();
