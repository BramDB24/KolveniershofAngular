import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictoClientenlijstComponent } from './picto-clientenlijst.component';

describe('PictoClientenlijstComponent', () => {
  let component: PictoClientenlijstComponent;
  let fixture: ComponentFixture<PictoClientenlijstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictoClientenlijstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictoClientenlijstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
