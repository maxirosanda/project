const messajesList = document.querySelector("#messajes");

let savedId = "";

const messajeUI = (messaje) => {
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="card card-body rounded-0 animate__animated animate__fadeInUp mb-2">
      <div class="d-flex justify-content-between">
          <h1 class="card-email h3">${messaje.email}</h1>
      </div>
      <p>${messaje.body}</p>
  </div>
`;


  return div;
};

const rendermessajes = (messajes) => {
  savedId = "";
  messajesList.innerHTML = "";
  console.log(messajes);
  messajes.forEach((messaje) => {
    messajesList.append(messajeUI(messaje));
  });
};

const appendmessaje = (messaje) => {
  messajesList.append(messajeUI(messaje));
};