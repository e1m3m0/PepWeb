async function addPhoto(event) {
  event.preventDefault();

  const input = document.querySelector("input[type='file']");
  const user_id = document.querySelector(".user-data").getAttribute("id").trim();
  const post_id = window.location.toString().split("/")[window.location.toString().split("/").length - 1];

  const formData = new FormData();
  formData.append('file', input.files[0])
  formData.append('name', 'upl')
  
  const post_photo = document.querySelector('.photo');
  post_photo.setAttribute('id') = input.files[0].lastModified;

  // console.log(input.files[0])

  // let data = new FormData();
  // data.append('file', input.files[0]);

  const response = await fetch("/api/photos", {
    method: "POST",
    body: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  })

  if (response.ok) {
    console.log(response.json);

  } else {
    alert(response.statusText);
  }
}

// document.querySelector('.photo-submit').addEventListener('submit', addPhoto);