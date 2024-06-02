import { createChatCompletion } from "@/services/ollama/ollama.controller";
import { findCommand } from "@/services/postgresql/channels";
import type { OnCommandF } from "@/services/twicth/bot.types";
import type OpenAI from "openai";
import type { ChatUserstate } from "tmi.js";
import { z } from "zod";

export const onCommand: OnCommandF = async (channel, command, args, tags) => {
    try {
        console.log(channel, command, args, tags);

        const commandFromDb = await findCommand(channel, command);

        console.log(commandFromDb);

        return await executeCommand(channel, args, tags, commandFromDb.function);
    } catch (error) {
        return "";
    }
};

export const executeCommand = async (
    channel: string,
    args: string[],
    tags: ChatUserstate,
    textFunc: string,
) => {
    // Define the function as async and use eval to create the function
    // biome-ignore lint/security/noGlobalEval: <explanation>
    const func = eval(
        `(async function(channel, tags, args, ai) { ${textFunc} })`,
    ) as (
        channel: string,
        tags: ChatUserstate,
        args: string[],
        ai: (
            messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
        ) => Promise<string>,
    ) => Promise<string>;

    // Await the execution of the async function
    const result = await func(channel, tags, args, createChatCompletion);

    return z.coerce
        .string()
        .parse(result);
};
