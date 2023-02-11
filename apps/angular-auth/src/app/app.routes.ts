import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AdminComponent } from './auth/components/admin/admin.component';
import { HomeComponent } from './auth/components/home/home.component';
import { LoginComponent } from './auth/components/login/login.component';
import { AuthGuard } from './auth/services/auth.guard';

export const appRoutes: Route[] = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
