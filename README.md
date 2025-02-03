# Crafty-Discord-Integration-Bot (CDIB)

This is a Discord bot that integrates with the Crafty Controller API to manipulate a Minecraft server.

## Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/Jocelyn-JE/CDIB.git
    ```

2. Install dependencies:

     ```bash
     npm install
     ```

3. Create a .env file and add your tokens and other IDs:

    - Discord Bot Configuration:

    ```.env
    DISCORD_BOT_TOKEN=<your_discord_bot_token_here>
    CLIENT_ID=<your_discord_Oauth2_client_id_here>
    ADMIN_ROLE_ID=<your_admin_role_id_here>
    ```

    Optional:

    ```.env
    STATS_REFRESH_RATE=<in_seconds_default_is_15>
    ```

    - For developpement purposes:

    ```.env
    GUILD_ID=<your_testing_server_id_here>
    ```

    - Crafty API Configuration:

    ```.env
    CRAFTY_API_TOKEN=<your_crafty_api_token_here>
    CRAFTY_API_URL=<your_crafty_api_url_here>
    CRAFTY_SERVER_ID=<your_crafty_server_uuid_here>
    ```

## Testing

1. Deploy slash commands to the testing server (`GUILD_ID` in `.env`):

    ```bash
    npm test
    ```

2. Start the bot:

    ```bash
    npm start
    ```

3. Test your command in the testing server

4. Cleanup the test commands:

    ```bash
    npm run clear
    ```

## Deploying

1. Deploy slash commands:

    ```bash
    npm run deploy
    ```

2. Start the bot:

    ```bash
    npm start
    ```

- Or use Docker:

    ```bash
    cd ./CDIB
    git pull
    docker compose up
    ```

## Commands

- `/start` Starts the Minecraft server, anyone can run it.
- `/stop` Stops the Minecraft server, requires admin specific role.
- `/restart` Restarts the Minecraft server, requires admin specific role.
- `/run [command]` Sends a given command to the server's console, requires admin specific role.
- `/stats` Fetches stats like server status, server uptime, player count as well as CPU and RAM usage. This information is updated
