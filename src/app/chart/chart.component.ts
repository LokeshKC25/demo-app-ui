import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { DataService } from '../services/data.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  private data: Array<Object> = [];
  private companies: Array<Object> = [];
  private students: Array<Object> = [];
  private selectedType: String = 'applied';
  private isAdmin: Boolean = false;

  private chartOption = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Students applied to companies'
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              style: {
                  color: 'black'
              }
          }
      }
    },
    series: [{
      name: 'Applied',
      colorByPoint: true,
      data: this.data
    }]
  };

  private chart: any;

  constructor(private dataService: DataService,
    private appService: AppService) { }

  ngOnInit() {
    const vm = this;
    vm.isAdmin = vm.appService.userObj.isAdmin;
    vm.getCompany();
    vm.getAllStudents();
  }

  getCompany() {
    const vm = this;
    vm.dataService.getData('/company').subscribe(response => {
      if (response && !response.error) {
        vm.companies = response;
        vm.onCompanies();
      }
    });
  }

  getAllStudents() {
    const vm = this;
    vm.dataService.getData('/student').subscribe(response => {
      if (response && !response.error) {
        vm.students = response;
        vm.analyticsOn('applied');
      }
    });
  }

  onCompanies() {
    const vm = this;
    vm.data = [];
    vm.companies.forEach(company => {
      const comObj = {};
      comObj['id'] = company['id'];
      comObj['name'] = company['name'];
      comObj['y'] = 0;
      vm.data.push(comObj);
    });
  }

  analyticsOn(type) {
    const vm = this;
    vm.students.forEach(student => {
      student['companies'].forEach(company => {
        vm.data.forEach(d => {
          if (d['id'] === company.id) {
            if (type === 'applied') {
              if (company.applied) {
                d['y'] += 1;
              }
            } else {
              if (company.status === type) {
                d['y'] += 1;
              }
            }
          }
        });
      });
    });
    vm.chartOption.series[0].data = vm.data;
    vm.chart = new Chart(this.chartOption);
  }

  onTypeChange() {
    const vm = this;
    vm.onCompanies();
    if (vm.selectedType === 'applied') {
      vm.chartOption.title.text = 'Students applied to company';
      vm.chartOption.series[0].name = 'Applied';
    } else {
      vm.chartOption.title.text = 'Analytics of companies ' + vm.selectedType;
      vm.chartOption.series[0].name = vm.capitalizeFirstLetter(vm.selectedType);
    }
    vm.analyticsOn(vm.selectedType);
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
