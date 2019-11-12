import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictoDagComponent } from './picto-dag.component';

describe('PictoDagComponent', () => {
  let component: PictoDagComponent;
  let fixture: ComponentFixture<PictoDagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictoDagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictoDagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
