import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';
import { Day } from '../interfaces/day.interface';
import { Gebruiker } from '../interfaces/gebruiker.interface';

// array in local storage for registered users
const userJonah: Gebruiker = {
  id: '1',
  naam: 'De Smet',
  voornaam: 'Jonah',
  email: 'jonah.desmet@gmail.com',
  wachtwoord: 'test123',
  straat: 'Arbeidstraat',
  huisnummer: '14',
  gemeente: 'Aalst',
  postcode: '9300',
  foto: 'someUrl',
  type: 1
};
const users = [userJonah];
const daytime = new Date();

const day: Day = { date: daytime, beforenoon: ['koken', 'dansen'], afternoon: ['zingen', 'lachen'], noon: 'brocoli', users };

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users') && method === 'GET':
          return getUsers();
        case url.match(/\/user\/[0-9]+$/) && method === 'GET':
          return getUser(url.match(/[0-9]+$/)[0]);
        case url.endsWith('/usertypes') && method === 'GET':
          return getUserTypes();
        case url.endsWith('/day') && method === 'GET':
          return getDay();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function getUsers() {
      return ok(users);
    }

    function getUser(id: string) {
      return ok(users.find(user => user.id === id));
    }

    function getUserTypes(){
      return ok(['Admin', 'Begeleider', 'Cliënt']);
    }

    function getDay() {
      return ok(day);
    }

    // helper functions

    function ok(body?: any) {
      return of(new HttpResponse({ status: 200, body }));
    }
  }
}

export const fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
