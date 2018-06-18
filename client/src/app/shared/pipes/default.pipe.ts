import { Pipe, PipeTransform } from '@angular/core';

/*
 * Split an array into an Array of subArrays of {{ col number }} length
 * Takes an number of column argument that defaults to 1.
 * Usage:
 *   value | splitByColumn:colsNumber
 * Example:
 *   {{ image | default:"http://example.com/default-image.png" }}
*/
@Pipe({
  name: 'default'
})
export class DefaultPipe implements PipeTransform {

  transform(value: string, fallback: string, forceHttps: boolean = false): string {
    let image = '';
    if (value) {
      image = value;
    } else {
      image = fallback;
    }
    if (forceHttps) {
      if (image.indexOf('https') === -1) {
        image = image.replace('http', 'https');
      }
    }
    return image;
  }
}
