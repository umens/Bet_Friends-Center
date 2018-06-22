import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { BuildColumnComponent } from './build-column/build-column.component';
import { SplitByColumnPipe } from './pipes/split-by-column.pipe';
import { DefaultPipe } from './pipes/default.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ListItemDirective } from './directives/list-item.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoaderComponent,
    BuildColumnComponent,
    SplitByColumnPipe,
    DefaultPipe,
    ListItemDirective
  ],
  exports: [
    LoaderComponent,
    BuildColumnComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
