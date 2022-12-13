import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  Asistencias = ["P", "A"];
  studentForm !: FormGroup;
  actionBtn: string = "Save";

  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      studentName: ['', Validators.required],
      Materias: ['', Validators.required],
      Calificaciones: ['', Validators.required],
      Asistencia: ['', Validators.required],

    });

    if (this.editData) {
      this.actionBtn = "Actualizar";
      this.studentForm.controls['studentName'].setValue(this.editData.studentName);
      this.studentForm.controls['Materias'].setValue(this.editData.Materias);
      this.studentForm.controls['Asistencia'].setValue(this.editData.Asistencia);
      this.studentForm.controls['Calificaciones'].setValue(this.editData.Calificaciones);
    }
  }
  addEstudents() {
    if (!this.editData) {
      if (this.studentForm.valid) {
        this.api.postEstudiante(this.studentForm.value)
          .subscribe({
            next: (res) => {
              alert("Agregar estudiante");
              this.studentForm.reset();
              this.dialogRef.close('save');
              window.location.reload();
            },
            error: () => {
              alert("Error al agregar");
            }
          })
      }
    } else {
      this.updateEstudiante()
    }
  }

  updateEstudiante() {
    this.api.putEstudiante(this.studentForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert("Estudiante actualizado");
          this.studentForm.reset();
          this.dialogRef.close('update');
          window.location.reload();
        },
        error: () => {
          alert("Error al actualizar");
        }
      })
  }
}
