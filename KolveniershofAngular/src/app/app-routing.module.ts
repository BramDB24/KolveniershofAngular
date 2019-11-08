import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageEditComponent } from './homepage-edit/homepage-edit.component';
import { KalenderComponent } from './kalender/kalender.component';
import { RegisterGebruikerComponent } from './register-gebruiker/register-gebruiker.component';
import { LoginGebruikerComponent } from './login-gebruiker/login-gebruiker.component';
import { VierweeksePlanningComponent } from './vierweekse-planning/vierweekse-planning.component';
import { AteliersComponent } from './ateliers/ateliers.component';

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
    path: 'register-gebruiker',
    component: RegisterGebruikerComponent
  },
  {
    path: 'register-gebruiker/:id',
    component: RegisterGebruikerComponent
  },
  {
    path: '',
    component: KalenderComponent
    // ,
    // children: [
    //   {path: 'dag', component: DayComponent},
    //   {path: 'edit', component: HomepageEditComponent}
    // ]
  },
  {
    path: 'homepage-edit',
    component: HomepageEditComponent
  },
  {
    path: 'vierweekse-planning',
    component: VierweeksePlanningComponent
  },
  {
    path: 'ateliers',
    component: AteliersComponent
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
