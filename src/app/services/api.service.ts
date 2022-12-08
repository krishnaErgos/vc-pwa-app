import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { tap, catchError, takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  loginUser: any ={};
  public version = environment.version;
  public version2 = environment.version2;
  public grainbankURL = environment.grianBankWebApi;

  constructor(private http: HttpClient) { }

  loginRequest(payload: any): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'Application/json'
      })
    };

    const url = `${this.grainbankURL}/api/auth/${this.version}/login`;
    return this.http.post<string>(url, payload, httpOptions).pipe(
      tap((res: any) => {
      }),
      catchError(err => {
        return throwError(err);
      }),
    );
  }

  logOutRequest(): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'Application/json'
      })
    };

    const url = `${this.grainbankURL}/api/auth/${this.version}/logout`;
    return this.http.get<string>(url, httpOptions).pipe(
      tap((res: any) => {
      }),
      catchError(err => {
        return throwError(err);
      }),
    );
  }

  getRoleList(): Observable<string>{
    const url = `${this.grainbankURL}/api/master/${this.version2}/roles/roles`;
    return this.http.get<string>(url).pipe(
      tap((res: any) => {
      }),
      catchError(err => {
        return throwError(err);
      }),
    );
  }

  validateToken(): Observable<string>{
    const url = `${this.grainbankURL}/api/auth/${this.version}/validateToken`;
    return this.http.post<string>(url, '').pipe(
      tap((res: any) => {
      }),
      catchError(err => {
        return throwError(err);
      }),
    );
  }

  getUserDetails(): Observable<string> {
    const url = `${this.grainbankURL}/api/auth/${this.version}/details`;
    return this.http.get<string>(url).pipe(
      tap((res: any) => {
      }),
      catchError(err => {
        return throwError(err);
      }),
    );
  }
  switchRole(payload: any): Observable<string>{
    const url = `${this.grainbankURL}/api/auth/${this.version}/switch-role`;
    return this.http.post<string>(url, payload).pipe(
      tap((res: any) => {
      }),
      catchError(err => {
        return throwError(err);
      }),
    );
  }
  getRoleListMenu(): Observable<string> {
    const url = `${this.grainbankURL}/api/master/${this.version}/menus`;
    return this.http.get<string>(url).pipe(
      tap((res: any) => {
      }),
      catchError(err => {
        return throwError(err);
      }),
    );
  }

  setLoginUser(user: any) {
    this.loginUser = user;
  }


  getDeliveryOrderList(payload: any): Observable<string>{
    const url = `${this.grainbankURL}/api/grainbank/web/${this.version}/list/release/order/master`;
    return this.http.post<string>(url, payload).pipe(
      tap((res: any) => {
      }),
      catchError(err => {
        return throwError(err);
      }),
    );
  }
  
  getDeliveryChallanList(payload: any): Observable<string>{
    const url = `${this.grainbankURL}/api/grainbank/web/${this.version}/delivery-challan/list?deliveryOrderId=${payload.deliveryOrderId}&langId=${payload.langId}`;
    return this.http.get<string>(url).pipe(
      tap((res: any) => {
      }),
      catchError(err => {
        return throwError(err);
      }),
    );
  }
  getDeliveryChallanDetails(challanId: any): Observable<string>{
    const url = `${this.grainbankURL}/api/grainbank/web/${this.version}/delivery-challan/addDetails?deliveryOrderId=${challanId}`;
    return this.http.get<string>(url).pipe(
      tap((res: any) => {
      }),
      catchError(err => {
        return throwError(err);
      }),
    );
  }
  viewDeliveryChallanDetails(challanId: any): Observable<string>{
    const url = `${this.grainbankURL}/api/grainbank/web/${this.version}/delivery-challan/viewDetails?deliveryChallanId=${challanId}`;
    // const url = `${this.grainbankURL}/api/grainbank/web/${this.version}/delivery-challan/viewDetails?deliveryChallanId=465`;
    return this.http.get<string>(url).pipe(
      tap((res: any) => {
      }),
      catchError(err => {
        return throwError(err);
      }),
    );
  }

  saveDeliveryChallan(payload: any): Observable<string>{
    const url = `${this.grainbankURL}/api/grainbank/web/${this.version}/delivery-challan/save`;
    return this.http.post<string>(url, payload).pipe(
      tap((res: any) => {
      }),
      catchError(err => {
        return throwError(err);
      }),
    );
  }

  uploadRst(formData:any): Observable<string> {
    const HttpUploadOptions = {
      headers: new HttpHeaders({ 'file-upload': 'upload'}),
      'Content-Type':  'multipart/form-data',
      Accept:'application/json',
    }
    const url = `${this.grainbankURL}/api/grainbank/web/${this.version}/delivery-challan/uploadRst`;
    return this.http.post<string>(url, formData, HttpUploadOptions).pipe(
      tap((res: any) => {
      }),
      catchError(err => {
        return throwError(err);
      }),
    );
  }

  getProducts(): Observable<string> {
    const url = `${this.grainbankURL}/api/master/${this.version}/products/1`;
    return this.http.get<string>(url).pipe(
      tap((res: any) => {}),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  getWarehouse(payload: any): Observable<string> {
    const url = `${this.grainbankURL}/api/farmer/finance/${this.version}/getwarehousenames`;
    return this.http.post<string>(url, payload).pipe(
      tap((res: any) => {
      }),
      catchError(err => {
        return throwError(err);
      }),
    );
  }
}
