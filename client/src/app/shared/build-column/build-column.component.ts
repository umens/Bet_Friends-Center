import { Component, OnChanges, Input, SimpleChanges, SimpleChange, ContentChild, TemplateRef } from '@angular/core';
import { ListItemDirective } from '../directives/list-item.directive';
import { Logger } from '../../core/logger.service';

const log = new Logger('Cols');
@Component({
  selector: 'app-build-column',
  templateUrl: './build-column.component.html',
  styleUrls: ['./build-column.component.scss']
})
export class BuildColumnComponent implements OnChanges {

  @Input() items: any[] = [];
  @Input() gridCols: number = 4; // The number of cols in grid
  gridItems: any[][];
  gridValidValues = [1, 2, 3, 4, 6, 12]; // divisible without remainder col count
  @ContentChild(TemplateRef) template: TemplateRef<any>;

  private initGrid() {
    // tslint:disable-next-line:no-bitwise
    this.gridCols = this.gridCols | 0; // cast to int
    this.gridCols = this.gridCols || 1; // ensure min. one row

    if (!this.gridValidValues.find(value => this.gridCols === value)) {
      this.gridCols = 4; // correct invalid input to default col count
    }

    const addition = this.items.length % this.gridCols > 0 ? 1 : 0;
    // tslint:disable-next-line:no-bitwise
    const rows = ((this.items.length / this.gridCols) | 0) + addition;

    this.gridItems = [];

    let index = 0;
    for (let i = 0; i < rows; i++) {
      const row: any[] = [];

      for (let j = 0; j < this.gridCols && index < this.items.length; j++) {
        row.push(this.items[index]);
        index++;
      }

      this.gridItems.push(row);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const itemsChange: SimpleChange = changes['items'];

    if (itemsChange) {
      const previous: any[] = itemsChange.previousValue;
      const current: any[] = itemsChange.currentValue;

      // previous.length !== current.length
      if (!itemsChange.isFirstChange() && previous == null) {
        this.initGrid();
      }
    }
  }

}
