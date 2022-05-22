import { Component,ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
  selector: 'sidebar-user-panel',
  templateUrl: './sidebar-user-panel.component.html',
  styleUrls: ['./sidebar-user-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarUserPanelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
