import React from 'react';

const Heading = (dataObj) => {

  const { text, balance } = dataObj

  return (
    <div className='heading'>
      <div className='header-elements'>
        <div className='header-text'>{text}</div>
        <div className='header-balance'>Balance: {balance} INR</div>
      </div>
    </div>
  )
}

export default Heading