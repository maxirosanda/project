const messajeForm = document.querySelector("#messajeForm");
const email = document.querySelector("#email");
const body = document.querySelector("#body");

messajeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (savedId) {
    updatemessaje(savedId, email.value, body.value);
  } else {
    savemessaje(email.value, body.value);
  }

  email.value = "";
  body.value = "";

  email.focus();
});