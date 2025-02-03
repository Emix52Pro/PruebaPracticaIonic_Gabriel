// src/app/pages/modificarlugar/modificarlugar.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonButton,
  IonInput,
  IonBackButton,
  IonButtons
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Lugar } from 'src/app/models/Lugar';
import { LugaresService } from 'src/app/service/lugares.service';

@Component({
  selector: 'app-modificarlugar',
  templateUrl: './modificarlugar.page.html',
  styleUrls: ['./modificarlugar.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonButton,
    IonInput,
    IonBackButton,
    IonButtons,
    RouterLink,
    CommonModule,
    FormsModule
  ]
})
export class ModificarlugarPage implements OnInit {
  lugar?: Lugar;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lugaresService: LugaresService
  ) { }

  ngOnInit() {
    const lugarIdParam = this.route.snapshot.paramMap.get('id');
    if (lugarIdParam !== null) {
      const lugarId = +lugarIdParam;
      this.lugaresService.getLugar(lugarId).subscribe({
        next: (lugar) => {
          this.lugar = lugar;
        },
        error: (error) => {
          console.error('Error al cargar el lugar:', error);
        }
      });
    } else {
      console.error('El parámetro ID es nulo');
    }
  }

  guardarCambios() {
    if (this.lugar) {
      this.lugaresService.updateLugar(this.lugar).subscribe({
        next: (updatedLugar) => {
          this.lugaresService.lugarActualizado.next(updatedLugar);
          this.router.navigate(['/detallelugar', updatedLugar.id]);
        },
        error: (err) => console.error('Error al actualizar el lugar', err)
      });
    }
  }
  
}
