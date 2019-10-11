import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { fakeBackendProvider } from './dummy_data/mocking_data';
import { AppRoutingModule } from './app-routing.module';
import { DayComponent } from './day/day.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RegisterGebruikerComponent } from './register-gebruiker/register-gebruiker.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarComponent } from './calendar/calendar.component';
import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import { FileUploadComponent } from './file-upload/file-upload.component';
registerLocaleData(localeNl);

@NgModule({
    declarations: [AppComponent, CalendarComponent, DayComponent, NavigationComponent, RegisterGebruikerComponent, FileUploadComponent],
    imports: [BrowserModule, HttpClientModule, AppRoutingModule, ReactiveFormsModule],
  providers: [fakeBackendProvider, {provide: LOCALE_ID, useValue: "nl-BE"}],
  bootstrap: [AppComponent]
})
export class AppModule {}
