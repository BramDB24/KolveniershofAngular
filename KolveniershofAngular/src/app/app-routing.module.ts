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
import { TemplateResolverService } from './services/template-resolver.service';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginGebruikerComponent,
    },
    {
        path: 'dag',
        redirectTo: '',
        pathMatch: 'full',
        canActivate: [AuthGuard],
        data: { roles: ['Begeleider', 'Admin'] },
    },
    {
        path: 'beheer-personen',
        component: BeheerPersonenComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Begeleider', 'Admin'] },
    },
    {
        path: 'beheer-ateliers',
        component: BeheerAteliersComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Begeleider', 'Admin'] },
    },
    {
        path: 'ateliers',
        component: AteliersComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Begeleider', 'Admin'] },
    },
    {
        path: 'ateliers/:id',
        component: AteliersComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Begeleider', 'Admin'] },
    },
    {
        path: 'register-gebruiker',
        component: RegisterGebruikerComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Admin', 'Begeleider'] },
    },
    {
        path: 'picto-clientenlijst',
        component: PictoClientenlijstComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Admin', 'Begeleider'] },
    },
    {
        path: 'register-gebruiker/:id',
        component: RegisterGebruikerComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Admin', 'Begeleider'] },
    },
    {
        path: 'picto-agenda',
        component: PictoPageComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Admin', 'Begeleider', 'Cliënt'] },
    },
    {
        path: '',
        component: KalenderComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Admin', 'Begeleider'] },
    },
    {
        path: 'homepage-edit',
        component: HomepageEditComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Admin', 'Begeleider'] },
    },
    {
        path: 'vierweekse-planning',
        component: VierweeksePlanningComponent,
        canActivate: [AuthGuard],
        resolve: { templates: TemplateResolverService },
        data: { roles: ['Admin', 'Begeleider'] },
    },
    {
        path: 'aanwezigheden',
        component: AanwezighedenComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Admin', 'Begeleider'] },
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
