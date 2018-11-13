import React from 'react'
import NoSSR from 'react-no-ssr'
import Toggle from 'react-toggle'
import Layout from '../components/Layout'
import LoadingClock from '../components/LoadingClock'
import TimezoneClock from '../components/TimezoneClock'
import HomeIcon from '../components/HomeIcon'
import tzOptions from '../utils/timezones'
import Modal from '../components/Modal'

export default class Index extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      modal: false,
      settings: this.loadSettings()
    }
  }

  static DefaultSettings = () => {
    return {
      timezones: ['Asia/Shanghai', 'Europe/Berlin', 'America/New_York'],
      minuteTicker: true,
      displayHtz: true
    }
  }

  saveSettings = () => {
    if (process.browser) {
      console.log('saving settings', this.state.settings)
      localStorage.setItem('settings', JSON.stringify(this.state.settings))
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

  onTimezone = option => {
    const { settings } = this.state
    this.setState(
      {
        settings: {
          ...settings,
          timezones: [...settings.timezones, option]
        }
      },
      this.saveSettings
    )
  }

  onRemoveTimezone = option => {
    const { settings } = this.state
    this.setState(
      {
        settings: {
          ...settings,
          timezones: settings.timezones.filter(tz => tz !== option)
        }
      },
      this.saveSettings
    )
  }

  onToggle = evt => {
    const { name, checked } = evt.target
    const { settings } = this.state
    this.setState(
      {
        settings: {
          ...settings,
          [name]: checked
        }
      },
      this.saveSettings
    )
  }

  onModal = () => {
    this.setState(state => ({
      modal: !state.modal
    }))
  }

  render() {
    const { modal } = this.state
    const { timezones, minuteTicker, displayHtz } = this.state.settings

    return (
      <Layout>
        {modal && (
          <Modal
            onClose={this.onModal}
            timezones={tzOptions}
            selected={timezones}
            onAdd={this.onTimezone}
          />
        )}

        <h1>Zonetime</h1>

        <NoSSR onSSR={<LoadingClock />}>
          <TimezoneClock
            timezones={timezones}
            minuteTicker={minuteTicker}
            displayHtz={displayHtz}
            onRemove={this.onRemoveTimezone}
          />
        </NoSSR>

        <div className="options">
          <div className="left">
            <button className="opt" onClick={this.onModal}>
              Add Timezone
            </button>
          </div>

          <div className="right">
            <label className="opt">
              <NoSSR onSSR={<Toggle checked={true} icons={false} readOnly />}>
                <Toggle
                  name="minuteTicker"
                  checked={minuteTicker}
                  onChange={this.onToggle}
                  icons={false}
                />
              </NoSSR>
              <span>Minute Indicator</span>
            </label>

            <label className="opt">
              <NoSSR onSSR={<Toggle checked={true} icons={false} readOnly />}>
                <Toggle
                  name="displayHtz"
                  checked={displayHtz}
                  onChange={this.onToggle}
                  icons={false}
                />
              </NoSSR>
              <span>Always Show My Timezone</span>
            </label>
          </div>
        </div>

        <style jsx>{`
          .options {
            margin: 20px 0;
            display: flex;
          }
          .left {
            display: flex;
          }
          .right {
            flex-grow: 1;
            display: flex;
            justify-content: flex-end;
          }
          .opt {
            display: flex;
            align-items: center;
            cursor: pointer;
            padding: 8px 10px;
          }
          .opt > span {
            margin-left: 5px;
          }
          button.opt {
            border: none;
            font-size: 1em;
            background: #3f51b5;
            color: #fff;
            box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
            border-radius: 2px;
          }
          @media screen and (max-width: 699px) {
            .options,
            .right {
              flex-direction: column;
            }
            .opt {
              margin: 0;
            }
            button.opt {
              flex-grow: 1;
              margin-bottom: 10px;
            }
          }
        `}</style>
      </Layout>
    )
  }
}
