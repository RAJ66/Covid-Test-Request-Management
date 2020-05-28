import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRequestsPageComponent } from './employee-requests-page.component';

describe('EmployeeRequestsPageComponent', () => {
  let component: EmployeeRequestsPageComponent;
  let fixture: ComponentFixture<EmployeeRequestsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeRequestsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeRequestsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
