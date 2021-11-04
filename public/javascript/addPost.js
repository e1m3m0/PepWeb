function addPost(event) {
  event.preventDefault();

  const title = document.querySelector("#title").value.trim();
  const tag_id = document.querySelector("#type").value.trim();
  const post_text = document.querySelector("#text").value.trim();
  const photo_file = document.querySelector("#photo").value.trim();

  console.log(photo_file);

  // photo upload to multer-s3 fuction, return file key to use in table

  // if (!title || !tag_id || !post_text) {
  //   alert("Please complete all required fields");
  // } else {
  //   const response = await fetch("/api/posts", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       title,
  //       tag_id,
  //       post_text,
  //       post_photo,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   if (response.ok) {
  //     document.location.reload();
  //   } else {
  //     alert(response.statusText);
  //   }
  // }
}

document.querySelector(".post-submit").addEventListener("submit", addPost);
