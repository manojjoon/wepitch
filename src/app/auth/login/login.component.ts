import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginModel } from 'src/app/models/auth/login.model';
import { LocalStorageService } from 'src/app/shared/services';
import { Router } from '@angular/router';
import { LoginService } from '../login.services';

@Component({
  selector: 'app-basic-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class BasicLoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(public fb: FormBuilder,private loginService : LoginService,  
              private localStorageService: LocalStorageService, private router: Router) {
    this.loginForm = this.fb.group({
      UserName: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  ngOnInit() {
    const _uInfo=localStorage.getItem("authorization");
    if (_uInfo) {
      this.router.navigate(['/']);
        return true;
      }
  }

  onSubmit() {
    this.loginService.login(this.loginForm.value).subscribe((result: any) => {
      this.localStorageService.setItem('authorization', result.Data);
      this.router.navigate(['/']);
    });
  }
}
