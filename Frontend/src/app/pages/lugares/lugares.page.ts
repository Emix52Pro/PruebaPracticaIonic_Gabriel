import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonFabButton,
  IonGrid,
  IonRow,
  IonCol,
  IonCardHeader,
  IonCard,
  IonLabel,
  IonCardTitle,
  IonFab
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Lugar } from 'src/app/models/Lugar';
import { LugaresService } from 'src/app/service/lugares.service';
import { ModalController } from '@ionic/angular/standalone';
import { addOutline, airplane, globe } from 'ionicons/icons';
import { star, starHalf, starOutline } from 'ionicons/icons';
import { LoadingComponent } from 'src/app/Componentes/loading/loading.component';
import { AgregarlugarPage } from '../agregarlugar/agregarlugar.page';
import { AuthService } from 'src/app/service/auth.service';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.page.html',
  styleUrls: ['./lugares.page.scss'],
  standalone: true,
  imports: [
    IonFab,
    IonFabButton,
    IonIcon,
    IonContent,
    IonHeader,
    IonTitle,
    IonGrid,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonRow,
    IonCol,
    IonToolbar,
    IonButtons,
    IonButton,
    IonLabel,
    CommonModule,
    FormsModule,
    LoadingComponent
  ]
})
export class LugaresPage implements OnInit, OnDestroy {
  lugares: Lugar[] = [];
  isLoading = true;
  private lugarSubscription?: Subscription;

  constructor(
    private router: Router, 
    private lugaresService: LugaresService,
    private modalCtrl: ModalController,
    private authService: AuthService
  ) {
    addIcons({ addOutline, airplane, globe, star, starHalf, starOutline });
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  ngOnInit() {
    this.loadData();
    this.lugarSubscription = this.lugaresService.lugarActualizado$.subscribe(
      (lugar: Lugar | null) => {
        if (lugar === null) {
          this.loadData(); // Recargar todos los lugares si es necesario
        } else {
          const index = this.lugares.findIndex(l => l.id === lugar.id);
          if (index !== -1) {
            // Recargar el lugar específico para obtener el promedio actualizado
            this.lugaresService.getLugar(lugar.id).subscribe({
              next: (updatedLugar) => {
                this.lugares[index] = updatedLugar; // Actualizar con datos frescos
              },
              error: (err) => console.error('Error al recargar el lugar', err)
            });
          } else {
            this.lugares.push(lugar); // Añadir nuevo lugar si no existe
          }
        }
      }
    );
  }

  private loadData() {
    this.isLoading = true;
    this.lugaresService.getLugares().subscribe({
      next: (data) => {
        this.lugares = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al obtener los lugares', error);
        this.isLoading = false;
      }
    });
  }

  async abrirModal() {
    const modal = await this.modalCtrl.create({
      component: AgregarlugarPage
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.lugaresService.addLugar(data.data).subscribe({
          next: (nuevoLugar) => {
            this.lugares.push(nuevoLugar);
          },
          error: (err) => console.error('Error al agregar lugar', err)
        });
      }
    });

    return await modal.present();
  }

  verDetalle(id: number) {
    this.router.navigate(['/detallelugar', id]);
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error during logout:', err);
      }
    });
  }

  ngOnDestroy() {
    this.lugarSubscription?.unsubscribe();
  }

  /**
   * Devuelve un arreglo de íconos para representar el promedio de calificación.
   */
  getStarIcons(promedio: number): any[] {
    const icons: any[] = [];
    for (let i = 1; i <= 5; i++) {
      if (promedio >= i) {
        icons.push(star);
      } else if (promedio >= i - 0.5) {
        icons.push(starHalf);
      } else {
        icons.push(starOutline);
      }
    }
    return icons;
  }
}