 async function addReaction(event) {
   event.preventDefault();

   const reaction_id = event.target.getAttribute('id');
   const post_id = window.location.toString().split("/")[window.location.toString().split("/").length - 1];

  const response = await fetch("/api/reactions", {
    method: "POST",
    body: JSON.stringify({
      reaction_id,
      post_id,
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



 document.querySelector(".reaction").addEventListener("click", addReaction);