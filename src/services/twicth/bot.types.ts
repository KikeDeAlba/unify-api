import type { ChatUserstate } from "tmi.js";

export type GetPrefixF = (channel: string) => Promise<string>;
export type OnCommandF = (
    channel: string,
    command: string,
    args: string[],
    tags: ChatUserstate,
) => Promise<string>;

export type PBotService = {
    channels: string[];
    getPrefix: GetPrefixF;
    onCommand: OnCommandF
};
