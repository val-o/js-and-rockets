import * as A from 'fp-ts/Array';
import { pipe, Predicate } from 'fp-ts/lib/function';
import { and } from './utils/predicate';
import * as Launch from './Launch';

export const prepareData = (data: Launch.Launch[]) =>
  pipe(
    data,
    A.filter(and(Launch.ofYear('2018'), Launch.hasPayloadOf('NASA'))),
    A.sortBy([Launch.ordByPayloadsInv, Launch.ordByChronologyInv]),
    A.map(Launch.toDisplayModel)
  );
