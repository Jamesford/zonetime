import React from 'react'
import moment from 'moment-timezone'
import range from 'lodash/range'

export default class TimezoneClock extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      now: moment(),
      tick: true
    }

    this.interval = null
    this.tick = this.tick.bind(this)
  }

  componentDidMount () {
    this.interval = setInterval(this.tick, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  tick () {
    this.setState({ now: moment() })
  }

  renderMinuteTicker (now) {
    const hourPrct = parseInt((now.minutes() / 60) * 100, 10)
    return (
      <style>{`
        .hour.now:before,
        .hour.now:after {
          display: block;
          width: 1px;
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
        }
        .hour.now:before {
          background: rgba(240, 240, 240, 0.6);
          left: 50%;
          z-index: 0;
        }
        .hour.now:after {
          background: rgba(255, 87, 34, 0.6);
          left: ${hourPrct}%;
          z-index: 1;
        }
      `}</style>
    )
  }

  render () {
    const { now, tick } = this.state
    const htz = moment.tz.guess()
    const start = moment().tz(htz).startOf('day')
    const timezones = ['Asia/Shanghai', 'Europe/Berlin', 'America/New_York']

    // Ensure user's current timezone is shown
    if (!timezones.includes(htz)) timezones.push(htz)

    // Sort into offset order
    timezones.sort((a, b) => {
      return moment.tz.zone(a).utcOffset(now) - moment.tz.zone(b).utcOffset(now)
    })

    return (
      <div className='wrapper'>
        <div className='clock'>
          {tick && this.renderMinuteTicker(now)}

          <div className='columns'>
            <div className='zones'>
              {
                timezones.map((tz, x) => <section className='meta' key={tz}>{tz.split('/')[1]}{tz === htz ? '*' : ''}<br />{now.tz(tz).format('HH:mm')}</section>)
              }
            </div>

            <div className='hours'>
              {
                timezones.map((tz, x) => (
                  <div className='zone' key={tz}>
                    {
                      range(24).map(i => {
                        const time = start.clone().tz(tz).add(i, 'hours')
                        let className = 'hour'

                        // This Hour
                        if (time.hour() === now.tz(tz).hour()) className += ' now'

                        // Hour in first or last timezone
                        if (x === 0) className += ' first'
                        if (x === timezones.length - 1) className += ' last'

                        // Working Hours
                        if (time.hour() > 8 && time.hour() < 18) className += ' working'

                        return time.hour() === 0
                          ? <section key={`${tz}-${time.hour()}`} className={className}><div className='inner'><span>{time.format('MMM')}<br />{time.format('D')}</span></div></section>
                          : <section key={`${tz}-${time.hour()}`} className={className}><div className='inner'><span>{time.format('H')}</span></div></section>
                      })
                    }
                  </div>
                ))
              }
            </div>
          </div>
        </div>

        <style jsx>{`
          .wrapper {
            display: flex;
            justify-content: center;
          }
          .clock {
            background: #fff;
            border-radius: 2px;
            box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
            padding: 5px;
            width: 1600px;
            min-width: 300px;
          }
          .columns {
            display: flex;
          }
          .zones {
            flex-grow: 0;
          }
          .hours {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            overflow: auto;
            border-right: 1px solid rgb(238, 238, 238);
          }
          .zone {
            height: 100px;
            display: flex;
          }
          .meta,
          .hour {
            text-align: center;
          }
          .meta {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100px;
            width: 100px;
            border-top: 1px solid rgb(238, 238, 238);
            border-right: 1px solid rgb(238, 238, 238);
            border-left: 1px solid rgb(238, 238, 238);
          }
          .meta:last-child {
            border-bottom: 1px solid rgb(238, 238, 238)
          }

          .hour {
            position: relative;
            min-width: 40px;
            flex-basis: 1px;
            flex-grow: 1;
            height: 100px;
            border-right: 1px solid rgb(238, 238, 238);
          }
          .hour:last-child {
            border-right: none;
          }
          .hour .inner {
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            border-top: 1px solid rgb(238, 238, 238);
          }
          .hour .inner span {
            z-index: 2;
          }
          .zone:last-child .hour {
            border-bottom: 1px solid rgb(238, 238, 238);
          }
          .hour.now {
            border-left: 2px solid #3F51B5 !important;
            border-right: 2px solid #3F51B5 !important;
          }
          .hour.now.first {
            border-top: 2px solid #3F51B5 !important;
          }
          .hour.now.first .inner {
            border-top: none;
          }
          .hour.now.last {
            border-bottom: 2px solid #3F51B5 !important;
          }
          .hour.working {
            background: rgba(255, 250, 220, 0.55);
          }
        `}</style>
      </div>
    )
  }
}
