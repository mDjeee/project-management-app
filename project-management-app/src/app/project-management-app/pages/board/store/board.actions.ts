import { Action } from '@ngrx/store';

export const GET_BOARD_START = '[Board] Get Board Start';
export const GET_BOARD_SUCCESS = '[Board] Get Board Success';
export const GET_BOARD_FAILED = '[Board] Get Board Failed';


export const GET_COLUMNS_START = '[Column] Get Columns Start';
export const GET_COLUMNS_SUCCESS = '[Column] Get Columns Success';
export const GET_COLUMNS_FAILED = '[Column] Get Columns Failed';

export const POST_COLUMN_START = '[Column] Post Columns Start';
export const POST_COLUMN_SUCCESS = '[Column] Post Columns Success';
export const POST_COLUMN_FAILED = '[Column] Post Columns Failed';

export const GET_COLUMN_START = '[Column] Get Column Start';
export const GET_COLUMN_SUCCESS = '[Column] Get Column Success';
export const GET_COLUMN_FAILED = '[Column] Get Column Failed';

export const PUT_COLUMN_START = '[Column] Put Column Start';
export const PUT_COLUMN_SUCCESS = '[Column] Put Column Success';
export const PUT_COLUMN_FAILED = '[Column] Put Column Failed';

export const DELETE_COLUMN_START = '[Column] Delete Column Start';
export const DELETE_COLUMN_SUCCESS = '[Column] Delete Column Success';
export const DELETE_COLUMN_FAILED = '[Column] Delete Column Failed';


export const GET_TASKS_START = '[Task] Get Task Start';
export const GET_TASKS_SUCCESS = '[Task] Get Task Success';

export const POST_TASK_START = '[Task] Post Task Start';
export const POST_TASK_SUCCESS = '[Task] Post Task Success';

export const GET_TASK_START = '[Task] Get Task Start';
export const GET_TASK_SUCCESS = '[Task] Get Task Success';

export const PUT_TASK_START = '[Task] Put Task Start';
export const PUT_TASK_SUCCESS = '[Task] Put Task Success';

export const DELETE_TASK_START = '[Task] Delete Task Start';
export const DELETE_TASK_SUCCESS = '[Task] Delete Task Success';


export const CLEAR_ERROR = '[Board] Clear Error';

export class GetBoardStart implements Action {
  readonly type = GET_BOARD_START;

  constructor(public payload: string) {
    console.log('GET_BOARD_START')
  }
}

export class GetBoardSuccess implements Action {
  readonly type = GET_BOARD_SUCCESS;

  constructor(public payload: {
    id: string,
    title: string,
    description: string,
    columns: {
      id: string,
      title: string,
      order: number,
      tasks: {
        id: string,
        title: string
        order: number,
        description: string,
        userId: string,
        files: {
          filename: string,
          fileSize: number
        }[] | null
      }[] | null
    }[] | null
  }) { }
}

export class GetBoardFailed implements Action {
  readonly type = GET_BOARD_FAILED;

  constructor(public payload: {statusCode: number, message: string}) {
    console.log('GET_BOARD_FAILED')
  }
}


export class GetColumnsStart implements Action {
  readonly type = GET_COLUMNS_START;

  constructor(public payload: string) { }
}

export class GetColumnsSuccess implements Action {
  readonly type = GET_COLUMNS_SUCCESS;

  constructor(public payload: {
    id: string,
    title: string,
    order: number
  }[]) {}
}

export class GetColumnsFailed implements Action {
  readonly type = GET_COLUMNS_FAILED;

  constructor(public payload: { statusCode: number, message: string }) { }
}
export class PostColumnStart implements Action {
  readonly type = POST_COLUMN_START;

  constructor(public payload: {title: string, boardId: string}) {}
}

export class PostColumnSuccess implements Action {
  readonly type = POST_COLUMN_SUCCESS;

  constructor(public payload: {
    id: string,
    title: string,
    order: number
  }) {}
}

export class PostColumnFailed implements Action {
  readonly type = POST_COLUMN_FAILED;

  constructor(public payload: {statusCode: number, message: string}) { }
}
export class GetColumnStart implements Action {
  readonly type = GET_COLUMN_START;
}

export class GetColumnSuccess implements Action {
  readonly type = GET_COLUMN_SUCCESS;

  constructor(public payload: {
    id: string,
    title: string,
    order: number,
    tasks: {
      id: string,
      title: string,
      order: number,
      done: boolean,
      description: string,
      userId: string,
      files: {
        filename: string,
        fileSize: number,
      }[]
    }[]
  }) {}
}

export class GetColumnFailed implements Action {
  readonly type = GET_COLUMN_FAILED;

  constructor(public payload: {statusCode: number, message: string}) { }
}

export class DeleteColumnStart implements Action {
  readonly type = DELETE_COLUMN_START;
  constructor(public payload: {boardId: string, columnId: string}) {}
}

export class DeleteColumnSuccess implements Action {
  readonly type = DELETE_COLUMN_SUCCESS;
}

export class DeleteColumnFailed implements Action {
  readonly type = DELETE_COLUMN_FAILED;

  constructor(public payload: {statusCode: number, message: string}) {}
}

export class PutColumnStart implements Action {
  readonly type = PUT_COLUMN_START;

  constructor(public payload: {
    boardId: string,
    columnId: string,
    title: string,
    order: number,
  }) {}
}

export class PutColumnSuccess implements Action {
  readonly type = PUT_COLUMN_SUCCESS;

  constructor(public payload: {
    id: string,
    title: string,
    order: number
  }) {}
}

export class PutColumnFailed implements Action {
  readonly type = PUT_COLUMN_FAILED;

  constructor(public payload: {statusCode: number, message: string}) { }
}


export class GetTasksStart implements Action {
  readonly type = GET_TASKS_START;
}

export class GetTasksSuccess implements Action {
  readonly type = GET_TASKS_SUCCESS;

  constructor(public payload: {
    id: string,
    title: string,
    order: number,
    description: string,
    userId: string,
    boardId: string,
    columnId: string,
    files: {
      filename: string,
      fileSize: number
    }[]
  }[]) {}
}

export class PostTaskStart implements Action {
  readonly type = POST_TASK_START;

  constructor(public payload: {
    boardId: string,
    columnId: string,
    title: string,
    description: string,
    userId: string
  }) {}
}

export class PostTaskSuccess implements Action {
  readonly type = POST_TASK_SUCCESS;

  constructor(public payload: {
    boardId: string,
    columnId: string,
    id: string,
    title: string,
    description: string,
    userId: string
  }) {}
}

export class GetTaskStart implements Action {
  readonly type = GET_TASK_START;
}

export class GetTaskSuccess implements Action {
  readonly type = GET_TASK_SUCCESS;

  constructor(public payload: {
    id: string,
    title: string,
    order: number,
    description: string,
    userId: string,
    boardId: string,
    columnId: string,
    files: {
      filename: string,
      fileSize: number
    }[]
  }) {}
}

export class DeleteTaskStart implements Action {
  readonly type = DELETE_TASK_START;

  constructor(public payload: {boardId: string, columnId: string, taskId: string}) {}
}

export class DeleteTaskSuccess implements Action {
  readonly type = DELETE_TASK_SUCCESS;

  constructor(public payload: {boardId: string, columnId: string, taskId: string}) {}
}

export class PutTaskStart implements Action {
  readonly type = PUT_TASK_START;

  constructor(public payload: {
    id: string,
    title: string,
    order: number,
    description: string,
    userId: string,
    boardId: string,
    columnId: string
  }) {}
}

export class PutTaskSuccess implements Action {
  readonly type = PUT_TASK_SUCCESS;

  constructor(public payload: {
    id: string,
    title: string,
    order: number,
    description: string,
    userId: string,
    boardId: string,
    columnId: string
  }) {}
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export type BoardActions =
 | GetBoardStart
 | GetBoardSuccess
 | GetBoardFailed
 | GetColumnsStart
 | GetColumnsSuccess
 | GetColumnsFailed
 | GetColumnStart
 | GetColumnSuccess
 | GetColumnFailed
 | PostColumnStart
 | PostColumnSuccess
 | PostColumnFailed
 | PutColumnStart
 | PutColumnSuccess
 | PutColumnFailed
 | DeleteColumnStart
 | DeleteColumnSuccess
 | DeleteColumnFailed
 | GetTasksStart
 | GetTasksSuccess
 | GetTaskStart
 | GetTaskSuccess
 | PostTaskStart
 | PostTaskSuccess
 | PutTaskStart
 | PutTaskSuccess
 | DeleteTaskStart
 | DeleteTaskSuccess
 | ClearError
