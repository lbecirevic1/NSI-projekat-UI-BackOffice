import { Component, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  enteredSearchValue: string='';

  @Output()
  searchTextChange: EventEmitter<string> = new EventEmitter<string>();

  onSearchTextChanged(){
    this.searchTextChange.emit(this.enteredSearchValue);
  }
}
