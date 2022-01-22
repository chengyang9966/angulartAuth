import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { HomeComponent } from './home/home.component';
import { authInterceptorProviders } from './helpers/auth.intercept';
import { AdminComponent } from './admin/admin.component';
import { OrderService } from './services/order.service';
import { AuthGuard } from './services/auth.guard';
import { NotFoundComponent } from './services/not-found/not-found.component';
import { AdminGuard } from './services/admin.guard';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NoAccessComponent,
    HomeComponent,
    AdminComponent,
    NotFoundComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'test',
        component: AdminComponent,
        canActivate: [AdminGuard],
      },
      { path: 'login', component: LoginComponent },
      { path: 'no-access', component: NoAccessComponent },
      { path: '**', component: NotFoundComponent },
    ]),
  ],
  providers: [OrderService, authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
