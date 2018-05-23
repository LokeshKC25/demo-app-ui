import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DataService } from '../services/data.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  formSubmitted: boolean;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private appService: AppService,
    public toastr: ToastsManager) { }

  ngOnInit() {
    const vm = this;
    if (this.appService.userObj && this.appService.userObj.isAdmin) {
      this.router.navigate(['/users-list']);
    } else if (this.appService.userObj) {
      this.router.navigate(['/student-company']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  clearFields() {
    const vm = this;
    vm.username = '';
    vm.password = '';
  }

  onLogin(flag) {
    const vm = this;
    vm.formSubmitted = true;
    if (flag) {
      const reqObj = {};
      reqObj['userId'] = vm.username;
      reqObj['password'] = vm.password;
      vm.dataService.postData('/auth/login', reqObj).subscribe(response => {
        if (response && response.error) {
          vm.toastr.error(response.message);
        } else {
          this.appService.userObj = response;
          if (response.isAdmin) {
            this.router.navigate(['/users-list']);
          } else {
            this.router.navigate(['/student-company']);
          }
        }
      }, error => {
        vm.toastr.error('Please contact admin, Serve issue');
      });
    } else {
      vm.toastr.error('Provide both username and password');
    }
  }

  onSignUp() {
    this.router.navigate(['/registration']);
  }

}
