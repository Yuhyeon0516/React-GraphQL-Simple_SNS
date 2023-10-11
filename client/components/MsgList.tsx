import React, { useEffect, useRef, useState } from 'react';
import { MsgType } from '../types/type';
import MsgItem from './MsgItem';
import MsgInput from './MsgInput';
import { useRouter } from 'next/router';
import { QueryKeys, fetcher } from '../utils/queryClient';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CREATE_MESSAGE, DELETE_MESSAGE, GET_MESSAGES, UPDATE_MESSAGE } from '../graphql/messages';

export default function MsgList({ smsgs, users }) {
    const client = useQueryClient();
    const {
        query: { userId = '' },
    } = useRouter();
    const [msgs, setMsgs] = useState<MsgType[]>(smsgs);
    const [editingId, setEditingId] = useState<string | null>(null);
    const fetchMoreEl = useRef(null);

    function doneEdit() {
        setEditingId(null);
    }

    const { mutate: onCreate } = useMutation(({ text }: { text: string }) => fetcher(CREATE_MESSAGE, { text, userId }), {
        onSuccess: ({ createMessage }) => {
            client.setQueryData(QueryKeys.MESSAGES, (old: any) => {
                if (!old) return { pages: [{ messages: [createMessage] }], pageParams: '' };
                return {
                    messages: [createMessage, ...old.messages],
                };
            });
        },
    });

    const { mutate: onUpdate } = useMutation(({ text, id }: { text: string; id: string }) => fetcher(UPDATE_MESSAGE, { text, id, userId }), {
        onSuccess: ({ updateMessage }) => {
            client.setQueryData(QueryKeys.MESSAGES, (old: any) => {
                const targetIndex = old.messages.findIndex((msg) => msg.id === updateMessage.id);
                if (targetIndex < 0) return old;

                const newMsgs = [...old.messages];
                newMsgs.splice(targetIndex, 1, updateMessage);
                return { messages: newMsgs };
            });

            doneEdit();
        },
    });

    const { mutate: onDelete } = useMutation((id: string) => fetcher(DELETE_MESSAGE, { id, userId }), {
        onSuccess: ({ deleteMessage }) => {
            client.setQueryData(QueryKeys.MESSAGES, (old: any) => {
                const targetIndex = old.messages.findIndex((msg) => msg.id === deleteMessage);
                if (targetIndex < 0) return old;

                const newMsgs = [...old.messages];
                newMsgs.splice(targetIndex, 1);
                return { messages: newMsgs };
            });
        },
    });

    const { data, error, isError }: { data: any; error: any; isError: any } = useQuery(QueryKeys.MESSAGES, () => fetcher(GET_MESSAGES));

    useEffect(() => {
        if (!data?.messages) return;
        setMsgs(data?.messages || []);
    }, [data?.messages]);

    if (isError) return null;

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
