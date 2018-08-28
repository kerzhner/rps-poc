import { Drizzle } from 'drizzle';

export let drizzle: Drizzle;

export function initDrizzle(store: any, drizzleOptions: any) {
  drizzle = new Drizzle(drizzleOptions, store);
  return drizzle;
}
