import React, { useEffect, useState } from 'react';
import { MsgType } from '../types/type';
import MsgItem from './MsgItem';
import MsgInput from './MsgInput';
import fetcher from '../utils/fetcher';
import { useRouter } from 'next/router';

export default function MsgList() {
    const {
        query: { userId = '' },
    } = useRouter();
    const [msgs, setMsgs] = useState<MsgType[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);

    async function onCreate(text: string) {
        const newMsg = await fetcher.post('/messages', {
            text: text,
            userId: userId,
        });

        setMsgs((msgs) => [newMsg.data, ...msgs]);
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

    async function getMessages() {
        const msgs = await fetcher.get('/messages');
        setMsgs(msgs.data);
    }

    useEffect(() => {
        getMessages();
    }, []);

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
                        myId={userId}
                    />
                ))}
            </ul>
        </>
    );
}
