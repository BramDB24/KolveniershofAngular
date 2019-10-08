import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';
import { Atelerier } from '../interfaces/atelier.interface';
import { Day } from '../interfaces/day.interface';
import { stateClient, User } from '../interfaces/user.interface';

// array in local storage for registered users
const userJonah: User = {
  naam: 'jonah',
  foto: 'someUrl',
  authoriteit: 'client',
  stateClient: stateClient.aanwezig
};
const userJohanna: User = {
  naam: 'johanna',
  foto: 'someUrl',
  authoriteit: 'client',
  stateClient: stateClient.afwezig
};
const userBram: User = {
  naam: 'bram',
  foto: 'someUrl',
  authoriteit: 'client',
  stateClient: stateClient.aanwezig
};

let daytime = new Date();

const atelier1: Atelerier = {
  naam: 'zingen',
  begeleider: 'begeleider',
  clienten: [userJonah, userJohanna]
};
const atelier2: Atelerier = {
  naam: 'koken',
  begeleider: 'begeleider',
  clienten: [userJohanna]
};
const atelier3: Atelerier = {
  naam: 'knutselen',
  begeleider: 'begeleider',
  clienten: [userBram]
};
const atelier4: Atelerier = {
  naam: 'spelen',
  begeleider: 'begeleider',
  clienten: [userBram, userJohanna, userJonah]
};

const day: Day = {
  voormiddag: [atelier1, atelier2],
  namiddag: [atelier3, atelier4],
  datum: daytime = new Date( daytime.getFullYear(),
  daytime.getMonth(), daytime.getDate() + 1),
  middag: 'zalm met puree',
  gebruikers: [userJonah, userJohanna, userBram]
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
      return ok({users: [], ateliers:[]})
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
