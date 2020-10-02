import events from 'events';
import { Parameters, StringKeys } from '../definitions';

/**
 * A wrapper for the nodeJS `events.EventEmitter` which provides typed event signatures
 * for the different methods.
 *
 * @template T An interface with keys corresponding to the supported events, and the values
 * being the respective event listener definitions.
 */
export abstract class EventEmitter<T> extends events.EventEmitter {
  addListener<Key extends StringKeys<keyof T>>(
    key: Key,
    listener: (...args: Parameters<T[Key]>) => void
  ) {
    return super.addListener(key, listener as (...args: any[]) => void);
  }

  emit<Key extends StringKeys<keyof T>>(key: Key, ...args: Parameters<T[Key]>) {
    return super.emit(key, ...(args as any[]));
  }

  listenerCount(key: StringKeys<keyof T>) {
    return super.listenerCount(key);
  }

  off<Key extends StringKeys<keyof T>>(
    key: Key,
    listener: (...args: Parameters<T[Key]>) => void
  ) {
    return super.off(key, listener as (...args: any[]) => void);
  }

  on<Key extends StringKeys<keyof T>>(
    key: Key,
    listener: (...args: Parameters<T[Key]>) => void
  ) {
    return super.on(key, listener as (...args: any[]) => void);
  }

  once<Key extends StringKeys<keyof T>>(
    key: Key,
    listener: (...args: Parameters<T[Key]>) => void
  ) {
    return super.once(key, listener as (...args: any[]) => void);
  }

  removeAllListeners(key?: StringKeys<keyof T>) {
    return super.removeAllListeners(key);
  }

  removeListener<Key extends StringKeys<keyof T>>(
    key: Key,
    listener: (...args: Parameters<T[Key]>) => void
  ) {
    return super.removeListener(key, listener as (...args: any[]) => void);
  }
}
