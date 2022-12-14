import type { APIContext } from "astro";

export async function get(context: APIContext) {
    return context.redirect("/examen?" + context.url.searchParams);
  }