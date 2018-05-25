import { Component, OnInit, OnChanges, Input, ViewChild, forwardRef, HostBinding } from '@angular/core';
import { InputValue } from '../input-value';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { delay } from 'q';

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
export class CustomSelectComponent implements OnInit, OnChanges, ControlValueAccessor {

  @Input() input: InputValue[];
  @Input() multi: boolean;

  result: InputValue[] = [];

  private objects: InputValue[] = [];

  selectForm: FormGroup;

  // For Control Value Accessor
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

  constructor(private fb: FormBuilder) {
    this.selectForm = this.fb.group({
      'objects': this.fb.array([])
    });
  }

  initForm() {
    if (this.multi) {
      for (let i = 0; i < this.objects.length; i++) {
        const fg = this.fb.group({
          name: [this.objects[i].name, Validators.required],
          value: [this.objects[i].value, Validators.required],
          isActive: [false, Validators.required]
        });
        this.objectsArray.push(fg);
      }
    } else {
      
    }
  }

  ngOnInit() {}

  get objectsArray() {
    return <FormArray>this.selectForm.controls['objects'];
  }

  ngOnChanges() {
    this.objects = this.input;
    this.initForm();
  }

  _onChange(value) {
    if (this.onModelChange) {
      this.onModelChange(value);
    }
  }

  changeOutput() {
    const result = this.objectsArray.controls.filter(c => c.value.isActive).map(c => ({value: c.value.value, name: c.value.name }));
    console.log(result, this.objectsArray);
    this._onChange(result);
  }

  onUpdate(inp: InputValue) {
    if (!this.multi) {
      this.result = [];
      this.result.push(inp);
      this._onChange(this.result);
    }
  }
}
