// Please implement your solution in this file

import * as Launch from './Launch';

export const prepareData = (data: Launch.Launch[]) => {
  return data
    .filter((launch) => launchHasPayloadOf(launch, 'NASA') && launchIsOfYear(launch, '2018'))
    .sort(compareLaunches)
    .map(Launch.toDisplayModel);
};

export const renderData = (data: object[]) => {
  const outlet = document.getElementById('out')!;
  outlet.innerHTML = JSON.stringify(data, null, 2);
};

//#region helpers

const launchHasPayloadOf = (launch: Launch.Launch, customer: string): boolean => {
  const payloads = launch.rocket?.second_stage?.payloads ?? [];
  if (!payloads.length) {
    return false;
  }
  const isCustomer = (cust: string) => cust.includes(customer);
  return payloads.some((pl) => pl.customers.some(isCustomer));
};

const launchIsOfYear = (launch: Launch.Launch, year: string): boolean =>
  launch.launch_year === year;

const compareLaunches = (left: Launch.Launch, right: Launch.Launch): number =>
  (right.rocket?.second_stage?.payloads.length ?? 0) -
    (left.rocket?.second_stage?.payloads.length ?? 0) ||
  new Date(right.launch_date_utc).getTime() - new Date(left.launch_date_utc).getTime();

//#endregion
