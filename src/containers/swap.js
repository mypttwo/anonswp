import React from "react";
import { swap } from "../chain/swap";
import Loader from "react-loader-spinner";

class Swap extends React.Component {
  state = {
    amount: 0,
    processing: false,
  };
  update = (event) => {
    let { name, value } = event.target;
    let isValid = true;
    switch (name) {
      case "amount":
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
  swap = () => {
    swap(this.state.amount)
      .then(() => {
        console.log("swap succeeded");
        this.setState({ processing: false });
      })
      .catch((err) => {
        console.error("swap failed", err);
        this.setState({ processing: false });
      });
    this.setState({ processing: true });
  };
  render() {
    let btnJSX = (
      <button type="button" class="btn btn-outline-info" onClick={this.swap}>
        Swap
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
          <div className="h4">Swap</div>
          <small id="swapHelp" class="form-text text-muted">
            Swap any gDAI you have for an equivalent amount of DAI by clicking
            below...
          </small>
          <div class="row mt-3">
            <div class="col">
              <input
                type="text"
                class="form-control border border-success"
                placeholder="Amount in gDAI"
                name="amount"
                value={this.state.amount}
                onChange={this.update}
              />
            </div>

            <div class="col">{btnJSX}</div>
          </div>
        </form>
      </div>
    );
  }
}

export default Swap;
