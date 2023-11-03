import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { Libro } from 'src/app/models/libro';
import { CrudService } from '../../services/crud.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ibiblioteca',
  templateUrl: './ibiblioteca.page.html',
  styleUrls: ['./ibiblioteca.page.scss'],
})
export class IbibliotecaPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  coleccionLibros: Libro[] = []; // creamos colección basada en interfaz Libro

  libroSeleccionado!: Libro; // ! -> recibir valores vacíos

  modalVisibleLibro: boolean = false;

  // modalVisible: boolean = false;
  // eliminarVisible: boolean = false;

  // formulario vínculado al archivo html
  libro = new FormGroup({
    nombre: new FormControl('', Validators.required),
    autor: new FormControl('', Validators.required),
    fecha_lanzamiento: new FormControl(0, Validators.required),
    imagen: new FormControl('',Validators.required)
  })

  constructor(
    public servicioCrud: CrudService // patentamos servicio de forma local
  ) { }

  ngOnInit(): void {
    this.servicioCrud.obtenerLibro().subscribe(libro => {
      this.coleccionLibros = libro;
    })
  }

  mostrarAgregar(){
    this.libro.reset();
  }

  async agregarLibro() { // método para validar esos valores del Libro agregado
    if (this.libro.valid) {
      let nuevoLibro: Libro = {
        idLibro: '',
        nombre: this.libro.value.nombre!,
        autor: this.libro.value.autor!,
        fecha_lanzamiento: this.libro.value.fecha_lanzamiento!,
        imagen: this.libro.value.imagen!
      };

      // llamamos al servicioCrud; función crearLibro; seteamos nuevoLibro
      await this.servicioCrud.crearLibro(nuevoLibro)
        .then(libro => {
          this.modal.dismiss(null);
          alert("Ha agregado un nuevo libro con éxito :)");
        })
        .catch(error => {
          alert("Hubo un error al cargar nuevo Libro :( \n" + error);
        })
    }
  }

  // EDITAR Libro -> VINCULA AL MODAL DE EDITAR
  mostrarEditar(libroSeleccionado: Libro) {
    this.libroSeleccionado = libroSeleccionado;

    /* retomamos y enviamos los valores de ese Libro 
    seleccionado, el ID no se vuelve a enviar porque 
    no se modifica */
    this.libro.setValue({
      nombre: libroSeleccionado.nombre,
      autor: libroSeleccionado.autor,
      fecha_lanzamiento: libroSeleccionado.fecha_lanzamiento,
      imagen: libroSeleccionado.imagen
    })
  }

  // VINCULA A BOTÓN "GUARDAR CAMBIOS"
  // recibir los valores nuevos que ingresemos en el formulario
  editarLibro() {
    let datos: Libro = {
      idLibro: this.libroSeleccionado.idLibro,
      // signo de exclamación "!" -> puede recibir valores vacíos al inicializar
      nombre: this.libro.value.nombre!,
      autor: this.libro.value.autor!,
      fecha_lanzamiento: this.libro.value.fecha_lanzamiento!,
      imagen: this.libro.value.imagen!
    }

    this.servicioCrud.modificarLibro(this.libroSeleccionado.idLibro, datos)
      .then(libro => {
        this.modal.dismiss(null);
        alert("El libro fue modificado con éxito :).");
      })
      .catch(error => {
        alert("No se pudo modificar el libro :( \n" + error);
      })
  }

  // ELIMINAR EL Libro
  mostrarBorrar(libroSeleccionado: Libro) { // botón para el modal
    this.modalVisibleLibro = true; // modal
    this.libroSeleccionado = libroSeleccionado; // asigna Libro elegido
  }

  borrarLibro() { // botón para eliminar definitivamente
    this.servicioCrud.eliminarLibro(this.libroSeleccionado.idLibro)
      .then(respuesta => {
        this.modal.dismiss(null);
        alert("El Libro se ha eliminado correctamente :)");
      })
      .catch(error => {
        alert("No se ha podido eliminar el libro :( \n" + error);
      })
  }

  cancel() {
    this.modal.dismiss(null, 'Cancelar');
  }
}