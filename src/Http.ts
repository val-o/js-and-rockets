import { constUndefined, pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';
import * as T from 'fp-ts/Task';
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';

export const getJson = <T>(req: RequestInfo): TE.TaskEither<HttpError, T> => {
  return pipe(
    TE.tryCatch(
      () => fetch(req),
      (): HttpError => ({ type: 'HttpError' })
    ),
    TE.chain((res) => toTaskEither(res))
  );
};
export type GetJson = typeof getJson;

const toTaskEither = <T>(res: Response): TE.TaskEither<HttpError, T> => {
  return pipe(
    res,
    extractHttpError,
    E.fromOption(constUndefined),
    E.swap,
    TE.fromEither,
    TE.chain((_) =>
      TE.tryCatch(
        () => res.json() as Promise<T>,
        (): HttpError => ({ type: 'HttpError' })
      )
    )
  );
};

const extractHttpError = (res: Response): O.Option<HttpError> => {
  return res.ok ? O.none : O.some({ type: 'HttpError' });
};

export interface HttpError {
  type: 'HttpError';
}
