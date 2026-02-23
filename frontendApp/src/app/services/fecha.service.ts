import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DateInterface, Fecha, OneDate } from '../common/fecha.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FechaService {
  private readonly http:HttpClient = inject(HttpClient);

  constructor(){}

  getDates(): Observable<DateInterface> {
    return this.http.get<DateInterface>(environment.urlBase + "fechas")
  }
  getDate(id: string): Observable<OneDate> {
    return this.http.get<OneDate>(environment.urlBase + "fechas/" + "fecha/" + id)
  }
  getFilterDates(fecha: string): Observable<Fecha[]> {
    return this.http.get<Fecha[]>(environment.urlBase + "fechas/" + "ByDate?fecha=" + fecha)
  }
  
}
