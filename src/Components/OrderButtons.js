import React, { Component } from "react";

class OrderButtons extends Component {
  state = {
    view: "0",
    timerStart: 0,
    timerTime: sessionStorage.getItem(`timerStart${this.props.i}`)
      ? sessionStorage.getItem(`timerStart${this.props.i}`)
      : 0,
  };
  startOrder = () => {
    this.setState({
      view: "1",
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime,
    });
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart,
      });
      sessionStorage.setItem(`timerStart${this.props.i}`,Date.now() - this.state.timerStart);
    }, 1000);
    sessionStorage.setItem(`view${this.props.i}`, "1");
  };
  finishOrder = () => {
    this.setState({
      view: "2",
    });
    clearInterval(this.timer);
    sessionStorage.setItem(`view${this.props.i}`, "2");
  };
  isView = () => {
    if (sessionStorage.getItem(`view${this.props.i}`)) {
      this.setState({
        view: sessionStorage.getItem(`view${this.props.i}`),
      });
    }
  };

  componentDidMount() {
    this.isView();
    if (sessionStorage.getItem(`view${this.props.i}`) === "1") {
      this.startOrder();
    }
  }
  render() {
    const { timerTime } = this.state;
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);

    sessionStorage.setItem(`seconds${this.props.i}`, seconds);
    sessionStorage.setItem(`minutes${this.props.i}`, minutes);
    sessionStorage.setItem(`hours${this.props.i}`, hours);

    return (
      <div className="col-md-4 mt-3">
        <div className="card">
          <div className="card-header text-center">
            <strong>New Order</strong>
            <hr />
            <div className="d-flex justify-content-between">
              <div>
                Recieved time:
                <div>
                  <strong>{this.props.times}</strong>
                </div>
              </div>
              <div>
                Preparing time:
                <div>
                  <strong>
                    {hours}:{minutes}:{seconds}
                  </strong>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div>{this.props.thing_name}</div>
              <div>{this.props.quantity}</div>
            </div>
            <hr />
            <div>Comment: {this.props.comment}</div>
          </div>
          <div className="card-footer d-flex justify-content-end">
            {this.state.view === "0" && (
              <>
                <button
                  className="btn btn-primary mr-3"
                  onClick={this.startOrder}
                >
                  Start order
                </button>
                <button className="btn btn-danger">Cancel</button>
              </>
            )}
            {this.state.view === "1" && (
              <>
                <button
                  className="btn btn-primary mr-3"
                  onClick={this.finishOrder}
                >
                  Finish order
                </button>
                <button className="btn btn-danger">Cancel</button>
              </>
            )}
            {this.state.view === "2" && <div>Driver is on the way</div>}
          </div>
        </div>
      </div>
    );
  }
}
export default OrderButtons;
