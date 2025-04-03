import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';

import { User } from 'src/app/common/user';
import { AuthService } from 'src/app/services/auth.service';
import { JwtHelperService } from 'src/app/services/jwt-helper.service';
import { UserService } from 'src/app/services/user.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  
  users: User[] =[];

  constructor(private fb: FormBuilder, 
              private authService: AuthService, 
              private userService: UserService,
              private jwtHelperService: JwtHelperService,
              private router: Router, 
              private jwtHelper: JwtHelperService,
              private websocketService: WebsocketService) { }

  ngOnInit(): void {
    const token = this.authService.getToken();
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      console.log('loi 1'); 
    }else{
      const userRole  = this.jwtHelper.getUserFromToken(token!).role;
      if(userRole === 'STUDENT' || userRole === 'TUTOR'){
        this.router.navigate(['/user']);

      }else{
        this.router.navigate(['/admin']);
      }

    }

    this.createForm();
    this.listUser();
  }


  listUser() {
    this.userService.getUserList().subscribe(
      data =>{
        this.users = data;
      }
    )
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      if(this.users.some(user => user.password === this.loginForm.value.password 
        && user.username === this.loginForm.value.username) ){

        const { username, password} = this.loginForm.value;
        
        this.authService.login(username, password).subscribe({
          next: (response) => {
            this.authService.saveToken(response);
            console.log('Token:', this.authService.getToken());
            if(this.jwtHelperService.getUserFromToken(response).role === 'ADMIN'){
              this.router.navigate(['/admin']);
            }else{
              this.router.navigate(['/user']);
            }
            this.websocketService.connect(username);

            alert('Đăng nhập thành công!');
          },
          error: (err) => {
            this.errorMessage = 'Đăng nhập thất bại. Vui lòng thử lại!';
            console.error(err);
          }
        });
      }else{
        console.log(this.loginForm.value.username);
        console.log(this.loginForm.value.password);
        alert('Wrong username or password!');
      } 
    }else{
      alert('Please enter username and password!');
    }
  }

}
