export interface Comentario {
    id?: number;         // Opcional, en caso de que venga del backend
    name: string;
    comentario: string;
    puntuacion: number;  // Valor entre 1 y 5
  }
  