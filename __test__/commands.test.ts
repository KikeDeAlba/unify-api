import { describe, expect, test } from "vitest";
import * as dotenv from 'dotenv'
import { parseLocalUrl } from "./utils/parseLocalUrl";
dotenv.config()

describe('Commands test', () => {
    const accessTokenLocal = process.env.TWITCH_TOKEN ?? ''

    test('Get utilities functions', async () => {
        const res = await fetch(parseLocalUrl('/commands/utilities'))
        expect(res.status).toBe(200)
    })

    test('Create basic command', async () => {
        const res = await fetch(parseLocalUrl('/commands'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessTokenLocal}`,
            },
            body: JSON.stringify({
                type: 'basic',
                command: 'ping',
                description: 'Ping pong',
                response: 'pong',
            })
        })

        expect(res.status).toBe(200)
    })

    test('Create custom command', async () => {
        const res = await fetch(parseLocalUrl('/commands'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessTokenLocal}`,
            },
            body: JSON.stringify({
                type: 'custom',
                command: 'code-command',
                description: 'Code command',
                function: `
                    if (args[0] === 'hello') return 'world'

                    return 'not hello);'
                `
            })
        })

        expect(res.status).toBe(200)
    })

    test('Get commands', async () => {
        const res = await fetch(parseLocalUrl('/commands'))
        expect(res.status).toBe(200)
    })
})