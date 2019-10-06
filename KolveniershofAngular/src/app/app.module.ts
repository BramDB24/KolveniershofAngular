import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { fakeBackendProvider } from './dummy_data/mocking_data';
import { AppRoutingModule } from './app-routing.module';
import { DayComponent } from './day/day.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AppComponent, DayComponent, NavigationComponent, RegisterUserComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, ReactiveFormsModule],
  providers: [fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule {}
