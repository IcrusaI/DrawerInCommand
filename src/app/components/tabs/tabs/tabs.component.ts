import { Component } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsComponent {
  tabs: TabComponent[] = [];

  constructor() {}

  selectTab(tab: TabComponent): void {
    this.tabs.forEach((tabComponent) => {
      tabComponent.active = false;
    });
    tab.active = true;
  }

  addTab(tab: TabComponent): void {
    if (this.tabs.length === 0) {
      tab.active = true;
    }
    this.tabs.push(tab);
  }
}
