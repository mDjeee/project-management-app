import { Dashboard } from 'src/app/auth/models/board.model';
import * as DashboardActions from './dashboard.actions';

export interface State {
  boards: Dashboard[];
  dashboardError: string | null;
  getLoading: boolean;
  postLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
}

const initialState: State = {
  boards: [],
  dashboardError: null,
  getLoading: false,
  postLoading: false,
  updateLoading: false,
  deleteLoading: false,
};

export function dashboardReducer(
  state = initialState,
  action: DashboardActions.DashboardActions
  ) {
    switch(action.type) {
      case DashboardActions.GET_BOARDS_START:
        return {
          ...state,
          getLoading: true,
        }
      case DashboardActions.GET_BOARDS_SUCCESS:
        return {
          ...state,
          boards: action.payload,
          getLoading: false
        }
      case DashboardActions.GET_BOARDS_FAILED:
        return {
          ...state,
          dashboardError: action.payload,
          getLoading: false
        }
      case DashboardActions.POST_BOARD_START:
        return {
          ...state,
          postLoading: true
        }
      case DashboardActions.POST_BOARD_SUCCESS:
        const postedBoards = state.boards?.slice();
        postedBoards?.push(action.payload);
        return {
          ...state,
          boards: postedBoards,
          postLoading: false
        }
      case DashboardActions.POST_BOARD_FAILED:
        return {
          ...state,
          dashboardError: action.payload,
          postLoading: false
        }
      case DashboardActions.UPDATE_BOARD_START:
        return {
          ...state,
          updateLoading: true
        }
      case DashboardActions.UPDATE_BOARD_SUCCESS:
        const copiedBoards = state.boards?.slice();
        copiedBoards?.push(action.payload);
        return {
          ...state,
          updateLoading: false,
          boards: copiedBoards
        }
      case DashboardActions.UPDATE_BOARD_FAILED:
        return {
          ...state,
          updateLoading: false,
          dashboardError: action.payload
        }
      case DashboardActions.DELETE_BOARD_START:
        return {
          ...state,
          deleteLoading: true
        }
      case DashboardActions.DELETE_BOARD_SUCCESS:
        return {
          ...state,
          deleteLoading: true
        }
      case DashboardActions.DELETE_BOARD_FAILED:
        return {
          ...state,
          deleteLoading: false,
          dashboardError: action.payload
        }
      case DashboardActions.CLEAR_ERROR:
        return {
          ...state,
          dashboardError: null
        }
      default:
        return state;
    }
  }
