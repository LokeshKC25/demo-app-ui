import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Http , HttpModule} from '@angular/http';

import { AppComponent } from './app.component';

import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { UsersListComponent } from './users-list/users-list.component';
import { UserApplicationComponent } from './user-application/user-application.component';
import { LoginComponent } from './login/login.component';

import { AppService } from './app.service';
import { DataService } from './services/data.service';
import { AddCompanyComponent } from './add-company/add-company.component';

const appRoutes: Routes = [
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }, {
    path: 'users-list',
    component: UsersListComponent,
    data: {
      name: 'users-list'
    }
  }, {
    path: 'registration',
    component: UserApplicationComponent,
    data: {
      name: 'registration'
    }
  }, {
    path: 'login',
    component: LoginComponent,
    data: {
      name: 'login'
    }
  }, {
    path: 'add-company',
    component: AddCompanyComponent,
    data: {
      name: 'add-company'
    }
  }
];

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    UserApplicationComponent,
    LoginComponent,
    AddCompanyComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    ToastModule.forRoot(),
    HttpModule
  ],
  providers: [
    AppService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
