import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  public aangemelde = this.accountService.user;

  constructor(private router: Router, private accountService: AccountService) { }

  ngOnInit() {
  }

  public redirect(directory: string): void {
    this.router.navigate([`/${directory}`]);
  }

  public afmelden(): void {
    this.accountService.logout();
  }
}
