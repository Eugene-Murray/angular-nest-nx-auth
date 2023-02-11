import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { LoginComponent } from './auth/components/login/login.component';
import { AdminComponent } from './auth/components/admin/admin.component';
import { UiModule } from '@nest-nx-auth/ui';
import { HomeComponent } from './auth/components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { jwtInterceptorProvider } from './auth/services/jwt-interceptor';
import { errorInterceptorProvider } from './auth/services/error.interceptor';

@NgModule({
  declarations: [AppComponent, LoginComponent, AdminComponent, HomeComponent],
  providers: [jwtInterceptorProvider, errorInterceptorProvider],
  bootstrap: [AppComponent],
  imports: [
    UiModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
})
export class AppModule {}
