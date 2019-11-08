import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'opmerkingPipe'
})
export class OpmerkingPipe implements PipeTransform {
  transform(value: any): string {
    let enumNaarWaarde;
    switch (value) {
      case 0:
        enumNaarWaarde = 'Undefined';
        break;
      case 1:
        enumNaarWaarde = 'Vervoer';
        break;
      case 2:
        enumNaarWaarde = 'Cliënten';
        break;
      case 3:
        enumNaarWaarde = 'Ateliers en weekschema';
        break;
      case 4:
        enumNaarWaarde = 'Varia';
        break;
      case 5:
        enumNaarWaarde = 'Logistiek';
        break;
      case 6:
        enumNaarWaarde = 'Begeleiding';
        break;
      case 7:
        enumNaarWaarde = 'Stagiairs';
        break;
      case 8:
        enumNaarWaarde = 'Vrijwilligers';
        break;
      case 9:
        enumNaarWaarde = 'Uur registratie';
        break;
      default:
        enumNaarWaarde = 'Varia';
        break;
    }
    return enumNaarWaarde;
  }
}
