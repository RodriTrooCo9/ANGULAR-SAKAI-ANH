import { Customer, CustomerService, Representative } from '@/pages/service/customer.service';
import { Product, ProductService } from '@/pages/service/product.service';

import { ConfirmationService, MessageService } from 'primeng/api';
/*/*/
import { Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { Table, TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { TagModule } from 'primeng/tag';


import {ObjectUtils} from "primeng/utils";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TextareaModule } from 'primeng/textarea';
import { ToolbarModule } from 'primeng/toolbar';

import { Router } from '@angular/router';  
interface expandedRows {
    [key: string]: boolean;
}

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

interface ExportColumn {
    title: string;
    dataKey: string;
}

@Component({
  selector: 'app-personal',
  imports: [
    FormsModule,
    ButtonModule,
    InputTextModule,
    MultiSelectModule,
    SelectModule,
    SliderModule,
    TableModule,
    ProgressBarModule,
    ToggleButtonModule,
    ToastModule,
    RatingModule,
    RippleModule,
    InputIconModule,
    IconFieldModule,
    TagModule,
    //
CommonModule,
        ToolbarModule,
        TextareaModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        ConfirmDialogModule
  ],
  templateUrl: './personal.html',
  styleUrl: './personal.scss',
  providers: [ConfirmationService, MessageService, CustomerService, ProductService]
  // parte de los servicios que se inyectan en el constructor de los servicios de la api 
  
})
export class Personal implements OnInit {
     customers1: Customer[] = [];
    customers2: Customer[] = [];
    customers3: Customer[] = [];
    selectedCustomers1: Customer[] = [];
    selectedCustomer: Customer = {};
    representatives: Representative[] = [];
    
    rowGroupMetadata: any;
    expandedRows: expandedRows = {};
    activityValues: number[] = [0, 100];
    isExpanded: boolean = false;
    balanceFrozen: boolean = false;
    loading: boolean = true;

    productDialog: boolean = false;
    submitted: boolean = false;

    products = signal<Product[]>([]);
    product!: Product;
    selectedProducts!: Product[] | null;
    statuses!: any[];
  
    @ViewChild('dt') dt!: Table;
    exportColumns!: ExportColumn[];
    cols!: Column[];
   


     constructor(
        private customerService: CustomerService,
        
        private productService: ProductService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router // Inyecta el Router aquí
        
        
    ) {}





   expandAll() {
        if (ObjectUtils.isEmpty(this.expandedRows)) {
            this.expandedRows = this.products().reduce(
                (acc, p) => {
                    if (p.id) {
                        acc[p.id] = true;
                    }
                    return acc;
                },
                {} as { [key: string]: boolean }
            );
            this.isExpanded = true;
        } else {
            this.collapseAll();
        }
    }


     collapseAll() {
        this.expandedRows = {};
        this.isExpanded = false;
    }

    exportCSV() {
        this.dt.exportCSV();
    }
    /* 
      parte de los servicios que se inyectan en el constructor 
    */
   ngOnInit() {
       this.loadDemoData();


        this.customerService.getCustomersLarge().then((customers) => {
            this.customers1 = customers;
            this.loading = false;

            // @ts-ignore
            this.customers1.forEach((customer) => (customer.date = new Date(customer.date)));
        });
        this.customerService.getCustomersMedium().then((customers) => (this.customers2 = customers));
        this.customerService.getCustomersLarge().then((customers) => (this.customers3 = customers));
        //this.productService.getProductsWithOrdersSmall().then((data) => (this.products = data)); falla de carga no reconoce variable 

        this.representatives = [
            { name: 'Amy Elsner', image: 'amyelsner.png' },
            { name: 'Anna Fali', image: 'annafali.png' },
            { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
            { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
            { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
            { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
            { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
            { name: 'Onyama Limba', image: 'onyamalimba.png' },
            { name: 'Stephen Shaw', image: 'stephenshaw.png' },
            { name: 'XuXue Feng', image: 'xuxuefeng.png' }
        ];

        this.statuses = [
            { label: 'Unqualified', value: 'unqualified' },
            { label: 'Qualified', value: 'qualified' },
            { label: 'New', value: 'new' },
            { label: 'Negotiation', value: 'negotiation' },
            { label: 'Renewal', value: 'renewal' },
            { label: 'Proposal', value: 'proposal' }
        ];
    }
    loadDemoData() {
        this.productService.getProducts().then((data) => {
            this.products.set(data);
        });

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];

        this.cols = [
            { field: 'code', header: 'Code', customExportHeader: 'Product Code' },
            { field: 'name', header: 'Name' },
            { field: 'image', header: 'Image' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' }
        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

     onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

 openNew() {
    this.product = {}; // Crea un objeto vacío para el nuevo trabajador
    this.submitted = false;
    this.productDialog = true;
     this.messageService.add({
        severity: 'info',
        summary: 'Redireccionando...',
        detail: 'Está siendo dirigido a la página de asignación.',
        life: 2000 // La notificación se cerrará después de 2 segundos
    });
        setTimeout(() => {
        this.router.navigate(['/uikit/formtrabajador']); // Cambia '/asignar' a la ruta de tu nuevo componente
    }, 2000);
}




    editProduct(product: Product) {
        this.product = { ...product };
        this.productDialog = true;
    }

     deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirmar ',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.products.set(this.products().filter((val) => !this.selectedProducts?.includes(val)));
                this.selectedProducts = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Products Deleted',
                    life: 3000
                });
            }
        });
    }

     hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    deleteProduct(product: Product) {
        this.confirmationService.confirm({
            message: 'Esta Seguro de querer eliminar ' + product.name + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.products.set(this.products().filter((val) => val.id !== product.id));
                this.product = {};
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Deleted',
                    life: 3000
                });
            }
        });
    }
     findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products().length; i++) {
            if (this.products()[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
   getSeverity(status: string) {
    switch (status.toUpperCase()) {
        case 'ACTIVO':
            return 'success';

        case 'REVISION':
            return 'info';

        case 'PENDIENTE':
            return 'warn';

        case 'INACTIVO':
            return 'danger';
            
        default:
            return 'info';
    }
}

     saveProduct() {
        this.submitted = true;
        let _products = this.products();
        if (this.product.name?.trim()) {
            if (this.product.id) {
                _products[this.findIndexById(this.product.id)] = this.product;
                this.products.set([..._products]);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Updated',
                    life: 3000
                });
            } else {
                this.product.id = this.createId();
                this.product.image = 'product-placeholder.svg';
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Created',
                    life: 3000
                });
                this.products.set([..._products, this.product]);
            }
            this.productDialog = false;
            this.product = {};
        }
    }    
}
