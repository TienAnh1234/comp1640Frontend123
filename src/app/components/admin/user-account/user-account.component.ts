import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/common/user';
import { MajorService } from 'src/app/services/major.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

@ViewChild('myModal') model: ElementRef | undefined;

  userForm!: FormGroup;
  users: User[] =[];
  
  checkSaveOrUpdate: number = 0;
  userUpdateId!: number;


  constructor(private formBuilder: FormBuilder,
                private userService: UserService) { }

  ngOnInit(): void {
          this.userForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.minLength(3)]],
            role: ['', [Validators.required, Validators.minLength(3)]],
          });
  }


openModal() {
  const modalElement = document.getElementById('myModal');
  if (modalElement) {
    modalElement.style.display = 'block';
  }
}

closeModal() {
  if (this.model) {
    this.model.nativeElement.style.display = 'none';
  }
}


onSubmit() {

      const newUser: User = {
        username: this.userForm.value.username,
        password: this.userForm.value.password,
        email: this.userForm.value.email,
        role: this.userForm.value.role,

      };
      console.log(newUser);
  
  
      if(this.checkSaveOrUpdate == 0){
        this.userService.saveUser(newUser).subscribe(
          data =>{
            this.listUser();
          }
        ) 
        this.closeModal();  
      }
  
      if(this.checkSaveOrUpdate == 1){
        this.userService.updateUser(newUser, this.userUpdateId).subscribe(
          data =>{
            console.log(data);  
            this.listUser();
          }
        )
        this.closeModal();  
      }
  


}

  listUser() {
    this.userService.getUserList().subscribe(
      data =>{
        this.users = data;
      }
    )
  }



deleteUserAccount(_t15: any) {
throw new Error('Method not implemented.');
}


updateUserAccount(_t15: any) {
throw new Error('Method not implemented.');
}

}
