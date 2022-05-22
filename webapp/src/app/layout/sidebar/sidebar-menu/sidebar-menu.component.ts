import { Component,Injector, OnInit } from '@angular/core';
// import {AppComponentBase} from 'src/shared/app-component-base';

import { MenuItem } from 'src/shared/layout/menu-item';




@Component({
  selector: 'sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {

  menuItems: MenuItem[];
  menuItemsMap: { [key: number]: MenuItem } = {};
  activatedMenuItems: MenuItem[] = [];
  //routerEvents: BehaviorSubject<RouterEvent> = new BehaviorSubject(undefined);
  homeRoute = '/app/about';


  constructor() { 
    
  }

  ngOnInit(): void {

    this.menuItems = this.getMenuItems();

  }//in


  getMenuItems(): MenuItem[] {
    return [

       new MenuItem('About', '/app/about', 'fas fa-info-circle'),
        new MenuItem('HomePage', '/app/home', 'fas fa-home'),
        new MenuItem('Roles','/app/roles','fas fa-theater-masks','Pages.Roles' ),
        new MenuItem( 'Tenants Test','','fas fa-building','',[
            new MenuItem('Tett2', '', 'fas fa-dot-circle', '', [
                new MenuItem(
                    'Child Test',
                    '',
                    'far fa-circle',
                    '',
                    [
                        new MenuItem(
                            'Child Test2',
                            'https://aspnetboilerplate.com?ref=abptmpl',
                            'far fa-circle'
                        )  
                    ]
                )
            ])
        ]),

        new MenuItem( 'Users','/app/users','fas fa-users','Pages.Users'),

       new MenuItem('MultiLevelMenu', '', 'fas fa-circle', '', [
            new MenuItem('ASP.NET Boilerplate', '', 'fas fa-dot-circle', '', [
                new MenuItem(
                    'Home',
                    'https://aspnetboilerplate.com?ref=abptmpl',
                    'far fa-circle'
                ),
                new MenuItem(
                    'Templates',
                    'https://aspnetboilerplate.com/Templates?ref=abptmpl',
                    'far fa-circle'
                ),
                new MenuItem(
                    'Samples',
                    'https://aspnetboilerplate.com/Samples?ref=abptmpl',
                    'far fa-circle'
                ),
                new MenuItem(
                    'Documents',
                    'https://aspnetboilerplate.com/Pages/Documents?ref=abptmpl',
                    'far fa-circle'
                ),
            ]),
            new MenuItem('ASP.NET Zero', '', 'fas fa-dot-circle', '', [
                new MenuItem(
                    'Home',
                    'https://aspnetzero.com?ref=abptmpl',
                    'far fa-circle'
                ),
                new MenuItem(
                    'Features',
                    'https://aspnetzero.com/Features?ref=abptmpl',
                    'far fa-circle'
                ),
                new MenuItem(
                    'Pricing',
                    'https://aspnetzero.com/Pricing?ref=abptmpl#pricing',
                    'far fa-circle'
                ),
                new MenuItem(
                    'Faq',
                    'https://aspnetzero.com/Faq?ref=abptmpl',
                    'far fa-circle'
                ),
                new MenuItem(
                    'Documents',
                    'https://aspnetzero.com/Documents?ref=abptmpl',
                    'far fa-circle'
                )
            ])
        ])
    ];
}//getMenuItems


patchMenuItems(items: MenuItem[], parentId?: number): void {
    items.forEach((item: MenuItem, index: number) => {
        item.id = parentId ? Number(parentId + '' + (index + 1)) : index + 1;
        if (parentId) {
            item.parentId = parentId;
        }
        if (parentId || item.children) {
            this.menuItemsMap[item.id] = item;
        }
        if (item.children) {
            this.patchMenuItems(item.children, item.id);
        }
    });
}



activateMenuItems(url: string): void {
    this.deactivateMenuItems(this.menuItems);
    this.activatedMenuItems = [];
    const foundedItems = this.findMenuItemsByUrl(url, this.menuItems);
    foundedItems.forEach((item) => {
        this.activateMenuItem(item);
    });
}

deactivateMenuItems(items: MenuItem[]): void {
    items.forEach((item: MenuItem) => {
        item.isActive = false;
        item.isCollapsed = true;
        if (item.children) {
            this.deactivateMenuItems(item.children);
        }
    });
}


findMenuItemsByUrl(
    url: string,
    items: MenuItem[],
    foundedItems: MenuItem[] = []
): MenuItem[] {
    items.forEach((item: MenuItem) => {
        if (item.route === url) {
            foundedItems.push(item);
        } else if (item.children) {
            this.findMenuItemsByUrl(url, item.children, foundedItems);
        }
    });
    return foundedItems;
}

activateMenuItem(item: MenuItem): void {
    item.isActive = true;
    if (item.children) {
        item.isCollapsed = false;
    }
    this.activatedMenuItems.push(item);
    if (item.parentId) {
        this.activateMenuItem(this.menuItemsMap[item.parentId]);
    }
}

isMenuItemVisible(item: MenuItem): boolean {
    debugger
    if (!item.permissionName) {
        return true;
    }
   // return this.permission.isGranted(item.permissionName);
   return true;
}



}//cs
