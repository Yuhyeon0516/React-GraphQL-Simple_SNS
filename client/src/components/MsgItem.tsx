import React from 'react';
import { MsgType } from '../types/type';

export default function MsgItem({ id, userId, timestamp, text }: MsgType) {
    return (
        <li className="messages__item">
            <h3>
                {userId}{' '}
                <sub>
                    {new Date(timestamp).toLocaleString('ko-KR', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                    })}
                </sub>
            </h3>
            {text}
        </li>
    );
}
