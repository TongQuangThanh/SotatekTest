export interface TodoTask {
  id: number;
  title: string;
  description: string;
  date: string;
  priority: string;
  selected: boolean;
  done: boolean;
  show: boolean;
}