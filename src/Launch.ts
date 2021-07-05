import * as Ord from 'fp-ts/Ord';
import * as DateF from 'fp-ts/Date';
import * as M from 'fp-ts/Monoid';
import * as Num from 'fp-ts/number';
import * as O from 'fp-ts/Option';
import * as NA from 'fp-ts/NonEmptyArray';
import * as A from 'fp-ts/Array';
import { flow, pipe } from 'fp-ts/lib/function';

//#region Definitions

export interface Launch {
  flight_number: number;
  mission_name: string;
  rocket:
    | {
        second_stage:
          | {
              payloads: {
                customers: string[];
              }[];
            }
          | undefined;
      }
    | undefined;
  launch_date_utc: string;
  launch_year: string;
}

export interface LaunchDisplay {
  flight_number: number;
  mission_name: string;
  payloads_count: number;
}

//#endregion

//#region Ord instances

export const ordByChronology = Ord.contramap<Date, Launch>((t) => new Date(t.launch_date_utc))(
  DateF.Ord
);
export const ordByChronologyInv = Ord.reverse(ordByChronology);

export const ordByPayloads = Ord.contramap<number, Launch>(
  (l) => l.rocket?.second_stage?.payloads.length ?? 0
)(Num.Ord);
export const ordByPayloadsInv = Ord.reverse(ordByPayloads);

//#endregion

//#region Predicates

export const hasPayloadOf = (customer: string) => (launch: Launch): boolean => {
  const payloads = launch.rocket?.second_stage?.payloads ?? [];
  if (!payloads.length) {
    return false;
  }
  const isNasaCustomer = (cust: string) => cust.includes(customer);

  return pipe(
    payloads,
    A.some((pl) => pipe(pl.customers, A.some(isNasaCustomer)))
  );
};

export const ofYear = (year: string) => (launch: Launch): boolean => launch.launch_year === year;

//#endregion

export const toDisplayModel = (launch: Launch): LaunchDisplay => ({
  flight_number: launch.flight_number,
  mission_name: launch.mission_name,
  payloads_count: launch.rocket?.second_stage?.payloads.length ?? 0,
});
