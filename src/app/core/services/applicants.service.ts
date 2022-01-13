import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { DataService } from 'src/app/shared/services/data.service';

import { Applicant } from '../../core/models/applicant';

@Injectable({
  providedIn: 'root',
})
export class ApplicantsService extends DataService<Applicant> {
  constructor(http: HttpClient) {
    super(`http://localhost:3000/api/applicants`, http);
  }

  /* getAll(params?: any): Observable<Applicant[]> {
    if (params) console.log(params, this.getParams(params));
    console.log(this.objectToHttpParams(params));
    return this.http
      .get(`http://localhost:3000/api/applicants`, params)
      .pipe(
        map((data: any) => data.map((item: any) => this.fromServerModel(item)))
      );
  } */

  protected fromServerModel(json: Partial<Applicant>): Applicant {
    return new Applicant(json);
  }

  private getParams(params: {
    columns: Array<any>;
    draw: number;
    length: number;
    order: Array<{ column: number; dir: string }>;
    search: { regex: boolean; value: string };
    start: number;
  }) {
    return params
      ? `?orderby=${params.columns[params.order[0].column].data}&dir=${
          params.order[0].dir
        }&start=${params.start}&size=${params.length}&regex=${
          params.search.regex
        }&search=${params.search.value}`
      : '';
  }

  private objectToHttpParams(obj: any) {
    return Object.entries(obj || {}).reduce((params, [key, value]) => {
      return params.set(key, JSON.stringify(value));
    }, new HttpParams());
  }
}
