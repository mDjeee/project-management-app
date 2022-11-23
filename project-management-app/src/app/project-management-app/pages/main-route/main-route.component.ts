import { Component, OnInit } from '@angular/core';
import { Dashboard } from 'src/app/auth/models/board.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import * as fromApp from '../../../store/app.reducer';
import * as DashboardActions from './store/dashboard.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-main-route',
  templateUrl: './main-route.component.html',
  styleUrls: ['./main-route.component.scss'],
})
export class MainRouteComponent implements OnInit {
  public boards!: Dashboard[];
  public boardForm!: FormGroup;
  storeSub!: Subscription;

  constructor(
    private store: Store<fromApp.AppState>,
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
    })
  }

  createBoard() {
    const title = this.boardForm.get('title')?.value;
    const description = this.boardForm.get('description')?.value;
    this.store.dispatch(new DashboardActions.PostBoardStart({title, description}))
    this.boardForm.reset();
  }

  deleteBoard(id: string) {
    this.store.dispatch(new DashboardActions.DeleteBoardStart(id));
  }

  updateBoard(id: string) {
  }
}
