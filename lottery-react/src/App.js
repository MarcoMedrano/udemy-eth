
import "./App.css";
import React from "react";
import web3 from './web3';
import lottery from "./lottery";

class App extends React.Component {

  state = { manager: '', players: [], balance: '', value: '', message: '' };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call(/*{from: accounts[0]} not needed as using automatically first account from metamask*/);
    const players = await lottery.methods.getPlayers().call(); /**just to get transactions */
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  onSubmit = async (e) => {
    e.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Waiting on transaction..." });

    // this transaction will take about 15s
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether"),
    });// to send it, is needed to specify the account

    this.setState({ message: "A winner has been picked!" });
  }

  onClick = async (e) => {

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Waiting on transaction..." });

    // this transaction will take about 15s
    await lottery.methods.pickWinner().send({ from: accounts[0] });// to send it is needed to specify the account

    this.setState({ message: "You have entered." });
  }

  render() {

    console.log("Web3 Version" + web3.version);
    // web3.eth.getAccounts().then(a => console.log("Accounts", a));

    return (
      <div className="App">
        <h2>Lottery Contract</h2>
        <p>
          This contract is managed by {this.state.manager}
          There are currently <strong>{this.state.players.length}</strong> people entered
          competing to win <strong>{web3.utils.fromWei(this.state.balance, 'ether')}</strong> ether.
        </p>

        <hr />

        <form onSubmit={this.onSubmit}>
          <h4> Want to try luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input value={this.state.value} onChange={e => this.setState({ value: e.target.value })} />
          </div>
          <button>Enter</button>
        </form>

        <hr />
        <h5> Pickup winner </h5>
        <button onClick={this.onClick}>Pick</button>

        <hr />
        <h5> {this.state.message} </h5>
      </div>
    );
  }
}
export default App;
