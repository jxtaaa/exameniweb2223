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


import * as runtime from '../runtime';
import type {
  EditVivienda,
  HTTPValidationError,
  NewVivienda,
  Vivienda,
} from '../models';
import {
    EditViviendaFromJSON,
    EditViviendaToJSON,
    HTTPValidationErrorFromJSON,
    HTTPValidationErrorToJSON,
    NewViviendaFromJSON,
    NewViviendaToJSON,
    ViviendaFromJSON,
    ViviendaToJSON,
} from '../models';

export interface DeleteHouseRequest {
    id: string;
}

export interface EditHouseRequest {
    id: string;
    editVivienda: EditVivienda;
}

export interface GetHouseByIdRequest {
    id: string;
}

export interface NewHouseRequest {
    newVivienda: NewVivienda;
}

/**
 * 
 */
export class DefaultApi extends runtime.BaseAPI {

    /**
     * Auth
     */
    async authAuthGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<any>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/auth`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     * Auth
     */
    async authAuthGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<any> {
        const response = await this.authAuthGetRaw(initOverrides);
        return await response.value();
    }

    /**
     * Delete House
     */
    async deleteHouseRaw(requestParameters: DeleteHouseRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<any>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteHouse.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/viviendas/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     * Delete House
     */
    async deleteHouse(requestParameters: DeleteHouseRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<any> {
        const response = await this.deleteHouseRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Edit House
     */
    async editHouseRaw(requestParameters: EditHouseRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Vivienda>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling editHouse.');
        }

        if (requestParameters.editVivienda === null || requestParameters.editVivienda === undefined) {
            throw new runtime.RequiredError('editVivienda','Required parameter requestParameters.editVivienda was null or undefined when calling editHouse.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/viviendas/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: EditViviendaToJSON(requestParameters.editVivienda),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ViviendaFromJSON(jsonValue));
    }

    /**
     * Edit House
     */
    async editHouse(requestParameters: EditHouseRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Vivienda> {
        const response = await this.editHouseRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get House
     */
    async getHouseByIdRaw(requestParameters: GetHouseByIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Vivienda>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getHouseById.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/viviendas/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ViviendaFromJSON(jsonValue));
    }

    /**
     * Get House
     */
    async getHouseById(requestParameters: GetHouseByIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Vivienda> {
        const response = await this.getHouseByIdRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get Houses
     */
    async getHousesRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Vivienda>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/viviendas`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ViviendaFromJSON));
    }

    /**
     * Get Houses
     */
    async getHouses(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Vivienda>> {
        const response = await this.getHousesRaw(initOverrides);
        return await response.value();
    }

    /**
     * Create House
     */
    async newHouseRaw(requestParameters: NewHouseRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Vivienda>> {
        if (requestParameters.newVivienda === null || requestParameters.newVivienda === undefined) {
            throw new runtime.RequiredError('newVivienda','Required parameter requestParameters.newVivienda was null or undefined when calling newHouse.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/viviendas`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: NewViviendaToJSON(requestParameters.newVivienda),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ViviendaFromJSON(jsonValue));
    }

    /**
     * Create House
     */
    async newHouse(requestParameters: NewHouseRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Vivienda> {
        const response = await this.newHouseRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
