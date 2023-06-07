import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit {
  @Output() searchValue = new EventEmitter<string>();

  constructor() { }

  ngOnInit() { }

  searchValueChanged(event) {
    console.log(event.detail.value)
    this.searchValue.emit(event.detail.value);
  }
}
