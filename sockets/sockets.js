import { v4 as uuid } from "uuid";
import Messaje from '../models/messajes.js'


export default  (io) => {

  io.on("connection", async (socket) => {
    const messajes = await Messaje.find({}).lean()
    console.log("nuevo socket connectado:", socket.id);

    // Send all messages to the client
    socket.emit("server:loadmessajes", messajes);

    socket.on("client:newmessaje", async (newmessaje) => {
        console.log({ ...newmessaje, id: uuid() })
      const messaje = new Messaje({ ...newmessaje, id: uuid() })
      await messaje.save()
      io.emit("server:newmessaje", messaje);
    });


    socket.on("client:getmessaje", (messajeId) => {
      const messaje = messajes.find((messaje) => messaje.id === messajeId);
      socket.emit("server:selectedmessaje", messaje);
    });


    socket.on("disconnect", () => {
      console.log(socket.id, "disconnected");
    });
  });
};
