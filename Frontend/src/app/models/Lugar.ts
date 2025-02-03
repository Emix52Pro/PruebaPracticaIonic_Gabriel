import { Comentario } from "./Comentario";
export interface Lugar {
  id: number;
  titulo: string;
  imagen: string;
  comentarios?: Comentario[]; // Opcional si el backend los incluye o no
  promedio_rating?: number;   // El backend calculará el promedio de estrellas
}

export { Comentario };