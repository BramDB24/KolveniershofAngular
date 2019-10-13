import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BestandService {

  constructor(private http: HttpClient) { }

  public postFile(folder: string, bestandData: FormGroup): Observable<{}> {
    return this.http.post(`localhost:4200/upload/${folder.toLowerCase()}`, this.toFormData(bestandData));
  }

  private toFormData<T>(formValue: T): FormData {
    const formData = new FormData();
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }
    return formData;
  }
}
