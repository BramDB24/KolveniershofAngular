import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageEditComponent } from './homepage-edit/homepage-edit.component';
import { KalenderComponent } from './kalender/kalender.component';
import { RegisterGebruikerComponent } from './register-gebruiker/register-gebruiker.component';

export const routes: Routes = [
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterGebruikerComponent
  },
  {
    path: 'register/:id',
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
    path: 'dagEdit',
    component: HomepageEditComponent
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
export class AppRoutingModule {}
