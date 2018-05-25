import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CustomSelectComponent } from './custom-select/custom-select.component';
import { SearchFilterPipe } from './custom-select/search-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CustomSelectComponent,
    SearchFilterPipe
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
