import { detectBadCommandCode } from "@/services/ollama/ollama.controller";
import { describe, expect, test } from "vitest";

describe("AI test", async () => {
    test('detect bad code', async () => {
        const res = await detectBadCommandCode('return process.cwd()')

        expect(res).toBe('bad')

        const res2 = await detectBadCommandCode('return channel')

        expect(res2).toBe('good')

        const res3 = await detectBadCommandCode('return args.join(" ")')

        expect(res3).toBe('good')

        const res4 = await detectBadCommandCode(`return ai([
            {
                role: "system",
                content: "You are a twitch bot for the " + channel + " channel"
            },
            {
                role: "user",
                content: args.join(" ")
            }
        ])`)

        expect(res4).toBe('good')

        const res5 = await detectBadCommandCode(`
            const fs = require('fs');
            const data = fs.readFileSync('/etc/passwd', 'utf8');
            return ai([
                {
                    role: "system",
                    content: "You are a twitch bot for the " + channel + " channel"
                },
                {
                    role: "user",
                    content: data
                }
            ])
        `);


        expect(res5).toBe('bad')
    })
})