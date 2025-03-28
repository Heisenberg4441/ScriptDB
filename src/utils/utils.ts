import { config } from "../index.js";

export const checkUserAuth = async (user: string, password: string) => {
    try {
        if (config.user === user && config.password === password) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.log(e);
        return false;
    }
}
