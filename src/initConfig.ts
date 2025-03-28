import path from 'path';
import { fileURLToPath } from 'url';
import { fs } from './imports.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface Config {
    port: number;
    user: string;
    password: string;
}
const configDir = path.join(__dirname, 'configs');
export const configPath = path.join(configDir, 'config.json');

export async function saveConfig(config: Config) {
    try {
        await fs.mkdir(configDir, { recursive: true });
        await fs.writeFile(configPath, JSON.stringify(config, null, 2));
    } catch (err) {
        console.error('Ошибка записи:', err);
    }
}