import { Component, OnInit, AfterViewChecked, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DataService } from '../services/data.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { UserModel } from './user.model';

@Component({
  selector: 'app-user-application',
  templateUrl: './user-application.component.html',
  styleUrls: ['./user-application.component.scss']
})
export class UserApplicationComponent implements OnInit, AfterViewChecked {

  private user: UserModel;

  private formSubmitted: Boolean = false;
  private formErrors: Object = {};
  private validationMessages: Object = {};

  private userForm: NgForm;
  @ViewChild('userForm') currentForm: NgForm;

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
    vm.setFormData();
  }

  ngAfterViewChecked() {
    const vm = this;
    vm.formChanged();
  }

  formChanged() {
    const vm = this;
    if (vm.currentForm === vm.userForm) { return; }
    vm.userForm = vm.currentForm;
    if (vm.userForm) {
      vm.userForm.valueChanges.subscribe(data => vm.onValueChanged(data));
    }
  }

  setFormData() {
    const vm = this;
    vm.formErrors = {
      'name': '',
      'fatherName': '',
      'gender': '',
      'dob': '',
      'address': '',
      'email': '',
      'mobile': ''
    };

    vm.validationMessages = {
      'name': {
        'required': 'Name is required.',
        'minlength': 'Name must be at least 4 characters long.'
      },
      'fatherName': {
        'required': 'Father name is required.',
        'minlength': 'Father name must be at least 4 characters long.'
      },
      'gender': {
        'required': 'Gender is required.',
      },
      'dob': {
        'required': 'Please provide your DOB',
      },
      'address': {
        'required': 'Please provide your address',
      },
      'email': {
        'required': 'Email-id is required.',
        'email': 'Email-id pattern mismatch'
      },
      'mobile': {
        'required': 'Mobile number is required',
        'pattern': 'Only Numbers and it should be 10 digits'
      }
    };
  }

  onValueChanged(data?: any) {
    const vm = this;
    if (!vm.userForm) { return; }
    const form = vm.userForm.form;
    for (const field in vm.formErrors) {
      if (vm.formErrors.hasOwnProperty(field)) {
        vm.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = vm.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              vm.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
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

  clearFields() {
    const vm = this;
    vm.formSubmitted = false;
    vm.user = new UserModel();
  }

  onSubmit(flag) {
    const vm = this;
    const path = vm.user._id ? '/users/update' : '/users/add' ;
    const msg = vm.user._id ? 'User updated successfully' : 'User added successfully';
    vm.formSubmitted = true;
    if (!flag) {
      vm.toastr.error('Please fill all the mandatory fields');
    } else {
      vm.dataService.postData(path, vm.user).subscribe(response => {
        if (response.error) {
          vm.toastr.error('User adding failed');
        } else if (response && response.value) {
          vm.toastr.success(msg);
          vm.user = response.value;
          vm.formSubmitted = false;
        } else if (response && response.insertedCount > 0) {
          vm.toastr.success(msg);
          vm.clearFields();
        }
      });
    }
  }

}
