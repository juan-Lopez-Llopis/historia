import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardTitle, IonItem, IonRange, IonButton, IonRow, IonCol } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Time } from 'src/app/common/epoca.interface';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonRange, IonButton, IonRow, IonCol]
})
export class PrincipalPage implements OnInit {
  epoca: Time[] = [];

  secciones =[
    {label: 'Épocas', route: '/epocas'},
    {label: 'Personajes', route: '/personajes'},
    {label: 'Fechas', route:'/fechas'},
    {label: 'Localización', route:'/localización'},
    {label: 'Quiz', route:'/quiz'}
  ]

  epocas = [
    {anyo: '1500 a.c',epoca:'Prehistoria', mapa: 'assets/imagenes/Mapa 1.jpg'},
    {anyo: 'siglo XII al siglo I a.c',epoca: 'Edad antigua', mapa: 'assets/imagenes/Mapa 2.png'},
    {anyo: '300 d.c',epoca:'Edad antigua', mapa: 'assets/imagenes/Mapa 3.jpg'},
    {anyo: '573 d.c',epoca:'Edad antigua', mapa: 'assets/imagenes/Mapa 4.jpg'},
    {anyo: '1002 d.c',epoca: 'Edad media', mapa: 'assets/imagenes/Mapa 5.jpg'},
    {anyo: 'siglo XII d.c',epoca: 'Edad media', mapa: 'assets/imagenes/Mapa 6.jpg'},
    {anyo: 'siglo XIII d.c',epoca: 'Edad media', mapa: 'assets/imagenes/Mapa 7.jpg'},
    {anyo: 'siglo XV d.c',epoca: 'Edad media', mapa: 'assets/imagenes/Mapa 8.jpg'},
    {anyo: 'actualidad',epoca: 'Edad contemporanea', mapa: 'assets/imagenes/Mapa 10.webp'}
  ]

  indiceActual = 0;

  constructor(private router: Router) { }

  ngOnInit() {
  }
navegar(ruta: string) {
  this.router.navigate([ruta])
}
}
