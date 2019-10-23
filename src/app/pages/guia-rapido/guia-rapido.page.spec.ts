import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiaRapidoPage } from './guia-rapido.page';

describe('GuiaRapidoPage', () => {
  let component: GuiaRapidoPage;
  let fixture: ComponentFixture<GuiaRapidoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuiaRapidoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiaRapidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
