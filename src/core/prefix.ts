import type { GetPrefixF } from "@/services/twicth/bot.types";
import { getPrefix as getPrefixFromDb } from "@/services/postgresql/channels";

export const getPrefix: GetPrefixF = async (channel) => {
    const prefix = await getPrefixFromDb(channel)

    return prefix
};
