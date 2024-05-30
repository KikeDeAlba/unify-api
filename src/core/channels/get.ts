import { getChannelsSQL } from "orm/functions/channels/get-channels"

export const getChannels = async () => {
    const channels = await getChannelsSQL()

    return channels
}