export class Event {
  id: number;
  title: string;
  date: Date;
  description?: string;
  media?: { url: string; type: 'image' | 'video' };
  }
  