import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeheerAteliersComponent } from './beheer-ateliers.component';

describe('BeheerAteliersComponent', () => {
  let component: BeheerAteliersComponent;
  let fixture: ComponentFixture<BeheerAteliersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeheerAteliersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeheerAteliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
