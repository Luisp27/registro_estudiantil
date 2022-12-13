import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface IStudent {
  id: number;
  fullName: string;
  subjects: string;
  grades: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postStudent(data: IStudent) {
    return this.http.post<IStudent>("http://localhost:4000/studentsList", data);
  }
  getStudent(id: number) {
    return this.http.get<IStudent>("http://localhost:4000/studentsList/" + id);
  }
  getStudents() {
    return this.http.get<IStudent[]>("http://localhost:4000/studentsList/");
  }
  putStudent(data: IStudent, id: number) {
    return this.http.put<IStudent>("http://localhost:4000/studentsList/" + id, data);
  }
  deleteStudent(id: number) {
    return this.http.delete<IStudent>("http://localhost:4000/studentsList/" + id);
  }
}
