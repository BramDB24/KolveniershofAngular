import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageEditMaaltijdComponent } from './homepage-edit-maaltijd.component';

describe('HomepageEditMaaltijdComponent', () => {
  let component: HomepageEditMaaltijdComponent;
  let fixture: ComponentFixture<HomepageEditMaaltijdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageEditMaaltijdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageEditMaaltijdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
