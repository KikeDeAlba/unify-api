import { listenChannelSQL } from "orm/functions/channels/listen-channel";
import { getAccessToken, getRefreshToken } from "../utils/tokens";

export const listenChannel = async (channel: string, accessToken: string) => {
    await listenChannelSQL(channel, accessToken);
};
