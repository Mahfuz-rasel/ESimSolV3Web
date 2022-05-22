import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './usermanagement/login/login.component';
import { UserlistComponent } from './usermanagement/userlist/userlist.component';
const routes: Routes = [
  {path:"usermanagement/login",component:LoginComponent},
  {path:"usermanagement/userlist",component:UserlistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
