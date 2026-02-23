import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character, CharacterInterface, OneCharacter } from '../common/personaje.interface';
import { environment } from 'src/environments/environment';
import { SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class PersonajeService {
  private readonly http:HttpClient = inject(HttpClient);
  constructor() {}

  getCharacters(): Observable<CharacterInterface> {
    return this.http.get<CharacterInterface>(environment.urlBase + "personajes")
  }
  getCharacter(id: string): Observable<OneCharacter> {
    return this.http.get<OneCharacter>(environment.urlBase + "personajes/" + "personaje/" + id)
  }
  getCharacterByName(name: string): Observable<Character[]> {
    return this.http.get<Character[]>(environment.urlBase + "personajes/" + "byName?nombre=" + name)
  }
  getCharacterByTime(time: string): Observable<Character[]> {
    return this.http.get<Character[]>(environment.urlBase + "personajes/" + "byTime?epoca=" + time)
  }
}
