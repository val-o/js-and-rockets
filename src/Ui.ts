import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import * as Launch from './Launch';

export const renderData = (missions: object[]) => {
  const outlet = document.getElementById('out')!;
  outlet.innerHTML = JSON.stringify(missions, null, 2);
};

export const renderError = () => {
  const outlet = document.body.appendChild(document.createElement('div'));
  outlet.innerHTML = `Sorry! We couldn't fetch the data`;
};

export const render = (result: E.Either<unknown, Launch.LaunchDisplay[]>) =>
  pipe(result, E.match(renderError, renderData));
