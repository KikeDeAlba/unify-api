import { listenChannelSQL } from "orm/functions/channels/listen-channel";

export const listenChannel = async (channel: string) => {
    await listenChannelSQL(channel);
};
