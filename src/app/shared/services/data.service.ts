import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { AccessDeniedError } from '../errors/access-denied-error';
import { AppError } from '../errors/app-error';
import { BadInputError } from '../errors/bad-input-error';
import { InternalServerError } from '../errors/internal-server-error';
import { NotFoundError } from '../errors/not-found-error';
import { UnauthorizedError } from '../errors/unauthorized-error';
import { API_URL } from '../tokens';

/**
 * Ref:
 * https://nichola.dev/generic-approach-to-consume-rest-api/
 * https://betterprogramming.pub/a-generic-http-service-approach-for-angular-applications-a7bd8ff6a068
 * https://github.com/PauloRicardoKC/angular-generic-httpClient/blob/master/src/app/services/base-service.service.ts
 */
@Injectable()
export class DataService<T> {
  constructor(@Inject(API_URL) private url: string, private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getAll(params?: any): Observable<T[]> {
    return this.http.get<T[]>(this.url).pipe(
      map((data: any) => this.convertData(data)),
      catchError(this.handleError)
    );
  }

  create(resource: T): Observable<T> {
    return this.http
      .post<T>(this.url, this.toServerModel(resource), this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  update(id: string | number, resource: T): Observable<T> {
    return this.http
      .put<T>(
        `${this.url}/${id}`,
        this.toServerModel(resource),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  get(id: string | number): Observable<T> {
    return this.http.get<T>(`${this.url}/${id}`).pipe(
      map((data: any) => this.fromServerModel(data)),
      catchError(this.handleError)
    );
  }

  delete(id: string | number): Observable<boolean> | any {
    /*  return throwError(
      new UnauthorizedError(new Error('Unauthorized to delete Error'))
    ); */
    return this.http.delete(`${this.url}/${id}`, this.httpOptions).pipe(
      map((data: any) => data),
      retry(3), //Retry failed request up to 3  times
      catchError(this.handleError)
    );
  }

  /**
   * Overridable method
   * @param json - data from server
   * @returns - object of type T
   */
  protected fromServerModel(json: any): T {
    return json;
  }

  /**
   * Overridable method
   * @param entity - object of type T
   * @returns - any
   */
  protected toServerModel(entity: T): any {
    return JSON.stringify(entity);
  }

  /**
   * Converts array items to items of type T
   * @param data - array of any
   * @returns - array of type T
   */
  private convertData(data: any[]): T[] {
    return data.map((item) => this.fromServerModel(item));
  }

  private handleError(error: HttpErrorResponse) {
    switch (error.status) {
      case 400: {
        //Bad Request
        return throwError(new BadInputError(error));
      }
      case 401: {
        //Unauthorized
        return throwError(new UnauthorizedError(error));
      }
      case 403: {
        //Forbidden
        return throwError(new AccessDeniedError(error));
      }
      case 404: {
        //Not Found
        return throwError(new NotFoundError(error));
      }
      case 500: {
        //Internal Server
        return throwError(new InternalServerError(error));
      }
      default: {
        //Unknown Server
        return throwError(new AppError(new Error('Server Error')));
      }
    }
  }
}
