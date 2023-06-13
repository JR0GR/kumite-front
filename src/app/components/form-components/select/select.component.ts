import { Component, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractFormComponent } from '../abstractFormComponent.class';
import { SelectOption } from 'src/app/core/models/selectOption.model';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectComponent,
      multi: true,
    },
  ],
})
export class SelectComponent<T> extends AbstractFormComponent<T> implements OnInit {
  static _id: number = 0;
  @Input() id = `${SelectComponent.name}-${++SelectComponent._id}`;
  @Input() valor: string = '';
  @Input() placeholder: string;
  @Input() label?: string;
  @Input() selectOptions: SelectOption<T>[]

  ngOnInit() { }

  onSelectChange(value: T) {
    this.onChange(value);
    this.onTouch();
  }
}
