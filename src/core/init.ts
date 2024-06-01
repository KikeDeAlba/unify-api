import { getActiveChannels } from "@/services/postgresql/channels"
import { BotService } from "@/services/twicth/bot.controller"
import { getPrefix } from "./prefix"
import { onCommand } from "./commands"

export const bot = new BotService({
    channels: [],
    getPrefix,
    onCommand
})

export const initUnify = async () => {
    const channels = await getActiveChannels()

    for (const channel of channels) {
        bot.addChannel(channel)
    }

    bot.connect()

    console.log('Bot is running')
}