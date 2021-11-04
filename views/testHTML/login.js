function signUp(event) {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  console.log(email, password);
};

function loginHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#email-signup').value.trim();
  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  console.log(email, username, password);
}

document.querySelector('.login-form').addEventListener('submit', signUp);
document.querySelector('.signup-form').addEventListener('submit', loginHandler);