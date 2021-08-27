import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AngularFirestore } from '@angular/fire/firestore';
import { MensajesService } from '../mensajes.service';


@Component({
  selector: 'app-lanzamiento',
  templateUrl: './lanzamiento.component.html',
  styleUrls: ['./lanzamiento.component.scss'],
})
export class LanzamientoComponent implements OnInit {
  formSubasta: FormGroup;
  productos: any[] = new Array<any>();
  lanzamientos: any[] = new Array<any>();
  personas: any[] = new Array<any>();
  modalRef: BsModalRef;
  nombre;
 
  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private firestore: AngularFirestore,
    private mensaje: MensajesService
  ) {}

  ngOnInit(): void {
    this.listadoProductos();
    this.listadoPersonas();
  }

  listadoProductos(): void {
    this.productos.length = 0;
    const productosCollection = this.firestore.collection('productos');
    let proDocs = productosCollection.ref.orderBy('valor', 'asc').get();
    proDocs
      .then((resultado) => {
        resultado.forEach((doc:any) => {
          let e = doc.data();
          e.id = doc.id;
          this.productos.push(e);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onSubastar(producto, template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );

    this.nombre = '';
    this.formSubasta = this.fb.group({
      id: [''],
      idProducto: [producto.id, Validators.required],
      producto: [producto.nombre, Validators.required],
      costoProducto: [producto.valor, Validators.required],
      personaNombre: ['', Validators.required],
      personaId: ['', Validators.required],
      montoOferta: ['', Validators.required],
    });
  }

  onRealizarOferta(): void {

    this.formSubasta.value.personaNombre = this.nombre;
    
    if(this.formSubasta.value.montoOferta > this.formSubasta.value.costoProducto){
        if (
          this.formSubasta.value.id != null &&
          this.formSubasta.value.id != undefined &&
          this.formSubasta.value.id != ''
        ) {
          this.firestore
            .doc('lanzamientos/' + this.formSubasta.value.id)
            .update(this.formSubasta.value)
            .then((resultado) => {
              this.mensaje.mensajeActualizar();
              this.modalRef.hide();
            });
        } else {
          this.firestore
            .collection('lanzamientos')
            .add(this.formSubasta.value)
            .then((resultado) => {
              //llamar los guardados
              this.mensaje.mensajeGuardar();
              this.modalRef.hide();
            });
        }
    }else{
      this.mensaje.mensajeBajo();
    }

      
  }

  onLanzamientos(producto, template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );

    this.listadoLanzamientos(producto.id);
  }

  listadoLanzamientos(id): void {
    this.lanzamientos.length = 0;

    const actualCollection = this.firestore.collection('lanzamientos');

    let eviDocs = actualCollection.ref
      .where('idProducto', '==', id)
      .orderBy('montoOferta', 'desc')
      .get();

    eviDocs
      .then((resultado) => {
        resultado.forEach((doc) => {
          let e = doc.data();
          this.lanzamientos.push(e);
        });
      })
      .catch((err) => {
        console.log(err);
      });

  }


  listadoPersonas(): void {
    this.personas.length = 0;
    const personasCollection = this.firestore.collection('personas');
    let perDocs = personasCollection.ref.orderBy('nombre', 'asc').get();
    perDocs
      .then((resultado) => {
        resultado.forEach((doc:any) => {
          let e = doc.data();
          e.id = doc.id;
          this.personas.push(e);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }


  onOptionsSelectedFiltro(evento):void{
    this.formSubasta.value.personaId = evento.target.value;
    
    for(let persona of this.personas){
      if(persona.id == evento.target.value){
  
        this.nombre = persona.nombre;
      }
    }
  }

  cerrarModal(): void {
    this.modalRef.hide();
  }
}
