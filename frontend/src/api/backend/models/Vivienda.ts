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
 * @interface Vivienda
 */
export interface Vivienda {
    /**
     * 
     * @type {string}
     * @memberof Vivienda
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof Vivienda
     */
    user: string;
    /**
     * 
     * @type {string}
     * @memberof Vivienda
     */
    titulo: string;
    /**
     * 
     * @type {string}
     * @memberof Vivienda
     */
    descripcion: string;
    /**
     * 
     * @type {number}
     * @memberof Vivienda
     */
    precio: number;
    /**
     * 
     * @type {string}
     * @memberof Vivienda
     */
    direccion: string;
    /**
     * 
     * @type {number}
     * @memberof Vivienda
     */
    latitude: number;
    /**
     * 
     * @type {number}
     * @memberof Vivienda
     */
    longitude: number;
    /**
     * 
     * @type {Array<string>}
     * @memberof Vivienda
     */
    images?: Array<string>;
}

/**
 * Check if a given object implements the Vivienda interface.
 */
export function instanceOfVivienda(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "user" in value;
    isInstance = isInstance && "titulo" in value;
    isInstance = isInstance && "descripcion" in value;
    isInstance = isInstance && "precio" in value;
    isInstance = isInstance && "direccion" in value;
    isInstance = isInstance && "latitude" in value;
    isInstance = isInstance && "longitude" in value;

    return isInstance;
}

export function ViviendaFromJSON(json: any): Vivienda {
    return ViviendaFromJSONTyped(json, false);
}

export function ViviendaFromJSONTyped(json: any, ignoreDiscriminator: boolean): Vivienda {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, '_id') ? undefined : json['_id'],
        'user': json['user'],
        'titulo': json['titulo'],
        'descripcion': json['descripcion'],
        'precio': json['precio'],
        'direccion': json['direccion'],
        'latitude': json['latitude'],
        'longitude': json['longitude'],
        'images': !exists(json, 'images') ? undefined : json['images'],
    };
}

export function ViviendaToJSON(value?: Vivienda | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        '_id': value.id,
        'user': value.user,
        'titulo': value.titulo,
        'descripcion': value.descripcion,
        'precio': value.precio,
        'direccion': value.direccion,
        'latitude': value.latitude,
        'longitude': value.longitude,
        'images': value.images,
    };
}
