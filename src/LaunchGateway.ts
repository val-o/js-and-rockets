import * as Http from './Http';
import * as Launch from './Launch';

export const fetchLaunches = (httpGet: Http.GetJson) =>
  httpGet<Launch.Launch[]>('https://api.spacexdata.com/v3/launches/past');
