import React from 'react';
import { MsgItemProps } from '../types/type';
import MsgInput from './MsgInput';

export default function MsgItem({ id, userId, timestamp, text, onUpdate, isEditing, startEdit, onDelete, myId }: MsgItemProps) {
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

            {isEditing ? (
                <>
                    <MsgInput text={text} mutate={onUpdate} id={id} />
                </>
            ) : (
                text
            )}
            {myId === userId && (
                <div className="messages__buttons">
                    <button onClick={startEdit}>수정</button>
                    <button onClick={onDelete}>삭제</button>
                </div>
            )}
        </li>
    );
}
