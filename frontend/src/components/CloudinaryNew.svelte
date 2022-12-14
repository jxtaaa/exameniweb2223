<script lang="ts">
  export let cloudName = "";
  export let uploadPreset = "";
  export let userid = "";

  let files: any;
  let title = "";
  let description = "";
  let price = 0;
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
    let image : string[] = [];
    if(files){
      //image = await upload(cloudName, uploadPreset, files[0]).then(x => x.json()).then(x => [x.url]);
      //image = await Promise.all(files.map((fich : any) => upload(cloudName, uploadPreset, fich).then(x => x.json()).then(x => x.url)));
      for (let i = 0; i < files.length; i++){
          let fich = files[i];
          let res = await upload(cloudName, uploadPreset, fich).then(x => x.json()).then(x => x.url)
          image.push(res);
      }
    } else {
      image = [];
    }
    const res = await fetch("/examen/new/newHouseHandler", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        direccion,
        price,
        userid,
        image
      }),
    }).then(x => x);
    window.location.href = "/";   
  }
</script>

<!--<form action="/houses/new/newHandler" method="post">-->
  <form on:submit|preventDefault={handleOnSubmit}>
  <!-- <input hidden value="EXAMPLE_USER_HARDCODED" name="userId" /> TODO -->
  <div class="mb-3">
    <label for="title" class="form-label">Title</label>
    <input bind:value={title} type="text" name="title" class="form-control" id="title" aria-describedby="titleHelp" required>
    <label for="description" class="form-label">Description</label>
    <input bind:value={description} type="text" name="description" class="form-control" id="description" aria-describedby="descriptionHelp" required>
    <label for="price" class="form-label">Price</label>
    <input bind:value={price} type="number" name="price" class="form-control" id="price" aria-describedby="priceHelp" required>
    <label for="direccion" class="form-label">Address</label>
    <input bind:value={direccion} type="text" name="direccion" class="form-control" id="direccion" aria-describedby="direccionHelp" required>
  </div>
  <input bind:files type="file" class="form-control" multiple/>
  <br>
  <button type="submit" class="btn btn-primary">Create</button>
</form>
