import { TypeCheck } from './type-check.js';

/**
 * FullCopy: Deep clone of any value (Date, RegExp, Map, Array...), preserving structure and reference safety.
 * @param value The value to clone
 * @returns A deep-cloned version of the value
 */
export const FullCopy = <T>(value: T, seen = new WeakMap()): T => {
  if (value === null || typeof value !== 'object') return value;

  if (seen.has(value)) return seen.get(value);

  const [type] = TypeCheck(value);
  let clone: any;

  switch (type) {
    case 'date':
      return new Date((value as unknown as Date).getTime()) as T;

    case 'regexp':
      return new RegExp(value as unknown as RegExp) as T;

    case 'map':
      clone = new Map();
      seen.set(value, clone);
      for (const [k, v] of (value as unknown as Map<any, any>).entries()) {
        clone.set(FullCopy(k, seen), FullCopy(v, seen));
      }
      return clone as T;

    case 'set':
      clone = new Set();
      seen.set(value, clone);
      for (const val of (value as unknown as Set<any>).values()) {
        clone.add(FullCopy(val, seen));
      }
      return clone as T;

    case 'array':
      clone = [];
      seen.set(value, clone);
      for (const item of value as unknown as any[]) {
        clone.push(FullCopy(item, seen));
      }
      return clone as T;

    case 'object':
      clone = {};
      seen.set(value, clone);
      for (const key of Object.keys(value)) {
        const desc = Object.getOwnPropertyDescriptor(value, key);
        if (desc) {
          if ('value' in desc) {
            desc.value = FullCopy((value as any)[key], seen);
          }
          Object.defineProperty(clone, key, desc);
        }
      }
      return clone as T;

    default:
      return value;
  }
};
