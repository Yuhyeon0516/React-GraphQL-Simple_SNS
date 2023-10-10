import React, { useRef } from 'react';

export default function MsgInput({ mutate }: { mutate: (text: string) => void }) {
    const textRef = useRef<HTMLTextAreaElement | null>(null);

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        e.stopPropagation();

        const text = textRef.current.value;
        textRef.current.value = '';
        mutate(text);
    }

    return (
        <form className="messages__input" onSubmit={onSubmit}>
            <textarea ref={textRef} placeholder="내용을 입력하세요." />
            <button type="submit">완료</button>
        </form>
    );
}
