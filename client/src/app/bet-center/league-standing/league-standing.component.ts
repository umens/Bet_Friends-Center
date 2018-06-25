import { Component, OnInit, Input } from '@angular/core';
import { Group } from '../../models/group';

@Component({
  selector: 'app-league-standing',
  templateUrl: './league-standing.component.html',
  styleUrls: ['./league-standing.component.scss']
})
export class LeagueStandingComponent implements OnInit {

  @Input() groups: Group[];

  constructor() { }

  ngOnInit() { }

}
