import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Chart from './Chart.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    fetch('/btc')
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }

  render() {

    let chartPoints = [];
    for (let key in this.state.data.bpi) {
      chartPoints.push({ x: key, y: this.state.data.bpi[key] });
    }
    const chartData = {
      datasets: [
        {
          label: 'BTC',
          data: chartPoints,
          fill: true,
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)'
        },
      ]
    };
    return (
      <div>
        <h1 id='title'> Crypto <br /> Tracker </h1>
        <Chart data={chartData} />
        <a id='disclaimer' href='https://www.coindesk.com/price/bitcoin' >{this.state.data.disclaimer}</a>
        <p id='info'>
          <a href='https://www.coindesk.com/learn/bitcoin-101/what-is-bitcoin'>Bitcoin </a>
          was the first cryptocurrency to successfully record transactions on a secure, decentralized
          <a href='https://www.euromoney.com/learning/blockchain-explained/what-is-blockchain'> blockchain-based network</a>
          . Launched in early 2009 by its pseudonymous creator
          <a href='https://en.wikipedia.org/wiki/Satoshi_Nakamoto' target='_blank' rel='noopener'> Satoshi Nakamoto</a>
          , Bitcoin is the largest cryptocurrency measured by market capitalization and amount of data stored on its blockchain.
          The Bitcoin software is free and available online to anyone who wants to run a Bitcoin node and store their own copy of the Bitcoin blockchain.
          As Bitcoin matures, engineers have designed additional protocols to improve the speed and privacy of Bitcoin transactions, including the
          <a href='https://www.omnilayer.org/' target='_blank' rel='noopener noreferrer'> Omni Layer</a>
          ,  and Liquid Network. Only approximately 21 million bitcoins will ever be created.
          New coins are minted every 10 minutes by bitcoin miners who help to maintain the network by adding new transaction data to the blockchain, the
          <a href='https://lightning.network/'> Lightning Network.</a>
        </p>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
