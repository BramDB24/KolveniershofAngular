import { DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeNl from '@angular/common/locales/nl';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DayComponent } from './day/day.component';
import { HomepageEditComponent } from './homepage-edit/homepage-edit.component';
import { HomepageEditAtelierComponent } from './homepage-edit-atelier/homepage-edit-atelier.component';
import { NavigationComponent } from './navigation/navigation.component';

registerLocaleData(localeNl);

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    DayComponent,
    NavigationComponent,
    HomepageEditComponent,
    HomepageEditAtelierComponent
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [{ provide: LOCALE_ID, useValue: 'nl-BE' }, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
