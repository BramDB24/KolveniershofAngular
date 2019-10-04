import { Component, Input } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './interfaces/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'KolveniershofAngular';
  public user: User[] = null;

  constructor(private userService: UserService) {}

  public fetchUsers(): void {
    this.userService.getUsers().subscribe(entry => {
      this.user = entry;
    });
  }
}
