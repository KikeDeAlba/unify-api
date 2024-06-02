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
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const channels = await getActiveChannels()

        console.log(channels)

        for (const channel of channels) {
            bot.addChannel(channel)
        }


    } catch (error) {
        console.error(error)
        process.exit(1)
    }

}