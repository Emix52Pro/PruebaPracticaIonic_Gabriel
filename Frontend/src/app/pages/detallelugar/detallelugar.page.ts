import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  AlertController,
  IonItem,
  IonCard,
  IonLabel,
  IonFab,
  IonFabButton,
  IonIcon,
  IonButton,
  IonBackButton,
  IonButtons,
  IonAvatar,
  IonCardHeader,
  IonCardTitle
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Comentario, Lugar } from 'src/app/models/Lugar';
import { LugaresService } from 'src/app/service/lugares.service';
import { ComentariosService } from 'src/app/service/comentarios.service';
import { addIcons } from 'ionicons';
import {
  chatbubblesOutline,
  closeCircleOutline,
  createOutline,
  pencilOutline,
  star,
  starHalf,
  starOutline
} from 'ionicons/icons';
import { LoadingComponent } from 'src/app/Componentes/loading/loading.component';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-detallelugar',
  templateUrl: './detallelugar.page.html',
  styleUrls: ['./detallelugar.page.scss'],
  standalone: true,
  imports: [
    IonButtons,
    IonBackButton,
    IonButton,
    IonIcon,
    IonFabButton,
    IonFab,
    IonLabel,
    IonItem,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonAvatar,
    IonCardHeader,
    IonCardTitle,
    IonCard,
    CommonModule,
    FormsModule,
    RouterLink,
    LoadingComponent
  ]
})
export class DetallelugarPage implements OnInit, OnDestroy {
  lugar?: Lugar;
  isLoading = true;
  private lugarSubscription?: Subscription;
  private lugarUpdateSubscription?: Subscription;
  currentUser: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lugaresService: LugaresService,
    private comentariosService: ComentariosService,
    private alertController: AlertController,
    private authService: AuthService
  ) {
    addIcons({ pencilOutline, closeCircleOutline, chatbubblesOutline, createOutline });
    const current = this.authService.getCurrentUser();
    this.currentUser = current ? current.username : null;
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  ngOnInit() {
    this.loadData();
    
    // Nueva suscripción para actualizaciones en tiempo real

    this.lugarUpdateSubscription = this.lugaresService.lugarActualizado$.subscribe(
      (updatedLugar) => {
        if (updatedLugar && this.lugar?.id === updatedLugar.id) {
          this.loadData(); // Recarga lugar + comentarios
        }
      }
    );
  }

  private loadData() {
    this.isLoading = true;
    const lugarIdParam = this.route.snapshot.paramMap.get('id');
    if (lugarIdParam !== null) {
      const lugarId = +lugarIdParam;
      this.lugaresService.getLugar(lugarId).subscribe({
        next: (data) => {
          this.lugar = data;
          this.comentariosService.getComentarios(lugarId).subscribe({
            next: (comentarios) => {
              this.lugar!.comentarios = comentarios;
              this.isLoading = false;
            },
            error: (err) => {
              console.error('Error al cargar los comentarios', err);
              this.isLoading = false;
            }
          });
        },
        error: (err) => {
          console.error('Error al cargar el lugar', err);
          this.isLoading = false;
        }
      });
    }
  }
  

  async mostrarFormularioComentario() {
    const alert = await this.alertController.create({
      header: 'Agregar Comentario',
      inputs: [
        {
          name: 'comentario',
          type: 'text',
          placeholder: 'Comentario'
        },
        {
          name: 'puntuacion',
          type: 'number',
          placeholder: 'Puntuación (1-5)',
          min: 1,
          max: 5,
          value: 5
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Agregar',
          handler: (data) => {
            // Asegúrate de pasar el nombre del usuario actual
            this.agregarComentario(this.currentUser || 'Anónimo', data.comentario, +data.puntuacion);
          }
        }
      ]
    });
    await alert.present();
  }

  /**
   * Agrega un comentario y actualiza la lista local inmediatamente.
   * Se preserva el nombre y (si se tiene) la foto de perfil del comentario,
   * en caso de que el backend no las devuelva.
   */
  agregarComentario(username: string, comentarioText: string, puntuacion: number) {
    if (!this.lugar) return;
    if (!comentarioText) return;
    if (puntuacion < 1 || puntuacion > 5) return;
  
    const comentarioData = {
      name: username, // Asegúrate de enviar el nombre del usuario actual
      comentario: comentarioText,
      puntuacion: puntuacion
    };
  
    this.comentariosService.addComentario(this.lugar.id, comentarioData)
      .subscribe({
        next: (nuevoComentario) => {
          // Si el backend no devuelve el "name", se preserva el nombre enviado
          if (!nuevoComentario.name) {
            nuevoComentario.name = username;
          }
          if (!this.lugar!.comentarios) {
            this.lugar!.comentarios = [];
          }
          this.lugar!.comentarios.push(nuevoComentario);
        },
        error: (err) => {
          console.error('Error al agregar comentario:', err);
        }
      });
  }
  async editarComentario(comentario: any) {
    // Permitir editar solo si es admin o si el comentario pertenece al usuario actual
    if (!this.canEditComment(comentario)) return;

    const alert = await this.alertController.create({
      header: 'Editar Comentario',
      inputs: [
        {
          name: 'comentario',
          type: 'text',
          value: comentario.comentario,
          placeholder: 'Comentario'
        },
        {
          name: 'puntuacion',
          type: 'number',
          min: 1,
          max: 5,
          value: comentario.puntuacion
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: (data) => {
            this.comentariosService.updateComentario(comentario.id, {
              comentario: data.comentario,
              puntuacion: data.puntuacion
            }).subscribe({
              next: (updatedComment) => {
                // Fusionar los datos: conservar nombre y cualquier otro campo no editado
                const mergedComment = { ...comentario, ...updatedComment };
                const index = this.lugar!.comentarios!.findIndex(c => c.id === comentario.id);
                if (index !== -1) {
                  this.lugar!.comentarios![index] = mergedComment;
                }
              },
              error: (err) => {
                console.error('Error al actualizar comentario:', err);
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async eliminarComentario(comentario: any) {
    // Permitir eliminar solo si es admin o si el comentario pertenece al usuario actual
    if (!this.canEditComment(comentario)) return;

    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que deseas eliminar este comentario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.comentariosService.deleteComentario(comentario.id).subscribe({
              next: () => {
                const index = this.lugar!.comentarios!.findIndex(c => c.id === comentario.id);
                if (index !== -1) {
                  this.lugar!.comentarios!.splice(index, 1);
                }
              },
              error: (err) => {
                console.error('Error al eliminar comentario:', err);
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }

  canEditComment(comentario: Comentario): boolean {
    // Admin siempre puede editar
    if (this.isAdmin) return true;
    
    // Usuario normal solo si es dueño del comentario
    const currentUser = this.authService.getCurrentUser();
    return currentUser?.id === comentario.userId;
  }
  async confirmarEliminacion() {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que deseas eliminar este lugar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.eliminarLugar();
          }
        }
      ]
    });
    await alert.present();
  }

  eliminarLugar() {
    if (this.lugar) {
      this.lugaresService.deleteLugar(this.lugar.id).subscribe({
        next: () => {
          this.router.navigate(['/lugares']);
        },
        error: (err) => console.error('Error al eliminar lugar', err)
      });
    }
  }

  ngOnDestroy() {
    this.lugarSubscription?.unsubscribe();
  }

  /**
   * Devuelve un arreglo de íconos para representar la calificación.
   */
  getStarIcons(rating: number): any[] {
    const icons: any[] = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        icons.push(star);
      } else if (rating >= i - 0.5) {
        icons.push(starHalf);
      } else {
        icons.push(starOutline);
      }
    }
    return icons;
  }
}
