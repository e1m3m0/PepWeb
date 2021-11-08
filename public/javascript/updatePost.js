async function addPost(event) {
  event.preventDefault();

  const title = document.querySelector("#title").value.trim();
  const post_text = document.querySelector("#text").value.trim();
  const post_id = window.location.toString().split("/")[window.location.toString().split("/").length - 1];

  if (!title || !post_text) {
    alert("Please have all fields filled in");
  } else {
    const response = await fetch(`/api/posts/${post_id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: title,
        post_text: post_text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace(`/post/${post_id}`);
    } else {
      alert(response.statusText);
    }
  }
}

async function deletePost(event) {
  event.preventDefault();
  console.log("Time to delete!");

  const post_id = window.location.toString().split("/")[window.location.toString().split("/").length - 1];

  const response = await fetch(`/api/posts/${post_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace(`/`);
  } else {
    alert(response.statusText);
  }
}

document.querySelector("#updateButton").addEventListener("click", addPost);
document.querySelector("#deleteButton").addEventListener("click", deletePost);

// function addPost(event) {
//   event.preventDefault();

//   const title = document.querySelector("#title").value.trim();
//   const post_text = document.querySelector("#text").value.trim();

//   console.log(title);
//   console.log(post_text);
// }

// document.querySelector(".post-submit").addEventListener("submit", addPost);
