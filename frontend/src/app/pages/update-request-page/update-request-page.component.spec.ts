import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRequestPageComponent } from './update-request-page.component';

describe('UpdateRequestPageComponent', () => {
  let component: UpdateRequestPageComponent;
  let fixture: ComponentFixture<UpdateRequestPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateRequestPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
