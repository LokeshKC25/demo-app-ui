import { Component, OnInit } from '@angular/core';
import { CompanyModel } from './company.model';
import { DataService } from '../services/data.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {

  private company: CompanyModel = new CompanyModel();
  private companies: Array<CompanyModel> = [];
  private formSubmitted: Boolean = false;

  constructor(private dataService: DataService,
    private toastr: ToastsManager) { }

  ngOnInit() {
    const vm = this;
    vm.getCompanies();
  }

  clearFields() {
    const vm = this;
    vm.formSubmitted = false;
    vm.company = new CompanyModel();
  }

  onSubmit(flag) {
    const vm = this;
    vm.dataService.postData('/company/add', vm.company).subscribe(response => {
      if (response && response.insertedCount > 0) {
        vm.companies.push(response.ops[0]);
      }
    });
  }

  getCompanies() {
    const vm = this;
    vm.dataService.getData('/company').subscribe(response => {
      vm.companies = response;
    });
  }

}
