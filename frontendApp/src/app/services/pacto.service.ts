import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OnePact, Pact, PactInterface } from '../common/pacto.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PactoService {
  private readonly http:HttpClient = inject(HttpClient);
  constructor() {}

  getPacts(): Observable<PactInterface> {
    return this.http.get<PactInterface>(environment.urlBase + "pactos")
  }
  getPact(id: string): Observable<OnePact> {
    return this.http.get<OnePact>(environment.urlBase + "Pactos/" + "pacto/" + id)
  }
  getPactByName(name: string): Observable<Pact[]> {
    return this.http.get<Pact[]>(environment.urlBase + "pactos/" + "byName?nombre=" + name)
  }
  getPactByTime(time: string): Observable<Pact[]> {
    return this.http.get<Pact[]>(environment.urlBase + "pactos/" + "byTime?epoca=" + time)
  }
}
