
import type { APIContext } from "astro";
import { DefaultApi } from "../../../api/backend";
import {
  Configuration as ViviendaConfiguration,
  Vivienda,
} from "../../../api/backend";
import AppConfig from "../../../config";

export async function post(context: APIContext) { 
    const referer = new URL(context.request.headers.get("referer") ?? context.url);
    const formData = await context.request.formData();
    const idCasa  = formData.get("idCasa")?.toString()?? "";
    const viviendaApi = new DefaultApi(new ViviendaConfiguration(AppConfig.viviendas));

    try {
        const response = await viviendaApi.deleteHouse({id: idCasa});
        return context.redirect("/?" + new URLSearchParams({warning: "House deleted"}));
    } catch (e) {
        return context.redirect("/?" + new URLSearchParams({danger: "Something went wrong..."}));
    }
}
