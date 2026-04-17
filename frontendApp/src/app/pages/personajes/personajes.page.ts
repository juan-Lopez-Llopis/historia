import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonList, IonItem, IonAvatar, IonImg, IonLabel, IonText, IonSearchbar, IonInfiniteScroll, IonInfiniteScrollContent, InfiniteScrollCustomEvent } from '@ionic/angular/standalone';
import { PersonajeService } from 'src/app/services/personaje.service';
import { Router} from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { Character, CharacterInterface } from 'src/app/common/personaje.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.page.html',
  styleUrls: ['./personajes.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonList, IonItem, IonAvatar, IonImg, IonLabel, IonText, IonSearchbar, IonInfiniteScroll, IonInfiniteScrollContent, RouterLink]
})
export class PersonajesPage implements OnInit {

  private readonly router: Router = inject(Router);
  private readonly personajeService: PersonajeService = inject(PersonajeService);
  private readonly toastService: ToastService = inject (ToastService);

  apiData!: CharacterInterface;
  character: Character[] = [];
  characterVisible: Character[] = [];
  buscarCharacter = "";

  constructor() { }

  ngOnInit() {
    this.loadCharacter();
  }

  async loadCharacter() {
    this.personajeService.getCharacters().subscribe({
      next: value => {
        this.apiData = value;
        this.character = value.data;
        this.characterVisible = this.character.splice(0,10);
      },
      error: err => {
        this.toastService.mostrarToast(err.message, 'danger', 'bottom')
      },
      complete: () => this.toastService.mostrarToast('¡Personajes cargados!','success', 'bottom')
    })
  }

  buscar(event: any) {
    const res = event.detail.value.toLowerCase();
    this.buscarCharacter = res;
    console.log(event)

    if (res != '') {
      this.personajeService.getCharacterByName(res).subscribe({
        next: value => {
          console.log(value)
          this.character = value;
          this.characterVisible = [...this.character]
        },
        error: err => {
          this.toastService.mostrarToast(err.message, 'danger', 'bottom')
        },
        complete: () => this.toastService.mostrarToast('¡Personaje encontrado!', 'success', 'bottom')
      })
    }else {
      this.loadCharacter();
    }
      
    }
    loadMore(event:InfiniteScrollCustomEvent) {
      setTimeout(() => {
        
        if (this.character.length <=5) {
          this.characterVisible.push(...this.character);
          this.character = [];
          event.target.disabled = true;
        }else {
          this.characterVisible.push(...this.character.splice(0,5))
        }
        event.target.complete();
      },500)
    }


}
