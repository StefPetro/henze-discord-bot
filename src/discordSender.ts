import { Client, Events, GatewayIntentBits, TextChannel } from "discord.js";
import { writeHenzeOddsToFile } from "./oddsFetcher";

export const sendMessage = () => {
  const token = process.env.DISCORD_TOKEN;

  console.log(`Starting Discord bot with token: ${token}`);

  const client = new Client({ intents: [GatewayIntentBits.Guilds] });
  
  client.once(Events.ClientReady, async readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);

    const fileName = await writeHenzeOddsToFile();

    const guilds = client.guilds.cache;
    guilds.forEach(guild => {
      const textChannel = guild.channels.cache.filter(channel => channel.isTextBased() && channel.isSendable()).first() as TextChannel;
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowString = tomorrow.toLocaleDateString("da-DK", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

      console.log(`Sending Henze-odds on server: ${guild.name}, channel: ${textChannel.name}`);

      textChannel.send({
        content: `Henze-odds for i morgen: ${tomorrowString}`,
        files: [fileName]
      });
    });

    client.destroy();
  });
  
  console.log("client type:", typeof client?.login);
  
  client.login(token);
}
