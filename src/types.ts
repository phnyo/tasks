export type Detail = {
  readonly id: number,
  date: string;
  value: string;
}

export type Task = {
  readonly id: number;
  value: string;
  status: Status;
  details: Detail[];
  subTasks: Task[];
}
