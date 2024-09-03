import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { fetchData, fetchDataSuccess, fetchDataFailure } from './actions';

const fetchDataEpic = (action$) =>
  action$.pipe(
    ofType(fetchData.type),
    switchMap(() =>
      ajax.getJSON('https://610d778048beae001747b895.mockapi.io/historical-places').pipe(
        map((response) => fetchDataSuccess(response)),
        catchError((error) => of(fetchDataFailure(error.message)))
      )
    )
  );

export default fetchDataEpic;
