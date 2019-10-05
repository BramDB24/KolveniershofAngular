import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { fakeBackendProvider } from './dummy_data/mocking_data';
import { CalendarComponent } from './calendar/calendar.component';

import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
registerLocaleData(localeNl);

@NgModule({
  declarations: [AppComponent, CalendarComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [fakeBackendProvider, {provide: LOCALE_ID, useValue: "nl-BE"}],
  bootstrap: [AppComponent]
})
export class AppModule {}
