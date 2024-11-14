export declare class Event {
    id: number;
    title: string;
    date: Date;
    time?: string; 
    description?: string;
    media?: {
        url: string;
        type: 'image' | 'video';
    };
}
