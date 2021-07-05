import * as LaunchGateway from './LaunchGateway';
import * as Http from './Http';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';
import * as T from 'fp-ts/Task';
import * as E from 'fp-ts/Either';
import * as Ui from './Ui';
import * as Solution from './Solution';

console.log('Hello from %csrc/index.js', 'font-weight:bold');

const main = pipe(
  LaunchGateway.fetchLaunches(Http.getJson),
  TE.map(Solution.prepareData),
  T.map(Ui.render)
);

main();
