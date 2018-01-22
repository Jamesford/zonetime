import React from 'react'
import Select from 'react-select'
import Toggle from 'react-toggle'
import Layout from '../components/Layout'
import TimezoneClock from '../components/TimezoneClock'
import tzOptions from '../utils/timezones'

export default class Index extends React.Component {
  state = {
    timezones: [
      'Asia/Shanghai',
      'Europe/Berlin',
      'America/New_York'
    ],
    minuteTicker: true,
    displayHtz: true
  }

  onTimezone = (option) => {
    const { timezones } = this.state
    this.setState({
      timezones: [
        ...timezones,
        option.value
      ]
    })
  }

  onToggle = (evt) => {
    const { name, checked } = evt.target
    this.setState({
      [name]: checked
    })
  }

  render () {
    const { timezones, minuteTicker, displayHtz } = this.state

    return (
      <Layout>
        <h1>Zonetime <code>(beta)</code></h1>

        <TimezoneClock
          timezones={timezones}
          minuteTicker={minuteTicker}
          displayHtz={displayHtz}
        />

        <small>* Your estimated timezone</small>

        <div className='card'>
          <div className='opt select'>
            <Select
              placeholder='View more timezones...'
              onChange={this.onTimezone}
              options={tzOptions}
            />
          </div>

          <label className='opt'>
            <Toggle
              name='minuteTicker'
              checked={minuteTicker}
              onChange={this.onToggle}
              icons={false}
            />
            <span>Show Minute Ticker</span>
          </label>

          <label className='opt'>
            <Toggle
              name='displayHtz'
              checked={displayHtz}
              onChange={this.onToggle}
              icons={false}
            />
            <span>Always Show Estimated Timezone</span>
          </label>
        </div>

        <style jsx>{`
          .card {
            background: #fff;
            border-radius: 2px;
            box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
            margin: 1em 0;
            padding: 5px;
            display: flex;
            align-items: center;
          }
          .card label {
            display: flex;
            align-items: center;
          }
          .card label span {
            margin-left: 5px;
          }
          .card .opt {
            cursor: pointer;
            margin: 0 10px;
          }
          .card .opt:first-child {
            margin-left: 0;
          }
          .card .opt:last-child {
            margin-right: 0;
          }
          .card .select {
            flex-grow: 1;
          }
          @media screen and (min-width:650px) and (max-width:900px){
            .card .select {
              width: 100%;
            }
          }
          @media screen and (max-width:649px){
            .card {
              flex-direction: column;
              align-items: stretch;
            }
            .card .opt {
              margin: 5px 0;
            }
            .card .opt:first-child {
              margin-top: 0;
            }
            .card .opt:last-child {
              margin-bottom: 0;
            }
          }
        `}</style>
      </Layout>
    )
  }
}
