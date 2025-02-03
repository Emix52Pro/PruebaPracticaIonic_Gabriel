// src/app/pages/register/register.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonItem, IonLabel } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { LoadingComponent } from 'src/app/Componentes/loading/loading.component';
import { AlertController } from '@ionic/angular/standalone';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
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
    CommonModule,
    FormsModule,
    RouterLink,
    LoadingComponent
  ]
})
export class RegisterPage {
  user = { username: '', password: '', profilePicture: '' };
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private alertController: AlertController
  ) {}

  register() {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.authService.register(this.user).subscribe({
      next: (response) => {
        this.successMessage = 'Registro exitoso. Ahora puedes iniciar sesión.';
        this.isLoading = false;
      },
      error: async (err) => {
        this.isLoading = false;
        const alert = await this.alertController.create({
          header: 'Error de Registro',
          message: 'El nombre de usuario ya está en uso. Por favor, elige otro nombre.',
          buttons: ['Entendido']
        });
        await alert.present();
        this.errorMessage = 'Usuario ya existente';
      }
    });
  }
}