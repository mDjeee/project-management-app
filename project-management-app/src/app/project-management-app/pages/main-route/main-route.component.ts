import { Component, OnInit } from '@angular/core';
import { Dashboard } from 'src/app/auth/models/board.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import * as fromApp from '../../../store/app.reducer';
import * as DashboardActions from './store/dashboard.actions';
import { Store } from '@ngrx/store';
import { ConfirmDialogService } from 'src/app/shared/services/confirm-dialog.service';

@Component({
  selector: 'app-main-route',
  templateUrl: './main-route.component.html',
  styleUrls: ['./main-route.component.scss'],
})
export class MainRouteComponent implements OnInit {
  public boards!: Dashboard[];
  public boardForm!: FormGroup;
  selectedId!: string;

  storeSub!: Subscription;
  isLoadingBoard = false;
  isLoadingDashboard = false;
  isUpdateMode = '';

  updateTitle!: string;
  updateContent!: string;

  errorMsg!: string | null;

  constructor(
    private store: Store<fromApp.AppState>,
    private dialogService: ConfirmDialogService
    ) {}
  ngOnInit(): void {
    this.boardForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });

    this.store.dispatch(
      new DashboardActions.GetBoardsStart()
    )

    this.storeSub = this.store.select('dashboards').subscribe(dashState => {
      this.boards = dashState.boards;
      this.isLoadingDashboard = dashState.getLoading;
      this.isLoadingBoard = dashState.postLoading;
      this.errorMsg = dashState.dashboardError;
    })
  }

  createBoard() {
    const title = this.boardForm.get('title')?.value;
    const description = this.boardForm.get('description')?.value;
    this.store.dispatch(new DashboardActions.PostBoardStart({title, description}))
    this.boardForm.reset();
  }

  deleteBoard(id: string) {
    this.dialogService.confirmDialog({
      title: 'Delete',
      message: 'Are you sure to delete board?',
      cancelText: 'Cancel',
      confirmText: 'Confirm',
    }).subscribe((response: boolean) => {
      if(response) {
        this.store.dispatch(new DashboardActions.DeleteBoardStart(id));
      }
    })
  }

  selectBoard(board: Dashboard) {
    this.selectedId = board.id;
    this.updateTitle = board.title;
    this.updateContent = board.description;
  }

  quitSelected() {
    this.selectedId = '';
  }

  updateBoard(id: string) {
    const title = this.updateTitle;
    const description = this.updateContent;
    this.store.dispatch(
      new DashboardActions.UpdateBoardStart({
        id,
        title,
        description
      })
    )
    this.quitSelected();
  }
}
