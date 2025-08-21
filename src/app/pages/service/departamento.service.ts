import {Injectable} from '@angular/core';

@Injectable()
export class DepartamentoService {
    getData(){
        return [
            {name: 'La Paz', code: 'LP'},
            {name: 'cochabamba', code: 'CH'},
            {name: 'santa Cruz', code: 'SZ'},
            {name: 'oruro', code: 'OR'},
            {name: 'sucre', code: 'SC'},
            {name: 'beni', code: 'BE'},
            {name: 'tarija', code: 'TJ'},
            {name: 'potosi', code: 'PO'},
            {name: 'pando', code: 'PA'},
        ];
    }
    getDepartamentos(){
        return Promise.resolve(this.getData());
    }

}