import { Pipe, PipeTransform } from '@angular/core';

/*
 * Split an array into an Array of subArrays of {{ col number }} length
 * Takes an number of column argument that defaults to 1.
 * Usage:
 *   value | splitByColumn:colsNumber
 * Example:
 *   {{ [...] | splitByColumn:2 }}
 *   formats to: [[...],[...]]
*/
@Pipe({
  name: 'splitByColumn'
})
export class SplitByColumnPipe implements PipeTransform {

  transform(arr: any[], cols: number = 1): any {
    const newArr = [];
    for (let i = 0; i < arr.length; i += cols) {
      newArr.push(arr.slice(i, i + cols));
    }
    return newArr;
  }

}
