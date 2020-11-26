import React, { useState, useEffect } from "react";
import { Modal } from "./Modal";
import "./join.css";

const Join = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState("");
  const modalOpen = (type) => {
    setShowModal((prv) => !prv);
    setType(type === "host" ? "host" : "join");
  };

  return (
    <div className="main-content">
      <div className="card-home">
        <button className="btn-mid btn-dark" onClick={() => modalOpen("host")}>
          Host
        </button>
        <button className="btn-mid btn-light" onClick={() => modalOpen("join")}>
          Join
        </button>
      </div>

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        type={type}
        {...props}
      />
    </div>
  );
};

export default Join;
