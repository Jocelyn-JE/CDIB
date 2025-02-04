import { REST, Routes } from "discord.js";
import "dotenv/config";
import { commands, clientId, botToken, guildId } from "./commands.js";

const rest = new REST({ version: "10" }).setToken(botToken);

(async () => {
  try {
    console.log(
      "\
Started deploying guild-specific application (/) commands one by one.",
    );
    const existingCommands = await rest.get(
      Routes.applicationCommands(clientId),
    );
    const existingCommandNames = existingCommands.map(
      (command) => command.name,
    );

    for (const command of commands) {
      try {
        if (existingCommandNames.includes(command.name)) {
          console.log(`Command ${command.name} already exists. Skipping.`);
          continue;
        }
        command.name += "_test";
        command.description +=
          "\
 | This command is local to this server for testing purposes";
        await rest.post(Routes.applicationGuildCommands(clientId, guildId), {
          body: command,
        });
        console.log(`Successfully deployed command: ${command.name}`);
      } catch (error) {
        console.error(`Error deploying command ${command.name}:`, error);
      }
    }
    console.log("Finished deploying all guild-specific commands.");
  } catch (error) {
    console.error("Unexpected error during deployment:", error);
  }
})();
