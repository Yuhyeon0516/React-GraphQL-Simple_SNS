import fs from 'fs';
import { resolve } from 'path';
import { MsgType } from './types/type';

const basePath = resolve();

const filenames = {
    messages: resolve(basePath, 'src/db/messages.json'),
    users: resolve(basePath, 'src/db/users.json'),
};

type Target = 'messages' | 'users';

export function readDB(target: Target): MsgType[] {
    try {
        return JSON.parse(fs.readFileSync(filenames[target], 'utf-8'));
    } catch (error) {
        console.log(error);
    }
}

export function writeDB(target: Target, data: any) {
    try {
        return fs.writeFileSync(filenames[target], JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
}
