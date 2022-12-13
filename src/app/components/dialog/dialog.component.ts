import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  attendances = ["P", "A"];
  attendanceInputMask = [/[P|A]/, '-', /[P|A]/, '-', /[P|A]/, '-', /[P|A]/, '-', /[P|A]/];
  studentForm !: FormGroup;
  actionBtn: string = "Save";

  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      subjects: ['', Validators.required],
      grades: ['', Validators.required],
      attendance: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = "Actualizar";
      this.studentForm.controls['fullName'].setValue(this.editData.fullName);
      this.studentForm.controls['subjects'].setValue(this.editData.subjects);
      this.studentForm.controls['attendance'].setValue(this.editData.attendance);
      this.studentForm.controls['grades'].setValue(this.editData.grades);
    }
  }
  addEstudents() {
    if (!this.editData) {
      console.log(this.studentForm.value)
      if (this.studentForm.valid) {
        this.api.postStudent(this.studentForm.value)
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
    this.api.putStudent(this.studentForm.value, this.editData.id)
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
