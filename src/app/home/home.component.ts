import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private apiService: APIService) { }
  get f() { return this.loginForm.controls; }

  @ViewChild('loginBtn')loginBtn:any;

  loginForm:any = FormGroup;
  submitted = false;
  invalidLogin = false;

  public user = {
    username: '',
    password: ''
  }

  public users = environment.users;
  isLoading = false;
  button = 'Login';
  roleList: any;
  invalidLoginDetails = false;

  loginUserDetails:any;
  isNbfcUser:any;
  nbfcId:any;

  showNbfcMenu = false;
  ngOnInit(): void {
    localStorage.removeItem('ergos-user');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

 
  doLogin() {
    this.submitted = true;
    if (this.loginForm.invalid) {
        return;
    }
    const payloads =  this.loginForm.value;
    this.isLoading = true;
    this.button = 'Processing';
    this.invalidLogin = false;
    this.apiService.loginRequest(payloads).subscribe((result: any) => {
      if(result.status === 'error') {
        this.invalidLogin = true;
        this.isLoading = false;
        // this.loginForm.controls.username.setErrors({Validators: true});
        // this.loginForm.controls.password.setErrors({Validators: true});
        this.button = 'Login';
        return;
      } else {
        this.invalidLogin = false;
        localStorage.setItem('ergos-user', JSON.stringify(result.message));
        this.getUserDetails();
        this.router.navigate(['/landing']);
        this.isLoading = false;
        this.button = 'Submit';
      }
    }, (error) => {
      this.invalidLogin = false;
      this.isLoading = false;
      this.button = 'Submit';
      this.invalidLogin = true;
    });
}
getUserDetails() {
  this.apiService.getUserDetails().subscribe((result: any) => {
    this.loginUserDetails = result.user;
    this.apiService.setLoginUser(result.user ? result.user : {});
    if(result.status !== 'error') {
    this.isNbfcUser = result.user.isNbfcUser;
    this.nbfcId = result.user.nbfcId;
    // console.log(this.isNbfcUser);
    // console.log(this.nbfcId)
    if(this.isNbfcUser === 'Y' && this.nbfcId !== null) {
        this.showNbfcMenu = true;
        // this.router.navigate(['/auth/finance/lender-pledge-process']);
    } else {
      this.showNbfcMenu = false;
    }
  }
  }, (error) => {
    this.apiService.setLoginUser({});
  });
}
getRoleList() {
  this.apiService.getRoleList().subscribe((result: any) => {
    this.roleList = result.data.roles ? result.data.roles : {};
  }, (error) => {
    this.roleList = [];
  });
}
}
