import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SolutionsComponent } from './solutions/solutions.component';

const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'login'},
  {path:'home', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'create-user', component:CreateUserComponent},
  {path:'show-solutions/:questionId', component:SolutionsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
