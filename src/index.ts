import { pipe } from 'fp-ts/lib/function';
import * as T from 'fp-ts/Task';
import * as TE from 'fp-ts/TaskEither';
import * as Http from './Http';
import * as LaunchGateway from './LaunchGateway';
import * as Solution from './Solution';
import * as Ui from './Ui';

console.log('Hello from %csrc/index.js', 'font-weight:bold');

const main = pipe(
  LaunchGateway.fetchLaunches(Http.getJson),
  TE.map(Solution.prepareData),
  T.map(Ui.render)
);

main();
