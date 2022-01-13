import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ComponentLoaderDirective } from 'src/app/core/directives/component-loader.directive';
import { AwardsComponent } from '../awards/awards.component';
import { JobsComponent } from '../jobs/jobs.component';
import { OrganizationsComponent } from '../organizations/organizations.component';

export interface MenuItem {
  itemName: string;
  displayName: string;
  component: any;
}

@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.scss'],
})
export class MastersComponent implements OnInit {
  @ViewChildren(ComponentLoaderDirective)
  componentLoaders!: QueryList<ComponentLoaderDirective>;

  menuItems: MenuItem[] = [
    { itemName: 'jobs', displayName: 'Jobs', component: JobsComponent },
    {
      itemName: 'organizations',
      displayName: 'Organizations',
      component: OrganizationsComponent,
    },
    { itemName: 'awards', displayName: 'Awards', component: AwardsComponent },
  ];

  activeItem?: string = 'ward';
  tabs: any[] = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit(): void {}

  menuItemClick(item: MenuItem) {
    this.activeItem = item.itemName;

    let matchingTabs = this.tabs.filter(
      (tab) => tab.itemName === item.itemName
    );

    if (matchingTabs.length == 0) {
      this.tabs.push({
        tabIndex: this.tabs.length,
        ...item,
      });

      setTimeout(() => {
        let componentLoadersArray: ComponentLoaderDirective[] =
          this.componentLoaders.toArray();
        const componentFactory =
          this.componentFactoryResolver.resolveComponentFactory(item.component);

        const viewContainerRef =
          componentLoadersArray[this.tabs.length - 1].viewContainerRef;

        const componentRef = viewContainerRef.createComponent(componentFactory);

        this.tabs[this.tabs.length - 1].viewContainerRef = viewContainerRef;

        if (item.component.name === 'OrganizationComponent') {
          let instance = componentRef.instance as JobsComponent;
          // instance.message = 'Another thing to work out';
        }
      }, 100);
    }
  }

  onCloseClick(clickedTab: any) {
    clickedTab.viewContainerRef.remove();
    this.tabs.splice(this.tabs.indexOf(clickedTab), 1);

    //Reset tab as first item
    if (this.tabs.length > 0) {
      this.activeItem = this.tabs[0].itemName;
    }
  }
}
