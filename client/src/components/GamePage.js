import React, { useState, useEffect } from "react";
import { numbers } from "./numbers";
import socketIoCilent from "socket.io-client";
import { useSelector } from "react-redux";
import Button from "./Button";
import "./gamepage.css";

let socket;
const ENDPOINT = "http://localhost:5000";

const GamePage = (props) => {
  const [whole, setWhole] = useState(numbers);
  const [oppositeUser, setOppositeUser] = useState("");
  const [yourTurn, setYourTurn] = useState(false);
  const [oppTurn, setOppTurn] = useState(false);
  const [bingo, setBingo] = useState(["B", "I", "N", "G", "O"]);
  const [number, setNumber] = useState("...");

  const state = useSelector((state) => state);

  useEffect(() => {
    socket = socketIoCilent(ENDPOINT);
    socket.emit("user-connection", {
      id: state.id,
      name: state.userName,
      type: state.type,
    });

    socket.on("warning-msg", ({ msg }) => {
      alert(msg);
      props.history.push("/");
    });

    socket.on("opposite-user", ({ oppositeUser }) => {
      if (state.type == "host") {
        oppositeUser.join && setOppositeUser(oppositeUser.join);
        oppositeUser.join && setYourTurn(true);
      } else {
        setOppositeUser(oppositeUser.host);
        setOppTurn(true);
      }
    });

    socket.on("number-receive", ({ number }) => {
      setNumber(number);
      document.getElementById(number.toString()).disabled = true;
      fillStar(number);
      setYourTurn(true);
      setOppTurn(false);
    });

    socket.on("finish-game", ({ name }) => {
      alert(`${name === state.userName ? "You" : name} is win`);
      socket.disconnect();
      props.history.push("/");
    });
  }, []);

  useEffect(() => {
    shuffle();
  }, []);

  useEffect(() => {
    winnerCheck();
  }, [whole]);

  const shuffle = () => {
    const wholeTemp = [...whole];
    for (var i = 24; i >= 1; i--) {
      let number = Math.floor(Math.random() * 5);
      let temp = wholeTemp[i];
      wholeTemp[i] = wholeTemp[number];
      wholeTemp[number] = temp;
    }
    setWhole(wholeTemp);
  };

  const handleButton = (number) => {
    setNumber(number);
    document.getElementById(number.toString()).disabled = true;
    socket.emit("send-number", { number, id: state.id });
    fillStar(number);
    setYourTurn(false);
    setOppTurn(true);
    winnerCheck();
  };

  const fillStar = (number) => {
    setWhole((prv) => {
      return prv.map((each) => (each == number ? "*" : each));
    });
  };

  const winnerCheck = () => {
    let cnt = 0;
    if (
      whole[0] == "*" &&
      whole[1] == "*" &&
      whole[2] == "*" &&
      whole[3] == "*" &&
      whole[4] == "*"
    ) {
      cnt++;
    }
    if (
      whole[5] == "*" &&
      whole[6] == "*" &&
      whole[7] == "*" &&
      whole[8] == "*" &&
      whole[9] == "*"
    ) {
      cnt++;
    }
    if (
      whole[10] == "*" &&
      whole[11] == "*" &&
      whole[12] == "*" &&
      whole[13] == "*" &&
      whole[14] == "*"
    ) {
      cnt++;
    }
    if (
      whole[15] == "*" &&
      whole[16] == "*" &&
      whole[17] == "*" &&
      whole[18] == "*" &&
      whole[19] == "*"
    ) {
      cnt++;
    }
    if (
      whole[20] == "*" &&
      whole[21] == "*" &&
      whole[22] == "*" &&
      whole[23] == "*" &&
      whole[24] == "*"
    ) {
      cnt++;
    }
    if (
      whole[0] == "*" &&
      whole[5] == "*" &&
      whole[10] == "*" &&
      whole[15] == "*" &&
      whole[20] == "*"
    ) {
      cnt++;
    }
    if (
      whole[1] == "*" &&
      whole[6] == "*" &&
      whole[11] == "*" &&
      whole[16] == "*" &&
      whole[21] == "*"
    ) {
      cnt++;
    }
    if (
      whole[2] == "*" &&
      whole[7] == "*" &&
      whole[12] == "*" &&
      whole[17] == "*" &&
      whole[22] == "*"
    ) {
      cnt++;
    }
    if (
      whole[3] == "*" &&
      whole[8] == "*" &&
      whole[13] == "*" &&
      whole[18] == "*" &&
      whole[23] == "*"
    ) {
      cnt++;
    }
    if (
      whole[4] == "*" &&
      whole[9] == "*" &&
      whole[14] == "*" &&
      whole[19] == "*" &&
      whole[24] == "*"
    ) {
      cnt++;
    }
    if (
      whole[0] == "*" &&
      whole[6] == "*" &&
      whole[12] == "*" &&
      whole[18] == "*" &&
      whole[24] == "*"
    ) {
      cnt++;
    }
    if (
      whole[4] == "*" &&
      whole[8] == "*" &&
      whole[12] == "*" &&
      whole[16] == "*" &&
      whole[20] == "*"
    ) {
      cnt++;
    }
    setBingo((curr) => curr.map((ele, idx) => (idx + 1 <= cnt ? "-" : ele)));
    if (cnt === 5) {
      socket.emit("winner", { id: state.id, name: state.userName });
    }
  };

  return (
    <section className="main-page">
      <nav className="navbar">
        <span className="logo">Bingo</span>
        <button className="btn-big" onClick={shuffle}>
          Newgame
        </button>
      </nav>
      <div className="gamepage__namepart">
        <div className={yourTurn && "turn"}>{state.userName}</div>
        <div className={oppTurn && "turn"}>
          {oppositeUser ? oppositeUser : "Waiting...."}
        </div>
      </div>
      <div className="gamepage__number">
        <h1>{number}</h1>
      </div>
      <div className="game-part">
        <section className="card">
          <div className="title">
            {bingo.map((ele) => (
              <lable>{ele}</lable>
            ))}
          </div>
          <div className="content">
            <div className="raw">
              {whole.map(
                (ele, index) =>
                  index >= 0 &&
                  index <= 4 && (
                    <Button key={index} val={ele} onclick={handleButton} />
                  )
              )}
            </div>
            <div className="raw">
              {whole.map(
                (ele, index) =>
                  index >= 5 &&
                  index <= 9 && (
                    <Button key={index} val={ele} onclick={handleButton} />
                  )
              )}
            </div>
            <div className="raw">
              {whole.map(
                (ele, index) =>
                  index >= 10 &&
                  index <= 14 && (
                    <Button key={index} val={ele} onclick={handleButton} />
                  )
              )}
            </div>
            <div className="raw">
              {whole.map(
                (ele, index) =>
                  index >= 15 &&
                  index <= 19 && (
                    <Button key={index} val={ele} onclick={handleButton} />
                  )
              )}
            </div>
            <div className="raw">
              {whole.map(
                (ele, index) =>
                  index >= 20 &&
                  index <= 24 && (
                    <Button key={index} val={ele} onclick={handleButton} />
                  )
              )}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default GamePage;
