import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EntidadesComponent } from './entidades/entidades.component';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { LoginComponent } from './usuarios/login.component';
import { FormComponent } from './entidades/form/form.component';
import { AuthGuard } from './usuarios/guards/auth.guard';
import { RoleGuard } from './usuarios/guards/role.guard';
import { TokenInterceptor } from './usuarios/interceptors/token.interceptor';
import { AuthInterceptor } from './usuarios/interceptors/Auth.interceptor';

const routes: Routes = [
  {path: '', redirectTo: '/entidades', pathMatch: 'full'},
  {path: 'entidades', component: EntidadesComponent},
  {path: 'form/:id_entidad', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'form', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'login', component: LoginComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    EntidadesComponent,
    LoginComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {provide:
      HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true },
    {provide:
        HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
