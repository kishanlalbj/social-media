import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { socket } from "../socket";
import { fetchNotificationsAsync } from "../app/slices/notifications";

const Socket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("notifyLikedPost", () => {
      dispatch(fetchNotificationsAsync());
    });
  }, [dispatch]);
};

export default Socket;
