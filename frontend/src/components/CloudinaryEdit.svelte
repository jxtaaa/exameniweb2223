<script lang="ts">
    import { EditVivienda, DefaultApi } from "../api/backend";
    import type {Vivienda} from "../api/backend";
    import AppConfig from "../config";
    export let cloudName = "";
    export let uploadPreset = "";
    export let vivienda : Vivienda;
    
    let files: any;

    const loc = vivienda.direccion;
    const loc_splitted = loc.split(", ");

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
      let image : string[] = [];
      if(files){
        for (let i = 0; i < files.length; i++){
            let fich = files[i];
            let res = await upload(cloudName, uploadPreset, fich).then(x => x.json()).then(x => x.url)
            image.push(res);
        }
      } else {
        image = vivienda.images ?? [];
      }
      const res = await fetch("/examen/update/updateHandler", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idCasa: vivienda.id,
            title: vivienda.titulo,
            description: vivienda.descripcion,
            direccion: vivienda.direccion,
            price: vivienda.precio,
            image
        }),
      }).then(x => x.json());
      window.location.href = res.redirect;   
    }
  </script>
  
    <form on:submit|preventDefault={handleOnSubmit}>
    <input type="text" value={vivienda.id} name="idCasa" hidden>
        <div class="mb-3">
          <label for="title" class="form-label">Title</label>
          <input bind:value={vivienda.titulo} type="text" name="title" class="form-control" id="title" aria-describedby="title" required>
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <input type="text" bind:value={vivienda.descripcion} name="description" class="form-control" id="description">
        </div>
        <div class="mb-3">
          <label for="price" class="form-label">Price per night</label>
          <input type="number" bind:value={vivienda.precio} name="price" class="form-control" id="price" required>
      </div>
      <div>
        <label for="direccion" class="form-label">Address</label>
        <input bind:value={vivienda.direccion} type="text" name="direccion" class="form-control" id="direccion" aria-describedby="direccionHelp" required>
      </div>
    <input bind:files type="file" class="form-control" multiple/>
    <button type="submit" class="btn btn-primary">Edit data</button>
  </form>
  