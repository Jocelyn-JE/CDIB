const { REST, Routes } = require('discord.js');
require('dotenv').config(); // To load environment variables

const clientId = process.env.CLIENT_ID;
const botToken = process.env.DISCORD_BOT_TOKEN;

const commands = [
    {
        name: 'start',
        description: 'Start the Minecraft server',
    },
    {
        name: 'stop',
        description: 'Stop the Minecraft server',
    },
    {
        name: 'restart',
        description: 'Restart the Minecraft server',
    },
];

const rest = new REST({ version: '10' }).setToken(botToken);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        // Deploy commands
        await rest.put(Routes.applicationCommands(clientId), {
            body: commands,
        });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
