import { Component, OnInit } from '@angular/core';
import { Gebruiker } from 'src/app/models/gebruiker.model';
import { Observable, Subject } from 'rxjs';
import { GebruikerService } from 'src/app/services/gebruiker.service';

@Component({
  selector: 'app-picto-clientenlijst',
  templateUrl: './picto-clientenlijst.component.html',
  styleUrls: ['./picto-clientenlijst.component.scss']
})
export class PictoClientenlijstComponent implements OnInit {
  public $clienten: Observable<Gebruiker[]>;
  public huidigeClient: Gebruiker;
  
  constructor(private _gebruikerService : GebruikerService) { 
    
  }

  ngOnInit() {
    this.$clienten = this._gebruikerService.getUsers();
  }

  toonPicto(client: Gebruiker){
    this.huidigeClient = client;
  }

}
