import { Component, OnInit, Input } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { DayService } from '../services/day.service';
import { Atelier } from '../interfaces/atelier.interface';
import { User, Rol } from '../interfaces/user.interface';
import { DayComponent } from '../day/day.component';
import { Day } from '../interfaces/day.interface';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-homepage-edit',
  templateUrl: './homepage-edit.component.html',
  styleUrls: ['./homepage-edit.component.scss']
})
export class HomepageEditComponent implements OnInit {
  @Input() public datum: Date;
  public loaded = false;
  public object: object;
  // public ateliers = new Array<Atelier>();
  public clienten = new Array<User>();
  public begeleiders = new Array<User>();
  public dag: Day;
  public checked = false;

  public aanwezigen = new Array<User>();

  constructor(
    private dayService: DayService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.dayService
      .getDay(this.datum)
      .pipe(
        finalize(() => {
          this.loaded = true;
        })
      )
      .subscribe(entry => {
        this.dag = entry;
      });

    this.userService
      .getUsers()
      .pipe(
        finalize(() => {
          this.loaded = true;
        })
      )
      .subscribe(entry => {
        entry.forEach(element => {
          element.rol !== Rol.cliënt
            ? this.begeleiders.push(element)
            : this.clienten.push(element);
        });
      });
  }

  public isActive(t: any) {
    this.checked = t;
  }

  // public triggerClicked(e : any) {
  //   var clickedElementName = e.target.attributes.id;
  // }

  public triggerClicked(user: User) {
    if (this.aanwezigen.includes(user)) {
      const index = this.aanwezigen.indexOf(user);
      this.aanwezigen.splice(index, 1);
      document.getElementById(user.naam).classList.remove("style1");
    } else {
      this.aanwezigen.push(user);
      document.getElementById(user.naam).classList.add("style1");
    }
    console.log(this.aanwezigen);
    
  }

  // public functie(user: User) {
  //   if (this.aanwezigen.includes(user)) {
  //     const index = this.aanwezigen.indexOf(user);
  //     this.aanwezigen.splice(index, 1);
  //   } else {
  //     this.aanwezigen.push(user);
  //   }
  // }
}
