import * as A from 'fp-ts/Array';
import { pipe } from 'fp-ts/lib/function';
import * as Launch from './Launch';
import { and } from './utils/predicate';

export const prepareData = (data: Launch.Launch[]) =>
  pipe(
    data,
    A.filter(and(Launch.ofYear('2018'), Launch.hasPayloadOf('NASA'))),
    A.sortBy([Launch.ordByPayloadsInv, Launch.ordByChronologyInv]),
    A.map(Launch.toDisplayModel)
  );
