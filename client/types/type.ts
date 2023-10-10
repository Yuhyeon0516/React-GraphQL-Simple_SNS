export interface MsgType {
    id: number;
    userId: string;
    timestamp: number;
    text: string;
}

export interface MsgItemProps {
    id: number;
    userId: string;
    timestamp: number;
    text: string;
    onUpdate: (text: string, id: number) => void;
    isEditing: boolean;
    startEdit: () => void;
    onDelete: () => void;
}
