import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private isExpand: Boolean = true;
  private routeName: string;

  constructor(private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef) {
      const vm = this;
      vm.toastr.setRootViewContainerRef(vcr);
      vm.router.events.forEach((event) => {
        if (event instanceof NavigationEnd) {
          let currentRoute = this.route.root;
          if (currentRoute.children[0] !== undefined) {
            currentRoute = currentRoute.children[0];
          }
          if (currentRoute.snapshot.data) {
            vm.routeName = currentRoute.snapshot.data.name;
          }
        }
      });
  }

  ngOnInit() {
    const vm = this;
    vm.isExpand = true;
  }

  navigateTo(path) {
    const vm = this;
    vm.router.navigate([path]);
  }
}
