import { executeCommand } from "@/core/commands";
import { getPrefix } from "@/core/prefix";
import { describe, expect, test } from "vitest";

describe("Bot test", async () => {
    test('get prefix', async () => {
        const prefix = await getPrefix('akozl')

        expect(prefix).toBe('UnifyOfficialBot ')
    })

    test('execute command function', async () => {
        const returnMessage = await executeCommand('akozl', [], { username: 'akozl' }, `
            return tags.username
        `)

        expect(returnMessage).toBe('akozl')
    })
})