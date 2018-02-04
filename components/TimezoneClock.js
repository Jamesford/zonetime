import React from 'react'
import moment from 'moment-timezone'
import range from 'lodash/range'
import HomeIcon from './HomeIcon'

export default class TimezoneClock extends React.Component {
  static defaultProps = {
    timezones: [],
    minuteTicker: true,
    displayHtz: true
  };

  constructor (props) {
    super(props)

    this.state = {
      now: moment()
    }

    this.interval = null
    this.tick = this.tick.bind(this)
    this.onRemove = this.onRemove.bind(this)
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

  onRemove (e) {
    const { tz } = e.target.dataset
    const { onRemove } = this.props
    if (onRemove) onRemove(tz)
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
          background: #505050;
          opacity: 0.6;
          left: 50%;
          z-index: 0;
        }
        .hour.now:after {
          // background: rgba(255, 87, 34, 0.6);
          background: #59D9A4;
          left: ${hourPrct}%;
          z-index: 1;
        }
      `}</style>
    )
  }

  render () {
    const { now } = this.state
    const { timezones, minuteTicker, displayHtz } = this.props

    const htz = moment.tz.guess()
    const start = moment().tz(htz).startOf('day')

    // Ensure user's current timezone is shown
    if (displayHtz && !timezones.includes(htz)) timezones.push(htz)

    // Sort into offset order
    timezones.sort((a, b) => {
      return moment.tz.zone(a).utcOffset(now) - moment.tz.zone(b).utcOffset(now)
    })

    return (
      <div className='clock'>
        {minuteTicker && this.renderMinuteTicker(now)}

        <div className='columns'>
          <div className='zones'>
            {
              timezones.map((tz, x) => (
                <section className='meta' key={tz}>
                  { (tz !== htz || !displayHtz) &&
                    <div className='remove' data-tz={tz} onClick={this.onRemove}>&times;</div>
                  }

                  { tz === htz && <div className='home'><HomeIcon /></div> }

                  {tz.split('/')[1].replace('_', ' ')}<br />{now.tz(tz).format('HH:mm')}
                </section>
              ))
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

        <style jsx>{`
          .clock {
            background: #34373c;
            border-radius: 2px;
            box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
            padding: 5px;
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
            border-right: 1px solid #505050;
          }
          .zone {
            height: 101px;
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
            position: relative;
            height: 100px;
            width: 100px;
            border-top: 1px solid #505050;
            border-right: 1px solid #505050;
            border-left: 1px solid #505050;
          }
          .meta:last-child {
            border-bottom: 1px solid #505050
          }
          .meta .remove {
            position: absolute;
            top: -2px;
            right: 0;
            cursor: pointer;
            color: rgba(120, 120, 120, 0.5);
            padding: 0px 5px;
            // border-left: 1px solid #505050;
            // border-bottom: 1px solid #505050;
          }
          .meta .remove:hover {
            color: rgba(220, 90, 130, 1);
          }
          .meta .home {
            position: absolute;
            top: 0;
            left: 0;
            color: rgba(51, 51, 51, 0.25);
            padding: 3px;
          }

          .hour {
            position: relative;
            box-sizing: border-box;
            min-width: 40px;
            flex-basis: 1px;
            flex-grow: 1;
            height: 101px;
            border-right: 1px solid #505050;
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
            border-top: 1px solid #505050;
          }
          .hour .inner span {
            z-index: 2;
          }
          .zone:last-child .hour {
            border-bottom: 1px solid #505050;
          }
          .hour.now {
              border-left: 2px solid #8378F4 !important;
              border-right: 2px solid #8378F4 !important;
          }
          .hour.now.first {
            border-top: 2px solid #8378F4 !important;
          }
          .hour.now.first .inner {
            border-top: none;
          }
          .hour.now.last {
            border-bottom: 2px solid #8378F4 !important;
          }
          .hour.working {
            background: rgba(220, 90, 130, 0.07);
          }
        `}</style>
      </div>
    )
  }
}
