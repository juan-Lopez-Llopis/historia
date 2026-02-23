import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonList, IonCardTitle, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { EpocaService } from 'src/app/services/epoca.service';
import { ToastService } from 'src/app/services/toast.service';
import { Time, TimeInterface } from 'src/app/common/epoca.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-epocas',
  templateUrl: './epocas.page.html',
  styleUrls: ['./epocas.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonList, IonCardTitle, IonButtons, IonBackButton]
})
export class EpocasPage implements OnInit {
  private readonly router: Router = inject(Router)
  private readonly epocaService: EpocaService = inject(EpocaService);
  private readonly toastService: ToastService = inject(ToastService);

  apiData!: TimeInterface;
  epocas: Time[]= [];

  constructor() { }

  ngOnInit() {
    this.loadEpocas();
  }

  async loadEpocas() {
    this.epocaService.getTimes().subscribe({
      next: value =>{
        this.apiData = value;
        this.epocas = value.data;
      },
      error: err => {
        this.toastService.mostrarToast(err.message, 'danger', 'bottom')
        
      },
      complete: () => this.toastService.mostrarToast('¡Epocas cargadas!', 'success', 'bottom')
    })
  }
  goToDetalle(id: string) {
    this.router.navigate(['/epoca-detalle', id])
  }

}
