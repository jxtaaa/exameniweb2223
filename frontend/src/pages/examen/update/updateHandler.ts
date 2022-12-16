
import type { APIContext } from "astro";
import { EditVivienda, DefaultApi } from "../../../api/backend";
import {
  Configuration as ViviendaConfiguration,
  Vivienda,
} from "../../../api/backend";
import AppConfig from "../../../config";

interface GeoCodingData{
    latitude : string,
    longitude: string
}

interface GeoCodingResult{
    data : GeoCodingData[];

}

async function getGeocoding(calle : string){
    return fetch(
        "http://api.positionstack.com/v1/forward?access_key=" + import.meta.env.POSITION_STACK_API_KEY + "&query=" + calle, {
            "method": "GET"
        }
    ).then(res => res.json()).then(res => {
            return res;
        }
    )
}

export async function post(context: APIContext) { 
    let viv : Vivienda;


    const referer = new URL(context.request.headers.get("referer") ?? context.url);
    const viviendaApi = new DefaultApi(new ViviendaConfiguration(AppConfig.viviendas));

    const data = await context.request.json();
    const {
        idCasa,
        title,
        description,
        direccion,
        price,
        image
    } = data;

    viv = await viviendaApi.getHouseById({ id: idCasa });

    //const loc : string = street + ", " + number + ", " + city + ", " + province + ", " + cp + ", " + country;
    const geoRes = await getGeocoding(direccion);

    if(geoRes.data.length === 0){
        referer.searchParams.set("danger", "Invalid address");
        return {
            body : JSON.stringify(
                {
                    redirect: `/examen/update/{idCasa}?danger=Invalid address`
                }
            )
        }
    }

    const lat = geoRes.data[0].latitude;
    const lon = geoRes.data[0].longitude;   


    const editVivienda : EditVivienda = {
        titulo : title,
        descripcion : description,
        precio: parseInt(price),
        direccion,
        latitude : lat,
        longitude : lon,
        images : image
    }
    try {
        const response = await viviendaApi.editHouse({id: idCasa, editVivienda});
        return {
            body: JSON.stringify({
                redirect: `/`
            })
        }
    } catch (e) {
        return context.redirect("/?" + new URLSearchParams({danger: "Something went wrong..."}));
    }
}
