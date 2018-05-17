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

import { AppService } from './app.service';
import { DataService } from './services/data.service';

const appRoutes: Routes = [
  { path: '',
    redirectTo: '/users-list',
    pathMatch: 'full'
  }, {
    path: 'users-list',
    component: UsersListComponent,
    data: {
      name: 'users-list'
    }
  }, {
    path: 'user',
    component: UserApplicationComponent,
    data: {
      name: 'user'
    }
  }, {
    path: 'user/:id',
    component: UserApplicationComponent,
    data: {
      name: 'user'
    }
  }
];

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    UserApplicationComponent
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
