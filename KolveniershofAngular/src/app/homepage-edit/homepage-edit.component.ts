import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { DayService } from '../services/day.service';
import { Atelier } from '../interfaces/atelier.interface';
import { User, Rol } from '../interfaces/user.interface';

@Component({
  selector: 'app-homepage-edit',
  templateUrl: './homepage-edit.component.html',
  styleUrls: ['./homepage-edit.component.scss']
})
export class HomepageEditComponent implements OnInit {
  public loaded = false;
  public object: object;
  public ateliers = new Array<Atelier>();
  public clienten = new Array<User>();
  public medewerkers = new Array<User>();
  public checked = false;
  constructor(private service: DayService) {}

  ngOnInit() {
    this.service
      .getEditInformatie()
      .pipe(
        finalize(() => {
          this.loaded = true;
        })
      )
      .subscribe(entry => {
        this.ateliers = entry.ateliers;
        entry.users.forEach(element => {
          element.rol !== Rol.cliënt
            ? this.medewerkers.push(element)
            : this.clienten.push(element);
        });
      });
  }

  public isActive(t: any){
    this.checked = t;
  }
}
