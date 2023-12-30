import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventPayloads } from '../interface/event-types.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypedEventEmitter {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  emit<K extends keyof EventPayloads>(
    event: K extends string ? K : never,
    payload: EventPayloads[K],
  ): boolean {
    return this.eventEmitter.emit(event, payload);
  }
}
