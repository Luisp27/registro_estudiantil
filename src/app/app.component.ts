import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from './components/dialog/dialog.component';
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
    this.api.getStudents()
      .subscribe({
        next: (res) => {
          const students = res.map(student => {
            const getCalificacion = () => {
              if (!student.grades) return 'F';
              if (+student.grades >= 90) return 'A';
              else if (+student.grades >= 80 && +student.grades <= 90) return 'B';
              else if (+student.grades >= 70 && +student.grades <= 80) return 'C';
              else if (+student.grades >= 0 && +student.grades <= 69) return 'F';
              return 'F';
            }
            return {
              ...student,
              grades: getCalificacion()
            }
          })
          this.tableDataSource = new MatTableDataSource(students);
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


