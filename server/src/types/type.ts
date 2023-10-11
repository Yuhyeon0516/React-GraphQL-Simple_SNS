import { Request, Response } from 'express';

export interface MessagesRouteType {
    method: string;
    route: string;
    handler: (req: Request, res: Response) => void;
}

export interface MsgType {
    id: string;
    userId: string;
    timestamp: number;
    text: string;
}
