import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { socket } from "../../App";
import "./Filter.css";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      StartDateVal: "",
      EndDateVal: "",
      APILinkForFilteringData:
        "https://nodeassignmentt3.herokuapp.com/FilteredData",
      Data: [],
    };
  }

  logOff = () => {
    this.props.history.push("/");
  };

  InputStartDateChg = (e) => {
    this.setState({
      StartDateVal: e.target.value,
    });
  };
  InputEndDateChg = (e) => {
    this.setState({
      EndDateVal: e.target.value,
    });
  };
  btnFilterr = async () => {
    let DataSend = {
      StartDate: this.state.StartDateVal,
      EndDate: this.state.EndDateVal,
    };
    let Data = await axios.post(this.state.APILinkForFilteringData, DataSend);
    this.setState({
      Data: Data.data,
    });
  };
  render() {
    return (
      <>
        <div style={{ position: "relative", width: "100%" }}>
          <button onClick={this.logOff}>Back To Data Page</button>
          <form
            className="formDivision"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="InputStartDate">
              <h3>Start Date</h3>
              <input onChange={this.InputStartDateChg} type="datetime-local" />
            </div>
            <div className="InputEndDate">
              <h3>End Date</h3>
              <input onChange={this.InputEndDateChg} type="datetime-local" />
            </div>

            <div className="BtnFilter">
              <button onClick={this.btnFilterr}>Filter</button>
            </div>
          </form>
        </div>
        <div className="FilteredDataa">
          <div>
            <tr>
              <th className="Border-Table">Temperature</th>
              <th className="Border-Table">Battery Level</th>
              <th className="Border-Table">Time Stamp</th>
            </tr>
            {this.state.Data.length ? (
              this.state.Data.map((ite, index) => {
                return (
                  <>
                    <tr key={{ index }}>
                      <td className="Border-Table">{ite.TemperatureLevel}</td>
                      <td className="Border-Table">{ite.BatteryLevel}</td>
                      <td className="Border-Table">
                        {ite.Time.split("T")[0] + " " + ite.Time.split("T")[1]}
                      </td>
                    </tr>
                  </>
                );
              })
            ) : (
              <tr>
                <td className="Border-Table" colSpan="3">
                  Data Not Available
                </td>
              </tr>
            )}
          </div>
        </div>
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
  CurrentUserDet: state.Reducer,
});

export default withRouter(connect(null, null)(Filter));
