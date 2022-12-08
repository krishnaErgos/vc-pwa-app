import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
// import { concatMap } from 'rxjs/operators';
// import { NzMessageService } from 'ng-zorro-antd/message';
// import { MessageService } from './message.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let user:any = localStorage.getItem('ergos-user');
      let accessToken = '';
      if(user) {
          user = JSON.parse(user);
          accessToken = user.accessToken;
      }
      let headers: any;

      if(request.url.indexOf('auth/login') < 0) {
        const contentType = request.headers.get('file-upload');
        const basicAuth = request.headers.get('basic-auth');
        const contentTypeData = request.headers.get('file-upload-data');
        if(contentType) {
          headers = new HttpHeaders({
             Authorization: `Bearer ${accessToken}`,
          });
        } else if(basicAuth) {
          const authorizationData = 'Basic ' + btoa(`${environment.username}:${environment.password}`);
            headers =  new HttpHeaders({
              'Content-type': 'Application/json',
              Authorization: authorizationData
            })
        } else {
          headers = new HttpHeaders({
            // Accept: 'application/json',
            // 'Content-Type': 'application/xml',
            'Content-type': contentType ? contentType : 'Application/json',
             Authorization: `Bearer ${accessToken}`,
          });
        }
      }
      let duplicateReequest = request;
      if(headers) {
        duplicateReequest = request.clone({headers});
      }
      return next.handle(duplicateReequest).pipe( tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // console.log(event.body.message.tokenStatus)
          // if(event.body.message.tokenStatus === 'EXPIRED') {
          //   this.router.navigate(['/login']);
          // }
          // if(event.body.status === 'error') {
          //   localStorage.removeItem('ergos-user');
          //   this.router.navigate(['/login']);
          // }
        }
      },(err: any) => {
          if (err instanceof HttpErrorResponse) {

            if (err.status === 401) {
              // this.messageService.sendCommonMessage({topic: 'logout', reason: 'Unauthorized'});
            }
            return;
          }
        })
      );
    }
}
