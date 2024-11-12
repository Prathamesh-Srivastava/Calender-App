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

  updateEvent(id: number, updatedData: Partial<Event>): Event {
    const event = this.getEventById(id);
    Object.assign(event, updatedData);
    return event;
  }

  deleteEvent(id: number): void {
    const index = this.events.findIndex(e => e.id === id);
    if (index === -1) throw new NotFoundException('Event not found');
    this.events.splice(index, 1);
  }
}
