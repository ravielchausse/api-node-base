import SocketIO from "socket.io";
import server from "../index";

const io = new SocketIO(server);

export default io;
