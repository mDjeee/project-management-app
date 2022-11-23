import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { Dashboard } from 'src/app/auth/models/board.model';
import url from 'src/app/constants/baseUrl';
import * as DashboardActions from './dashboard.actions';

const boardsUrl = url + '/boards';

const handleError = (errorRes: any) => {


};

@Injectable()
export class DashboardEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  @Effect()
  getDashboards$ = this.actions$.pipe(
    ofType(DashboardActions.GET_BOARDS_START),
    switchMap((getBoards: DashboardActions.GetBoardsStart) => {
      return this.http.get<Dashboard[]>(boardsUrl)
        .pipe(
          map((dashboards: Dashboard[]) => {
            return new DashboardActions.GetBoardsSuccess(dashboards);
          }),
          catchError((errorRes) => {
            let errorMessage = 'An unknown error occurred!';
            if (!errorRes.error || !errorRes.error.error) {
              return of(new DashboardActions.GetBoardsFailed(errorRes.error.message));
            }
            return of(new DashboardActions.GetBoardsFailed(errorMessage));
          })
        )
    })
  );

  @Effect()
  postDashboard$ = this.actions$.pipe(
    ofType(DashboardActions.POST_BOARD_START),
    switchMap((postBoard: DashboardActions.PostBoardStart) => {
      return this.http.post<Dashboard>(boardsUrl, {
        title: postBoard.payload.title,
        description: postBoard.payload.description
      })
      .pipe(
        map((dashboard: Dashboard) => {
          return new DashboardActions.PostBoardSuccess(dashboard);
        }),
        catchError((errorRes) => {
          let errorMessage = 'An unknown error occurred!';
          if (!errorRes.error || !errorRes.error.error) {
            return of(new DashboardActions.PostBoardFailed(errorRes.error.message));
          }
          return of(new DashboardActions.PostBoardFailed(errorMessage));
        })
      )
    })
  )

  @Effect()
  updateDashboard$ = this.actions$.pipe(
    ofType(DashboardActions.UPDATE_BOARD_START),
    switchMap((updateBoard: DashboardActions.UpdateBoardStart) => {
      return this.http.put<Dashboard>(`${boardsUrl}/${updateBoard.payload.id}`, {
        title: updateBoard.payload.title,
        description: updateBoard.payload.description
      })
      .pipe(
        map((dashboard: Dashboard) => {
          return new DashboardActions.UpdateBoardSuccess(dashboard);
        }),
        catchError((errorRes) => {
          let errorMessage = 'An unknown error occurred!';
          if (!errorRes.error || !errorRes.error.error) {
            return of(new DashboardActions.UpdateBoardFailed(errorRes.error.message));
          }
          return of(new DashboardActions.UpdateBoardFailed(errorMessage));
        })
      )
    })
  )

  @Effect()
  deleteDashboard$ = this.actions$.pipe(
    ofType(DashboardActions.DELETE_BOARD_START),
    switchMap((deleteBoard: DashboardActions.DeleteBoardStart) => {
      return this.http.delete(`${boardsUrl}/${deleteBoard.payload}`)
      .pipe(
        map(() => {
          return new DashboardActions.DeleteBoardSuccess()
        }),
        catchError((errorRes) => {
          let errorMessage = 'An unknown error occurred!';
          if (!errorRes.error || !errorRes.error.error) {
            return of(new DashboardActions.DeleteBoardFailed(errorRes.error.message));
          }
          return of(new DashboardActions.DeleteBoardFailed(errorMessage));
        })
      )
    })
  )
}
