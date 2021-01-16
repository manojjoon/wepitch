import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { LoginModel } from 'src/app/models/auth/login.model';
import { AppServiceUrl } from 'src/app/enum/app-service-url.type';

@Injectable()

export class LoginService {

    constructor(public http: HttpClient) {
    }

    login(loginModel: LoginModel) {
        debugger;
        return this.http.post(`${environment.baseUrl}${AppServiceUrl.login}`, loginModel).pipe(
            map(res => res)
        );
    }
}
