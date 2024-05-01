import { RouterProvider } from "react-router-dom";
import routes from "./routes.jsx";
import { useSelector } from "react-redux";
import { socket } from "./socket.js";
import { useEffect } from "react";

const App = () => {
  const { currentUser } = useSelector((state) => state.auth);

  socket.on("connect", () => {
    console.log("Connected to server");
  });

  useEffect(() => {
    if (currentUser._id) socket.emit("joined", currentUser?._id);
  }, [currentUser?._id]);

  return (
    <div>
      <RouterProvider router={routes}></RouterProvider>
    </div>
  );
};

export default App;
