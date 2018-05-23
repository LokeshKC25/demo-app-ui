import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentModel, CompanyStatusModel } from './student.model';
import { DataService } from '../services/data.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AppService } from '../app.service';
import { UserModel } from '../user-application/user.model';

@Component({
  selector: 'app-student-company',
  templateUrl: './student-company.component.html',
  styleUrls: ['./student-company.component.scss']
})
export class StudentCompanyComponent implements OnInit {

  private student: StudentModel = new StudentModel();
  private isAdmin: Boolean = false;
  private studentData: UserModel = new UserModel();

  constructor(private dataService: DataService,
    private toastr: ToastsManager,
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute) {
      const vm = this;
      this.route.params.subscribe(params => {
        if (params.id) {
          vm.student.userId = params.id;
          vm.getStudent();
          vm.getUser();
        }
      });
    }

  ngOnInit() {
    const vm = this;
    vm.isAdmin = vm.appService.userObj.isAdmin;
    if (!vm.appService.userObj.isAdmin) {
      vm.student.userId = vm.appService.userObj._id;
      vm.getStudent();
    }
  }

  getStudent() {
    const vm = this;
    vm.dataService.getData('/student/find/' + vm.student.userId).subscribe(response => {
      if (response && !response.error) {
        vm.student = response;
      } else {
        vm.initLoad();
      }
    });
  }

  getUser() {
    const vm = this;
    vm.dataService.getData('/users/find/' + vm.student.userId).subscribe(response => {
      if (response && !response.error) {
        vm.studentData = response;
      }
    });
  }

  initLoad() {
    const vm = this;
    vm.dataService.getData('/company').subscribe(response => {
      if (response && !response.error) {
        response.forEach(company => {
          const comObj = new CompanyStatusModel;
          comObj.name = company.name;
          comObj.id = company.id;
          comObj.location = company.location;
          comObj.eligibility = company.eligibility;
          comObj.status = null;
          comObj.applied = false;
          vm.student.companies.push(comObj);
        });
      }
    });
  }

  onSubmit() {
    const vm = this;
    vm.processStatus(vm.student.companies);
    const path = vm.student._id ? '/student/update' : '/student/add';
    vm.dataService.postData(path, vm.student).subscribe(response => {
      if (response && response.insertedCount > 0) {
        vm.student = response.ops[0];
        vm.toastr.success('U have update your interest, Thank you');
      } else if (response && response.value) {
        if (vm.isAdmin) {
          vm.toastr.success('Status Updated');
        } else {
          vm.toastr.success('U have update your interest, Thank you');
        }
        vm.student = response.value;
      }
    });
  }

  processStatus(companies) {
    companies.forEach(company => {
      if (company.status && !company.applied) {
        company.status = null;
      }
      if (!company.status) {
        company.status = company.applied ? 'pending' : null;
      }
    });
  }
}
