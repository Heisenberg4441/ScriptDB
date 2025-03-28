// src/index.ts
import readline from 'readline';
import { configPath, saveConfig } from './initConfig.js';
import { fs } from './imports.js';
import { Config } from "./types/types.js";
import { server } from './kernel.js';

export let config: Config
try {
    const preConfig: Config = JSON.parse(await fs.readFile(configPath, "utf-8"));
    config = preConfig
} catch (e) {
    console.log(e)
}

async function askQuestion(question: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

async function setupConfig(): Promise<Config> {
    let port: number;
    while (true) {
        const portAnswer = await askQuestion('Enter default port\n');
        port = parseInt(portAnswer);
        if (!isNaN(port)) break;
        console.log('Invalid port. Please enter a number');
    }

    const user = await askQuestion('Enter default user\n');
    const password = await askQuestion('Enter default password\n');

    return { port, user, password };
}

function initServer() {
    const port = config.port
    server.listen(port, () => {
        console.log(`Server started on port ${port}`)
    })
}

async function main() {
    try {
        if ((await fs.readFile(configPath)).length > 0) {
            console.log('Config file already created!');
            initServer();
        } else {
            const config = await setupConfig();
            console.log('\nDone!');
            console.log(`You can connect to db by ${config.user}|${config.password}`);
            await saveConfig(config);
            initServer();
        }
    } catch (e) {
        const config = await setupConfig();
        console.log('\nDone!');
        console.log(`You can connect to db by ${config.user}|${config.password}`);
        await saveConfig(config);
        initServer();
    }
}

main();

import './middlewares/security.middleware.js';
import './controllers/index.controller.js';