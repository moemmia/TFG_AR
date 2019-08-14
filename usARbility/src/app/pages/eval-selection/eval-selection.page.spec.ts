import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalSelectionPage } from './eval-selection.page';

describe('EvalSelectionPage', () => {
  let component: EvalSelectionPage;
  let fixture: ComponentFixture<EvalSelectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvalSelectionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvalSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
