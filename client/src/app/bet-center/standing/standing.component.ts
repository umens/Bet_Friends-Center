import { Component, OnInit, Input } from '@angular/core';
import { Group } from '../../models/group';

@Component({
  selector: 'app-standing',
  templateUrl: './standing.component.html',
  styleUrls: ['./standing.component.scss']
})
export class StandingComponent implements OnInit {

  @Input() groups: Group[];

  constructor() { }

  ngOnInit() { }

}
