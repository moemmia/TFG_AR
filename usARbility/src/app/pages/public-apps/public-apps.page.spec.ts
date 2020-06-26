import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicAppsPage } from './public-apps.page';

describe('PublicAppsPage', () => {
  let component: PublicAppsPageModule;
  let fixture: ComponentFixture<AppsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicAppsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicAppsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
