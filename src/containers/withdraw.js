import React from "react";
import { withdraw } from "../chain/withdraw";
import Loader from "react-loader-spinner";
import { connectAndListen } from "../utils/metamask2";
// import { getMaskedAddress } from "../utils/shorten";
import { getBalance } from "../chain/getBalance";
import { contractEventHandler } from "../chain/eventListener";
import { hash } from "../chain/hash";

class Withdraw extends React.Component {
  state = {
    account: "",
    balance: 0,
    processing: false,
  };
  contract = null;
  async componentDidMount() {
    let resp = await connectAndListen(this.accountsChanged);
    let balance = await getBalance();
    this.contract = await contractEventHandler(this.handleBought);
    this.setState({ account: resp.address, balance: balance });
  }

  handleBought = async (error, event) => {
    if (error) {
      console.error(error);
    }
    if (event.returnValues && event.returnValues.encAddress) {
      console.log("handleBought encAddress", event.returnValues.encAddress);
      let encAddress = await hash();
      if (encAddress == event.returnValues.encAddress) {
        let balance = await getBalance();
        this.setState({ balance: balance });
      }
    }
  };

  accountsChanged = async (address, status) => {
    let balance = await getBalance();
    this.setState({ account: address, balance: balance });
  };
  withdraw = () => {
    withdraw()
      .then(() => {
        console.log("withdraw succeeded");
        this.setState({ processing: false });
      })
      .catch((err) => {
        console.error("withdraw failed", err);
        this.setState({ processing: false });
      });
    this.setState({ processing: true });
  };
  render() {
    let btnJSX = (
      <button
        type="button"
        class="btn btn-outline-success"
        onClick={this.withdraw}
      >
        Withdraw
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
    let balanceClass = "badge bg-light text-dark";
    if (this.state.balance > 0) {
      balanceClass = "badge bg-warning text-dark";
    }
    return (
      <div className="card border-0" style={{ width: "18rem" }}>
        <form className="p-3 my-5">
          <div className="h4">Withdraw</div>
          <div className="small">
            Balance :{" "}
            <span class={balanceClass}>{this.state.balance} gDai</span>
          </div>
          <small id="withdrawHelp" class="form-text text-muted">
            If any DAI has been deposited into your address you can withdraw an
            equivalent amount of gDAI by clicking below...
          </small>
          <div className="my-2">{btnJSX}</div>
        </form>
      </div>
    );
  }
}

export default Withdraw;
