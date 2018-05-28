import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CustomSelectComponent } from './custom-select/custom-select.component';
import { SearchFilterPipe } from './custom-select/search-filter.pipe';
import { SearchFilter2Pipe } from './custom-select/search-filter-2.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CustomSelectComponent,
    SearchFilterPipe,
    SearchFilter2Pipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
