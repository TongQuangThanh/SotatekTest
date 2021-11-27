import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TodoTask } from '../model/task.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public onSubject = new Subject<string>();
  public changes = this.onSubject.asObservable();

  constructor() {
  }

  getData(): TodoTask[] {
    const dataStored = localStorage.getItem('SoTaTek-todo-list') || '[]';
    const list = JSON.parse(dataStored);
    const sortedList = list.sort((taskA: TodoTask, taskB: TodoTask) => new Date(taskA.date).getTime() - new Date(taskB.date).getTime())
    return sortedList;
  }

  storeData(data: TodoTask[]) {
    localStorage.setItem('SoTaTek-todo-list', JSON.stringify(data));
    this.onSubject.next('save success');
  }
}
