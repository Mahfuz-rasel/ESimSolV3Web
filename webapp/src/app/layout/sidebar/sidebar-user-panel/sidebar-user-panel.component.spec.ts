import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarUserPanelComponent } from './sidebar-user-panel.component';

describe('SidebarUserPanelComponent', () => {
  let component: SidebarUserPanelComponent;
  let fixture: ComponentFixture<SidebarUserPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarUserPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarUserPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
