import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './page/app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsComponent } from './components/tabs/tabs/tabs.component';
import { TabComponent } from './components/tabs/tab/tab.component';

@NgModule({
  declarations: [AppComponent, TabsComponent, TabComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
