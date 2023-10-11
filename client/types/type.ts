export interface MsgType {
    id: string;
    userId: string;
    timestamp: number;
    text: string;
}

export interface MsgItemProps {
    id: string;
    userId: string;
    timestamp: number;
    text: string;
    onUpdate: (text: string, id: string) => void;
    isEditing: boolean;
    startEdit: () => void;
    onDelete: () => void;
    myId: string | string[];
}
