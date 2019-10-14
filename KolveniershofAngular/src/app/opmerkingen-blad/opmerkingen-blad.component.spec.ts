import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpmerkingenBladComponent } from './opmerkingen-blad.component';

describe('OpmerkingenBladComponent', () => {
  let component: OpmerkingenBladComponent;
  let fixture: ComponentFixture<OpmerkingenBladComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpmerkingenBladComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpmerkingenBladComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
