import { Component, OnInit } from '@angular/core';
import { InputValue } from './input-value';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  multi: boolean;

  input: InputValue[];

  inputForm: FormGroup;

  constructor(private fb: FormBuilder) {
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

  ngOnInit() {
    this.inputForm = this.fb.group({
      selectValue: ['']
    });
  }
}
