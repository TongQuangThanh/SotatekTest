import { StorageService } from './../../service/storage.service';
import { Component, OnInit } from '@angular/core';
import { TodoTask } from 'src/app/model/task.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  list: TodoTask[] = [];
  allList: TodoTask[] = [];
  isOpenAction = false;
  isReset = false;
  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.getListData();
    this.storageService.changes.subscribe(
      data => {
        this.getListData();
      },
      error => {
        console.error(error);
      });
  }

  getListData() {
    this.allList = this.list = this.storageService.getData();
  }

  searchTask(text: string) {
    this.list = this.allList.filter(task => task.title.includes(text));
  }

  openAction(item: TodoTask) {
    item.selected = !item.selected;
    this.isOpenAction = this.list.some(task => task.selected);
  }

  removeTask(id?: number) {
    if (id) {
      this.allList = this.allList.filter(task => task.id !== id);
    } else {
      this.allList = this.allList.filter(task => !task.selected);
    }
    this.storageService.storeData(this.allList);
  }

  resetUpdate(id: number) {
    const idx = this.allList.findIndex(task => task.id === id);
    this.list[idx] = this.allList[idx];
  }

  completeTask() {
    this.allList.forEach(task => {
      if (task.selected) {
        task.done = true;
      }
    });
    this.storageService.storeData(this.allList);
  }
}
