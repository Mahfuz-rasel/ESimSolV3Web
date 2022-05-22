import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder,private router:Router) { }

  ngOnInit(): void {
  }

  logInSubmit() {

    let username = this.loginForm.controls["username"].value;
    let password = this.loginForm.controls["password"].value;

    this.router.navigate(["usermanagement/userlist"])

  }//logInSubmit

}//cs
