function addPost(event) {
  event.preventDefault();

  const title = document.querySelector('#title').value.trim();
  const postType = document.querySelector('#type').value.trim();
  const postText = document.querySelector('#text').value.trim();

  if (!title || !postType || !postText) {
    alert('Please complete all required fields')
  } else {
    console.log(title);
    console.log(postType);
    console.log(postText);
  }
}

document.querySelector('.post-submit').addEventListener('submit', addPost)