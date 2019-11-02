
export class Opmerking {
    opmerkingId?: number;
    opmerkingType: number;
    tekst: string;
    datum: Date;

    constructor(json: any) {
        this.opmerkingId = json.opmerkingId;
        this.opmerkingType = json.opmerkingType;
        this.tekst = json.tekst;
        this.datum = json.datum;
    }

}
