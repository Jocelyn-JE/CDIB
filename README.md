# My Discord Bot

This is a Discord bot that integrates with the Crafty Controller API to start and stop a Minecraft server.

## Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/my-discord-bot.git

2. Install dependencies:

     ```bash
     npm install

3. Create a .env file and add your tokens:

    ```bash
    DISCORD_BOT_TOKEN=your-discord-bot-token
    CRAFTY_API_TOKEN=your-crafty-api-token
    CLIENT_ID=your-client-id
    GUILD_ID=your-guild-id

4. Deploy slash commands:

    ```bash
    npm run deploy

5. Start the bot:

    ```bash
    npm start

Commands

    /startserver: Starts the Minecraft server.
    /stopserver: Stops the Minecraft server.

---

### **6. Final Notes**:
- **Environment variables** are used to keep sensitive information secure.
- **Modular command files** are used to easily extend and maintain the bot.
- **Deploy commands script** allows you to deploy or update slash commands as needed.
