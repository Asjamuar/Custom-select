import { Pipe, PipeTransform } from '@angular/core';
import { InputValue } from '../input-value';
import { FormGroup } from '@angular/forms';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
  filterLength = 10;

  // Searches on the basis of name and value
  transform(input: any, searchText: any): any {
    let returnInput: InputValue[] = [];
    const inputValue = input.map(i => i.value);
    // const filterValues = (array) => array.slice(0, this.filterLength);
    if (input.length) {
      if (searchText) {
        searchText = searchText.toLowerCase();
        let searchValues = input.filter(i => {
          return (i.value.name.toString().toLowerCase().includes(searchText) ||
            i.value.value.toString().toLowerCase().includes(searchText));
        });
        // return filterValues(searchValues);
        return (searchValues);
      } else {
        // return filterValues(input);
        return input;
      }
    } else {
      return [];
    }
  }

}
