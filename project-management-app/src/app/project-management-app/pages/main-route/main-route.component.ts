import { Component, OnInit } from '@angular/core';
import { IBoard, IBoardBase } from 'src/app/auth/models/board.model';
import { MainRouteService } from '../../services/main-route.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-route',
  templateUrl: './main-route.component.html',
  styleUrls: ['./main-route.component.scss'],
})
export class MainRouteComponent implements OnInit {
  public boards: Omit<IBoardBase, 'order'>[] = [];
  public board!: IBoard;

  public boards$: Observable<Omit<IBoardBase, 'order'>[]> = this.mainRouteService.boards$;

  public boardForm!: FormGroup;
  constructor(private mainRouteService: MainRouteService) {}
  ngOnInit(): void {
    this.boardForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
    this.mainRouteService.getAllBoards();
  }

  createBoard() {
    const title = this.boardForm.get('title')?.value;
    const description = this.boardForm.get('description')?.value;
    this.mainRouteService.createBoard(title, description);
    this.boardForm.reset();
  }

  deleteBoard(id: string) {
    this.mainRouteService.deleteBoard(id);
  }

  updateBoard(id: string) {}
}
