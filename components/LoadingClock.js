import React from 'react'
import Loader from './Loader'

export default class LoadingClock extends React.Component {
  render () {
    return (
      <div className='clock'>

      <Loader color='#ababab' />

      <style jsx>{`
        .clock {
          background: #fff;
          border-radius: 2px;
          box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
          padding: 5px;
          height: 300px;
        }
      `}</style>
    </div>
    )
  }
}
