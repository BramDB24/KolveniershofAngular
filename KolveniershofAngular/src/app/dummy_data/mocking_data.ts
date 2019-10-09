import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';
import { Atelier } from '../interfaces/atelier.interface';
import { Day } from '../interfaces/day.interface';
import { Rol, User } from '../interfaces/user.interface';

// array in local storage for registered users
const userJonah: User = {
  naam: 'jonah',
  foto: 'https://www.pasfoto.nl/wp-content/themes/webmarket-child/generator/img/nl/passbild-avatar-nl.gif',
  rol: Rol.cliënt
};
const userJohanna: User = {
  naam: 'johanna',
  foto: 'https://www.pasfoto.nl/wp-content/themes/webmarket-child/generator/img/nl/passbild-avatar-nl.gif',
  rol: Rol.cliënt
};
const userBram: User = {
  naam: 'bram',
  foto: 'https://www.pasfoto.nl/wp-content/themes/webmarket-child/generator/img/nl/passbild-avatar-nl.gif',
  rol: Rol.cliënt
};
const begeleiderDirk: User = {
  naam: 'dirk',
  foto: 'someUrl',
  rol: Rol.begeleider
};
const begeleiderGeert: User = {
  naam: 'geert',
  foto: 'someUrl',
  rol: Rol.begeleider
};

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
const atelier5: Atelier = {
  naam: 'ziek',
  clienten: [userJohanna]
};
const day: Day = {
  voormiddag: [atelier1, atelier2],
  namiddag: [atelier3, atelier4],
  datum: daytime,
  middag: 'zalm met puree',
  ziekte: atelier5,
  gebruikers: [
    begeleiderDirk,
    begeleiderGeert,
    userJonah,
    userJohanna,
    userBram
  ]
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
      return ok([userJonah, userJohanna, userBram, begeleiderDirk, begeleiderGeert]);
    }

    function getDay() {
      return ok(day);
    }

    function getEdit() {
      return ok({
        users: [userJonah, userJohanna, userBram, begeleiderDirk, begeleiderGeert],
        ateliers: [atelier1, atelier2, atelier3, atelier4, atelier5]
      });
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
