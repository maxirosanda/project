const socket = io.connect();

/**
 * create a new messaje
 * @param {string} email a email for a new messaje
 * @param {string} body a body for a new messaje
 */
const savemessaje = (email, body) => {
  socket.emit("client:newmessaje", {
    email,
    body,
  });
};



socket.on("server:loadmessajes", rendermessajes);

socket.on("server:newmessaje", appendmessaje);

socket.on("server:selectedmessaje", (messaje) => {
  const email = document.getElementById("email");
  const body = document.getElementById("body");

  email.value = messaje.email;
  body.value = messaje.body;

  savedId = messaje.id;
});