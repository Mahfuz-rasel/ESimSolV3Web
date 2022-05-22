import { Component,ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
  selector: 'sidebar-logo',
  templateUrl: './sidebar-logo.component.html',
  styleUrls: ['./sidebar-logo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarLogoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

