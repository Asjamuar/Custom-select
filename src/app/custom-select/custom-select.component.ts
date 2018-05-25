import { Component, OnInit, OnChanges, Input, ViewChild, forwardRef, HostBinding, SimpleChanges } from '@angular/core';
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

  focus: boolean;

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
        fg.get('isActive').markAsTouched();
        this.objectsArray.push(fg);
      }
    }
  }

  removeActive(object: FormGroup) {
    object.patchValue({
      isActive: false
    });
  }

  setActive(object: FormGroup) {
    object.patchValue({
      isActive: true
    });
  }

  ngOnInit() {
    this.focus = false;
  }

  get objectsArray() {
    return <FormArray>this.selectForm.controls['objects'];
  }

  ngOnChanges(changes: SimpleChanges) {
    this.objects = this.input;
    this.initForm();
    this.selectForm.valueChanges.subscribe(change => this.changeOutput());
  }

  _onChange(value) {
    if (this.onModelChange) {
      this.onModelChange(value);
    }
  }

  changeOutput() {
    this.result = this.objectsArray.controls.filter(c => c.value.isActive).map(c => ({value: c.value.value, name: c.value.name }));
    this._onChange(this.result);
  }

  onUpdate(inp: InputValue) {
    if (!this.multi) {
      this.result = [];
      this.result.push(inp);
      this._onChange(this.result);
    }
  }

  get message() {
    if (this.result.length === 0) {
      return 'No option selected';
    } else if (this.result.length === 1) {
      return this.result[0].name + ' selected';
    } else {
      return this.result.length + ' options selected';
    }
  }

  onFocusToggle() {
    this.focus = true;
  }

  onFocusOutToggle() {
    this.focus = false;
  }
}
