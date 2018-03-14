import React from 'react'
import NoSSR from 'react-no-ssr'
import Select from 'react-select'
import Toggle from 'react-toggle'
import Layout from '../components/Layout'
import LoadingClock from '../components/LoadingClock'
import TimezoneClock from '../components/TimezoneClock'
import HomeIcon from '../components/HomeIcon'
import tzOptions from '../utils/timezones'
import Modal from '../components/Modal'

export default class Index extends React.Component {
  constructor (props) {
    super(props)

    this.state = this.loadSettings()
  }

  static DefaultSettings = () => {
    return {
      timezones: [
        'Asia/Shanghai',
        'Europe/Berlin',
        'America/New_York'
      ],
      minuteTicker: true,
      displayHtz: true
    }
  }

  saveSettings = () => {
    if (process.browser) {
      console.log('saving settings', this.state)
      localStorage.setItem('settings', JSON.stringify(this.state))
    }
  }

  loadSettings = () => {
    if (process.browser) {
      const saved = JSON.parse(localStorage.getItem('settings'))
      console.log('loading settings', saved)
      return saved ? saved : Index.DefaultSettings()
    }
    return Index.DefaultSettings()
  }

  onTimezone = (option) => {
    const { timezones } = this.state
    this.setState({
      timezones: [
        ...timezones,
        option.value
      ]
    }, this.saveSettings)
  }

  onRemoveTimezone = (option) => {
    const { timezones } = this.state
    this.setState({
      timezones: timezones.filter(tz => tz !== option)
    }, this.saveSettings)
  }

  onToggle = (evt) => {
    const { name, checked } = evt.target
    this.setState({
      [name]: checked
    }, this.saveSettings)
  }

  render () {
    const { timezones, minuteTicker, displayHtz } = this.state

    return (
      <Layout>
        <Modal />

        <h1>Zonetime <code>(beta)</code></h1>

        <NoSSR onSSR={<LoadingClock />}>
          <TimezoneClock
            timezones={timezones}
            minuteTicker={minuteTicker}
            displayHtz={displayHtz}
            onRemove={this.onRemoveTimezone}
          />
        </NoSSR>

        <small className='definition'>
          <HomeIcon fill='rgba(51, 51, 51, 0.7)' /> = your timezone (est)
        </small>

        <div className='card'>
          <div className='opt select'>
            <Select
              placeholder='View more timezones...'
              onChange={this.onTimezone}
              options={tzOptions}
            />
          </div>

          <label className='opt'>
            <NoSSR onSSR={<Toggle checked={true} icons={false} readOnly />}>
              <Toggle
                name='minuteTicker'
                checked={minuteTicker}
                onChange={this.onToggle}
                icons={false}
              />
            </NoSSR>
            <span>Show Minute Ticker</span>
          </label>

          <label className='opt'>
            <NoSSR onSSR={<Toggle checked={true} icons={false} readOnly />}>
              <Toggle
                name='displayHtz'
                checked={displayHtz}
                onChange={this.onToggle}
                icons={false}
              />
            </NoSSR>
            <span>Always Show My Timezone</span>
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
          .definition {
            display: block;
            margin: 5px 0 0 0;
            color: rgba(51, 51, 51, 0.7);
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
