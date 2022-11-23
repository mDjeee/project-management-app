export interface IBoardBase {
  id: string;
  title: string;
  description: string;
  order: number;
}

export interface Dashboard {
  id: string;
  title: string;
  description: string;
}

export interface BoardTitle {
  title: string;
  description: string;
}

export interface IBoard extends Omit<IBoardBase, 'order'> {
  columns: IColumn[]
}

export interface IColumn extends Omit<IBoardBase, 'description'> {
  tasks: ITask[];
}

export interface ITask extends Omit<IBoardBase, 'description'> {
  userId: string;
  files:  IFile[];
}

export interface IFile {
  filename: string;
  fileSize: number;
}

export interface IErrorResponse {
  statusCode: number;
  message: string;
}

export interface IBoardStore {
  boards: Omit<IBoardBase, 'order'>[];
}
