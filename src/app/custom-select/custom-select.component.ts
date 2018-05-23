import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { InputValue } from '../input-value';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: CustomSelectComponent,
    multi: true
  }]
})
export class CustomSelectComponent implements OnInit {

  @Input() input: InputValue[];
  @Input() multi: boolean;

  selectedForm: FormGroup;
  checkedForm: FormGroup;

  result: InputValue[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.checkedForm = this.fb.group({
      objects: this.fb.array([])
    });

    this.selectedForm = this.fb.group({
      objects: this.fb.array([])
    });
  }

  onChange(inp: InputValue, isChecked: boolean) {
    if (isChecked) {
      this.result.push(inp);
    } else {
      const index = this.result.findIndex(x => x.name === inp.name);
      this.result.splice(index, 1);
    }
  }

  onUpdate(inp: InputValue) {
    this.result = [];
    this.result.push(inp);
  }
}
