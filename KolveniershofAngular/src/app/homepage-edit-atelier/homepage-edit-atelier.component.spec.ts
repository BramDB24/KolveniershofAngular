import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageEditAtelierComponent } from './homepage-edit-atelier.component';

describe('HomepageEditAtelierComponent', () => {
  let component: HomepageEditAtelierComponent;
  let fixture: ComponentFixture<HomepageEditAtelierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageEditAtelierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageEditAtelierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
