import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictoPageComponent } from './picto-page.component';

describe('PictoPageComponent', () => {
  let component: PictoPageComponent;
  let fixture: ComponentFixture<PictoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
