import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-epoca-detalle',
  templateUrl: './epoca-detalle.page.html',
  styleUrls: ['./epoca-detalle.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EpocaDetallePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
