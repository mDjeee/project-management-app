import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Board, Column, IBoard } from './models/board.model';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import * as fromApp from '../../../store/app.reducer';
import * as BoardActions from '../board/store/board.actions';
import { FormControl, Validators } from '@angular/forms';
import { ConfirmDialogService } from 'src/app/shared/services/confirm-dialog.service';
import { getCookie } from 'src/app/core/services/cookie.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  board!: IBoard;
  columns!: Column[];
  tasks!: Task[];

  columnTitle = new FormControl('', [Validators.required]);
  updateColumnTitle = new FormControl('', [Validators.required]);
  taskTitle = new FormControl('', [Validators.required]);
  taskDescription = new FormControl('', [Validators.required]);
  focused = false;
  inputTitleToggleId = '';

  userId = ' '

  boardId!: string
  clickedColumn = '';

  constructor(
    private store: Store<fromApp.AppState>,
    private activatedRoute: ActivatedRoute,
    private dialogService: ConfirmDialogService
    ) {
      activatedRoute.url.subscribe((value) => {
        this.boardId = value[1].path;
      })
    }

  ngOnInit(): void {
    this.store.dispatch(
      new BoardActions.GetBoardStart(this.boardId)
    )

    this.userId = getCookie('userId') as string

    this.store.select('board').subscribe(state => {
      if(state.board) {
        this.board = state.board;
      }
    })
  }

  addColumn() {
    if(this.columnTitle.value) {
      this.store.dispatch(
        new BoardActions.PostColumnStart({title: this.columnTitle.value, boardId: this.boardId})
      )
    }
    this.columnTitle.reset();
  }

  deleteColumn(boardId: string, columnId: string) {
    this.dialogService.confirmDialog({
      title: 'Delete',
      message: 'Are you sure to delete column?',
      cancelText: 'No',
      confirmText: 'Yes',
    }).subscribe((response: boolean) => {
      if(response) {
        this.store.dispatch(new BoardActions.DeleteColumnStart({boardId: boardId, columnId: columnId}));
      }
    })
  }

  focusTitle(columnId: string, columnTitle: string) {
    this.inputTitleToggleId = columnId;
    this.updateColumnTitle.setValue(columnTitle);
  }

  removeFocusTitle() {
    this.inputTitleToggleId = '';
    this.updateColumnTitle.reset();
  }

  updateColumn(boardId: string, columnId: string, order: number) {
    if(this.updateColumnTitle.value) {
      this.store.dispatch(new BoardActions.PutColumnStart({boardId, columnId, title: this.updateColumnTitle.value, order}));
    }
    this.inputTitleToggleId = '';
    this.updateColumnTitle.reset();
  }

  addTask(boardId: string, columnId: string) {
    if(this.taskTitle.value && this.taskDescription.value)
    this.store.dispatch(
      new BoardActions.PostTaskStart({
        boardId: boardId,
        columnId: columnId,
        title: this.taskTitle.value,
        description: this.taskDescription.value,
        userId: this.userId
      })
    )
  }

  dropColumn(event: CdkDragDrop<Column>) {
    console.log(event)
    if(event.previousIndex === event.currentIndex) {
      return;
    }

    let movesCount = event.currentIndex - event.previousIndex;

    if(event.currentIndex > event.previousIndex) {
      // this.columns.forEach((column, index, array) => {

      // })
    }
  }
}
