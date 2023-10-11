import React, { useRef } from 'react';

export default function MsgInput({
    mutate,
    id = undefined,
    text,
}: {
    mutate: ((text: string) => void) | ((text: string, id?: string) => void);
    id?: string | undefined;
    text: string;
}) {
    const textRef = useRef<HTMLTextAreaElement | null>(null);

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        e.stopPropagation();

        const text = textRef.current.value;
        textRef.current.value = '';
        mutate(text, id);
    }

    return (
        <form className="messages__input" onSubmit={onSubmit}>
            <textarea ref={textRef} defaultValue={text} placeholder="내용을 입력하세요." />
            <button type="submit">완료</button>
        </form>
    );
}
