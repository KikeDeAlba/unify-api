import { describe, expect, test } from "vitest";
import * as dotenv from 'dotenv'
import { parseLocalUrl } from "./utils/parseLocalUrl";
dotenv.config()

describe("Channels test", async () => {
    const accessTokenLocal = process.env.TWITCH_TOKEN ?? ''

    test('add channel', async () => {
        const res = await fetch(parseLocalUrl('/channels/join'), {
            headers: {
                'Content-Type': 'application/json',
                Cookie: `twitch-auth=${accessTokenLocal}`
            }
        });

        expect(res.status).toBe(200)
    })

    test('is listening', async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const res = await fetch(parseLocalUrl('/channels/listening/akozl'), {
            headers: {
                'Content-Type': 'application/json',
                Cookie: `twitch-auth=${accessTokenLocal}`
            }
        });

        expect(res.status).toBe(200)

        const resJson = await res.json()

        expect(resJson.data).toBe(true)
    })

    test('part channel', async () => {
        const res = await fetch(parseLocalUrl('/channels/part'), {
            headers: {
                'Content-Type': 'application/json',
                Cookie: `twitch-auth=${accessTokenLocal}`
            }
        });

        expect(res.status).toBe(200)
    })

    test('is not listening', async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const res = await fetch(parseLocalUrl('/channels/listening/akozl'), {
            headers: {
                'Content-Type': 'application/json',
                Cookie: `twitch-auth=${accessTokenLocal}`
            }
        });

        expect(res.status).toBe(200)

        const resJson = await res.json()

        expect(resJson.data).toBe(false)
    })

    test('add basic command', async () => {
        const randomNumber = Math.floor(Math.random() * 1000)

        const res = await fetch(parseLocalUrl('/channels/command'), {
            headers: {
                'Content-Type': 'application/json',
                Cookie: `twitch-auth=${accessTokenLocal}`
            },
            method: 'POST',
            body: JSON.stringify({
                command: `ping-${randomNumber}`,
                description: 'ping pong',
                code: `return 'pong! ${randomNumber}'`
            })
        });

        expect(res.status).toBe(200)
    })

    test('add ai command', async () => {
        const randomNumber = Math.floor(Math.random() * 1000)

        const res = await fetch(parseLocalUrl('/channels/command'), {
            headers: {
                'Content-Type': 'application/json',
                Cookie: `twitch-auth=${accessTokenLocal}`
            },
            method: 'POST',
            body: JSON.stringify({
                command: `ai-${randomNumber}`,
                description: 'hi!',
                code: `return ai([
                    {
                        role: "system",
                        content: "You are a twitch bot for the " + channel + " channel"
                    },
                    {
                        role: "user",
                        content: args.join(" ")
                    }
                ])`
            })
        });

        expect(res.status).toBe(200)
    })

    test('reset listening', async () => {
        const res = await fetch(parseLocalUrl('/channels/join'), {
            headers: {
                'Content-Type': 'application/json',
                Cookie: `twitch-auth=${accessTokenLocal}`
            }
        });

        expect(res.status).toBe(200)
    })
})