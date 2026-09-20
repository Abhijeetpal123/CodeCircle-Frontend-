import { io } from "socket.io-client";

export const createSocketConnection = () => {
  return io("https://codecircle-nq5c.onrender.com");
};
