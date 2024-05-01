import io from "socket.io-client";


const URL = import.meta.env.VITE_BACKEND_SERVER_URL

export const socket = io.connect(URL);

