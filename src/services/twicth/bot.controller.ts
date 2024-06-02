import { Client } from "tmi.js";
import * as dotenv from "dotenv";
import type { GetPrefixF, OnCommandF, PBotService } from "./bot.types";
dotenv.config();

export class BotService {
    client;
    getPrefix: GetPrefixF;
    onCommand: OnCommandF;
    constructor({ channels, getPrefix, onCommand }: PBotService) {
        this.getPrefix = getPrefix
        this.onCommand = onCommand

        this.client = Client({
            identity: {
                username: process.env.TWITCH_USERNAME_BOT,
                password: process.env.TWITCH_OAUTH_BOT,
            },
            channels,
        });

        this.listenMessages(getPrefix, onCommand)

        this.client.connect()
    }

    async listenMessages(getPrefix: GetPrefixF, onCommand: OnCommandF) {
        this.client.on("message", async (channel, tags, message, self) => {
            if (self) return;

            let messageWithoutAt = message
            if (message.startsWith('@')) messageWithoutAt = message.slice(1)
            console.log(messageWithoutAt)

            try {
                const prefix = await getPrefix(channel);

                console.log(prefix)

                if (!messageWithoutAt.startsWith(prefix)) return;

                const command = messageWithoutAt.slice(prefix.length).split(" ")[1];
                console.log(command)

                const args = messageWithoutAt.slice(prefix.length).split(" ").slice(2);
                console.log(args)

                const response = await onCommand(channel.slice(1), command, args, tags);

                if (!response || response === '') return;

                this.client.say(channel, response);
            }
            catch (error) {
                console.error(error);
            }
        });
    }

    addChannel(channel: string) {
        this.client.join(channel)
            .catch((error) => {
                console.error(error)
                console.log('Bot is not running')
                process.exit(1)
            })

        console.log('Channel added')
    }

    removeChannel(channel: string) {
        this.client.part(channel);
    }

    isListening(channel: string) {
        return this.client.getChannels().some((c) => c.slice(1) === channel);
    }
}
