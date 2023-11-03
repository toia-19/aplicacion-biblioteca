import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IbibliotecaPageRoutingModule } from './ibiblioteca-routing.module';

import { IbibliotecaPage } from './ibiblioteca.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    IbibliotecaPageRoutingModule
  ],
  declarations: [IbibliotecaPage]
})
export class IbibliotecaPageModule {}
