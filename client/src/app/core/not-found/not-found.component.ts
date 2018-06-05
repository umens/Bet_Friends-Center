import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit, OnDestroy {

  private head: HTMLElement;
  imageNumber: number;

  constructor(
    private _location: Location,
    private titleService: Title,
  ) {
    this.titleService.setTitle('404');
    this.imageNumber = Math.floor(Math.random() * 2) + 1;
    this.head = document.getElementsByTagName('head')[0];
  }

  ngOnInit(): void {
    const link = document.createElement('link');
    link.id = 'font-404';
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = '//fonts.googleapis.com/css?family=Open+Sans';
    this.head.appendChild(link);
  }

  ngOnDestroy(): void {
    const link = document.getElementById('font-404');
    this.head.removeChild(link);
  }

  goBack(): void {
    this._location.back();
  }

}
