import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogComponent } from './blog/blog.component';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [

  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
    children :[      
      {path: 'blog', component: BlogComponent},
      { path: '', redirectTo: '/user/blog', pathMatch: 'full' },
    ]
  },





];


@NgModule({
  declarations: [
    BlogComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class UserModule { }
