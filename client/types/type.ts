import { UseMutateFunction } from 'react-query';

export interface MsgType {
    id: string;
    userId: string;
    timestamp: number;
    text: string;
    user: User;
}

export interface MsgItemProps {
    id: string;
    userId: string;
    timestamp: number;
    text: string;
    onUpdate: any;
    isEditing: boolean;
    startEdit: () => void;
    onDelete: () => void;
    myId: string | string[];
}

export interface User {
    id: string;
    nickname: string;
}

export type Mutate = ({ text, id }: { text: string; id?: string }) => void;

export interface MsgQueryData {
    pages: { messages: MsgType[] }[];
    pageParams: string;
}

export interface Messages {
    messages: MsgType[] | null[];
}

export interface Users {
    users: User[];
}
