import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-selector-quiz',
  templateUrl: './selector-quiz.page.html',
  styleUrls: ['./selector-quiz.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SelectorQuizPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
