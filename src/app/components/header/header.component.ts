import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public apiService: APIService, public router: Router) { }

  ngOnInit(): void {
  }
  doLogout() {
    this.apiService.logOutRequest().subscribe((result: any) => {
      localStorage.removeItem('ergos-user');
      localStorage.removeItem('login-user-name');
      this.router.navigate(['/home']);
    }, (error) => {
    });
  }
}
