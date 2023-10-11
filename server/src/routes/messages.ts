import { Request, Response } from 'express';
import { readDB } from '../dbController';

interface MessagesRouteType {
    method: string;
    route: string;
    handler: (req: Request, res: Response) => void;
}

const messagesRoute: MessagesRouteType[] = [
    {
        // get message
        method: 'get',
        route: '/messages',
        handler: (req, res) => {
            const msgs = readDB('messages');
            res.send(msgs);
        },
    },
    {
        // create message
        method: 'post',
        route: '/messages',
        handler: (req, res) => {
            res.send();
        },
    },
    {
        // update message
        method: 'put',
        route: '/messages/:id',
        handler: (req, res) => {
            res.send();
        },
    },
    {
        // delete message
        method: 'delete',
        route: '/messages/:id',
        handler: (req, res) => {
            res.send();
        },
    },
];

export default messagesRoute;
