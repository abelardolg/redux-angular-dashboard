import { Injectable } from '@angular/core';

import { AngularFirestore, DocumentReference, DocumentChangeAction } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { IngresoEgresoModel } from '../models/ingresoEgreso.model';
import { AuthService } from './auth.service';
import { deleteIngresoEgreso } from '../actions/ingresoEgreso.actions';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private fireStore: AngularFirestore
              , private authService: AuthService) { }

  registerIngresoEgreso(ingresoEgresoData: IngresoEgresoModel): Promise<DocumentReference> {
    return this.fireStore.doc(`${(this.authService.authUser.uid)}/ingresos-egresos`)
      .collection('ingresosEgresos')
      .add({ ...ingresoEgresoData });
    }

  initIngresosEgresosListener(uid: string): Observable<any> {
    return this.fireStore.collection(`${uid}/ingresos-egresos/ingresosEgresos`)
    .snapshotChanges()
    .pipe(
      map<DocumentChangeAction<any>[], IngresoEgresoModel[]>( snapshots => snapshots.map(doc => {
        return IngresoEgresoModel.fromFirebaseStore(
            doc.payload.doc.id,
            doc.payload.doc.data()._description,
            doc.payload.doc.data()._amount,
            doc.payload.doc.data()._operationType,
        )}
      )
      )
    );
  }

  deleteIngresoEgreso(uidIngresoEgreso: string): Promise<void> {
    return this.fireStore.doc(`${this.authService.authUser.uid}/ingresos-egresos/ingresosEgresos/${uidIngresoEgreso}`).delete();
  }
}
