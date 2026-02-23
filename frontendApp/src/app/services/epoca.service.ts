import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OneTime, Time, TimeInterface } from '../common/epoca.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EpocaService {
  private readonly http:HttpClient = inject(HttpClient);

  constructor() {}

  getTimes(): Observable<TimeInterface> {
    return this.http.get<TimeInterface>(environment.urlBase + "epocas")
  }
  getTime(id: string): Observable<OneTime> {
    return this.http.get<OneTime>(environment.urlBase + "epocas/" + "epoca/" + id)
  }
  getFilterTimes(name: string): Observable<Time[]> {
    return this.http.get<Time[]>(environment.urlBase + "epocas/" + "byName?nombre=" + name)
  }
}
