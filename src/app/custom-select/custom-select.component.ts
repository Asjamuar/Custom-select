import { Component, OnInit, OnChanges, Input, ViewChild, forwardRef, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { HostBinding, SimpleChanges, ElementRef, HostListener } from '@angular/core';
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
  @Input() clientSearch = true;

  @Output() output = new EventEmitter<string>();

  result: InputValue[] = [];

  private objects: InputValue[] = [];

  selectForm: FormGroup;
  queryForm: FormGroup;

  focus: boolean;

  // For Control Value Accessor
  private onTouch: Function;
  private onModelChange: Function;

  @HostListener('document:click', ['$event'])
  handleClick(event) {
    let clickedComponent = event.target;
    let inside = false;
    do {
        if (clickedComponent === this.element.nativeElement) {
            inside = true;
        }
        clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if (!inside) {
      this.focus = false;
    }
  }

  registerOnTouched(fn) {
    this.onTouch = fn;
  }

  registerOnChange(fn) {
    this.onModelChange = fn;
  }

  writeValue(value) {
    this._onChange(value);
  }

  constructor(private fb: FormBuilder, private element: ElementRef, private cdr: ChangeDetectorRef) {
    this.selectForm = this.fb.group({
      'objects': this.fb.array([])
    });

    this.queryForm = new FormGroup({
      'query': new FormControl('', [])
    });

    this.queryForm.get('query').valueChanges.subscribe(query => {
      if (!this.clientSearch) {
        this.output.emit(query);
      }
    });
  }

  initForm() {
    if (this.multi) {
      while (this.objectsArray.length) {
        this.objectsArray.removeAt(this.objectsArray.length - 1 );
      }
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

  ngOnInit() {
    this.focus = false;
    this.selectForm.valueChanges.subscribe(v => {this.cdr.detectChanges(); this.changeOutput(); });
  }

  get objectsArray() {
    return <FormArray>this.selectForm.controls['objects'];
  }

  ngOnChanges(changes: SimpleChanges) {
      this.input.sort(function(a, b) {
      return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
    });

    this.objects = this.input;
    this.initForm();
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
      this.focus = false;
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
}
