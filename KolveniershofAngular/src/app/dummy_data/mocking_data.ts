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
import { User } from '../interfaces/user.interface';
import { Atelerier } from '../interfaces/atelier.interface';

// array in local storage for registered users
const userJonah: User = { name: 'jonah', picture: 'someUrl', role: 'client' };
const userJohanna: User = {
  name: 'johanna',
  picture: 'someUrl',
  role: 'client'
};
const userBram: User = { name: 'bram', picture: 'someUrl', role: 'client' };

const daytime = new Date();
const atelier1: Atelerier = {
  name: 'zingen',
  guide: 'begeleider',
  clients: [userJonah, userJohanna]
};
const atelier2: Atelerier = {
  name: 'koken',
  guide: 'begeleider',
  clients: [userJohanna]
};
const atelier3: Atelerier = {
  name: 'knutselen',
  guide: 'begeleider',
  clients: [userBram]
};
const atelier4: Atelerier = {
  name: 'spelen',
  guide: 'begeleider',
  clients: [userBram, userJohanna, userJonah]
};

const day: Day = {
  beforenoon: [atelier1, atelier2],
  afternoon: [atelier3, atelier4],
  date: daytime,
  noon: 'zalm met puree',
  users: [userJonah, userJohanna, userBram]
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
