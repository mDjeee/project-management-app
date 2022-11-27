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

export interface Task {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files: IFile
}

export interface IFile {
  filename: string;
  fileSize: number;
}

export interface IErrorResponse {
  statusCode: number;
  message: string;
}
