import { writeHenzeOddsToFile } from "./oddsFetcher";

interface Guild {
  id: string;
  name: string;
  [key: string]: any;
}

interface Channel {
  id: string;
  name: string;
  type: number;
  [key: string]: any;
}

const DISCORD_API = "https://discord.com/api/v10";

async function getAllGuilds(botToken: string): Promise<Guild[]> {
  console.log('[getAllGuilds] Fetching all guilds...');
  const url = `${DISCORD_API}/users/@me/guilds`;
  try {
    const res: Response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bot ${botToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      console.error('[getAllGuilds] Failed to fetch guilds:', await res.text());
      return [];
    }
    const guilds = (await res.json()) as Guild[];
    console.log(`[getAllGuilds] Fetched ${guilds.length} guild(s).`);
    return guilds;
  } catch (exception) {
    console.error('[getAllGuilds] Exception occurred while fetching guilds:', exception);
    return [];
  }
}

async function getFirstTextChannelId(guildId: string, botToken: string): Promise<string | null> {
  console.log(`[getFirstTextChannelId] Fetching channels for guild: ${guildId}`);
  const url = `${DISCORD_API}/guilds/${guildId}/channels`;
  try {
    const res: Response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bot ${botToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      console.error(`[getFirstTextChannelId] Failed to fetch channels for guild ${guildId}:`, await res.text());
      throw new Error(await res.text());
    }
    const channels: Channel[] = (await res.json()) as Channel[];
    const textChannel = channels.find((c) => c.type === 0);
    if (textChannel) {
      console.log(`[getFirstTextChannelId] Found text channel: ${textChannel.name} (${textChannel.id}) in guild ${guildId}`);
      return textChannel.id;
    } else {
      console.warn(`[getFirstTextChannelId] No text channel found in guild ${guildId}`);
      return null;
    }
  } catch (exception) {
    console.error(`[getFirstTextChannelId] Exception occurred while fetching channels for guild ${guildId}:`, exception);
    return null;
  }
}

async function sendMessageToChannel(channelId: string, message: string, botToken: string, attachedFilePath?: string): Promise<void> {
  console.log(`[sendMessageToChannel] Sending message to channel: ${channelId}`);
  const url = `${DISCORD_API}/channels/${channelId}/messages`;
  try {
    const res: Response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bot ${botToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: message, files: [ attachedFilePath ] }),
    });
    if (!res.ok) {
      console.error(`[sendMessageToChannel] Failed to send message to channel ${channelId}:`, await res.text());
    }
    console.log(`[sendMessageToChannel] Message sent to channel ${channelId}`);
  } catch (error) {
    console.error(`[sendMessageToChannel] Exception occurred while sending message to channel ${channelId}:`, error);
  }
}

export const sendMessage = async (): Promise<{ statusCode: number; body: string }> => {
  console.log('[sendMessage] Starting sendMessage process...');
  const botToken = process.env.DISCORD_TOKEN!;
  const guilds: Guild[] = await getAllGuilds(botToken);

  console.log('[sendMessage] Writing Henze odds to file...');
  const filePath = await writeHenzeOddsToFile();
  console.log(`[sendMessage] Odds file written: ${filePath}`);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowString = tomorrow.toLocaleDateString("da-DK", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const message = `Henze-odds for i morgen: ${tomorrowString}`;

  let sentCount = 0;
  for (const guild of guilds) {
    console.log(`[sendMessage] Processing guild: ${guild.name} (${guild.id})`);
    const channelId = await getFirstTextChannelId(guild.id, botToken);
    if (channelId) {
      await sendMessageToChannel(channelId, message, botToken, filePath);
      sentCount++;
    } else {
      console.warn(`[sendMessage] No text channel found for guild: ${guild.name} (${guild.id})`);
    }
  }

  console.log(`[sendMessage] Message sent to ${sentCount} guild(s).`);
  return {
    statusCode: 200,
    body: `Message sent to ${sentCount} guild(s)!`,
  };
};