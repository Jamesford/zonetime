import React from 'react'
import Layout from '../components/Layout'
import TimezoneClock from '../components/TimezoneClock'

export default () => (
  <Layout>
    <h1>Zonetime <code>(beta)</code></h1>

    <TimezoneClock
      timezones={[
        'Asia/Shanghai',
        'Europe/Berlin',
        'America/New_York'
      ]}
      minuteTicker={true}
      displayHtz={true}
    />

    {/*<h4>Controls</h4>

    <div className='card'>
      <select>
        <option>Timezone 1</option>
        <option>Timezone 2</option>
        <option>Timezone 3</option>
        <option>Timezone 4</option>
        <option>Timezone 5</option>
      </select>
    </div>*/}

    <style jsx>{`
      .card {
        background: #fff;
        border-radius: 2px;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        // margin: 1em 0;
        padding: 5px;
      }
    `}</style>
  </Layout>
)
