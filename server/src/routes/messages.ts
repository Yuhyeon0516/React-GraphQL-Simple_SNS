import { v4 } from 'uuid';
import { readDB, writeDB } from '../dbController';
import { MessagesRouteType, MsgType } from '../types/type';

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
            const { body } = req;
            const msgs = readDB('messages');
            const newMsg: MsgType = {
                id: v4(),
                text: body.text,
                userId: body.userId,
                timestamp: Date.now(),
            };

            msgs.unshift(newMsg);
            writeDB('messages', msgs);
            res.send(newMsg);
        },
    },
    {
        // update message
        method: 'put',
        route: '/messages/:id',
        handler: (req, res) => {
            const msgs = readDB('messages');
            res.send();
        },
    },
    {
        // delete message
        method: 'delete',
        route: '/messages/:id',
        handler: (req, res) => {
            const msgs = readDB('messages');
            res.send();
        },
    },
];

export default messagesRoute;
