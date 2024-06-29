import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmarData } from '../../models/confirmarData';

@Component({
  selector: 'app-confirma',
  templateUrl: './confirma.component.html',
  styleUrls: ['./confirma.component.css']
})
export class ConfirmaComponent {
  confirmarAccion(arg0: string, arg1: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    public dialogRef: MatDialogRef<ConfirmaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cancelar() {
    this.dialogRef.close(false);
  }

  confirmar() {
    this.dialogRef.close(true);
  }
}