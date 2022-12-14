/* tslint:disable */
/* eslint-disable */
/**
 * Tercer Parcial - API REST. Ingeniería Web
 * José Luis Bueno Pachón.
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface EditVivienda
 */
export interface EditVivienda {
    /**
     * 
     * @type {string}
     * @memberof EditVivienda
     */
    titulo: string;
    /**
     * 
     * @type {string}
     * @memberof EditVivienda
     */
    descripcion: string;
    /**
     * 
     * @type {number}
     * @memberof EditVivienda
     */
    precio: number;
    /**
     * 
     * @type {string}
     * @memberof EditVivienda
     */
    direccion: string;
    /**
     * 
     * @type {number}
     * @memberof EditVivienda
     */
    latitude: number;
    /**
     * 
     * @type {number}
     * @memberof EditVivienda
     */
    longitude: number;
    /**
     * 
     * @type {Array<string>}
     * @memberof EditVivienda
     */
    images?: Array<string>;
}

/**
 * Check if a given object implements the EditVivienda interface.
 */
export function instanceOfEditVivienda(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "titulo" in value;
    isInstance = isInstance && "descripcion" in value;
    isInstance = isInstance && "precio" in value;
    isInstance = isInstance && "direccion" in value;
    isInstance = isInstance && "latitude" in value;
    isInstance = isInstance && "longitude" in value;

    return isInstance;
}

export function EditViviendaFromJSON(json: any): EditVivienda {
    return EditViviendaFromJSONTyped(json, false);
}

export function EditViviendaFromJSONTyped(json: any, ignoreDiscriminator: boolean): EditVivienda {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'titulo': json['titulo'],
        'descripcion': json['descripcion'],
        'precio': json['precio'],
        'direccion': json['direccion'],
        'latitude': json['latitude'],
        'longitude': json['longitude'],
        'images': !exists(json, 'images') ? undefined : json['images'],
    };
}

export function EditViviendaToJSON(value?: EditVivienda | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'titulo': value.titulo,
        'descripcion': value.descripcion,
        'precio': value.precio,
        'direccion': value.direccion,
        'latitude': value.latitude,
        'longitude': value.longitude,
        'images': value.images,
    };
}
