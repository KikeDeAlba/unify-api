import { findCommand } from "@/services/postgresql/channels";
import type { OnCommandF } from "@/services/twicth/bot.types";
import type { ChatUserstate } from "tmi.js";
import { z } from "zod";

export const onCommand: OnCommandF = async (channel, command, args, tags) => {
    try {
        console.log(channel, command, args, tags)

        const commandFromDb = await findCommand(channel, command);

        console.log(commandFromDb)

        return executeCommand(channel, args, tags, commandFromDb.function);
    } catch (error) {
        return "";
    }
};

export const executeCommand = (
    channel: string,
    args: string[],
    tags: ChatUserstate,
    textFunc: string,
) => {
    const func = new Function("channel", "tags", "args", textFunc);

    return z.coerce.string().parse(func(channel, tags, args));
};
