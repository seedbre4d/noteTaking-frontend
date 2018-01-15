import { Component, OnInit } from '@angular/core';
import { MatTab } from '@angular/material/tabs/typings/tab';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit {

  constructor(
    private router: Router
  ) {}
  tabLinks = [
    {label: 'Notes', link: 'note'},
    {label: 'Categories', link: 'category'},
    {label: 'Profile', link: 'edit'},
  ];
  tabNavBackground: 'black';
  ngOnInit(): void {
  }

  logout() {
    Cookie.deleteAll('/');
    this.router.navigateByUrl('');
  }

}
