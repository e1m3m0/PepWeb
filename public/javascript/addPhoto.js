const element = document.querySelector('.photo-submit');
element.addEventListener('submit', event => {
  event.preventDefault();
  // actual logic, e.g. validate the form
  console.log('Form submission cancelled.');
});



async function addPhoto(event) {
  event.preventDefault();

  const input = document.querySelector("input[type='file']");

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
    console.log(response);
    const fileName = document.querySelector('#file-js-example .file-name'); 
    fileName.textContent = "Photo Uploaded!"
    const post_photo = document.querySelector('.photo');
    post_photo.setAttribute('id') = response.lastModified;
  } else {
    alert(response.statusText);
  }
}

// document.querySelector('.photo-submit').addEventListener('submit', addPhoto);