import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private readonly storageService: StorageService) {
  }

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const jwtToken = this.storageService.get('token');

    request.clone({
      setHeaders: {
        Authorization: jwtToken ? `Bearer ${jwtToken}` : '',
      },
    });
    return next.handle(request);
  }
}
