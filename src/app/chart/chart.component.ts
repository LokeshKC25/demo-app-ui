import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  private data: Array<Object> = [];

  private chartOption = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Students applied to company'
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

  constructor(private dataService: DataService) { }

  ngOnInit() {
    const vm = this;
    vm.getCompany();
  }

  getCompany() {
    const vm = this;
    vm.dataService.getData('/company').subscribe(response => {
      if (response && !response.error) {
        response.forEach(company => {
          const comObj = {};
          comObj['id'] = company.id;
          comObj['name'] = company.name;
          comObj['y'] = 0;
          vm.data.push(comObj);
        });
        vm.getAllStudents();
      }
    });
  }

  getAllStudents() {
    const vm = this;
    vm.dataService.getData('/student').subscribe(response => {
      if (response && !response.error) {
        response.forEach(student => {
          student.companies.forEach(company => {
            vm.data.forEach(d => {
              if (d['id'] === company.id && company.applied) {
                d['y'] += 1;
              }
            });
          });
        });
        vm.chartOption.series[0].data = vm.data;
        vm.chart = new Chart(this.chartOption);
      }
    });
  }

}
