import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageEditComponent } from './homepage-edit/homepage-edit.component';
import { KalenderComponent } from './kalender/kalender.component';
import { RegisterGebruikerComponent } from './register-gebruiker/register-gebruiker.component';
import { LoginGebruikerComponent } from './login-gebruiker/login-gebruiker.component';
import { VierweeksePlanningComponent } from './vierweekse-planning/vierweekse-planning.component';
import { AteliersComponent } from './ateliers/ateliers.component';
import { PictoPageComponent } from './picto-agenda/picto-page/picto-page.component';
import { AanwezighedenComponent } from './aanwezigheden/aanwezigheden.component';
import { BeheerPersonenComponent } from './beheer-personen/beheer-personen.component';
import { BeheerAteliersComponent } from './beheer-ateliers/beheer-ateliers.component';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthGuard } from './guards/auth.guard';
import { DagAtelier } from './models/dag-atelier.model';
import { DagComponent } from './dag/dag.component';
import { PictoClientenlijstComponent } from './picto-agenda/picto-clientenlijst/picto-clientenlijst.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginGebruikerComponent
  },
  {
    path: 'dag',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'beheer-personen',
    component: BeheerPersonenComponent
  },
  {
    path: 'beheer-ateliers',
    component: BeheerAteliersComponent
  },
  {
    path: 'ateliers',
    component: AteliersComponent
  },
  {
    path: 'ateliers/:id',
    component: AteliersComponent
  },
  {
    path: 'register-gebruiker',
    component: RegisterGebruikerComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }

  },
  {
    path: 'picto-clientenlijst',
    component: PictoClientenlijstComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }

  },
  {
    path: 'register-gebruiker/:id',
    component: RegisterGebruikerComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }

  },
  {
    path: 'picto-agenda',
    component: PictoPageComponent
  },
  {
    path: '',
    component: KalenderComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Begeleider'] }

  },
  {
    path: 'homepage-edit',
    component: HomepageEditComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Begeleider'] }

  },
  {
    path: 'vierweekse-planning',
    component: VierweeksePlanningComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Begeleider'] }

  },
  {
    path: 'ateliers',
    component: AteliersComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Begeleider'] }

  },
  {
    path: 'aanwezigheden',
    component: AanwezighedenComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Begeleider'] }
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
