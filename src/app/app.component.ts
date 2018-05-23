import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private isExpand: Boolean = true;
  private routeName: string;
  private isLogin: boolean;
  private isSpinner: boolean;
  private user: any;
  private isAdmin: boolean;

  constructor(private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef,
    private appService: AppService) {
      const vm = this;
      vm.toastr.setRootViewContainerRef(vcr);
      vm.router.events.forEach((event) => {
        if (event instanceof NavigationEnd) {
          vm.isLogin = false;
          vm.user = vm.appService.userObj;
          vm.isAdmin = vm.appService.userObj && vm.appService.userObj.isAdmin;
          let currentRoute = this.route.root;
          if (currentRoute.children[0] !== undefined) {
            currentRoute = currentRoute.children[0];
          }
          if (currentRoute.snapshot.data) {
            vm.isLogin = currentRoute.snapshot.data.name === 'login' || currentRoute.snapshot.data.name === 'registration' ? true : false;
            vm.routeName = currentRoute.snapshot.data.name;
          }
        }
      });
  }

  ngOnInit() {
    const vm = this;
    vm.isExpand = true;
    vm.appService.isSpinnerUpdated$.subscribe(value => {
      vm.isSpinner = value;
    });
  }

  onLogout() {
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  navigateTo(path) {
    const vm = this;
    vm.router.navigate([path]);
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
