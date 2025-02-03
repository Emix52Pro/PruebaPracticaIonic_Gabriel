export interface Comentario {
  id: number;
  comentario: string;
  puntuacion: number;
  userId: number;  // Nuevo campo
  name?: string;   // Mantener opcional por compatibilidad
}