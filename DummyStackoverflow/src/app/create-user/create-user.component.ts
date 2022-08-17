import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  constructor(private fb: FormBuilder, public userSerivce: UserService) { }

  ngOnInit(): void {
  }

  createUserForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    }
  )

  get control(): {[key:string]: AbstractControl} {
    return this.createUserForm.controls
  }

  createAccount() {
    this.userSerivce.createAccount(this.createUserForm.value).subscribe(res => {

    })
  }

}
