// src/app/pages/login/login.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonItem, IonLabel, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { LoadingComponent } from 'src/app/Componentes/loading/loading.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonInput,
    IonItem,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
    CommonModule,
    FormsModule,
    RouterLink,
    LoadingComponent
  ]
})
export class LoginPage {
  credentials = { username: '', password: '' };
  isLoading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.isLoading = true;
    this.errorMessage = '';
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        // Almacenar el token (por ejemplo, en localStorage)
        localStorage.setItem('token', response.token);
        // Navegar a la página de lugares
        this.router.navigate(['/lugares']);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error durante el login', err);
        this.errorMessage = 'Credenciales incorrectas';
        this.isLoading = false;
      }
    });
  }
}
