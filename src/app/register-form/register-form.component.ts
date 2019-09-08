import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;
  isPasswordsIdentical$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  isPasswordsIdentical: Boolean = true;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _auth: AuthService
  ) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: new FormControl(''),
      password1: new FormControl(''),
      password2: new FormControl('')
    })

    this.isPasswordsIdentical$.subscribe(bool => this.isPasswordsIdentical = bool);
  }

  onRegisterWithEmailAndPassword(email: string, password1: string, password2: string) {
    if (password1 === password2) {
      this._auth.registerWithEmailAndPassword(email, password1);
    } else {
      this.isPasswordsIdentical$.next(false)
    }
  }
}