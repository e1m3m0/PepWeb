function addPhoto(event) {
  event.preventDefault();

  const input = document.querySelector("input[type='file']");
  const user_id = document.querySelector(".user-data").getAttribute("id").trim();
  const post_id = window.location.toString().split("/")[window.location.toString().split("/").length - 1];
  console.log(input, user_id, post_id)

  const formData = new FormData();
  formData.append('file', input.files[0])
  formData.append('name', 'upl')
  console.log(formData)
  
  console.log(input.files);

  // console.log(input.files[0])

  // let data = new FormData();
  // data.append('file', input.files[0]);

  // const response = fetch("/api/photos", {
  //   method: "POST",
  //   body: formData,
  //   headers: {
  //     'Content-Type': 'multipart/form-data'
  //   },
  // })

  // if (response.ok) {
  //   console.log(response.json);

  // } else {
  //   alert(response.statusText);
  // }
}

document.querySelector('.photo-submit').addEventListener('submit', addPhoto);