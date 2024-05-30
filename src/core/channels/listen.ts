import { listenChannelSQL } from "orm/functions/listen-channel";

export const listenChannel = async (channel: string) => {
    await listenChannelSQL(channel);
};
