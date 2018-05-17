import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { UsersListComponent } from './users-list/users-list.component';
import { UserApplicationComponent } from './user-application/user-application.component';

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
    RouterModule.forRoot(appRoutes),
    ToastModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
