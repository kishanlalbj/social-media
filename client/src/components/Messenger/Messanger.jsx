import { MdSend } from "react-icons/md";
import "./Messanger.css";

const Messanger = () => {
  return (
    <div className="messanger-wrapper">
      Messanger
      <div className="message-container">
        <div className="message-action-container">
          <input type="text" placeholder="Type here"></input>
          <MdSend />
        </div>
      </div>
    </div>
  );
};

export default Messanger;
