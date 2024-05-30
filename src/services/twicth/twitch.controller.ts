import type { RChannelInfo, RUserInfo, RValidateToken } from "./twitch.types";
import tmi from "tmi.js";

export class TwitchService {
    getAuthUrl(redirectUri: string) {
        const scopes = ["channel:read:subscriptions"];

        const authUrl = "https://id.twitch.tv/oauth2/authorize";
        const url = new URL(authUrl);
        url.searchParams.set("client_id", process.env.TWITCH_CLIENT_ID ?? "");
        url.searchParams.set("redirect_uri", redirectUri);
        url.searchParams.set("response_type", "token");
        url.searchParams.set("scope", scopes.join(" "));
        return url.toString();
    }

    async validateToken(token: string) {
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

        return data
    }

    async getChannelInfo(userId: string, accesToken: string) {
        const channelUrl = 'https://api.twitch.tv/helix/channels'

        const url = new URL(channelUrl);
        url.searchParams.set('broadcaster_id', userId);

        const clientId = process.env.TWITCH_CLIENT_ID ?? '';

        const headers = new Headers();
        headers.append('Authorization', `Bearer ${accesToken}`);
        headers.append('Client-ID', clientId);

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            throw new Error('Invalid token');
        }

        const data = (await response.json()) as RChannelInfo;

        return data.data[0]
    }

    async getUserInfo(userId: string, accesToken: string) {
        const userUrl = 'https://api.twitch.tv/helix/users'

        const url = new URL(userUrl);
        url.searchParams.set('id', userId);

        const clientId = process.env.TWITCH_CLIENT_ID ?? '';

        const headers = new Headers();
        headers.append('Authorization', `Bearer ${accesToken}`);
        headers.append('Client-ID', clientId);

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            throw new Error('Invalid token');
        }

        const data = (await response.json()) as RUserInfo;

        return data.data[0]
    }

    listenChat(username: string, cb: (props: { tags: tmi.ChatUserstate; message: string }) => void) {
        const tmiClient = new tmi.client({
            channels: [username]
        })

        tmiClient.connect()

        tmiClient.on('message', (channel, tags, message, self) => {
            if (self) return

            cb({
                tags,
                message
            })
        })
    }

    async sendMessage(username: string, message: string, oauth: string, bot = 'UnifyOfficialBot') {
        const tmiClient = new tmi.client({
            channels: [username],
            identity: {
                username: bot,
                password: oauth
            },
        })

        await tmiClient.connect()

        const res = await tmiClient.say(username, message)

        return res
    }
}
