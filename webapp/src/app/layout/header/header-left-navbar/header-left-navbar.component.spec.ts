import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLeftNavbarComponent } from './header-left-navbar.component';

describe('HeaderLeftNavbarComponent', () => {
  let component: HeaderLeftNavbarComponent;
  let fixture: ComponentFixture<HeaderLeftNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderLeftNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderLeftNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
