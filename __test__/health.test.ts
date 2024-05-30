import { expect, test } from "vitest";
import { parseLocalUrl } from "./utils/parseLocalUrl";

test('health', async () => {
    const res = await fetch(parseLocalUrl('/health'))
    expect(res.status).toBe(200)
})