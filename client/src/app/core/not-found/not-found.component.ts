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
    const link2 = document.createElement('link');
    link2.id = '404Page';
    link2.type = 'text/css';
    link2.rel = 'stylesheet';
    link2.href = 'assets/404page.css';
    this.head.appendChild(link2);
  }

  ngOnDestroy(): void {
    const link = document.getElementById('font-404');
    const link2 = document.getElementById('404Page');
    this.head.removeChild(link);
    this.head.removeChild(link2);
  }

  goBack(): void {
    this._location.back();
  }

}
