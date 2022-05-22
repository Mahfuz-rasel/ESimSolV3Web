import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { LoginComponent } from './usermanagement/login/login.component';
import { UserlistComponent } from './usermanagement/userlist/userlist.component';
import { HeaderLeftNavbarComponent } from './layout/header/header-left-navbar/header-left-navbar.component';
import { HeaderUserMenuComponent } from './layout/header/header-user-menu/header-user-menu.component';
import { SidebarLogoComponent } from './layout/sidebar/sidebar-logo/sidebar-logo.component';
import { SidebarUserPanelComponent } from './layout/sidebar/sidebar-user-panel/sidebar-user-panel.component';
import { SidebarMenuComponent } from './layout/sidebar/sidebar-menu/sidebar-menu.component';

@NgModule({
  declarations: [
    
    AppComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    UserlistComponent,
    HeaderLeftNavbarComponent,
    HeaderUserMenuComponent,
    SidebarLogoComponent,
    SidebarUserPanelComponent,
    SidebarMenuComponent,
   
  ],
  imports: [
    AgGridModule.withComponents(null),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
