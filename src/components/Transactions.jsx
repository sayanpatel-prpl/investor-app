import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Transactions = (dataObj) => {

  const { data } = dataObj

  const getRows = () => {
    let ans = []
    let totalSum = 0
    data.sort((a, b) => Number(a.activity_id) - Number(b.activity_id)).map((datapoint) => {
      totalSum += datapoint.amount
      ans.push({ id: datapoint.activity_id, amount: datapoint.amount, balance: (totalSum), date: constructDate(datapoint.date), type: datapoint.type, desc: constructDesc(datapoint) })
    })
    return ans
  }

  const constructDate = (dateStr) => {
    let date = new Date(dateStr)
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
  }

  const constructDesc = (datapoint) => {
    let requestData = datapoint.requester ? `${datapoint.requester.type} from` : ""
    return `${requestData} ${datapoint.source.description || datapoint.source.type} to ${datapoint.destination.description}`
  }

  const rows = getRows()

  return (
    <div className='transactions'>
      <span>Past Transactions</span>
      <TableContainer className='table-container' component={Paper} elevation={0}>
        <Table sx={{ [`& .${tableCellClasses.root}`]: { borderBottom: "none" } }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className='cell'>Date</TableCell>
              <TableCell className='cell'>Transaction</TableCell>
              <TableCell className='cell'>Description</TableCell>
              <TableCell className='cell'>Amount</TableCell>
              <TableCell className='cell'>Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow className={row.amount > 0 ? 'green' : 'red'} key={row.id}>
                <TableCell component="th" scope="row">{row.date}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.desc}</TableCell>
                <TableCell>{Math.abs(row.amount)}</TableCell>
                <TableCell>{row.balance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Transactions

