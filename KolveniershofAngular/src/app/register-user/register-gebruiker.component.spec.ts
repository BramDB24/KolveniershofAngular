import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterGebruikerComponent } from './register-gebruiker.component';

describe('RegisterUserComponent', () => {
  let component: RegisterGebruikerComponent;
  let fixture: ComponentFixture<RegisterGebruikerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterGebruikerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterGebruikerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
