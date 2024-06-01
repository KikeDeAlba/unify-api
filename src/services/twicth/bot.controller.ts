import { Client } from "tmi.js";
import * as dotenv from "dotenv";
import type { PBotService } from "./bot.types";
dotenv.config();

export class BotService {
    client;
    constructor({ channels, getPrefix, onCommand }: PBotService) {
        this.client = Client({
            identity: {
                username: process.env.TWITCH_USERNAME_BOT,
                password: process.env.TWITCH_OAUTH_BOT,
            },
            channels,
        });

        this.client.on("message", async (channel, tags, message, self) => {
            if (self) return;

            try {
                const prefix = await getPrefix(channel);

                if (!message.startsWith(prefix)) return;

                const command = message.slice(prefix.length).split(" ")[0];
                const args = message.slice(prefix.length).split(" ").slice(1);

                const response = await onCommand(channel, command, args, tags);

                this.client.say(channel, response);
            }
            catch (error) {
                console.error(error);
            }
        });
    }

    addChannel(channel: string) {
        this.client.join(channel);
    }

    removeChannel(channel: string) {
        this.client.part(channel);
    }

    isListening(channel: string) {
        return this.client.getChannels().some((c) => c === channel);
    }

    connect() {
        this.client.connect();
    }
}
