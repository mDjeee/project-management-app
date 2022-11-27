import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Task, Column, IBoard } from './models/board.model';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import * as fromApp from '../../../store/app.reducer';
import * as BoardActions from '../board/store/board.actions';
import { FormControl, Validators } from '@angular/forms';
import { ConfirmDialogService } from 'src/app/shared/services/confirm-dialog.service';
import { getCookie } from 'src/app/core/services/cookie.service';
import { HttpClient } from '@angular/common/http';
import url from 'src/app/constants/baseUrl';

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
  taskEditTitle = new FormControl('', [Validators.required]);
  taskEditDescription = new FormControl('', [Validators.required]);
  focused = false;
  inputTitleToggleId = '';

  userId = ' '

  boardId!: string
  clickedColumn = '';

  constructor(
    private store: Store<fromApp.AppState>,
    private activatedRoute: ActivatedRoute,
    private dialogService: ConfirmDialogService,
    private http: HttpClient
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
        if(state.board.columns) {
          this.columns = state.board.columns;
        }
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
    console.log(this.boardId);
    if(this.taskTitle.value && this.taskDescription.value)
    this.store.dispatch(
      new BoardActions.PostTaskStart({
        boardId: this.boardId,
        columnId: columnId,
        title: this.taskTitle.value,
        description: this.taskDescription.value,
        userId: this.userId
      })
    )
  }

  deleteTask(boardId: string, columnId: string, taskId: string) {
    this.dialogService.confirmDialog({
      title: 'Delete',
      message: 'Are you sure to delete task?',
      cancelText: 'No',
      confirmText: 'Yes',
    }).subscribe((response: boolean) => {
      if(response) {
        this.store.dispatch(
          new BoardActions.DeleteTaskStart({
            boardId,
            columnId,
            taskId
          })
        )
      }
    })
  }

  updateTask(boardId: string, columnId: string, id: string, order: number) {
    if(this.taskEditTitle.value && this.taskEditDescription.value) {
      this.store.dispatch(
        new BoardActions.PutTaskStart({
          id,
          title: this.taskEditTitle.value,
          description: this.taskEditDescription.value,
          userId: this.userId,
          columnId,
          boardId,
          order
        })
      )
    }
  }

  dropColumn(event: CdkDragDrop<Column>) {
    if(event.previousIndex === event.currentIndex) {
      return;
    }

    const target = {...this.columns[event.previousIndex]};
    const affectedIndex = event.currentIndex > event.previousIndex ? event.currentIndex : event.currentIndex - 1;
    const affectedColumns = this.columns.filter((column, index) => index > affectedIndex && column.id != target.id);

    let result: Column[] = [];
    if(affectedColumns.length > 0) {
      result = [...affectedColumns.map(column => ({ ...column, order: column.order + 1 }))];
      target.order = Math.min(...affectedColumns.map(column => column.order));
    } else {
      target.order = Math.max(...this.columns.map(column => column.order)) + 1;
    }
    result.push(target);

    const newColumns = [...this.columns.map(column => ({ ...column })).filter(item => !result.map(column => column.id).includes(item.id)), ...result].sort((a, b) => a.order - b.order);
    newColumns.forEach((item, index) => item.order = index + 1);

    this.store.dispatch(
      new BoardActions.SortByOrder(newColumns)
    )

    newColumns.forEach((column) => {
      this.http.put(`${url}/boards/${this.boardId}/columns/${column.id}`, {
        title: column.title,
        order: column.order
      }).subscribe()
    })
  }

  taskDrop(event: CdkDragDrop<{
        id: string,
        title: string,
        description: string,
        order: number,
        userId: string,
        files: {
          filename: string,
          fileSize: number
        }[] | null
      }[]>) {

    if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
