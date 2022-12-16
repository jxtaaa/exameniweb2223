import { APIContext } from "astro";
import { getAccessToken, isLoggedIn } from "../../lib/auth0";
import { Configuration, LineasApi, AuthApi } from "../../api/backend";
import cookies from '../../cookies';
import AppConfig from "../../config";

export async function post(context: APIContext){
    const config = new Configuration(AppConfig.lineas);
    const api = new LineasApi(config);

    const data = await context.request.json();
    const {
        codLinea,
        sentido
    } = data;

    console.log(data);
}