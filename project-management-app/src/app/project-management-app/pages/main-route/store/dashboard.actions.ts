import { Action } from '@ngrx/store';
import { BoardTitle, Dashboard } from 'src/app/auth/models/board.model';

export const GET_BOARDS_START = '[Dashboard] Get Boards Start]';
export const GET_BOARDS_SUCCESS = '[Dashboard] Get Boards Success]';
export const GET_BOARDS_FAILED = '[Dashboard] Get Boards Failed]';

export const POST_BOARD_START = '[Dashboard] Post Board Start]';
export const POST_BOARD_SUCCESS = '[Dashboard] Post Board Success]';
export const POST_BOARD_FAILED = '[Dashboard] Post Board Failed]';

export const UPDATE_BOARD_START = '[Dashboard] Update Board Start]';
export const UPDATE_BOARD_SUCCESS = '[Dashboard] Update Board Success]';
export const UPDATE_BOARD_FAILED = '[Dashboard] Update Board Failed]';

export const DELETE_BOARD_START = '[Dashboard] Delete Board Start]';
export const DELETE_BOARD_SUCCESS = '[Dashboard] Delete Board Success]';
export const DELETE_BOARD_FAILED = '[Dashboard] Delete Board Failed]';

export const CLEAR_ERROR = '[Dashboard] Clear Error';

export class GetBoardsStart implements Action {
  readonly type = GET_BOARDS_START;
}

export class GetBoardsSuccess implements Action {
  readonly type = GET_BOARDS_SUCCESS;

  constructor(public payload: Dashboard[]) { }
}

export class GetBoardsFailed implements Action {
  readonly type = GET_BOARDS_FAILED;

  constructor(public payload: string) { }
}

export class PostBoardStart implements Action {
  readonly type = POST_BOARD_START;

  constructor(public payload: BoardTitle) { }
}

export class PostBoardSuccess implements Action {
  readonly type = POST_BOARD_SUCCESS;

  constructor(public payload: Dashboard) { }
}

export class PostBoardFailed implements Action {
  readonly type = POST_BOARD_FAILED;

  constructor(public payload: string) { }
}

export class UpdateBoardStart implements Action {
  readonly type = UPDATE_BOARD_START;

  constructor(public payload: Dashboard) { }
}

export class UpdateBoardSuccess implements Action {
  readonly type = UPDATE_BOARD_SUCCESS;

  constructor(public payload: Dashboard) { }
}

export class UpdateBoardFailed implements Action {
  readonly type = UPDATE_BOARD_FAILED;

  constructor(public payload: string) { }
}

export class DeleteBoardStart implements Action {
  readonly type = DELETE_BOARD_START;

  constructor(public payload: string) { }
}

export class DeleteBoardSuccess implements Action {
  readonly type = DELETE_BOARD_SUCCESS;
}

export class DeleteBoardFailed implements Action {
  readonly type = DELETE_BOARD_FAILED;

  constructor(public payload: string) { }
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export type DashboardActions =
  | GetBoardsStart
  | GetBoardsSuccess
  | GetBoardsFailed
  | PostBoardStart
  | PostBoardSuccess
  | PostBoardFailed
  | UpdateBoardStart
  | UpdateBoardSuccess
  | UpdateBoardFailed
  | DeleteBoardStart
  | DeleteBoardSuccess
  | DeleteBoardFailed
  | ClearError;
