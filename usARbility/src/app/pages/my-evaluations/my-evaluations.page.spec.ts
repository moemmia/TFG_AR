import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEvaluationsPage } from './my-evaluations.page';

describe('MyEvaluationsPage', () => {
  let component: MyEvaluationsPage;
  let fixture: ComponentFixture<MyEvaluationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyEvaluationsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyEvaluationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
