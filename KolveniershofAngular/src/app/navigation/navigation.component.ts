import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { Gebruiker } from '../models/gebruiker.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  public aangemelde: Gebruiker;

  constructor(private router: Router, private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.huidigeGebruiker.subscribe(t => {
      this.aangemelde = t;
    });
  }

  public isAdmin(): boolean {
    return this.aangemelde && this.aangemelde.type === 'Admin';
  }

  public isBegeleider(): boolean {
    return this.aangemelde && (this.aangemelde.type === 'Admin' || this.aangemelde.type === 'Begeleider');
  }

  public redirect(directory: string): void {
    this.router.navigate([`/${directory}`]);
  }

  public afmelden(): void {
    this.accountService.logout();
    this.router.navigate([`/login`])
  }
}
