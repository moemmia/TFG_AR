import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplanationsPage } from './explanations.page';

describe('ExplanationsPage', () => {
  let component: ExplanationsPage;
  let fixture: ComponentFixture<ExplanationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExplanationsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplanationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
