import { Injectable } from "@angular/core";
import {  Observable, observable , of} from "rxjs";
import { delay } from "rxjs/operators";
import { SITE_INDEX, SiteItem } from "../data/site-index";


// define la estructura de los filtros de busqueda
export type SearchFilters = {
    type? : 'todos' | 'pagina' | 'seccion' ;
    section? : 'todas' |string ;
}

// es un servicio inyectable para usar en cualquier parte de la app
@Injectable({   providedIn: 'root' })
export class SearchApi {

    search(query: string, filters: SearchFilters) : 
    Observable<SiteItem[]> {
        const q = query || ''.trim().toLowerCase();  
        
        let data = [...SITE_INDEX]; // copia el arreglo usando el spread operator 

        /** (el spread operator crea una copia superficial del arreglo original para evitar mutaciones no deseadas, ejemplo:
        * const original = [1, 2, 3];
        * const copia = [...original];
        * copia.push(4);
        * console.log(original); // [1, 2, 3]
        * console.log(copia);   // [1, 2, 3, 4]
        ) **/

        // ------------ palabras clave ------------
        // busqueda simple --> palabras clave
        if (q.length > 0) {
            data = data.filter( item => {
                const haystack = (item.title + ' ' + 
                                item.description + ' ' + 
                                item.keywords.join(' ')).toLowerCase();
                return haystack.includes(q); // el includes devuelve true o false, según si encuentra la subcadena 
                // en la cadena completa (haystack), el includes es para ver si una cadena contiene a otra
            });
        }

        // ------------ filtros ------------
        // busqueda avanzada --> filtros

        //filtro por tipo
        if (filters.type && filters.type !== 'todos') {
            data = data.filter( item => item.type === filters.type );
        }

        //filtro por seccion
        if (filters.section && filters.section !== 'todas') {
            data = data.filter( item => item.section === filters.section );
        }

        // simula latencia de red con delay
        return of(data).pipe( delay(200) );
        }

        //para traer la seccion dinamicamente
        getSections() : string[] {
            //.map para transformar el arreglo y .filter para filtrar valores unicos
            // new Set() crea un conjunto de valores unicos
            const set = new Set( SITE_INDEX.map( x => x.section ));
        
            // convertimos el set de vuelta a array y lo ordenamos alfabeticamente
            return Array.from(set).sort((a, b) => a.localeCompare(b));
        }
}
