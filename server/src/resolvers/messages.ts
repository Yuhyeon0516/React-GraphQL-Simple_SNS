import { v4 } from 'uuid';
import { writeDB } from '../dbController';
import { MsgType } from '../types/type';

/*
obj: parent 개체,
args: Query에 필요한 필드에 제공되는 인수(Parameter)
context: 로그인한 사용자, DB Access 등의 중요 정보
*/
const messagesResolver = {
    Query: {
        messages: (parent, args, { db }) => {
            return db.messages;
        },
        message: (parent, { id = '' }, { db }) => {
            return db.messages.find((msg) => msg.id === id);
        },
    },
    Mutation: {
        createMessage: (parent, { text, userId }, { db }) => {
            const newMsg: MsgType = {
                id: v4(),
                text: text,
                userId: userId,
                timestamp: Date.now(),
            };

            db.messages.unshift(newMsg);
            writeDB('messages', db.messages);

            return newMsg;
        },
        updateMessage: (parent, { id, text, userId }, { db }) => {
            const targetIndex = db.messages.findIndex((msg) => msg.id === id);

            if (targetIndex < 0) throw '메시지가 없습니다.';
            if (db.messages[targetIndex].userId !== userId) throw '사용자가 다릅니다.';

            const newMsg = { ...db.messages[targetIndex], text: text };
            db.messages.splice(targetIndex, 1, newMsg);
            writeDB('messages', db.messages);
            return newMsg;
        },
        deleteMessage: (parent, { id, userId }, { db }) => {
            const targetIndex = db.messages.findIndex((msg) => msg.id === id);
            if (targetIndex < 0) throw '메시지가 없습니다.';
            if (db.messages[targetIndex].userId !== userId) throw '사용자가 다릅니다.';

            db.messages.splice(targetIndex, 1);
            writeDB('messages', db.messages);
            return id;
        },
    },
};

export default messagesResolver;
