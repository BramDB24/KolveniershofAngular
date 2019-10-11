import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Atelier } from '../interfaces/atelier';
import { DagAtelier } from '../interfaces/dag-atelier';
import { Gebruiker } from '../interfaces/gebruiker';
import { DayService } from '../services/day.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-homepage-edit-atelier',
  templateUrl: './homepage-edit-atelier.component.html',
  styleUrls: ['./homepage-edit-atelier.component.scss']
})
export class HomepageEditAtelierComponent implements OnInit {
  @Input() public dagAtelier: DagAtelier;
  @Input() public isEdit: boolean;
  public loaded = false;
  public ateliers = Array<Atelier>();
  public gebruikers = Array<Gebruiker>();
  public begeleiders = Array<Gebruiker>();
  public aanwezigen = new Array<Gebruiker>();

  constructor(
    private userService: UserService,
    private dayService: DayService
  ) {}

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
          element.type === 1
            ? this.gebruikers.push(element)
            : element.type === 3
            ? this.begeleiders.push(element)
            : null;
        });
      });
    this.dayService
      .getEditInformatie()
      .pipe(finalize(() => (this.loaded = true)))
      .subscribe(entry => entry.forEach(e => this.ateliers.push(e)));
  }

  public select(user: Gebruiker): void {
    if (this.aanwezigen.includes(user)) {
      const index = this.aanwezigen.indexOf(user);
      this.aanwezigen.splice(index, 1);
      document.getElementById(user.voornaam).classList.remove('style1');
    } else {
      this.aanwezigen.push(user);
      document.getElementById(user.voornaam).classList.add('style1');
    }
  }

  public onChange(atelierkeuze: string) {}

  // public toevoegenUser(user: User) {
  //   if (this.aanwezigen.includes(user)) {
  //     const index = this.aanwezigen.indexOf(user);
  //     this.aanwezigen.splice(index, 1);
  //     document.getElementById(user.naam).classList.remove('style1');
  //   } else {
  //     this.aanwezigen.push(user);
  //     document.getElementById(user.naam).classList.add('style1');
  //   }
  // }

  // public editAtelier() {
  //   if (this.ateliernaam !== null) {
  //     this.atelier.naam = this.ateliernaam;
  //   }
  //   var begeleidersAangepast = this.aanwezigen.filter(obj => {
  //     return obj.rol === 0;
  //   });
  //   this.atelier.begeleider = begeleidersAangepast;
  //   var clientenAangepast = this.aanwezigen.filter(obj => {
  //     return obj.rol === 1;
  //   });
  //   this.atelier.clienten = clientenAangepast;
  //   this.aanwezigen.splice(0, this.aanwezigen.length);
  //   console.log(this.atelier.naam);
  //   console.log(begeleidersAangepast);
  //   console.log(clientenAangepast);
  // }

  // public saveAtelier(moment: any) {
  //   console.log(moment);
  // }

  public getPresentUsers(user: Gebruiker) {
    //return this.atelier.clienten.some(client => client == user);
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
