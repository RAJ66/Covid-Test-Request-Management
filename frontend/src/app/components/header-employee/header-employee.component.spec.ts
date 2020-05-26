import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderEmployeeComponent } from './header-employee.component';

describe('HeaderEmployeeComponent', () => {
  let component: HeaderEmployeeComponent;
  let fixture: ComponentFixture<HeaderEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
