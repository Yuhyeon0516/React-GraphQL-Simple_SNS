import React, { useEffect, useRef, useState } from 'react';
import { MsgType } from '../types/type';
import MsgItem from './MsgItem';
import MsgInput from './MsgInput';
import fetcher from '../utils/fetcher';
import { useRouter } from 'next/router';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

export default function MsgList() {
    const {
        query: { userId = '' },
    } = useRouter();
    const [msgs, setMsgs] = useState<MsgType[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [hasNext, setHasNext] = useState(true);
    const fetchMoreEl = useRef(null);
    const intersecting = useInfiniteScroll(fetchMoreEl);

    async function onCreate(text: string) {
        const newMsg = await fetcher.post('/messages', {
            text: text,
            userId: userId,
        });

        if (!newMsg) return;

        setMsgs((msgs) => [newMsg.data, ...msgs]);
    }

    async function onUpdate(text: string, id: string) {
        const newMsg = await fetcher.put(`/messages/${id}`, {
            text: text,
            userId: userId,
        });

        if (!newMsg.data) return;

        setMsgs((msgs) => {
            const targetIndex = msgs.findIndex((msg) => msg.id === id);
            if (targetIndex < 0) return msgs;

            const newMsgs = [...msgs];
            newMsgs.splice(targetIndex, 1, newMsg.data);

            return newMsgs;
        });

        doneEdit();
    }

    function doneEdit() {
        setEditingId(null);
    }

    async function onDelete(id: string) {
        const { data: receivedId } = await fetcher.put(`/messages/delete/${id}`, {
            userId: userId,
        });

        setMsgs((msgs) => {
            const targetIndex = msgs.findIndex((msg) => msg.id === JSON.stringify(receivedId));
            if (targetIndex < 0) return msgs;

            const newMsgs = [...msgs];
            newMsgs.splice(targetIndex, 1);

            return newMsgs;
        });
    }

    async function getMessages() {
        const newMsgs = await fetcher.get('/messages', { params: { cursor: msgs[msgs.length - 1]?.id || '' } });
        if (newMsgs.data.length === 0) {
            setHasNext(false);
            return;
        }
        setMsgs((msgs) => [...msgs, ...newMsgs.data]);
    }

    useEffect(() => {
        if (intersecting && hasNext) getMessages();
    }, [intersecting]);

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
            <div ref={fetchMoreEl}></div>
        </>
    );
}
