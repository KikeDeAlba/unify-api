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
})