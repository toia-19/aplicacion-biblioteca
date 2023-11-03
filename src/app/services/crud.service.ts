import { Injectable } from '@angular/core';
import { Libro } from '../models/libro';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators'; // mapea valores -> similar a la función de un arreglo

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private librosCollection: AngularFirestoreCollection<Libro>

  constructor(private database: AngularFirestore) {
    this.librosCollection = database.collection('libros')
  }

  // CRUD -> PRODUCTOS
  crearLibro(libro: Libro){
    return new Promise(async(resolve, reject) =>{
      try{
        const idLibro = this.database.createId();
        libro.idLibro = idLibro;

        const resultado = await this.librosCollection.doc(idLibro).set(libro)

        resolve(resultado);
      } catch (error){
        reject(error);
      }
    })
  }

  obtenerLibro(){
    return this.librosCollection.snapshotChanges().
    pipe(map(action => action.map(a => a.payload.doc.data())))
  }

  // envíamos el ID del producto y la nueva información
  modificarLibro(idLibro: string, nuevaData: Libro){
    return this.database.collection('libros').doc(idLibro).update(nuevaData);
  }

  // envíamos el ID del producto
  eliminarLibro(idLibro: string){
    return new Promise((resolve, reject) =>{
      try{
        const resp = this.librosCollection.doc(idLibro).delete()
        resolve (resp)
      }
      catch(error){
        reject (error)
      }
    })
  }
}
