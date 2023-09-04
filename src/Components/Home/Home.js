// import axios from 'axios';
import React, { Component } from "react";
import { withRouter } from "react-router";
import "./Home.css";
import { socket } from "../../App";
import { connect } from "react-redux";
import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      APILinkForData: "https://node-assignment3.herokuapp.com/Values",
      Data: [],
      DataReceived: false,
    };
  }
  async componentDidMount() {
    let Dataa = (await axios.get(this.state.APILinkForData)).data;
    console.log(Dataa.length);
    this.setState({
      Data: Dataa,
      DataReceived: true,
    });
    socket.on("Dataa", (Dataaa) => {
      let temp = this.state.Data;
      temp.push(Dataaa);
      this.setState({
        Data: temp,
      });
    });
  }

  render() {
    var arr = this.state.Data.slice(-20);
    return (
      <>
        {this.state.DataReceived ? (
          <div className="division">
            <table style={{ borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <th className="Border-Table" colSpan="3">
                    Database Stored Data
                  </th>
                </tr>
                <tr>
                  <th className="Border-Table">Temperature</th>
                  <th className="Border-Table">Battery Level</th>
                  <th className="Border-Table">Time Stamp</th>
                </tr>
                {this.state.Data.length > 20
                  ? arr.map((ite, index) => {
                      return (
                        <>
                          <tr key={{ index }}>
                            <td className="Border-Table">
                              {ite.TemperatureLevel}
                            </td>
                            <td className="Border-Table">{ite.BatteryLevel}</td>
                            <td className="Border-Table">
                              {ite.Time.split("T")[0] +
                                " " +
                                ite.Time.split("T")[1]}
                            </td>
                          </tr>
                        </>
                      );
                    })
                  : this.state.Data.map((ite, index) => {
                      return (
                        <>
                          <tr key={{ index }}>
                            <td className="Border-Table">
                              {ite.TemperatureLevel}
                            </td>
                            <td className="Border-Table">{ite.BatteryLevel}</td>
                            <td className="Border-Table">
                              {ite.Time.split("T")[0] +
                                " " +
                                ite.Time.split("T")[1]}
                            </td>
                          </tr>
                        </>
                      );
                    })}
              </tbody>
            </table>
            <button
              onClick={() => {
                this.props.history.push("/Filter");
              }}
            >
              Filter
            </button>
          </div>
        ) : (
          "Loading"
        )}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  UserLoggedIn: (payload, type) =>
    dispatch({
      type: type,
      payload: payload,
    }),
});
const mapStateToProps = (state) => ({
  loginCred: state.Reducer,
});

export default withRouter(connect(null, null)(Home));
