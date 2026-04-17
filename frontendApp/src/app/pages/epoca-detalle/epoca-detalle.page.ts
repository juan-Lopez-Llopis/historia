import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCard, IonCardTitle, IonCardContent, IonImg } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { EpocaService } from 'src/app/services/epoca.service';
import { ToastService } from 'src/app/services/toast.service';
import { Etapa, OneTime, Time, TimeInterface } from 'src/app/common/epoca.interface';

@Component({
  selector: 'app-epoca-detalle',
  templateUrl: './epoca-detalle.page.html',
  styleUrls: ['./epoca-detalle.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonCard, IonCardTitle, IonCardContent, IonImg]
})
export class EpocaDetallePage implements OnInit {

  private  route = inject(ActivatedRoute);
  private readonly epocaService: EpocaService =  inject(EpocaService);
  private readonly toastService: ToastService = inject(ToastService);

  id!: string;
  apiData!: OneTime;
  epoca!: Time;
  etapas: Etapa [] = [];

  constructor() { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.loadTime();
    
  }
  async loadTime() {
    this.epocaService.getTime(this.id).subscribe({
      next: value => {
        this.apiData = value;
        this.epoca = value.data;
        this.etapas = value.data.etapa
        

      },
      error: err => {
        this.toastService.mostrarToast(err.message, 'danger', 'bottom')
      },
      complete: () => this.toastService.mostrarToast('¡Epoca cargada!', 'success', 'bottom')
    })

  
  }


}
