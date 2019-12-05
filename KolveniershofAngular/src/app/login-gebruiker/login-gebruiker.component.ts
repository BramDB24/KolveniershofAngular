import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-login-gebruiker',
  templateUrl: './login-gebruiker.component.html',
  styleUrls: ['./login-gebruiker.component.scss']
})
export class LoginGebruikerComponent implements OnInit {
  public errorMessage: string;

  public loginCredential: string;
  public password: string;

  constructor(public router: Router, private accountService: AccountService) {}

  ngOnInit() {
    sessionStorage.removeItem('LoginCredential');
    sessionStorage.clear();
  }

  public login(): void | string {
    if (!this.loginCredential || !this.password) {
      this.errorMessage = 'Gelieve een wachtwoord en/of gebruikersnaam in te vullen';
      return;
    }

    this.accountService.login(this.loginCredential, this.password).subscribe(
      value => {
        if (value) {
          if (this.accountService.redirectUrl) {
            this.router.navigateByUrl(this.accountService.redirectUrl);
            this.accountService.redirectUrl = undefined;
          } else {
           this.router.navigate(['']);
          }
        } else {
          this.errorMessage = 'Could not login';
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        if (err.error instanceof Error) {
          this.errorMessage = `Error while trying to login user ${
            this.loginCredential
          } `;
        } else {
          this.errorMessage = `Error ${err.status} while trying to login user ${
            this.loginCredential
          } `;
        }
      }
    );
  }
}
