import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { AdminComponent } from './admin.component';
import { TutorsComponent } from './tutors/tutors.component';
import { MajorsComponent } from './majors/majors.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserAccountComponent } from './user-account/user-account.component';



const routes: Routes = [

  {
    path: 'admin',
    component: AdminComponent,
    children :[
      {path: 'students', component: StudentsComponent},
      {path: 'tutors', component: TutorsComponent},
      {path: 'majors', component: MajorsComponent},
      {path: 'usersAccount', component: UserAccountComponent},


      { path: '', redirectTo: '/admin/students', pathMatch: 'full' },

    ]
  },
{ path: '', redirectTo: 'admin/students', pathMatch: 'full' },
{ path: '**', redirectTo: 'admin/students', pathMatch: 'full' }


];



@NgModule({
  declarations: [
    UserAccountComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule


  ]
})
export class AdminModule { }
