import type { APIContext } from "astro";
import cookies from "../../cookies";
import { setCookies } from "../../lib/auth0";


export async function get(context: APIContext) {
  const code = context.url.searchParams.get("code") as string;

  const payload = new URLSearchParams({
    grant_type: "authorization_code",
    redirect_uri: context.url.origin,
    client_id: import.meta.env.PUBLIC_AUTH0_CLIENTID,
    client_secret: import.meta.env.AUTH0_CLIENTSECRET,
    audience: import.meta.env.PUBLIC_AUTH0_AUDIENCE,
    code,
  });

  const response = await fetch(
    `https://${import.meta.env.PUBLIC_AUTH0_BASEURL}/oauth/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload.toString(),
    }
  ).then((x) => x.json());
  setCookies(context, response);

  return context.redirect("/");
}
