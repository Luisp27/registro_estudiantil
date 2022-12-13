import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface Estudiante {
  id: number;
  studentName: string;
  Materias: string;
  Calificaciones: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postEstudiante(data: Estudiante) {
    return this.http.post<Estudiante>("http://localhost:3000/stusentList", data);
  }
  getEstudiantes() {
    return this.http.get<Estudiante[]>("http://localhost:3000/stusentList/");
  }
  putEstudiante(data: Estudiante, id: number) {
    return this.http.put<Estudiante>("http://localhost:3000/stusentList/" + id, data);
  }
  deleteEstudiante(id: number) {
    return this.http.delete<Estudiante>("http://localhost:3000/stusentList/" + id);
  }
}
