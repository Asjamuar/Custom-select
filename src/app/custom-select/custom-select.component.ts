import { Component, OnInit, Input, ViewChild, forwardRef, HostBinding } from '@angular/core';
import { InputValue } from '../input-value';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomSelectComponent),
    multi: true
  }]
})
export class CustomSelectComponent implements OnInit, ControlValueAccessor {

  @Input() input: InputValue[];
  @Input() multi: boolean;
  
  result: InputValue[] = [];

  selectedForm: FormGroup;
  checkedForm: FormGroup;

  private onTouch: Function;
  private onModelChange: Function;
  registerOnTouched(fn) {
    this.onTouch = fn;
  }
  registerOnChange(fn) {
    this.onModelChange = fn;
  }
  writeValue(value) {
    this._onChange(value);
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.checkedForm = this.fb.group({
      objects: this.fb.array([])
    });

    this.selectedForm = this.fb.group({
      objects: this.fb.array([])
    });
  }

  _onChange(value) {
    if (this.onModelChange) {
      this.onModelChange(value);
    }
  }

  onChangeCheck(inp: InputValue, isChecked: boolean) {
    if (this.multi) {
      if (isChecked) {
        this.result.push(inp);
      } else {
        const index = this.result.findIndex(x => x.name === inp.name);
        this.result.splice(index, 1);
      }
      this._onChange(this.result);
    }
  }

  onUpdate(inp: InputValue) {
    if (!this.multi) {
      this.result = [];
      this.result.push(inp);
      this._onChange(this.result);
    }
  }
}
