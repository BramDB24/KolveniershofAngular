import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';

import { Day } from '../interfaces/day.interface';
import { User, Rol, stateClient } from '../interfaces/user.interface';
import { Atelier } from '../interfaces/atelier.interface';

// array in local storage for registered users
const userJonah: User = { naam: 'jonah', foto: 'someUrl', rol: Rol.cliënt, stateClient: stateClient.aanwezig };
const userJohanna: User = {
  naam: 'johanna',
  foto: 'someUrl',
  rol: Rol.cliënt,
  stateClient: stateClient.afwezig
};
const userBram: User = { naam: 'bram', foto: 'someUrl', rol: Rol.cliënt, stateClient: stateClient.aanwezig };
const begeleiderDirk: User = { naam: 'dirk', foto: 'someUrl', rol: Rol.begeleider };
const begeleiderGeert: User = { naam: 'geert', foto: 'someUrl', rol: Rol.begeleider };

let daytime = new Date();
const atelier1: Atelier = {
  naam: 'zingen',
  begeleider: [begeleiderDirk],
  clienten: [userJonah, userJohanna]
};
const atelier2: Atelier = {
  naam: 'koken',
  begeleider: [begeleiderDirk, begeleiderGeert],
  clienten: [userJohanna]
};
const atelier3: Atelier = {
  naam: 'knutselen',
  begeleider: [begeleiderDirk],
  clienten: [userBram]
};
const atelier4: Atelier = {
  naam: 'spelen',
  begeleider: [begeleiderGeert],
  clienten: [userBram, userJohanna, userJonah]
};

const day: Day = {
  voormiddag: [atelier1, atelier2],
  namiddag: [atelier3, atelier4],
  datum: daytime,
  middag: 'zalm met puree',
  gebruikers: [begeleiderDirk, begeleiderGeert, userJonah, userJohanna, userBram]
};
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
        case url.endsWith('/date') && method === 'GET':
          return getDay();
        case url.endsWith('/homepage-edit') && method === 'GET':
          return getEdit();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function getUsers() {
      return ok([userJonah, userJohanna, userBram]);
    }

    function getDay() {
      return ok(day);
    }

    function getEdit(){
      return ok({users: [userJonah, userJohanna, userBram], ateliers:[atelier1, atelier2, atelier3, atelier4]})
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
