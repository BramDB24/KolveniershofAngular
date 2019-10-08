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
import { Day } from '../interfaces/day.interface';
import { User, Rol } from '../interfaces/user.interface';
import { Atelier } from '../interfaces/atelier.interface';

// array in local storage for registered users
const userJonah: User = { name: 'jonah', picture: 'someUrl', role: Rol.cliënt };
const userJohanna: User = {
  name: 'johanna',
  picture: 'someUrl',
  role: Rol.cliënt
};
const userBram: User = { name: 'bram', picture: 'someUrl', role: Rol.cliënt };
const begeleiderDirk: User = { name: 'dirk', picture: 'someUrl', role: Rol.begeleider };
const begeleiderGeert: User = { name: 'geert', picture: 'someUrl', role: Rol.begeleider };

const daytime = new Date();
const atelier1: Atelier = {
  name: 'zingen',
  guide: [begeleiderDirk],
  clients: [userJonah, userJohanna]
};
const atelier2: Atelier = {
  name: 'koken',
  guide: [begeleiderDirk, begeleiderGeert],
  clients: [userJohanna]
};
const atelier3: Atelier = {
  name: 'knutselen',
  guide: [begeleiderDirk],
  clients: [userBram]
};
const atelier4: Atelier = {
  name: 'spelen',
  guide: [begeleiderGeert],
  clients: [userBram, userJohanna, userJonah]
};

const day: Day = {
  beforenoon: [atelier1, atelier2],
  afternoon: [atelier3, atelier4],
  date: daytime,
  noon: 'zalm met puree',
  users: [begeleiderDirk, begeleiderGeert, userJonah, userJohanna, userBram]
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
        case url.endsWith('/day') && method === 'GET':
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
