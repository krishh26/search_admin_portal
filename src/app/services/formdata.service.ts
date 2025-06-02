import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../utils/local-storage/local-storage.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export enum APIEndPoint {
  GET_DATA = '/search-ui/formdata',
}

@Injectable({
  providedIn: 'root'
})
export class FormdataService {
  baseUrl!: string;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.baseUrl = environment.baseUrl;
  }

  getFormData(formType?: string): Observable<any> {
    const params: any = {};

    if (formType) {
      params['formType'] = formType
    }

    return this.httpClient
      .get<any>(this.baseUrl + APIEndPoint.GET_DATA, {
        params: params
      });
  }

  getFormDetails(id: string): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + APIEndPoint.GET_DATA + '/' + id);
  }
}
