import { Component, OnInit } from '@angular/core';
import { InputValue } from './input-value';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  multi: boolean;

  input: InputValue[];

  constructor() {
    this.multi = true;
    this.input = [
      {
        name: 'Adi',
        value: 123
      },
      {
        name: 'Aditya',
        value: 456
      }
    ];
  }
}
