import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Commentaar } from '../models/commentaar.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentaarService {

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  public getCommentaarVanSpefiekeDagEnGebruiker(datum: Date): Observable<Commentaar[]> {
    const convertedDate: string = this.datePipe.transform(datum, 'yyyy-MM-dd');
    return this.http.get<Commentaar[]>(`${environment.apiUrl}/Commentaar/huidigeGebruiker/${convertedDate}`);
  }

  public postCommentaar(commentaar: Commentaar) {
    return this.http.post(`${environment.apiUrl}/Commentaar`, commentaar);
  }

  public putCommentaar(commentaar: Commentaar) {
    return this.http.put(`${environment.apiUrl}/Commentaar/${commentaar.commentaarId}`, commentaar);
  }

}
