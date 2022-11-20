import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IBoard, IBoardBase, IErrorResponse } from "src/app/auth/models/board";
import url from "src/app/constants/baseUrl";

@Injectable({
  providedIn: 'root'
})
export class MainRouteService {
  public boards: Omit<IBoardBase, 'order'>[] = [];
  public board!: IBoard;
  constructor(private http: HttpClient) {}

  public getAllBoards() {
    this.http.get<Omit<IBoardBase, 'order'>[]>(`${url}/boards`).subscribe(
      boards => this.boards = boards,
      (error: IErrorResponse) => console.log(error.message)
    )
  }

  public createBoard(title: string, description: string) {
    const body: Omit<IBoardBase, 'id' | 'order'> = {title, description}
    this.http.post<Omit<IBoardBase, 'order'>>(`${url}/boards`, body).subscribe(
      board => this.boards.push(board),
      (error: IErrorResponse) => console.log(error.message)
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
      deleted => console.log(deleted),
      (error: IErrorResponse) => console.log(error.message)
    )
  }

  public updateBoard(id: string, title: string, description: string) {
    const body: Omit<IBoardBase, 'id' | 'order'> = {title, description};
    const index = this.boards.findIndex(item => item.id === id);
    this.http.put<Omit<IBoardBase, 'order'>>(`${url}/boards/${id}`, body).subscribe(
      board => this.boards.splice(index, 1, board),
      (error: IErrorResponse) => console.log(error.message)
    )
  }


}
