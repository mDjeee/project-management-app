
import { IErrorResponse } from 'src/app/auth/models/board.model';
import { IBoard, Column, Task } from '../models/board.model';
import * as BoardActions from './board.actions';

export interface State {
  getBoardLoading: boolean;
  board: {
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
  } | null;
}

const initialState: State = {
  getBoardLoading: false,
  board: null,
}

export function boardReducer(
  state = initialState,
  action: BoardActions.BoardActions
  ) {
    switch(action.type) {
      case BoardActions.GET_BOARD_START:
        return {
          ...state,
        }
      case BoardActions.GET_BOARD_SUCCESS:

        let getBoardColumns: Column[] = []
        let getColumns = action.payload.columns?.slice()
        if(getColumns) {
          getBoardColumns = [...getColumns];
        }

        let getBoard = Object.assign({}, state.board);

        return {
          ...state,
          board: {
            ...getBoard,
            columns: getBoardColumns.sort((a,b) => a.order - b.order)
          }
        }
      case BoardActions.GET_BOARD_FAILED:
        return {
          ...state,
        }
      case BoardActions.GET_COLUMNS_START:
        return {
          ...state,
        }
      case BoardActions.GET_COLUMNS_SUCCESS:
        return {
          ...state,
        }
      case BoardActions.GET_COLUMNS_FAILED:
        return {
          ...state,
        }
      case BoardActions.POST_COLUMN_START:
        return {
          ...state,
        }
      case BoardActions.POST_COLUMN_SUCCESS:
        const newColumn: Column = {
          id: action.payload.id ? action.payload.id : '',
          title: action.payload.title ? action.payload.title : '',
          order: +action.payload.order ? +action.payload.order : 1,
          tasks: null
        }
        let copiedColumns: Column[] = [];
        if(state.board) {
          if(state.board.columns) {
            copiedColumns = state.board.columns.slice();
            copiedColumns.push(newColumn);
          }
        } else {
          copiedColumns = [];
          copiedColumns.push(newColumn);
        }

        let postColumnBoard = Object.assign({}, state.board)

        return {
          ...state,
          board: {
            ...postColumnBoard,
            columns: [...copiedColumns]
          }
        }
      case BoardActions.POST_COLUMN_FAILED:
        return {
          ...state
        }
      case BoardActions.GET_COLUMN_START:
        return {
          ...state
        }
      case BoardActions.GET_COLUMN_SUCCESS:
        return {
          ...state
        }
      case BoardActions.GET_COLUMN_FAILED:
        return {
          ...state
        }
      case BoardActions.PUT_COLUMN_START:

        let updateColumns: Column[] = [];
        if(state.board) {
          if(state.board.columns) {
            updateColumns = state.board.columns.slice();
          }
        }
        let updatedColumn: Column = updateColumns.filter((column) => column.id !== action.payload.columnId)[0];

        let updatedColumnTasks: Task[] = [];

        if(updatedColumn.tasks) {
          updatedColumnTasks = updatedColumn.tasks
        }

        let updateColumn: Column = {
          id: action.payload.columnId,
          title: action.payload.title,
          order: +action.payload.order,
          tasks: [...updatedColumnTasks]
        }

        let updateColumnsReturn = updateColumns.slice();

        updateColumnsReturn.forEach((column, index) => {
          if(column.id === action.payload.columnId) {
            updateColumnsReturn[index] = {
              ...updateColumn
            }
          }
        })

        let updateColumnBoard = Object.assign({}, state.board)

        return {
          ...state,
          board: {
            ...updateColumnBoard,
            columns: [...updateColumnsReturn]
          },
        }
      case BoardActions.PUT_COLUMN_SUCCESS:
        return {
          ...state
        }
      case BoardActions.PUT_COLUMN_FAILED:
        return {
          ...state
        }
      case BoardActions.DELETE_COLUMN_START:
        const deletedId = action.payload.columnId;
        let deletedColumns: Column[] = []
        if(state.board && state.board.columns) {
          deletedColumns = state.board.columns.slice()
        } else {
          deletedColumns = [];
        }
        deletedColumns = deletedColumns.filter((column: Column) => deletedId !== column.id);
        let deleteColumnBoard = Object.assign({}, state.board)
        return {
          ...state,
          board: {
            ...deleteColumnBoard,
            columns: [...deletedColumns]
          }
        }
      case BoardActions.DELETE_COLUMN_SUCCESS:
        return {
          ...state
        }
      case BoardActions.DELETE_COLUMN_FAILED:
        return {
          ...state
        }
      case BoardActions.GET_TASKS_START:
        return {
          ...state
        }
      case BoardActions.GET_TASKS_SUCCESS:
        return {
          ...state
        }
      case BoardActions.POST_TASK_START:
        return {
          ...state
        }
      case BoardActions.POST_TASK_SUCCESS:
        let copiedPostTaskColumns = state.board?.columns?.slice();

        let postTaskColumns: Column[] = [];
        if(copiedPostTaskColumns) {
          postTaskColumns = copiedPostTaskColumns.slice();
        }

        let postTaskColumn: Column = postTaskColumns.filter((column) => column.id === action.payload.columnId)[0];

        let order: number = 1;

        if(postTaskColumn.tasks) {
          order = postTaskColumn.tasks.length
        }

        let postTask: Task = {
          id: action.payload.id,
          userId: action.payload.userId,
          order: order,
          title: action.payload.title,
          description: action.payload.description,
          files: null
        }

        let copiedPostTasks: Task[] = postTaskColumn.tasks ? [...postTaskColumn.tasks] : [];

        copiedPostTasks.push(postTask);

        postTaskColumns.forEach((column, index) => {
          if(column.id === action.payload.columnId) {
            postTaskColumns[index] = {
              ...postTaskColumn,
              tasks: copiedPostTasks
            }
          }
        })

        let postTaskBoard = Object.assign({}, state.board)

        return {
          ...state,
          board: {
            ...postTaskBoard,
            columns: [...postTaskColumns]
          }
        }
      case BoardActions.GET_TASK_START:
        return {
          ...state,
        }
      case BoardActions.GET_TASK_SUCCESS:
        return {
          ...state
        }
      case BoardActions.DELETE_TASK_START:

        let copiedDeleteTaskColumns: Column[] = []
        if(state.board?.columns?.slice()) {
          copiedDeleteTaskColumns = state.board?.columns?.slice()
        }

        let deleteTaskColumn: Column = copiedDeleteTaskColumns.filter((column) => column.id === action.payload.columnId)[0];

        let copiedDeleteTasks: Task[] = [];
        if(deleteTaskColumn.tasks?.slice()){
          copiedDeleteTasks = deleteTaskColumn.tasks?.slice()
        }

        copiedDeleteTasks = copiedDeleteTasks.filter((task) => action.payload.taskId !== task.id);

        deleteTaskColumn = {
          ...deleteTaskColumn,
          tasks: copiedDeleteTasks
        }

        copiedDeleteTaskColumns.forEach((column, index) => {
          if(column.id === action.payload.columnId) {
            copiedDeleteTaskColumns[index] = {
              ...deleteTaskColumn,
              tasks: copiedDeleteTasks
            }
          }
        })


        let deleteTaskBoard = Object.assign({}, state.board)
        return {
          ...state,
          board: {
            ...deleteTaskBoard,
            columns: [...copiedDeleteTaskColumns]
          }
        }
      case BoardActions.DELETE_TASK_SUCCESS:
        return {
          ...state
        }
      case BoardActions.PUT_TASK_START:
        return {
          ...state
        }
      case BoardActions.PUT_TASK_SUCCESS:
        let copiedPutTaskColumns: Column[] = []
        if(state.board?.columns?.slice()) {
          copiedPutTaskColumns = state.board?.columns?.slice()
        }

        let putTaskColumn: Column = copiedPutTaskColumns.filter((column) => column.id === action.payload.columnId)[0];

        let copiedPutTasks: Task[] = [];
        if(putTaskColumn.tasks?.slice()){
          copiedPutTasks = putTaskColumn.tasks?.slice()
        }

        copiedPutTasks = copiedPutTasks.filter(Boolean);

        copiedPutTasks.forEach((task, index) => {
          if(action.payload.id === task.id) {
            copiedPutTasks[index] = {
              ...task,
              id: action.payload.id,
              title: action.payload.title,
              description: action.payload.description,
              userId: action.payload.userId,
              order: +action.payload.order
            }
          }
        })

        putTaskColumn = {
          ...putTaskColumn,
          tasks: copiedPutTasks
        }

        copiedPutTaskColumns.forEach((column, index) => {
          if(action.payload.columnId === column.id) {
            copiedPutTaskColumns[index] = {
              ...putTaskColumn,
              tasks: copiedPutTasks
            }
          }
        })


        let putTaskBoard = Object.assign({}, state.board)
        return {
          ...state,
          board: {
            ...putTaskBoard,
            columns: [...copiedPutTaskColumns]
          }
        }
      case BoardActions.SORT_BY_ORDER:

        let sortColumns: Column[] = []
        if(action.payload.slice()) {
          sortColumns = action.payload.slice()
        }

        let sortTaskBoard = Object.assign({}, state.board);
        return {
          ...state,
          board: {
            ...sortTaskBoard,
            columns: sortColumns.sort((a,b) => a.order - b.order)
          }
        }
      default:
        return state;
    }

}
