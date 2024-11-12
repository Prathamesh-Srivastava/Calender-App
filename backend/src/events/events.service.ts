import { Injectable, NotFoundException } from '@nestjs/common';
import { Event } from './event.entity';

@Injectable()
export class EventsService {
  private events: Event[] = [];
  private idCounter = 1;

  createEvent(eventData: Omit<Event, 'id'>): Event {
    const newEvent = { id: this.idCounter++, ...eventData };
    this.events.push(newEvent);
    return newEvent;
  }

  getEvents(): Event[] {
    return this.events;
  }

  getEventById(id: number): Event {
    const event = this.events.find(e => e.id === id);
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  // Additional update and delete methods can be added here later
}
