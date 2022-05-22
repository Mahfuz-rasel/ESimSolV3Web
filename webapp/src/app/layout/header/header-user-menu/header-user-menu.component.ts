import { Component,ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
  selector: 'header-user-menu',
  templateUrl: './header-user-menu.component.html',
  styleUrls: ['./header-user-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderUserMenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  logout(): void {
    //this._authService.logout();
  }

}
