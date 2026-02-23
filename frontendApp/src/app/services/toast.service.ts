import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly toastCtrl: ToastController = inject(ToastController);

  constructor(){}

  async mostrarToast(message: string, color: string, position: 'middle'|'bottom'|'top'| undefined){
    const toast = await this.toastCtrl.create({
      message,
      color,
      position,
      duration: 2000
    });
    await toast.present();
  }
  
}
