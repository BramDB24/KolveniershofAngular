import { Atelier } from './atelier.model';
import { Gebruiker } from './gebruiker.model';

export class DagAtelier {
  dagAtelierId?: number;
  dagMoment: string;
  atelier: Atelier = new Atelier();
  gebruikers: Gebruiker[] = new Array<Gebruiker>();

  public getBegeleiders(): Gebruiker[] {
    return this.gebruikers
      ? this.gebruikers.filter(
          g => g.type === 'Begeleider' || g.type === 'Admin'
        )
      : null;
  }

  public getClienten(): Gebruiker[] {
    return this.gebruikers.filter(g => g.type === 'Cliënt');
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
    );
  }
}
