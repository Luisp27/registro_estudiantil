import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  tableDataSource!: MatTableDataSource<any>;

  constructor(private dialog: MatDialog, private api: ApiService) {
  }

  ngOnInit(): void {
    this.getAllEstudents();
  }

  getAllEstudents() {
    this.api.getEstudiantes()
      .subscribe({
        next: (res) => {
          const estudiantes = res.map(estudiante => {
            const getCalificacion = () => {
              if (!estudiante.Calificaciones) return 'F';
              if (+estudiante.Calificaciones >= 90) return 'A';
              else if (+estudiante.Calificaciones >= 80 && +estudiante.Calificaciones <= 90) return 'B';
              else if (+estudiante.Calificaciones >= 70 && +estudiante.Calificaciones <= 80) return 'C';
              else if (+estudiante.Calificaciones >= 0 && +estudiante.Calificaciones <= 69) return 'F';
              return 'F';
            }
            return {
              ...estudiante,
              Calificaciones: getCalificacion()
            }
          })
          this.tableDataSource = new MatTableDataSource(estudiantes);
        },
        error: (err) => {
          alert("Error en recuperar datos")
        }
      })
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    })
  }
}


