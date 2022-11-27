import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import url from 'src/app/constants/baseUrl';
import { Board, Column, Task } from '../models/board.model';

import * as BoardActions from './board.actions';

const boardsUrl = url + '/boards';

@Injectable()
export class BoardEffets {
  constructor(private actions$: Actions, private http: HttpClient) {}

  @Effect()
  getBoard$ = this.actions$.pipe(
    ofType(BoardActions.GET_BOARD_START),
    switchMap((getBoard: BoardActions.GetBoardStart) => {
      return this.http.get<Board>(`${boardsUrl}/${getBoard.payload}`)
        .pipe(
          map((board: Board) => {
            return new BoardActions.GetBoardSuccess(board)
          }),
          catchError((errorRes) => {
            let errorMessage = 'An unknown error occurred!';
            if (!errorRes.error || !errorRes.error.error) {
              return of(new BoardActions.GetBoardFailed({statusCode: errorRes.statusCode, message:errorRes.error.message}));
            }
            return of(new BoardActions.GetBoardFailed({statusCode: 500, message: errorMessage}));
          })
      )
    })
  )

  @Effect()
  postColumn$ = this.actions$.pipe(
    ofType(BoardActions.POST_COLUMN_START),
    switchMap((postColumn: BoardActions.PostColumnStart) => {
      return this.http
      .post<{id: string, title: string, order: number}>(
        `${boardsUrl}/${postColumn.payload.boardId}/columns`,
        {title: postColumn.payload.title}
        )
        .pipe(
          map((column) => {
            return new BoardActions.PostColumnSuccess({id: column.id, title: column.title, order: column.order})
          }),
          catchError((errorRes) => {
            let errorMessage = 'An unknown error occurred!';
            if (!errorRes.error || !errorRes.error.error) {
              return of(new BoardActions.PostColumnFailed({statusCode: errorRes.statusCode, message:errorRes.error.message}));
            }
            return of(new BoardActions.PostColumnFailed({statusCode: 500, message: errorMessage}));
          })
        )
    })
  )

  @Effect()
  deleteColumn$ = this.actions$.pipe(
    ofType(BoardActions.DELETE_COLUMN_START),
    switchMap((deleteColumn: BoardActions.DeleteColumnStart) => {
      return this.http
      .delete(
        `${boardsUrl}/${deleteColumn.payload.boardId}/columns/${deleteColumn.payload.columnId}`
      ).pipe(
        map(() => {
          return new BoardActions.DeleteColumnSuccess()
        }),
        catchError((errorRes) => {
          let errorMessage = 'An unknown error occurred!';
          if (!errorRes.error || !errorRes.error.error) {
            return of(new BoardActions.DeleteColumnFailed({statusCode: errorRes.statusCode, message:errorRes.error.message}));
          }
          return of(new BoardActions.DeleteColumnFailed({statusCode: 500, message: errorMessage}));
        })
      )
    })
  )

  @Effect()
  putColumn$ = this.actions$.pipe(
    ofType(BoardActions.PUT_COLUMN_START),
    switchMap((putColumn: BoardActions.PutColumnStart) => {
      return this.http
      .put<{id: string, title: string, order: Number}>(`${boardsUrl}/${putColumn.payload.boardId}/columns/${putColumn.payload.columnId}`, {
        title: putColumn.payload.title,
        order: +putColumn.payload.order
      }).pipe(
        map((column) => {
          return new BoardActions.PutColumnSuccess({id: column.id, title: column.title, order: +column.order})
        }),
        catchError((errorRes) => {
          let errorMessage = 'An unknown error occurred!';
          if (!errorRes.error || !errorRes.error.error) {
            return of(new BoardActions.PutColumnFailed({statusCode: errorRes.statusCode, message:errorRes.error.message}));
          }
          return of(new BoardActions.PutColumnFailed({statusCode: 500, message: errorMessage}));
        })
      )
    })
  )

  @Effect()
  postTask$ = this.actions$.pipe(
    ofType(BoardActions.POST_TASK_START),
    switchMap((postTask: BoardActions.PostTaskStart) => {
      return this.http
      .post<{id: string, title: string, description: string, userId: string}>(
        `${boardsUrl}/${postTask.payload.boardId}/columns/${postTask.payload.columnId}/tasks`,
        {
          title: postTask.payload.title,
          description: postTask.payload.description,
          userId: postTask.payload.userId
        }
      ).pipe(
        map((task) => {
          return new BoardActions.PostTaskSuccess({
            id: task.id,
            title: task.title,
            description: task.description,
            userId: task.userId,
            columnId: postTask.payload.columnId,
            boardId: postTask.payload.boardId,
          })
        }),
        catchError((errorRes) => {
          let errorMessage = 'An unknown error occurred!';
          if (!errorRes.error || !errorRes.error.error) {
            return of(new BoardActions.PutColumnFailed({statusCode: errorRes.statusCode, message:errorRes.error.message}));
          }
          return of(new BoardActions.PutColumnFailed({statusCode: 500, message: errorMessage}));
        })
      )
    })
  )

  @Effect()
  deleteTask = this.actions$.pipe(
    ofType(BoardActions.DELETE_TASK_START),
    switchMap((deleteTask: BoardActions.DeleteTaskStart) => {
      return this.http.delete(
        `${boardsUrl}/${deleteTask.payload.boardId}/columns/${deleteTask.payload.columnId}/tasks/${deleteTask.payload.taskId}`
      ).pipe(
        map(() => {
          return new BoardActions.DeleteTaskSuccess({
            boardId: deleteTask.payload.boardId,
            columnId: deleteTask.payload.columnId,
            taskId: deleteTask.payload.taskId
          })
        }),
        catchError((errorRes) => {
          let errorMessage = 'An unknown error occurred!';
          if (!errorRes.error || !errorRes.error.error) {
            return of(new BoardActions.PutColumnFailed({statusCode: errorRes.statusCode, message:errorRes.error.message}));
          }
          return of(new BoardActions.PutColumnFailed({statusCode: 500, message: errorMessage}));
        })
      )
    })
  )

  @Effect()
  editTask = this.actions$.pipe(
    ofType(BoardActions.PUT_TASK_START),
    switchMap((putTask: BoardActions.PutTaskStart) => {
      return this.http.put<{
        id: string,
        title: string,
        order: number,
        description: string,
        userId: string,
        boardId: string,
        columnId: string
      }>(`${boardsUrl}/${putTask.payload.boardId}/columns/${putTask.payload.columnId}/tasks/${putTask.payload.id}`,{
          title: putTask.payload.title,
          description: putTask.payload.description,
          userId: putTask.payload.userId,
          boardId: putTask.payload.boardId,
          columnId: putTask.payload.columnId,
          order: +putTask.payload.order
      }).pipe(
        map((res) => {
          return new BoardActions.PutTaskSuccess({
            boardId: res.boardId,
            columnId: res.columnId,
            id: res.id,
            title: res.title,
            description: res.description,
            userId: res.userId,
            order: +res.order
          })
        }),
        catchError((errorRes) => {
          let errorMessage = 'An unknown error occurred!';
          if (!errorRes.error || !errorRes.error.error) {
            return of(new BoardActions.PutColumnFailed({statusCode: errorRes.statusCode, message:errorRes.error.message}));
          }
          return of(new BoardActions.PutColumnFailed({statusCode: 500, message: errorMessage}));
        })
      )
    })
  )

  @Effect({dispatch: false})
  sortByOrder = this.actions$.pipe(
    ofType(BoardActions.SORT_BY_ORDER),
    map((columns) => {
      return new BoardActions.SortByOrder(columns);
    })
  )

  @Effect({dispatch: false})
  sortTaskByOrder = this.actions$.pipe(
    ofType(BoardActions.SORT_TASK_BY_ORDER),
    map((response: {columnId: string, tasks: Task[]}) => {
      return new BoardActions.SortTaskByOrder({columnId: response.columnId, tasks: response.tasks});
    })
  )
}
