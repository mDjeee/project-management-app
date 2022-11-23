import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { IBoard, IBoardBase, IBoardStore, IErrorResponse } from "src/app/auth/models/board.model";
import url from "src/app/constants/baseUrl";

@Injectable({
  providedIn: 'root'
})
export class MainRouteService {
  private _store: BehaviorSubject<IBoardStore> = new BehaviorSubject<IBoardStore>({
    boards: [],
  });

  public boards$: Observable<Omit<IBoardBase, 'order'>[]> = this._store.pipe(
    map((store) => store.boards)
  )

  public board!: IBoard;
  constructor(private http: HttpClient) {}

  public getAllBoards() {
    this.http.get<Omit<IBoardBase, 'order'>[]>(`${url}/boards`).subscribe(
      (boards: Omit<IBoardBase, 'order'>[]) => this._store.next({...this._store.getValue(), boards}),
    )
  }

  public createBoard(title: string, description: string) {
    const body: Omit<IBoardBase, 'id' | 'order'> = {title, description}
    this.http.post<Omit<IBoardBase, 'order'>>(`${url}/boards`, body).subscribe(
      board => {
        console.log(board);
        this.getAllBoards();
      }
    )
  }

  public getBoardById(id: string) {
    this.http.get<IBoard>(`${url}/boards/${id}`).subscribe(
      board => this.board = board,
      (error: IErrorResponse) => console.log(error.message)
    )
  }

  public deleteBoard(id: string) {
    this.http.delete<IBoard>(`${url}/boards/${id}`).subscribe(
      () => this.getAllBoards()
    );
  }

  // public updateBoard(id: string, title: string, description: string) {
  //   const body: Omit<IBoardBase, 'id' | 'order'> = {title, description};
  //   const index = this.boards.findIndex(item => item.id === id);
  //   this.http.put<Omit<IBoardBase, 'order'>>(`${url}/boards/${id}`, body).subscribe(
  //     board => this.boards.splice(index, 1, board),
  //     (error: IErrorResponse) => console.log(error.message)
  //   )
  // }

}
