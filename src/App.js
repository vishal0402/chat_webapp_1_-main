import React, { Component } from "react";
import socketClient from "socket.io-client";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Components/Home/Home";
import Filter from "./Components/Filter/Filter";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
  }

  render() {
    socket.on("disconnect", () => {
      console.log("disconnected");
      this.props.history.push("/");
    });
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/Filter" component={Filter} />
            <Route
              component={() => {
                return <div>Forbidden</div>;
              }}
            />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export const socket = socketClient("https://node-assignment3.herokuapp.com/", {
  transports: ["websocket"],
});
socket.on("connect", () => {
  console.log("Connected With Server");
});
