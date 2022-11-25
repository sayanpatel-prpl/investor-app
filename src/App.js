import React, { useState, useEffect } from 'react';
import './App.css';
import Heading from './components/Heading';
import Transactions from './components/Transactions';

function App() {

  const [transactions, setTransactions] = useState([])

  const fetchdata = () => {
    fetch('complicated_ledger.json')
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data)
      })
  }

  useEffect(() => {
    fetchdata()
  }, [])

  const getBalance = () => {
    let sorted = transactions.sort((a, b) => Number(a.activity_id) - Number(b.activity_id))
    if (sorted.length) {
      return sorted[sorted.length - 1].balance
    } else {
      return 0
    }
  }

  const getTransactions = () => {
    let tr = transactions.sort((a, b) => Number(a.activity_id) - Number(b.activity_id))
    let uniqTr = []
    let uniqActivityId = []
    tr.map((datapoint) => {
      if (!uniqActivityId.includes(datapoint.activity_id)) {
        uniqTr.push(datapoint)
        uniqActivityId.push(datapoint.activity_id)
      }
    })
    return uniqTr
  }

  return (
    <div className="App">
      <Heading text="Investing Accounts" balance={getBalance()} />
      <Transactions data={getTransactions()} />
    </div>
  );
}

export default App;
