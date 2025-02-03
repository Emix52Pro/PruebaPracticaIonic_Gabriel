import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Lugar } from '../models/Lugar';

@Injectable({
  providedIn: 'root'
})
export class LugaresService {
  // URL base de tu API (ajusta el puerto y ruta según tu backend)
  private apiUrl = 'http://localhost:3000/api/lugares';

  // Para emitir actualizaciones, si lo necesitas
  public lugarActualizado = new Subject<Lugar | null>();
  lugarActualizado$ = this.lugarActualizado.asObservable();

  constructor(private http: HttpClient) {}

  // Obtiene la lista de lugares (incluyendo el promedio_rating calculado en el backend)
  getLugares(): Observable<Lugar[]> {
    return this.http.get<Lugar[]>(this.apiUrl);
  }

  // Obtiene un lugar por su id
  getLugar(id: number): Observable<Lugar> {
    return this.http.get<Lugar>(`${this.apiUrl}/${id}`);
  }

  // Agrega un nuevo lugar (solo accesible para admin)
  addLugar(lugar: { titulo: string; imagen: string }): Observable<Lugar> {
    return this.http.post<Lugar>(this.apiUrl, lugar);
  }

  // Actualiza un lugar (solo accesible para admin)
  updateLugar(lugar: Lugar): Observable<Lugar> {
    return this.http.put<Lugar>(`${this.apiUrl}/${lugar.id}`, lugar);
  }
  

  // Elimina un lugar (solo accesible para admin)
  deleteLugar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
