import { Component,ChangeDetectionStrategy, OnInit } from '@angular/core';


@Component({
  selector: 'header-left-navbar',
  templateUrl: './header-left-navbar.component.html',
  styleUrls: ['./header-left-navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderLeftNavbarComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar(): void {
   // this._layoutStore.setSidebarExpanded(!this.sidebarExpanded);
  }

}//cs
