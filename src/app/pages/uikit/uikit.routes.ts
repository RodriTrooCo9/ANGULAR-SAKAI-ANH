//src/app/pages/uikit/uikit.routes.ts

import { Routes } from '@angular/router';
import { ButtonDemo } from './buttondemo';
import { ChartDemo } from './chartdemo';
import { FileDemo } from './filedemo';
import { FormLayoutDemo } from './formlayoutdemo';
import { InputDemo } from './inputdemo';
import { ListDemo } from './listdemo';
import { MediaDemo } from './mediademo';
import { MessagesDemo } from './messagesdemo';
import { MiscDemo } from './miscdemo';
import { PanelsDemo } from './panelsdemo';
import { TimelineDemo } from './timelinedemo';
import { TableDemo } from './tabledemo';
import { OverlayDemo } from './overlaydemo';
import { TreeDemo } from './treedemo';
import { Menu } from './menu/menu';
/*
    * rutas de la pagina menu direcion de formularios tanto como reincorperacion de datos
    * como de visualizacion de datos, se pueden agregar mas componentes de primeng  
    * para verlos en la pagina de uikit
 */
import {BajaEmpresa} from './listado-empresa/baja-empresa';
import {BajaPersonal} from './baja-personal/baja-personal';
import {FormsEmpresa} from './forms-empresa/forms-empresa';
import {FormsTrabajador} from './forms-trabajador/forms-trabajador';
import {ListaEmpresas} from './lista-empresas/lista-empresas';
//import {RenovacionEmpresa} from './renovacion-empresa/renovacion-empresa';
//import {RenovacionTrabajador} from './renovacion-trabajador/renovacion-trabajador';
import {Observaciones} from './observaciones/observaciones';
import {GeneradorPDF} from './generador-pdf/generador-pdf';
import {RevisiónFormulario } from './revision-formulario/revision-formulario';
import {FormsPendientes } from './forms-pendientes/forms-pendientes';

import {PerfilUsuario} from './perfil-usuario/perfil-usuario';
import {RenovarFormulario } from './renovar-formulario/renovar-formulario';

import { Personal } from '../uikit/personal/personal';

import { CurriculumEmpresa } from './curriculum-empresa/curriculum-empresa';
import { Solicitud } from './solicitud/solicitud';
import { AreaLegal }from "./area-legal/area-legal";
import { Breadcrumb } from 'primeng/breadcrumb';
export default [

    /*
        * componentes de la pagina de formularios lista de links de los componentes del menu
    */

    {path:'bajaempresa', data: {Breadcrumb: 'Baja Empresa'}, component:BajaEmpresa },
    {path:'bajapersonal', data: {Breadcrumb: 'Baja Personal'}, component: BajaPersonal},
    {path:'formempresa', data: {Breadcrumb: 'Form Empresa'}, component: FormsEmpresa},
    {path:'formtrabajador', data: {Breadcrumb: 'Form Trabajador'}, component: FormsTrabajador},
    {path:'listaempresa', data: {Breadcrumb: 'Lista Empresa'}, component: ListaEmpresas},
  //  {path:'renovacionempresa', data: {Breadcrumb: 'Renovacion Empresa'}, component: RenovacionEmpresa},
  // {path:'renovaciontrabajador', data: {Breadcrumb: 'Renovacion Trabajador'}, component: RenovacionTrabajador},
    {path:'observaciones', data: {Breadcrumb: 'Observaciones'}, component: Observaciones},
    {path:'generador-pdf', data: {Breadcrumb: 'GeneradorPDF'}, component: GeneradorPDF},
    {path:'revision-formulario', data: { breadcrumb: 'Revision Formulario' }, component: RevisiónFormulario }, 
    {path:'forms-pendientes', data: { breadcrumb: 'Forms Pendientes' }, component: FormsPendientes}, 
    {path:'perfil-usuario', data: {Breadcrumb: 'Perfil'},component: PerfilUsuario},
    {path: 'renovar-formulario', data: {Breadcrumb: 'Renovar Formulario'}, component: RenovarFormulario},
    {path: 'area-legal', data: {Breadcrumb: 'Area Legal'}, component: AreaLegal},


    /*
        * rutas de los componentes de la pestanña de instaladoras 
     */
    { path: 'personal', data: { breadcrumb: 'Personal' }, component: Personal },
    { path: 'curriculumEmpresa', data: { breadcrumb: 'Curriculum' }, component: CurriculumEmpresa },
    { path: 'solicitud', data: { breadcrumb: 'Solicitud' }, component: Solicitud },


    /*
        * componentes de primeng usados dentro de las paginas etc etc
        * UI Kit Routes rutas de diseno de la pagina se pueden agregar mas componentes de primeng
        * para verlos en la pagina de uikit 
     */

    { path: 'button', data: { breadcrumb: 'Button' }, component: ButtonDemo },
    { path: 'charts', data: { breadcrumb: 'Charts' }, component: ChartDemo },
    { path: 'file', data: { breadcrumb: 'File' }, component: FileDemo },
    { path: 'formlayout', data: { breadcrumb: 'Form Layout' }, component: FormLayoutDemo },
    { path: 'input', data: { breadcrumb: 'Input' }, component: InputDemo },
    { path: 'list', data: { breadcrumb: 'List' }, component: ListDemo },
    { path: 'media', data: { breadcrumb: 'Media' }, component: MediaDemo },
    { path: 'message', data: { breadcrumb: 'Message' }, component: MessagesDemo },
    { path: 'misc', data: { breadcrumb: 'Misc' }, component: MiscDemo },
    { path: 'panel', data: { breadcrumb: 'Panel' }, component: PanelsDemo },
    { path: 'timeline', data: { breadcrumb: 'Timeline' }, component: TimelineDemo },
    { path: 'table', data: { breadcrumb: 'Table' }, component: TableDemo },
    { path: 'overlay', data: { breadcrumb: 'Overlay' }, component: OverlayDemo },
    { path: 'tree', data: { breadcrumb: 'Tree' }, component: TreeDemo },
    


    /*
    paginas rutas de menu y de notfound  
     */
    { path: 'menu', data: { breadcrumb: 'Menu' }, component: Menu }, // no comentar o quitar esta linea, es importante para redireccionar a la pagina de notfound
    { path: '**', redirectTo: '/notfound' } // no comentar o quitar esta linea, es importante para redireccionar a la pagina de notfound


] as Routes;
