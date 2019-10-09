import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { fakeBackendProvider } from './dummy_data/mocking_data';
import { AppRoutingModule } from './app-routing.module';
import { DayComponent } from './day/day.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CalendarComponent } from './calendar/calendar.component';
import { registerLocaleData, DatePipe } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import { HomepageEditComponent } from './homepage-edit/homepage-edit.component';

registerLocaleData(localeNl);

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    DayComponent,
    NavigationComponent,
    HomepageEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [fakeBackendProvider, { provide: LOCALE_ID, useValue: 'nl-BE' }, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
