import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { BuildColumnComponent } from './build-column/build-column.component';
import { SplitByColumnPipe } from './pipes/split-by-column.pipe';
import { DefaultPipe } from './pipes/default.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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
    LoaderComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
