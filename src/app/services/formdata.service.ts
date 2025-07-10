import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../utils/local-storage/local-storage.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export enum APIEndPoint {
  GET_DATA = '/search-ui/formdata',
  GET_DATA_BY_EMAIL = "/search-ui/formdata/details",
  CANDIDATE_SEARCH_USER = '/candidate/public/anonymous-users',
  CANDIDATE_SEARCH_SUPPLIER_USER = '/user/public/supplier-filter/anonymous-users',
  UPDATE_STATUS = '/search-ui/formdata',
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
    params['limit'] = 10000000

    return this.httpClient
      .get<any>(this.baseUrl + APIEndPoint.GET_DATA, {
        params: params
      });
  }

  getFormDetails(id: string): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + APIEndPoint.GET_DATA + '/' + id);
  }

  getFormDetailsByEmail(data: any): Observable<any> {
    const params: any = {};

    if (data?.email) {
      params['email'] = data?.email
    }
    if (data?.formType) {
      params['formType'] = data?.formType
    }

    return this.httpClient
      .get<any>(this.baseUrl + APIEndPoint.GET_DATA_BY_EMAIL, { params: params });
  }

  getCandidateSearchUser(): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + APIEndPoint.CANDIDATE_SEARCH_USER);
  }

  getSupplierSearchUser(): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + APIEndPoint.CANDIDATE_SEARCH_SUPPLIER_USER);
  }

  getSupplierFilterList(id: string): Observable<any> {
    let params = new HttpParams();
    if (id) {
      params = new HttpParams().set('anonymousUserId', id);
    }
    return this.httpClient.get(`${this.baseUrl}/user/public/supplier-filter/list`, { params });
  }

  getCandidateFilters(id: string): Observable<any> {
    let params = new HttpParams();
    if (id) {
      params = new HttpParams().set('anonymousUserId', id);
    }
    return this.httpClient.get(`${this.baseUrl}/candidate/public/filter-list`, { params });
  }

  updateSubmissionStatus(submissionId: string, payload: any): Observable<any> {
    return this.httpClient.patch<any>(
      `${this.baseUrl}${APIEndPoint.UPDATE_STATUS}/${submissionId}/status`,
      payload
    );
  }
}
