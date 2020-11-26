import React, { useRef, useEffect, useCallback, useState } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { v4 } from "uuid";
import { MdClose } from "react-icons/md";
import { userAction } from "../store/action/userAction";
import { useDispatch } from "react-redux";

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 600px;
  height: 300px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-evenly;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  p {
    margin-bottom: 1rem;
  }
  button {
    cursor: pointer;
    border: none;
    font-size: 15px;
    width: 100px;
    height: 40px;
    border-radius: 5px;
    transition: 0.4s;
    font-family: "Play", sans-serif;
    background-color: #242c44;
    color: #f3f3fb;
  }
  .input {
    background-color: #f3f3fb;
    border: none;
    font-color: red;
    width: 100%;
    height: 30px;
    border-bottom: 1px solid #f3f3fb;
  }
  .input:focus {
    outline: none;
    border-bottom: 1px solid #242c44;
  }
  .disabled {
    border-radius: 5px;
    font-weight: 700;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

export const Modal = (props) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const modalRef = useRef();
  const setUserInfo = useDispatch();

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: props.showModal ? 1 : 0,
    transform: props.showModal ? `translateY(0%)` : `translateY(-100%)`,
  });

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      props.setShowModal(false);
      setId("");
      setName("");
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && props.showModal) {
        props.setShowModal(false);
        setId("");
        setName("");
        console.log("I pressed");
      }
    },
    [props.setShowModal, props.showModal]
  );

  const handleClose = () => {
    props.setShowModal((prev) => !prev);
    setName("");
  };
  
  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  useEffect(() => {
    setId(props.type == "join" ? "" : v4());
  }, [props.showModal]);

  useEffect(() => {
    // console.log(props);
  }, []);

  const redirectToGame = () => {
    // console.log(props);
    setUserInfo(userAction(id, name, props.type));
    props.history.push(`/gamepage`);
  };

  return (
    <>
      {props.showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showModal={props.showModal}>
              <ModalContent>
                <h1>Are you ready?</h1>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {props.type === "host" ? (
                  <div className="hostId">{id}</div>
                ) : (
                  <input
                    type="text"
                    className="input"
                    placeholder="Enter your room-id"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />
                )}

                <button onClick={redirectToGame}>Join Now</button>
              </ModalContent>
              <CloseModalButton
                aria-label="Close modal"
                onClick={() => handleClose()}
              />
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};
