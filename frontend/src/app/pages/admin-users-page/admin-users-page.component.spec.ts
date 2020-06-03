import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersPageComponent } from './admin-users-page.component';

describe('AdminUsersPageComponent', () => {
  let component: AdminUsersPageComponent;
  let fixture: ComponentFixture<AdminUsersPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUsersPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
