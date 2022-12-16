import type { APIContext } from "astro";
import { Configuration, NewHouseRequest, NewVivienda, ResponseError, DefaultApi, NewUsuario, NewUserRequest } from "../../../api/backend";
import cookies from "../../../cookies";
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
    const referer = new URL(
        context.request.headers.get("referer") ?? context.url
    );
    
    const config = new Configuration(AppConfig.viviendas);
    const api = new DefaultApi(config);

    const data = await context.request.json();
    const {
        nombre,
        apellidos,
        email,
        direccion,
        image
    } = data;

    /*
    if(data.price === 0){
        referer.searchParams.set("danger", "Price can't be zero");
        return {
            body: JSON.stringify(
                {
                    redirect: `/examen/new/new?danger=Price can't be zero`
                }
            )
        }
    } else if(data.price < 0){
        referer.searchParams.set("danger", "Price can't be negative");
        return {
            body: JSON.stringify(
                {
                    redirect: `/examen/new/new?danger=Price can't be negative`
                }
            )
        }
    }
    */
    
    //const loc : string = street + ", " + number + ", " + city + ", " + province + ", " + cp + ", " + country;
    const geoRes = await getGeocoding(direccion);

    
    /*
    if(geoRes.data.length === 0){
        referer.searchParams.set("danger", "Invalid address");
        return {
            body : JSON.stringify(
                {
                    redirect: `/examen/new/new?danger=Invalid address`
                }
            )
        }
    }
    */
    
    let newUser: NewUsuario = {
        nombre,
        apellidos,
        email,
        direccion,
        latitude: geoRes.data[0].latitude,
        longitude: geoRes.data[0].longitude,
        foto: image
    };

    
    try {
        const newUsuarioRequest : NewUserRequest = {
            newUsuario : newUser
        }
        const response = await api.newUser(newUsuarioRequest);
        
        return {
            body: JSON.stringify({
                redirect: "/examen"
            })
            }
            
        } catch (e) {
            const error = e as ResponseError;
            //const msg = await error.response.json().then((x) => x.detail[0]);
            /*
            if(msg.type === "value_error.number.not_gt"){
              referer.searchParams.set("danger", "Price must be greater than 0");
        }
            */
        return context.redirect(referer.toString());
    }
  }
  