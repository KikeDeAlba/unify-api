import type { ChatUserstate } from "tmi.js";

export type GetPrefixF = (channel: string) => Promise<string>;
export type OnCommandF = (
    channel: string,
    command: string,
    args: string[],
    tags: ChatUserstate,
) => Promise<string>;

export type PBotService = {
    channels: string[];
    getPrefix: GetPrefixF;
    onCommand: OnCommandF
};

export type RValidateToken = {
    client_id: string;
    login: string;
    scopes: string[];
    user_id: string;
    expires_in: number;
};

export interface RChannelInfo {
    data: {
        broadcaster_id: string;
        broadcaster_login: string;
        broadcaster_name: string;
        broadcaster_language: string;
        game_id: string;
        game_name: string;
        title: string;
        delay: number;
        tags: string[];
        content_classification_labels: string[];
        is_branded_content: boolean;
    }[];
}

export interface RUserInfo {
    data: {
        id: string;
        login: string;
        display_name: string;
        type: string;
        broadcaster_type: string;
        description: string;
        profile_image_url: string;
        offline_image_url: string;
        view_count: number;
        email: string;
        created_at: string;
    }[];
}