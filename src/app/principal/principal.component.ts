import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AngularFirestore } from '@angular/fire/firestore';
import { MensajesService } from '../mensajes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit {
  modalRef: BsModalRef;
  formProducto: FormGroup;
  formPersona: FormGroup;

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private firestore: AngularFirestore,
    private mensaje: MensajesService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  validatorFormulario(): void {
    this.formProducto = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      valor: ['', Validators.required],
    });
  }

  validatorPersona(): void {
    this.formPersona = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      edad: ['', Validators.required],
    });
  }

  openModalRegistroProducto(template: TemplateRef<any>): void {
    this.validatorFormulario();
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  openModalRegistroPersona(template: TemplateRef<any>): void {
    this.validatorPersona();
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  onGuardarProducto(): void {
    if (
      this.formProducto.value.id != null &&
      this.formProducto.value.id != undefined &&
      this.formProducto.value.id != ''
    ) {
      this.firestore
        .doc('productos/' + this.formProducto.value.id)
        .update(this.formProducto.value)
        .then((resultado) => {
          this.mensaje.mensajeActualizar();
          this.modalRef.hide();
        });
    } else {
      this.firestore
        .collection('productos')
        .add(this.formProducto.value)
        .then((resultado) => {
          this.mensaje.mensajeGuardar();
          this.modalRef.hide();
        });
    }
  }

  onGuardarPersona(): void {

    if(this.formPersona.value.edad >= 18){
      if (
        this.formPersona.value.id != null &&
        this.formPersona.value.id != undefined &&
        this.formPersona.value.id != ''
      ) {
        this.firestore
          .doc('personas/' + this.formPersona.value.id)
          .update(this.formPersona.value)
          .then((resultado) => {
            this.mensaje.mensajeActualizar();
            this.modalRef.hide();
          });
      } else {
        this.firestore
          .collection('personas')
          .add(this.formPersona.value)
          .then((resultado) => {
            this.mensaje.mensajeGuardar();
            this.modalRef.hide();
          });
      }
    }else{
      this.mensaje.mensajeError();
    }
  }

  irASubasta(): void {
    this.router.navigate(['/lanzamiento']);
  }

  cerrarModal(): void {
    this.modalRef.hide();
  }
}
