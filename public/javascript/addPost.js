function addPost(event) {
  event.preventDefault();

  const title = document.querySelector("#title").value.trim();
  const tag_id = document.querySelector("#type").value.trim();
  const post_text = document.querySelector("#text").value.trim();

  if (!title || !tag_id || !post_text) {
    alert("Please complete all required fields");
  } else {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        tag_id,
        post_text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector(".post-submit").addEventListener("submit", addPost);
