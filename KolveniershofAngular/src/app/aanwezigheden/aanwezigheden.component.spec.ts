import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AanwezighedenComponent } from './aanwezigheden.component';

describe('AanwezighedenComponent', () => {
  let component: AanwezighedenComponent;
  let fixture: ComponentFixture<AanwezighedenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AanwezighedenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AanwezighedenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
