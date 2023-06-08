import { Component, Input, OnInit } from '@angular/core';
import { AbstractFormComponent } from '../abstractFormComponent.class';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true,
    },
  ],
})
export class InputComponent<T> extends AbstractFormComponent<string> implements OnInit {
  static _id: number = 0;

  @Input() id = `${InputComponent.name}-${++InputComponent._id}`;
  @Input() type: string;
  @Input() clearInput: boolean;
  @Input() label?: string;
  @Input() valor: string = '';

  ngOnInit() { }

  onInputChange(value: string) {
    this.onChange(value);
    this.onTouch();
  }
}
