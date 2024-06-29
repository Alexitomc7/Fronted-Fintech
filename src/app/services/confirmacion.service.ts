import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmaComponent } from '../components/confirma/confirma.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmacionService {

  constructor(private dialog: MatDialog) { }

  confirmarAccion(mensaje: string, titulo: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmaComponent, {
      data: { mensaje: mensaje, titulo: titulo }
    });

    return dialogRef.afterClosed();
  }
}