import * as Launch from './Launch';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';
import * as T from 'fp-ts/Task';
import * as E from 'fp-ts/Either';

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
