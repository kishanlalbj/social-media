import { MdWarning } from "react-icons/md";
import "./Error.css";

const Error = ({ error }) => {
  return (
    <>
      {error && (
        <div className="error-box">
          <p className="error-text">
            <MdWarning size={"28px"} />

            {error}
          </p>
        </div>
      )}
    </>
  );
};

export default Error;
