import { Component, OnInit } from '@angular/core';
import { InputValue } from './input-value';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  multi: boolean;

  input: InputValue[];
  output: string;

  inputForm: FormGroup;
  selectTypeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.multi = false;
    this.input = [
      {
        name: 'Adi',
        value: 123
      },
      {
        name: 'zawkdsnal',
        value: 3214
      },
      {
        name: 'A23414',
        value: 11242354
      },
      {
        name: 'Adifsag  ',
        value: 1214
      },
      {
        name: 'ASidsf',
        value: 76746894
      },
      {
        name: 'iafshd;eug',
        value: 231895793146
      },
      {
        name: 'afsduoig',
        value: 265394817817753
      },
      {
        name: 'udjkshfd',
        value: 12043903
      },
      {
        name: 'dsafkgyuec,mv',
        value: 18564
      },
      {
        name: 'aihfdeefow',
        value: 2141
      },
      {
        name: 'daoishgw',
        value: 89342
      },
      {
        name: 'asdohi',
        value: 132522
      },
      {
        name: 'Adasii',
        value: 23950
      },
      {
        name: 'Aditya',
        value: 12409
      }
    ];
  }

  ngOnInit() {
    this.inputForm = this.fb.group({
      selectValue: ['']
    });
    this.selectTypeForm = this.fb.group({
      'type': new FormControl('', [

      ])
    });
  }

  changeType() {
    this.multi = this.selectTypeForm.value.type === 'true' ? true : false;
  }

  updateOutput(output: string) {
    this.output = output;
  }

  changeInput() {
    this.input = [
      {
        name: 'changed',
        value: 213
      }
    ];
  }
}
