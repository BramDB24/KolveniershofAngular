import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { HomepageEditComponent } from './homepage-edit/homepage-edit.component';
import { DayComponent } from './day/day.component';

export const routes: Routes = [
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '',
    component: CalendarComponent
    // ,
    // children: [
    //   {path: 'dag', component: DayComponent},
    //   {path: 'edit', component: HomepageEditComponent}
    // ]
  },
  {
    path: 'edit',
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
