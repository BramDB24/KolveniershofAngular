import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { fakeBackendProvider } from './dummy_data/mocking_data';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule {}
