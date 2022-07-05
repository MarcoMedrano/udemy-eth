import logo from "./logo.svg";
import "./App.css";
import React from "react";
import web3 from './web3';
import lottery from "./lottery";

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = { manager: '' };
  }

  async componentDidMount() {
    const manager = await lottery.methods.manager().call(/*{from: accounts[0]} not needed as using automatically first account from metamask*/);
    this.setState({ manager });
  }
  render() {

    console.log("Web3 Version" + web3.version);
    web3.eth.getAccounts().then(a => console.log("Accounts", a));

    return (
      <div className="App">
        <h2>Lottery Contract</h2>
        <p>
        This contract is managed by {this.state.manager}
        </p>

      </div>
    );
  }
}
export default App;
