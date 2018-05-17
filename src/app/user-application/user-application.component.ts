import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { UserModel } from './user.model';

@Component({
  selector: 'app-user-application',
  templateUrl: './user-application.component.html',
  styleUrls: ['./user-application.component.scss']
})
export class UserApplicationComponent implements OnInit {

  private user: UserModel;

  constructor(
    private dataService: DataService,
    public toastr: ToastsManager
  ) { }

  ngOnInit() {
    const vm = this;
    vm.user = new UserModel();
  }

  onSubmit() {
    const vm = this;
    console.log(vm.user);
  }

}
