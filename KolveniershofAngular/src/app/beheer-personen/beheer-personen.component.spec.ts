import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeheerPersonenComponent } from './beheer-personen.component';

describe('BeheerPersonenComponent', () => {
  let component: BeheerPersonenComponent;
  let fixture: ComponentFixture<BeheerPersonenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeheerPersonenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeheerPersonenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
