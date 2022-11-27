import { ActionReducerMap } from "@ngrx/store";

import * as fromAuth from '../auth/store/auth.reducer';
import * as fromDashboard from '../project-management-app/pages/main-route/store/dashboard.reducer';
import * as fromBoard from '../project-management-app/pages/board/store/board.reducer';

export interface AppState {
  auth: fromAuth.State,
  dashboards: fromDashboard.State,
  board: fromBoard.State
}

export const appReducer: ActionReducerMap<AppState, any> = {
  auth: fromAuth.authReducer,
  dashboards: fromDashboard.dashboardReducer,
  board: fromBoard.boardReducer
}
