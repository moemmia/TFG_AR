import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalAppPage } from './eval-app.page';

describe('EvalAppPage', () => {
  let component: EvalAppPage;
  let fixture: ComponentFixture<EvalAppPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvalAppPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvalAppPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
