import type { UtilEventEmitter } from '../types';

export class EventEmitter<T extends Record<string, any>> implements UtilEventEmitter<T>{ 
  #listeners: Map<keyof T, ((e: any) => void)[]>;

  constructor() {
    this.#listeners = new Map<keyof T, ((e: any) => void)[]>();
  }

  on<K extends keyof T>(eventKey: K, callback: (e: T[K]) => void) {
      if (this.#listeners.has(eventKey)) {
        const callbacks: Array<(e: T[K]) => void> = this.#listeners.get(eventKey) || [];
        callbacks?.push(callback);
        this.#listeners.set(eventKey, callbacks);
      } else {
        this.#listeners.set(eventKey, [callback]);
      }
  }
  off<K extends keyof T>(eventKey: K, callback: (e: T[K]) => void): void {
    throw new Error('Method not implemented.');
  }
  trigger<K extends keyof T>(eventKey: K, e: T[K]): void {
    throw new Error('Method not implemented.');
  }
  has<K extends keyof T>(name: string | K): boolean {
    throw new Error('Method not implemented.');
  }
}