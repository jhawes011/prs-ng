import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Request } from '../model/request';
const URL = 'http://localhost:8080/api/requests';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) {}
  list(): Observable<Request[]> {
    return this.http.get(URL + '/') as Observable<Request[]>;
  }
  add(request: Request): Observable<Request> {
    return this.http.post(URL, request) as Observable<Request>;
  }
  getById(id: number): Observable<Request> {
    return this.http.get(URL + '/' + id) as Observable<Request>;
  }
  update(request: Request): Observable<Request> {
    return this.http.put(
      URL + '/' + request.id,
      request
    ) as Observable<Request>;
  }
  delete(id: number): Observable<any> {
    return this.http.delete(URL + '/' + id) as Observable<Request>;
  }
}
