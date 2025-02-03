import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  username: string;
  role: string;
  profile_picture?: string;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Ajusta la URL de acuerdo a tu backend
  private apiUrl = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) {}

  // Obtiene la lista de usuarios
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Crea un nuevo usuario (solo admin)
  createUser(user: { username: string; password: string; role: string; profilePicture?: string; estado?: string }): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // Actualiza un usuario (solo admin)
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
  }
}
