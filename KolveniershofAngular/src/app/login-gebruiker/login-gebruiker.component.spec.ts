import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginGebruikerComponent } from './login-gebruiker.component';

describe('LoginGebruikerComponent', () => {
  let component: LoginGebruikerComponent;
  let fixture: ComponentFixture<LoginGebruikerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginGebruikerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginGebruikerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
