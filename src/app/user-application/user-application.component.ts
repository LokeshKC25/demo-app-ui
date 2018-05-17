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
      if (response.error) {
        vm.toastr.error('User Not found');
        vm.router.navigate(['/']);
      } else {
        vm.user = response;
      }
    });
  }

  onSubmit() {
    const vm = this;
    vm.dataService.postData('/users/add', vm.user).subscribe(response => {
      if (response.error) {
        vm.toastr.success('User adding failed');
      } else if (response && response.insertedCount > 0) {
        vm.toastr.success('User added successfully');
        vm.user = new UserModel();
      }
    });
  }

}
