import React, { useEffect, useState } from 'react';
import { MsgType } from '../types/type';
import MsgItem from './MsgItem';
import MsgInput from './MsgInput';

const UserIds = ['roy', 'jay'];

function getRandomUserId() {
    return UserIds[Math.round(Math.random())];
}

export default function MsgList() {
    const [msgs, setMsgs] = useState<MsgType[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        setMsgs(
            Array(50)
                .fill(0)
                .map((_, index) => ({
                    id: index + 1,
                    userId: getRandomUserId(),
                    timestamp: 1234567890123 + index * 1000 * 60,
                    text: `${index + 1} mock text`,
                }))
                .reverse(),
        );
    }, []);

    function onCreate(text: string) {
        const newMsg: MsgType = {
            id: msgs.length + 1,
            userId: getRandomUserId(),
            timestamp: Date.now(),
            text: `${msgs.length + 1} ${text}`,
        };

        setMsgs((msgs) => [newMsg, ...msgs]);
    }

    function onUpdate(text: string, id: number) {
        setMsgs((msgs) => {
            const targetIndex = msgs.findIndex((msg) => msg.id === id);
            if (targetIndex < 0) return msgs;

            const newMsgs = [...msgs];
            newMsgs.splice(targetIndex, 1, {
                ...msgs[targetIndex],
                text,
            });

            return newMsgs;
        });

        doneEdit();
    }

    function doneEdit() {
        setEditingId(null);
    }

    function onDelete(id: number) {
        setMsgs((msgs) => {
            const targetIndex = msgs.findIndex((msg) => msg.id === id);
            if (targetIndex < 0) return msgs;

            const newMsgs = [...msgs];
            newMsgs.splice(targetIndex, 1);

            return newMsgs;
        });
    }

    return (
        <>
            <MsgInput mutate={onCreate} text="" />
            <ul className="messages">
                {msgs.map((msg) => (
                    <MsgItem
                        key={msg.id}
                        {...msg}
                        onUpdate={onUpdate}
                        startEdit={() => setEditingId(msg.id)}
                        isEditing={editingId === msg.id}
                        onDelete={() => onDelete(msg.id)}
                    />
                ))}
            </ul>
        </>
    );
}
