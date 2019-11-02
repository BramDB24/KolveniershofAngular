import { GebruikerType } from '../enums/gebruiker-type.enum';
import { Atelier } from './atelier.model';
import { Gebruiker } from './gebruiker.model';

export class DagAtelier {
  dagAtelierId?: number;
  dagMoment: number;
  atelier: Atelier = new Atelier();
  gebruikers: Gebruiker[] = new Array<Gebruiker>();

  public getBegeleiders(): Gebruiker[] {
    return this.gebruikers
      ? this.gebruikers.filter(
          g =>
            g.type === GebruikerType.Begeleider ||
            g.type === GebruikerType.Admin
        )
      : null;
  }

  public getClienten(): Gebruiker[] {
    return this.gebruikers.filter(g => g.type === GebruikerType.Cliënt);
  }

  public verwijderGebruikerVanDagatelier(gebruiker: Gebruiker): void {
    this.gebruikers = this.gebruikers.filter(g => g !== gebruiker);
  }

  public voegGebruikerToeAanDagplanning(gebruiker: Gebruiker): void {
    this.gebruikers.push(gebruiker);
  }

  public getAanwezigenVanDagatelier(gebruiker: Gebruiker): boolean {
    return this.gebruikers.some(g => g === gebruiker);
  }

  public getNiewAanwezigen(alleGebruikers: Array<Gebruiker>): Array<Gebruiker> {
    return alleGebruikers.filter(
          gebruiker =>
            this.gebruikers.filter(
              aanwezige =>
                aanwezige.voornaam === gebruiker.voornaam &&
                aanwezige.achternaam === gebruiker.achternaam
            ).length <= 0
        )
      ;
  }
}
