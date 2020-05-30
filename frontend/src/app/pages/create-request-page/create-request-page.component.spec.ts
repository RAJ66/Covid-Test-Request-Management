import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRequestPageComponent } from './create-request-page.component';

describe('CreateRequestPageComponent', () => {
  let component: CreateRequestPageComponent;
  let fixture: ComponentFixture<CreateRequestPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRequestPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
