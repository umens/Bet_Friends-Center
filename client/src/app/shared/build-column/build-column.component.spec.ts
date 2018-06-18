import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildColumnComponent } from './build-column.component';

describe('BuildColumnComponent', () => {
  let component: BuildColumnComponent;
  let fixture: ComponentFixture<BuildColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
