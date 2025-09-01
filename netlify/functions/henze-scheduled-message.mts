import type { Config } from "@netlify/functions"
import { sendMessage } from "../../src/discordSender";

export default async (req: Request) => {
  const { next_run } = await req.json();

  console.log("Received event! Next invocation at:", next_run);

  sendMessage();
}

export const config: Config = {
    schedule: "@hourly"
}