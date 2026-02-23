 import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Battle, BattleInterface, OneBattle } from '../common/batalla.interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BatallaService {
  private readonly http:HttpClient = inject(HttpClient);
  constructor() {}

  getBattles(): Observable<BattleInterface> {
    return this.http.get<BattleInterface>(environment.urlBase + "batallas" )
  }
  getBattle(id: string): Observable<OneBattle> {
    return this.http.get<OneBattle>(environment.urlBase + "batallas/" + "batalla/" + id)
  }
  getBattleByName(name: string): Observable<Battle[]> {
    return this.http.get<Battle[]>(environment.urlBase + "batallas/" + "byName?nombre=" + name)
  }
  getBattleByDate(fecha: string): Observable<Battle[]> {
    return this.http.get<Battle[]>(environment.urlBase + "batallas/" + "byDate?fecha=" + fecha)
  }
  getBattleByLocation(location: string): Observable<Battle[]> {
    return this.http.get<Battle[]>(environment.urlBase + "batallas/" + "byLocation?lugar=" + location)
  }
  getBattleByTime(time: string): Observable<Battle[]> {
    return this.http.get<Battle[]>(environment.urlBase + "batallas/" + "byTime?epoca=" + time)
  }
}
