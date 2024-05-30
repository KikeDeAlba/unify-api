import { expect, test, describe } from "vitest";
import { parseLocalUrl } from "./utils/parseLocalUrl";

describe("Channels test", async () => {
    //https://unify-bot.vercel.app/api/auth/twitch#access_token=4kyj8j44bkxglrbxg6jakqe25r4zna&scope=channel%3Aread%3Asubscriptions&token_type=bearer
    const accessTokenLocal = "4kyj8j44bkxglrbxg6jakqe25r4zna";

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
        const res = await fetch(parseLocalUrl("/channels/unlisten?channel=akozl"), {
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
        ).toBeUndefined();
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
