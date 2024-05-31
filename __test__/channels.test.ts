import { expect, test, describe } from "vitest";
import { parseLocalUrl } from "./utils/parseLocalUrl";
import * as dotenv from 'dotenv'
dotenv.config()

describe("Channels test", async () => {
    const accessTokenLocal = process.env.TWITCH_TOKEN ?? ''

    test("Get channels", async () => {
        const res = await fetch(parseLocalUrl("/channels"));
        expect(res.status).toBe(200);
    });

    test("listen channel", async () => {
        const res = await fetch(parseLocalUrl("/channels/listen"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessTokenLocal}`,
            },
        });

        expect(res.status).toBe(200);

        const channels = await fetch(parseLocalUrl("/channels"));
        const parsedValue = await channels.json();

        expect(
            parsedValue.find((c: { username: string }) => c.username === "akozl"),
        ).toBeDefined();
    });

    test("Get channel", async () => {
        const res = await fetch(parseLocalUrl("/channels/akozl"));
        expect(res.status).toBe(200);
    });

    test("is listening channel", async () => {
        const listeningOn = await fetch(
            parseLocalUrl("/channels/listening?channel=akozl"),
        );
        expect(listeningOn.status).toBe(200);

        const parsedValue = await listeningOn.json();

        expect(parsedValue.success).toBe(true);
    });

    test("unlisten channel", async () => {
        const res = await fetch(parseLocalUrl("/channels/unlisten"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessTokenLocal}`,
            },
        });

        expect(res.status).toBe(200);
    });

    test("is not listening channel", async () => {
        const listeningOff = await fetch(
            parseLocalUrl("/channels/listening?channel=akozl"),
        );
        expect(listeningOff.status).toBe(200);

        const parsedValue = await listeningOff.json();

        expect(parsedValue.success).toBe(false);
    });
});
