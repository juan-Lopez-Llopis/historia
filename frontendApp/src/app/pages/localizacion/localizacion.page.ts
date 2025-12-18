import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-localizacion',
  templateUrl: './localizacion.page.html',
  styleUrls: ['./localizacion.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class LocalizacionPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
