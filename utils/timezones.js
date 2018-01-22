import moment from 'moment-timezone'

export default moment.tz.names()
  .filter(tz => /^([A-z0-9+-]{1,}\/)+[A-z0-9+-]{1,}$/.test(tz))
  .map(tz => {
    const label = tz.indexOf('Etc') > -1
      ? tz.replace('Etc/', '')
      : tz.replace(/_/g, ' ').replace(/\//g, ' / ')

    return { label, value: tz }
  })
