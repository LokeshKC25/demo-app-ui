import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(private dataService: DataService,
    private toastr: ToastsManager,
    private router: Router,
    private route: ActivatedRoute) {
      const vm = this;
      this.route.params.subscribe(params => {
        if (params.id) {
          vm.getUserData(params.id);
        }
      });
  }

  ngOnInit() {
    const vm = this;
    vm.user = new UserModel();
  }

  getUserData(id) {
    const vm = this;
    vm.dataService.getData('/users/find/' + id).subscribe(response => {
      if (response && response.error) {
        vm.toastr.error('User Not found');
        vm.router.navigate(['/']);
      } else {
        vm.user = response;
      }
    });
  }

  onSubmit() {
    const vm = this;
    const path = vm.user._id ? '/users/update' : '/users/add' ;
    const msg = vm.user._id ? 'User updated successfully' : 'User added successfully';
    vm.dataService.postData(path, vm.user).subscribe(response => {
      if (response.error) {
        vm.toastr.error('User adding failed');
      } else if (response && response.value) {
        vm.toastr.success(msg);
        vm.user = response.value;
      } else if (response && response.insertedCount > 0) {
        vm.toastr.success(msg);
        vm.user = new UserModel();
      }
    });
  }

}
