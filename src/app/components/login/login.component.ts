import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  
  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password} = this.loginForm.value;
      
      this.authService.login(username, password).subscribe({
        next: (response) => {
          this.authService.saveToken(response);
          console.log('Token:', this.authService.getToken());
          alert('Đăng nhập thành công!');
        },
        error: (err) => {
          this.errorMessage = 'Đăng nhập thất bại. Vui lòng thử lại!';
          console.error(err);
        }
      });
    }
  }

}
