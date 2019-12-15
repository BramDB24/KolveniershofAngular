import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DatePipe } from "@angular/common";
import { Observable } from "rxjs";
import { Commentaar } from "../models/commentaar.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class CommentaarService {
  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  public getCommentaarVanSpefiekeDagEnGebruiker(
    datum: Array<Date>
  ): Observable<Commentaar[]> {
    const convertedDates: string[] = [];

    datum.forEach(t => {
      convertedDates.push(this.datePipe.transform(t, "yyyy-MM-dd"));
    });
    return this.http.get<Commentaar[]>(
      `${environment.apiUrl}/commentaar/huidigeGebruiker/zaterdag/${convertedDates[0]}/zondag/${convertedDates[1]}`
    );
  }

  public postCommentaar(commentaar: Commentaar) {
    return this.http.post(`${environment.apiUrl}/commentaar`, commentaar);
  }

  public putCommentaar(commentaar: Commentaar) {
    return this.http.put(
      `${environment.apiUrl}/commentaar/${commentaar.commentaarId}/${commentaar.tekst}`, ''
    );
  }
}
