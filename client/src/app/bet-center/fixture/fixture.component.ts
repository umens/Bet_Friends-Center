import { Component, OnInit, Input } from '@angular/core';
import { Fixture } from '../../models/fixture';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.scss']
})
export class FixtureComponent implements OnInit {

  @Input() fixture: Fixture;

  constructor() { }

  ngOnInit() {
  }

}
