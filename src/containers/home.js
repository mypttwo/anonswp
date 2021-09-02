import React from "react";
import Deposit from "./deposit";
import Swap from "./swap";
import WallectConnect from "./walletConnect";
import Withdraw from "./withdraw";

class Home extends React.Component {
  depositFormJSX = () => {
    return <Deposit></Deposit>;
  };
  withdrawFormJSX = () => {
    return <Withdraw></Withdraw>;
  };
  swapFormJSX = () => {
    return <Swap></Swap>;
  };
  render() {
    return (
      <div className="App  min-vh-100">
        <nav className="navbar navbar-expand-md shadow navbar-dark">
          <div className="container-fluid d-flex justify-content-between">
            <div>Anonswap</div>
            <WallectConnect></WallectConnect>
          </div>
        </nav>
        <div className="container  min-vh-100">
          <div className="row min-vh-100">
            <div className="col">{this.depositFormJSX()}</div>
            <div className="col">{this.withdrawFormJSX()}</div>
            <div className="col">{this.swapFormJSX()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
