import React from "react";
import { deposit } from "../chain/deposit";
import Loader from "react-loader-spinner";

class Deposit extends React.Component {
  state = {
    address: "",
    deposit: 0,
    processing: false,
  };
  update = (event) => {
    let { name, value } = event.target;
    let isValid = true;
    switch (name) {
      case "deposit":
        const regexp = new RegExp(`^[0-9]*$`);
        if (!regexp.test(value)) {
          isValid = false;
        }
        break;
      default:
        break;
    }
    if (isValid) {
      this.setState({
        [name]: value,
      });
    }
  };
  //0x05a538A4Dc2917FbB5ef5c29aA41001B2b545Ef2
  deposit = () => {
    deposit(this.state.address, this.state.deposit)
      .then(() => {
        console.log("Trx Completed");
        this.setState({ processing: false });
      })
      .catch((err) => {
        console.error("Trx Failed", err);
        this.setState({ processing: false });
      });
    this.setState({ processing: true });
  };
  render() {
    let btnJSX = (
      <button
        type="button"
        class="btn btn-outline-warning"
        onClick={this.deposit}
      >
        Deposit
      </button>
    );
    if (this.state.processing) {
      btnJSX = (
        <Loader
          type="ThreeDots"
          color="#00BFFF"
          height={50}
          width={50}
          //   timeout={30000}
        />
      );
    }
    return (
      <div className="card border-0" style={{ width: "18rem" }}>
        <form className="p-3 my-5">
          <div className="h4">Deposit</div>
          <div class="form-group my-2">
            {/* <label for="address mb-2">Destination Address</label> */}
            <input
              type="text"
              class="form-control border border-success"
              id="address"
              placeholder="Enter Destination Address"
              value={this.state.address}
              onChange={this.update}
              name="address"
            />
            <small id="addressHelp" class="form-text text-muted">
              Enter the Destination Address you want the gDai to be minted to...
            </small>
          </div>
          <div class="row mt-3">
            <div class="col">
              <input
                type="text"
                class="form-control border border-success"
                placeholder="Amount in DAI"
                value={this.state.deposit}
                onChange={this.update}
                name="deposit"
              />
            </div>

            <div class="col">{btnJSX}</div>
          </div>
        </form>
      </div>
    );
  }
}

export default Deposit;
