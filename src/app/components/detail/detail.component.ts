import { StorageService } from './../../service/storage.service';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { TodoTask } from 'src/app/model/task.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnChanges {
  today = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
  @Input() isCreatePage = true;
  initItem = {
    id: 0,
    title: '',
    description: '',
    date: this.today,
    priority: 'Normal',
    show: false,
    done: false,
    selected: false
  };
  @Input() done = false;
  @Input() reset = false;
  @Input() item: TodoTask = this.initItem;
  priorities = ['Low', 'Normal', 'High'];
  isSubmitted = false;
  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.initItem = { ...this.item };
    this.item = { ...this.item };
  }

  saveTask() {
    const list = this.storageService.getData();
    if (this.isCreatePage) {
      if (list.length !== 0) {
        this.item.id = list[list.length - 1].id + 1;
      }
      list.push(this.item);
    } else {
      const idx = list.findIndex(task => task.id === this.item.id);
      list[idx] = this.item;
    }
    this.storageService.storeData(list);
    this.resetAllField();
  }

  resetAllField() {
    if (this.isCreatePage) {
      this.item.title = '';
      this.item.date = this.today;
      this.item.priority = 'Normal';
      this.item.description = '';
    }
    this.isSubmitted = true;
  }

  ngOnChanges() {
    if (this.reset) {
      this.item = { ...this.initItem };
    }
  }
}
