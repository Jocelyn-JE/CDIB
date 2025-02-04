import { REST, Routes } from "discord.js";
import "dotenv/config";
import { commands, clientId, botToken } from "./commands.js";

const rest = new REST({ version: "10" }).setToken(botToken);

(async () => {
  try {
    console.log("Started deploying application (/) commands one by one.");
    for (const command of commands) {
      try {
        await rest.post(Routes.applicationCommands(clientId), {
          body: command,
        });
        console.log(`Successfully deployed command: ${command.name}`);
      } catch (error) {
        console.error(`Error deploying command ${command.name}:`, error);
      }
    }
    console.log("Finished deploying all commands.");
  } catch (error) {
    console.error("Unexpected error during deployment:", error);
  }
})();
