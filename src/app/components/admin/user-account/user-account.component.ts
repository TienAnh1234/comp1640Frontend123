import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Major } from 'src/app/common/major';
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
  majors: Major[] =[];
  
  checkSaveOrUpdate: number = 0;
  userUpdateId!: number;
  showNotification = false;
  selectedFile!: File;
  showMajor: Boolean =false;

  constructor(private formBuilder: FormBuilder,
              private majorService: MajorService,
              private userService: UserService) { }

  ngOnInit(): void {
          this.userForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.minLength(3)]],
            role: ['', [Validators.required, Validators.minLength(3)]],
            name: ['', [Validators.required, Validators.minLength(3)]],
            birthday: ['', [Validators.required, Validators.minLength(3)]],
            imageFile: ['', [Validators.required, Validators.minLength(3)]],
            major: [''],

          });
          this.listUser();
          this.listMajor();

          this.userForm.get('role')?.valueChanges.subscribe((selectedRole) => {
            // Kiểm tra nếu role được chọn là "STUDENT" hoặc "TUTOR" thì hiển thị dropdown Major
            if (selectedRole === 'STUDENT' || selectedRole === 'TUTOR') {
              this.showMajor = true;
            } else {
              // Nếu chọn "ADMIN", ẩn dropdown Major và xóa giá trị đã chọn trước đó
              this.showMajor = false;
              this.userForm.patchValue({
                major: ''
              });


            }
          });

  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
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


    if(this.userForm.valid == false){
      this.showNotification = true;
      setTimeout(() => {
        this.showNotification = false;
      }, 3000);
      console.log('Form không hợp lệ!', this.userForm.controls);

    }else{
      
      const definedUserFormData = new FormData();
      definedUserFormData.append('username', this.userForm.value.username);
      definedUserFormData.append('password', this.userForm.value.password);
      definedUserFormData.append('email', this.userForm.value.email);
      definedUserFormData.append('role', this.userForm.value.role);
      definedUserFormData.append('name', this.userForm.value.name);
      definedUserFormData.append('birthday', this.userForm.value.birthday);
      definedUserFormData.append('imageFile', this.userForm.value.imageFile);

      definedUserFormData.append('major', this.userForm.value.major);
      definedUserFormData.append('file', this.selectedFile);

      if(this.checkSaveOrUpdate == 0){
        this.userService.saveUser(definedUserFormData).subscribe(
          data =>{
            this.listUser();
          }
        ) 
        this.closeModal();  
      }
  
      if(this.checkSaveOrUpdate == 1){
        // this.userService.updateUser(newUser, this.userUpdateId).subscribe(
        //   data =>{
        //     console.log(data);  
        //     this.listUser();
        //   }
        // )
        this.closeModal();  
      }

    }

        

  }

  listUser() {
    this.userService.getUserList().subscribe(
      data =>{
        this.users = data;
      }
    )
  }


  listMajor() {
    this.majorService.getMajorList().subscribe(
      data =>{
        this.majors = data;
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
