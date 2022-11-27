
export interface Board {
  id: string,
  title: string,
  description: string,
  columns: Column[]
}

export interface Column {
  id: string,
  title: string,
  order: number,
  tasks: Task[] | null
}

export interface IBoard {
  id: string,
  title: string,
  description: string,
  columns: {
    id: string,
    title: string,
    order: number,
    tasks: {
      id: string,
      title: string,
      order: number,
      description: string,
      userId: string,
      files: {
        filename: string,
        fileSize: number
      }[] | null
    }[] | null
  }[] | null
}

export interface Task {
  id: string,
  title: string,
  order: number,
  description: string,
  userId: string,
  files: File[] | null
}

export interface File {
  filename: string,
  fileSize: number
}
