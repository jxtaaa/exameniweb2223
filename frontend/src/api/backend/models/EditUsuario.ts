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
 * @interface EditUsuario
 */
export interface EditUsuario {
    /**
     * 
     * @type {string}
     * @memberof EditUsuario
     */
    nombre: string;
    /**
     * 
     * @type {string}
     * @memberof EditUsuario
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof EditUsuario
     */
    apellidos: string;
    /**
     * 
     * @type {string}
     * @memberof EditUsuario
     */
    direccion: string;
    /**
     * 
     * @type {string}
     * @memberof EditUsuario
     */
    latitude: string;
    /**
     * 
     * @type {string}
     * @memberof EditUsuario
     */
    longitude: string;
    /**
     * 
     * @type {string}
     * @memberof EditUsuario
     */
    foto: string;
}

/**
 * Check if a given object implements the EditUsuario interface.
 */
export function instanceOfEditUsuario(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "nombre" in value;
    isInstance = isInstance && "email" in value;
    isInstance = isInstance && "apellidos" in value;
    isInstance = isInstance && "direccion" in value;
    isInstance = isInstance && "latitude" in value;
    isInstance = isInstance && "longitude" in value;
    isInstance = isInstance && "foto" in value;

    return isInstance;
}

export function EditUsuarioFromJSON(json: any): EditUsuario {
    return EditUsuarioFromJSONTyped(json, false);
}

export function EditUsuarioFromJSONTyped(json: any, ignoreDiscriminator: boolean): EditUsuario {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'nombre': json['nombre'],
        'email': json['email'],
        'apellidos': json['apellidos'],
        'direccion': json['direccion'],
        'latitude': json['latitude'],
        'longitude': json['longitude'],
        'foto': json['foto'],
    };
}

export function EditUsuarioToJSON(value?: EditUsuario | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'nombre': value.nombre,
        'email': value.email,
        'apellidos': value.apellidos,
        'direccion': value.direccion,
        'latitude': value.latitude,
        'longitude': value.longitude,
        'foto': value.foto,
    };
}

