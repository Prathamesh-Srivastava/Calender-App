import { Controller, Get, Post, Body } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './event.entity';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  createEvent(@Body() eventData: Omit<Event, 'id'>): Event {
    return this.eventsService.createEvent(eventData);
  }

  @Get()
  getEvents(): Event[] {
    return this.eventsService.getEvents();
  }
}
