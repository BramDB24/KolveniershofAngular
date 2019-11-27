import { DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeNl from '@angular/common/locales/nl';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DagComponent } from './dag/dag.component';
import { HomepageEditAtelierComponent } from './homepage-edit-atelier/homepage-edit-atelier.component';
import { HomepageEditComponent } from './homepage-edit/homepage-edit.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RegisterGebruikerComponent } from './register-gebruiker/register-gebruiker.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { KalenderComponent } from './kalender/kalender.component';
import { OpmerkingenBladComponent } from './opmerkingen-blad/opmerkingen-blad.component';
import { LoginGebruikerComponent } from './login-gebruiker/login-gebruiker.component';
import { VierweeksePlanningComponent } from './vierweekse-planning/vierweekse-planning.component';
import { AteliersComponent } from './ateliers/ateliers.component';
import { ProgressComponent } from './progress/progress.component';
import { PictoPageComponent } from './picto-agenda/picto-page/picto-page.component';
import { PictoDagComponent } from './picto-agenda/picto-dag/picto-dag.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatInputModule, MatTableModule, MatSortModule} from '@angular/material';
import { AanwezighedenComponent } from './aanwezigheden/aanwezigheden.component';
import { PrintComponent } from './print/print.component';
import { BeheerPersonenComponent } from './beheer-personen/beheer-personen.component';

registerLocaleData(localeNl);

@NgModule({
    declarations: [
        AppComponent,
        KalenderComponent,
        FileUploadComponent,
        DagComponent,
        NavigationComponent,
        HomepageEditComponent,
        HomepageEditAtelierComponent,
        RegisterGebruikerComponent,
        OpmerkingenBladComponent,
        VierweeksePlanningComponent,
        AteliersComponent,
        ProgressComponent,
        LoginGebruikerComponent,
        VierweeksePlanningComponent,
        PictoPageComponent,
        PictoDagComponent,
        AanwezighedenComponent,
        PrintComponent,
        BeheerPersonenComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatSortModule
    ],
    providers: [{ provide: LOCALE_ID, useValue: 'nl-BE' }, DatePipe],

    bootstrap: [AppComponent],
})
export class AppModule {}
