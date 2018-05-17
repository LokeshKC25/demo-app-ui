import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { UserModel } from '../user-application/user.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  private users: Array<UserModel> = [];

  constructor(private dataService: DataService,
    private toastr: ToastsManager,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const vm = this;
    vm.getUsers();
  }

  getUsers() {
    const vm = this;
    vm.dataService.getData('/users').subscribe(response => {
      if (response.error) {
        vm.toastr.error('Please contact Admin');
      } else if (response) {
        vm.users = response;
      }
    });
  }

  onView(user) {
    const vm = this;
    vm.router.navigate(['/user', user._id]);
  }

  onDelete(user) {
    const vm = this;
    vm.dataService.getData('/users/remove/' + user._id).subscribe(response => {
      if (!response.error) {
        vm.gridRefresh(user._id);
        vm.toastr.success('User removed successfully');
      }
    });
  }

  gridRefresh(id) {
    const vm = this;
    vm.users = vm.users.filter(user => {
      return user._id !== id;
    });
  }

}
