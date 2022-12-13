import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  title = 'registroEstudiantil';
  displayedColumns: string[] = ['fullName', 'subjects', 'attendance', 'grades', 'Action'];

  @Input()
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService) {
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = "Cantidad de estudiantes por pagina";
  }

  editEstudiante(row: any) {
    this.api.getStudent(row.id).subscribe({
      next: (res) => {
        this.dialog.open(DialogComponent, {
          width: '30%',
          data: res
        })
      },
      error: () => {
        alert("Error al recuperar datos");
        return;
      }
    })
  }

  deleteStudent(id: number) {
    this.api.deleteStudent(id)
      .subscribe({
        next: (res) => {
          alert("Seguro desea eliminar");
          window.location.reload();
        },
        error: () => {
          alert("Error al eliminar");
        }
      })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

