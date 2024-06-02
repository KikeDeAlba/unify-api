import { describe, expect, test } from "vitest";
import { parseLocalUrl } from "./utils/parseLocalUrl";

describe("Health test", async () => {
    test('health principal module', async () => {
        const res = await fetch(parseLocalUrl('/health'))
        expect(res.status).toBe(200)
    })

    test('health channels module', async () => {
        const res = await fetch(parseLocalUrl('/channels/health'))
        expect(res.status).toBe(200)
    })
})