<script lang="ts">

let codLinea = 0;
let sentido = 0;
let nombre = "";

async function consultarDatos(){
    const res = await fetch("/examen/lineas/formHandler", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            codLinea,
            sentido
        }),
    }).then(x => x);
    window.location.href = "/";
}
</script>

<form on:submit|preventDefault={consultarDatos}>
  <div class="mb-3">
    <label for="title" class="form-label">Codigo de linea</label>
    <input bind:value={codLinea} type="text" name="codLinea" class="form-control" id="codLinea" aria-describedby="titleHelp" >
    <label for="description" class="form-label">Sentido</label>
    <input bind:value={sentido} type="text" name="sentido" class="form-control" id="description" aria-describedby="descriptionHelp" >

    <br>
    <br>

    <label for="description" class="form-label">Nombre</label>
    <input bind:value={nombre} type="text" name="nombre" class="form-control" id="description" aria-describedby="descriptionHelp">
    <br>
    <button type="submit" class="btn btn-primary">Buscar</button>
</form>