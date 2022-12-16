<script lang="ts">
  export let cloudName = "";
  export let uploadPreset = "";
  //export let userid = "";

  let files: any;
  let nombre = "";
  let apellidos = "";
  let email = "";
  let direccion = "";

  // https://cloudinary.com/documentation/upload_images#code_explorer_upload_multiple_files_using_a_form_unsigned
  async function upload(cloudName: string, uploadPreset: string, file: any) {
    const formData = new FormData();
    formData.append("upload_preset", uploadPreset);
    formData.append("file", file);
    return await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
  }
  async function handleOnSubmit() {
    //let image : string[] = [];
    let image = "";
    if(files){
      //image = await upload(cloudName, uploadPreset, files[0]).then(x => x.json()).then(x => [x.url]);
      //image = await Promise.all(files.map((fich : any) => upload(cloudName, uploadPreset, fich).then(x => x.json()).then(x => x.url)));
      for (let i = 0; i < files.length; i++){
          let fich = files[i];
          let res = await upload(cloudName, uploadPreset, fich).then(x => x.json()).then(x => x.url)
          image = res;
      }
    } else {
      image = "";
    }
    const res = await fetch("/usuarios/new/newUsuarioHandler", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        apellidos,
        email,
        direccion,
        //userid,
        image
      }),
    }).then(x => x);
    window.location.href = "/";   
  }
</script>

  <form on:submit|preventDefault={handleOnSubmit}>
  <div class="mb-3">
    <label for="title" class="form-label">Nombre</label>
    <input bind:value={nombre} type="text" name="nombre" class="form-control" id="nombre" aria-describedby="titleHelp" required>
    <label for="description" class="form-label">Apellidos</label>
    <input bind:value={apellidos} type="text" name="apellidos" class="form-control" id="apellidos" aria-describedby="descriptionHelp" required>
    <label for="price" class="form-label">Email</label>
    <input bind:value={email} type="text" name="email" class="form-control" id="email" aria-describedby="priceHelp" required>
    <label for="direccion" class="form-label">Address</label>
    <input bind:value={direccion} type="text" name="direccion" class="form-control" id="direccion" aria-describedby="direccionHelp" required>
  </div>
  <input bind:files type="file" class="form-control" multiple/>
  <br>
  <button type="submit" class="btn btn-primary">Create</button>
</form>
