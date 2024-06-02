import type { RValidateToken } from "./bot.types";

export async function validateToken(token: string) {
    const validateUrl = "https://id.twitch.tv/oauth2/validate";

    const headers = new Headers();
    headers.append("Authorization", `OAuth ${token}`);

    const response = await fetch(validateUrl, {
        method: "GET",
        headers,
    });

    if (!response.ok) {
        throw new Error("Invalid token");
    }

    const data = (await response.json()) as RValidateToken;

    return data;
}
