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
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthGuard } from './guards/auth.guard';
import { DagAtelier } from './models/dag-atelier.model';
import { DagComponent } from './dag/dag.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginGebruikerComponent
  },
  {
    path: 'dag',
    component: DagComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Begeleider'] }

  },
  {
    path: 'register-gebruiker',
    component: RegisterGebruikerComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Begeleider'] }
  },
  {
    path: 'register-gebruiker/:id',
    component: RegisterGebruikerComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Begeleider'] }
  },
  {
    path: 'picto-agenda',
    component: PictoPageComponent
  },
  {
    path: '',
    component: KalenderComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Begeleider'] }
  },
  {
    path: 'homepage-edit',
    component: HomepageEditComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Begeleider'] }
  },
  {
    path: 'vierweekse-planning',
    component: VierweeksePlanningComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Begeleider'] }
  },
  {
    path: 'ateliers',
    component: AteliersComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Begeleider'] }
  },
  {
    path: 'aanwezigheden',
    component: AanwezighedenComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Begeleider'] }
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
