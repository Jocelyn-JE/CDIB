# FireBuildWorld

This is a Discord bot that integrates with the Crafty Controller API to manipulate a Minecraft server.

## Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/my-discord-bot.git

2. Install dependencies:

     ```bash
     npm install

3. Create a .env file and add your tokens and other IDs:

    ```bash
    DISCORD_BOT_TOKEN=<your_discord_bot_token>
    CRAFTY_API_TOKEN=<your_crafty_api_token>
    CRAFTY_API_URL=<your_crafty_api_url>
    CRAFTY_SERVER_ID=<your_crafty_server_id>
    CLIENT_ID=<your_client_id>
    GUILD_ID=<your_guild_id>
    ADMIN_ROLE_ID=<your_admin_role_id>


4. Deploy slash commands:

    ```bash
    npm run deploy

5. Start the bot:

    ```bash
    npm start

---

Commands

    /start: Starts the Minecraft server.
    /stop: Stops the Minecraft server.
    /restart: Restarts the Minecraft server, requires admin specific role.