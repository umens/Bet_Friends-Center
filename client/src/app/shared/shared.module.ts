import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { BuildColumnComponent } from './build-column/build-column.component';
import { SplitByColumnPipe } from './pipes/split-by-column.pipe';
import { DefaultPipe } from './pipes/default.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoaderComponent,
    BuildColumnComponent,
    SplitByColumnPipe,
    DefaultPipe
  ],
  exports: [
    LoaderComponent
  ]
})
export class SharedModule { }
