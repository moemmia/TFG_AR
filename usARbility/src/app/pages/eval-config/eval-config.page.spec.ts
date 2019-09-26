import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalConfigPage } from './eval-config.page';

describe('EvalConfigPage', () => {
  let component: EvalConfigPage;
  let fixture: ComponentFixture<EvalConfigPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvalConfigPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvalConfigPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
