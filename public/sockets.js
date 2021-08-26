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

/**
 * delete a messaje based on an Id
 * @param {string} id a messaje ID
 */
const deletemessaje = (id) => {
  socket.emit("client:deletemessaje", id);
};

/**
 * 
 * @param {string} id messaje ID
 * @param {string} email messaje email 
 * @param {string} body messaje body
 */
const updatemessaje= (id, email, body) => {
  socket.emit("client:updatemessaje", {
    id,
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