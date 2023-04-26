import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}
  imagePath: string = '../src/assets/images/logo.png';
  hide: boolean = false;
  userName!: string;
  password!: string;
  loginForm: FormGroup = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });
  ngOnInit(): void {}

  onLogin(data: any) {
    if (!this.loginForm.valid) {
      return;
    }
    this.userName = data.userName;
    this.password = data.password;
    this.authService.login(this.userName, this.password).subscribe((data) => {
      console.log('Is Login Success: ' + data);
      if (data) this.router.navigate(['/products']);
    });
  }
}
