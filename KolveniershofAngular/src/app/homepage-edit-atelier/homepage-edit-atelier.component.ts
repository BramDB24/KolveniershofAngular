import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { finalize } from 'rxjs/operators';
import { Atelier } from '../interfaces/atelier.interface';
import { Rol, User } from '../interfaces/user.interface';

@Component({
  selector: 'app-homepage-edit-atelier',
  templateUrl: './homepage-edit-atelier.component.html',
  styleUrls: ['./homepage-edit-atelier.component.scss']
})
export class HomepageEditAtelierComponent implements OnInit {
  @Input() public atelier: Atelier;
  @Input() public dagmoment: string;
  public loaded = false;
  public clienten = new Array<User>();
  public begeleiders = new Array<User>();
  public aanwezigen = new Array<User>();
  public ateliernaam: string;
  constructor(private userService: UserService) {}

  ngOnInit() {
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

  // ngAfterViewInit() {
  //   this.ophalenAanwezigen();
  // }
  public onChange(atelierkeuze: string) {
    this.ateliernaam = atelierkeuze;
    console.log(this.ateliernaam);
  }

  public toevoegenUser(user: User) {
    if (this.aanwezigen.includes(user)) {
      const index = this.aanwezigen.indexOf(user);
      this.aanwezigen.splice(index, 1);
      document.getElementById(user.naam).classList.remove('style1');
    } else {
      this.aanwezigen.push(user);
      document.getElementById(user.naam).classList.add('style1');
    }
    console.log(this.aanwezigen);
  }

  public editAtelier() {
    if (this.ateliernaam !== null) {
      this.atelier.naam = this.ateliernaam;
    }
    var begeleidersAangepast = this.aanwezigen.filter(obj => {
      return obj.rol === 0;
    });
    this.atelier.begeleider = begeleidersAangepast;
    var clientenAangepast = this.aanwezigen.filter(obj => {
      return obj.rol === 1;
    });
    this.atelier.clienten = clientenAangepast;
    this.aanwezigen.splice(0, this.aanwezigen.length);
    console.log(this.atelier.naam);
    console.log(begeleidersAangepast);
    console.log(clientenAangepast);
  }

  // public ophalenAanwezigen() {
  //this.atelier.begeleider.forEach(b => this.aanwezigen.push(b) && document.getElementById(b.naam).classList.add('style1'));
  // console.log(this.atelier);
  // console.log(this.clienten);
  // this.atelier.clienten.forEach(mongol => this.aanwezigen.push(mongol));
  // this.atelier.clienten.forEach(client => {
  //   var c = this.clienten.find(obj => {
  //     return obj.naam === client.naam;
  //   });
  //   document.getElementById(c.naam).classList.add('style1');
  // });
  // this.aanwezigen.splice(0, this.aanwezigen.length);
  // this.atelier.clienten.forEach(mongol => this.aanwezigen.push(mongol));
  // this.atelier.clienten.forEach(c => {
  //   var result = this.clienten.find(obj => {
  //     return obj.naam === c.naam;
  //   });
  //   document.getElementById(result.naam).classList.add('style1');
  // });
  // }
}
