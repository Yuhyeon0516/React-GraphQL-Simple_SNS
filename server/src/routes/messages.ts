import { v4 } from 'uuid';
import { readDB, writeDB } from '../dbController';
import { RouteType, MsgType } from '../types/type';

const messagesRoute: RouteType[] = [
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
            const {
                body,
                params: { id },
            } = req;

            try {
                const msgs = readDB('messages');
                const targetIndex = msgs.findIndex((msg) => msg.id === id);
                if (targetIndex < 0) throw '메시지가 없습니다.';
                if (msgs[targetIndex].userId === body.userId) throw '사용자가 다릅니다.';

                const newMsg = { ...msgs[targetIndex], text: body.text };
                msgs.splice(targetIndex, 1, newMsg);
                writeDB('messages', msgs);
                res.send(newMsg);
            } catch (error) {
                res.status(500).send({ error: error });
            }
        },
    },
    {
        // delete message
        method: 'delete',
        route: '/messages/:id',
        handler: (req, res) => {
            const {
                body,
                params: { id },
            } = req;

            try {
                const msgs = readDB('messages');
                const targetIndex = msgs.findIndex((msg) => msg.id === id);
                if (targetIndex < 0) throw '메시지가 없습니다.';
                if (msgs[targetIndex].userId === body.userId) throw '사용자가 다릅니다.';

                msgs.splice(targetIndex, 1);
                writeDB('messages', msgs);
                res.send(id);
            } catch (error) {
                res.status(500).send({ error: error });
            }
        },
    },
];

export default messagesRoute;
