import { genSaltSync, hash } from "bcrypt";

export const getAccessToken = async (username: string) => {
    const token = await hash(username, genSaltSync());

    return token;
};

export const getRefreshToken = async () => {
    const token = await hash(Math.random().toString(), genSaltSync());

    return token;
};