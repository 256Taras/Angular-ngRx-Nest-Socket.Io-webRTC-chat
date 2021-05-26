import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {of} from 'rxjs/internal/observable/of';
import {map, tap} from "rxjs/operators";
import {SingUpRequestInterface} from "../interfaces/sing-up-request.interface";

@Injectable()
export class AuthService {

  constructor(
    private readonly http: HttpClient,
    @Inject('BASE-URL') private readonly baseUrl: string
  ) {
  }


  public singIn() {

  }

  public SingUp(candidate):Observable<SingUpRequestInterface> {
    return this.http.post<any>(`${this.baseUrl}/auth/sing-up`,{...candidate}).pipe(
      tap((v)=>{
        console.log("AuthService",v)
      })
    )
  }

  public sendSms(phone: string): Observable<{ smsEndowed: true }> {
    return this.http.post<{ smsEndowed: true }>(`${this.baseUrl}/auth/send-sms`, {phone})
  }

  public CheckCode(code: number,phone:string): Observable<{ confirmed: boolean }> {
    console.log("ене викликали два рази")
    return this.http.post<{ confirmed: boolean }>(`${this.baseUrl}/auth/check-code`, {code,phone})
  }
}
