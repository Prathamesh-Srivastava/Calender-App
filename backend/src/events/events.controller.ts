import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
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

  @Get(':id')
  getEvent(@Param('id') id: string): Event {
    return this.eventsService.getEventById(Number(id));
  }

  @Patch(':id')
  updateEvent(@Param('id') id: string, @Body() updatedData: Partial<Event>): Event {
    return this.eventsService.updateEvent(Number(id), updatedData);
  }

  @Delete(':id')
  deleteEvent(@Param('id') id: string): void {
    return this.eventsService.deleteEvent(Number(id));
  }
}
