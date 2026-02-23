import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCard, IonCardTitle, IonImg } from '@ionic/angular/standalone';
import { PersonajeService } from 'src/app/services/personaje.service';
import { Character, OneCharacter } from 'src/app/common/personaje.interface';
import { ToastService } from 'src/app/services/toast.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-personaje-detalle',
  templateUrl: './personaje-detalle.page.html',
  styleUrls: ['./personaje-detalle.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonCard, IonCardTitle, IonImg]
})
export class PersonajeDetallePage implements OnInit {
  private route = inject(ActivatedRoute);
  private readonly personajeService: PersonajeService = inject(PersonajeService);
  private readonly toastService: ToastService = inject(ToastService);
  id!:string;
  apiData!: OneCharacter
  character!: Character

  constructor() { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.loadCharacter();
  }
  async loadCharacter() {
    this.personajeService.getCharacter(this.id).subscribe({
      next: value => {
        this.apiData = value;
        this.character = value.data;
      },
      error: err => {
        this.toastService.mostrarToast(err.message, 'danger', 'bottom')
      },
      complete: () => this.toastService.mostrarToast('¡Personaje cargado!', 'success', 'bottom')
    })
  }

}
