import { Component } from '@angular/core';
import { McBreadcrumbsConfig } from 'ngx-breadcrumbs';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {

  title: String;

  constructor(
    private breadcrumbsConfig: McBreadcrumbsConfig,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
  ) {

    this.breadcrumbsConfig.postProcess = (x) => {
      // Ensure that the first breadcrumb always points to home
      let y = x;
      if (x.length && x[0].text !== 'Home') {
        y = [
          {
            text: 'Home',
            path: ''
          }
        ].concat(x);
      }
      return y;
    };

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.title = this.titleService.getTitle();
      }
    });


  }

}
