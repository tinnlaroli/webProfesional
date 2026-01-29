import { Routes } from '@angular/router';

import { Breadcumbs } from './pages/breadcumbs/breadcumbs';
import { ElementosSitio } from './pages/elementos-sitio/elementos-sitio'; 
import { Error404 } from './pages/error-404/error-404';
import { Inicio } from './pages/inicio/inicio';
import { MapaSitio } from './pages/mapa-sitio/mapa-sitio';
import { Menu } from './pages/menu/menu';
import { Busqueda } from './pages/busqueda/busqueda';


export const routes: Routes = [
    {
        //path es la ruta raiz (el home)
        path : '',
        //component Inicio es el que se cargara
        component : Inicio,
        //pathMatch fill asegura que solo cargue si la URL es exactamente vacio, no solo si empieza con vacio "    " vs "  aaa"
        pathMatch: 'full'
    },
    {
        path : 'breadcrumbs',
        component: Breadcumbs
    },
    {
        path : 'elementos-sitio',
        component: ElementosSitio
    },
    {
        path : 'menu',
        component: Menu
    },
    {
        path : 'mapa-sitio',
        component: MapaSitio
    },
    {
        path : 'busqueda',
        component: Busqueda
    },
    {
        // ** es un comodin, cualquier cosa que no coincida con las rutas anteriores manda este component
        path: '**',
        component: Error404
    }
];
