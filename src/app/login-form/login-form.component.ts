import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  isLoginProcedure: boolean = true;
  isPasswordsIdentical: boolean = false;

  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _auth: AuthService
  ) {

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: new FormControl(''),
      password: new FormControl('')
    })

    this.registerForm = this.fb.group({
      email: new FormControl(''),
      password1: new FormControl(''),
      password2: new FormControl('')
    })
  }

  onSignInWithGoogle() {
    this._auth.signInWithGoogle();
    this.router.navigate(['main'])
  }
  
  onSignInWithEmailAndPassword(email: string, password: string) {
    console.log(email, password)
    this._auth.signInWithEmailAndPassword(email, password);
    this.router.navigate(['main'])
  }

}
