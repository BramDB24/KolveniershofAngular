import { DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeNl from '@angular/common/locales/nl';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DayComponent } from './dag/dag.component';
import { HomepageEditAtelierComponent } from './homepage-edit-atelier/homepage-edit-atelier.component';
import { HomepageEditComponent } from './homepage-edit/homepage-edit.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RegisterGebruikerComponent } from './register-gebruiker/register-gebruiker.component';
import { CalendarComponent } from './kalender/kalender.component';

registerLocaleData(localeNl);

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    DayComponent,
    NavigationComponent,
    HomepageEditComponent,
    HomepageEditAtelierComponent,
    RegisterGebruikerComponent
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, ReactiveFormsModule],
  providers: [{ provide: LOCALE_ID, useValue: 'nl-BE' }, DatePipe],

  bootstrap: [AppComponent]
})
export class AppModule {}
