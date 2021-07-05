import { Predicate } from 'fp-ts/lib/function';

export const and = <T>(p1: Predicate<T>, p2: Predicate<T>): Predicate<T> => (arg: T) =>
  p1(arg) && p2(arg);
