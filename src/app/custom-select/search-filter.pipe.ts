import { Pipe, PipeTransform } from '@angular/core';
import { InputValue } from '../input-value';
import { FormGroup } from '@angular/forms';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
  filterLength = 10;

  // Searches on the basis of name and value
  transform(input: any, searchText: any, clientSearch: boolean): any {
    const returnInput: InputValue[] = [];
    const inputValue = input.map(i => i.value);
    if (input.length) {
      if (searchText && clientSearch) {
        searchText = searchText.toLowerCase();
        const searchValues = input.filter(i => {
          return (i.value.name.toString().toLowerCase().includes(searchText) ||
            i.value.value.toString().toLowerCase().includes(searchText));
        });
        return (searchValues);
      } else {
        return input;
      }
    } else {
      return [];
    }
  }
}
