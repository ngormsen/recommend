import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _auth: AuthService
  ) {

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }

  onSignInWithGoogle() {
    this._auth.signInWithGoogle();
  }

  onSignInWithEmailAndPassword(email: string, password: string) {
    console.log(email, password)
    this._auth.signInWithEmailAndPassword(email, password);
  }

}
