// src/app/service/comentarios.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comentario } from '../models/Comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  // URL base para la API
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los comentarios para un lugar dado.
   * Ejemplo de endpoint: GET http://localhost:3000/api/lugares/1/comentarios
   */
  getComentarios(lugarId: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.apiUrl}/lugares/${lugarId}/comentarios`);
  }

  /**
   * (Opcional) Obtiene un comentario por su ID.
   * Ejemplo de endpoint: GET http://localhost:3000/api/comentarios/5
   */
  getComentario(id: number): Observable<Comentario> {
    return this.http.get<Comentario>(`${this.apiUrl}/comentarios/${id}`);
  }

  /**
   * Agrega un comentario para un lugar.
   * Se envía un objeto que incluye el nombre del comentarista, el texto del comentario y la puntuación.
   * Ejemplo de endpoint: POST http://localhost:3000/api/lugares/1/comentarios
   */
  addComentario(lugarId: number, comentario: { 
    comentario: string; 
    puntuacion: number 
  }): Observable<Comentario> {
    // Dejar que el backend obtenga el usuario del token
    return this.http.post<Comentario>(
      `${this.apiUrl}/lugares/${lugarId}/comentarios`, 
      comentario // Eliminar el name del payload
    );
  }

  /**
   * Actualiza un comentario existente.
   * Se envía un objeto con el nuevo texto del comentario y/o la nueva puntuación.
   * Ejemplo de endpoint: PUT http://localhost:3000/api/comentarios/5
   */
  updateComentario(id: number, comentario: { comentario: string; puntuacion: number }): Observable<Comentario> {
    return this.http.put<Comentario>(`${this.apiUrl}/comentarios/${id}`, comentario);
  }

  /**
   * Elimina un comentario.
   * Ejemplo de endpoint: DELETE http://localhost:3000/api/comentarios/5
   */
  deleteComentario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/comentarios/${id}`);
  }
}
