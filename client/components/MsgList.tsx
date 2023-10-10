import React, { useEffect, useState } from 'react';
import { MsgType } from '../types/type';
import MsgItem from './MsgItem';

const UserIds = ['roy', 'jay'];

function getRandomUserId() {
    return UserIds[Math.round(Math.random())];
}

export default function MsgList() {
    const [msgs, setMsgs] = useState<MsgType[]>([]);

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

    return (
        <ul className="messages">
            {msgs.map((msg) => (
                <MsgItem key={msg.id} {...msg} />
            ))}
        </ul>
    );
}
