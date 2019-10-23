import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VierweeksePlanningComponent } from './vierweekse-planning.component';

describe('VierweeksePlanningComponent', () => {
  let component: VierweeksePlanningComponent;
  let fixture: ComponentFixture<VierweeksePlanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VierweeksePlanningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VierweeksePlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
