const googleMapsClient = require('@google/maps').createClient(require('./config'))
/** config.js */
/*
module.exports = {
  key: 'your API key here'
}
*/
const fs = require('fs')
const parser = require('strip-json-comments')

const route = []
const aboard = []

function convert (data) {
  const result = {
    'current': data.current,
    'route': route,
    'aboard': aboard
  }
  fs.writeFileSync('assets/data_convert.json', JSON.stringify(result))
}

function mapCallBack (data, isSecond) {
  isSecond = isSecond || 0
  if (isSecond) {
    if (route[0]) {
      convert(data)
      return
    }
    console.log('dataConvent route start')
    dataConvent(data, data.route, route)
  } else {
    console.log('dataConvent aboard start')
    dataConvent(data, data.aboard, aboard)
  }
}

function dataConvent (data, before, after, index) {
  index = index || 0
  const username = before[index]
  const profile = data.profile[username]
  const isStop = index === before.length - 1
  profile.username = username
  getLocation(data, profile, index, before, after, isStop)
}

function getLocation (data, profile, index, before, after, isStop) {
  googleMapsClient.geocode({
    address: profile.address
  }, function (err, response) {
    if (err) {
      console.error('查询太快了，稍微等待一下……')
      setTimeout(() => getLocation(data, profile, index, before, after, isStop), 3000)
      return
    }
    const {results} = response.json
    profile.address = results[0].formatted_address
    profile.location = {
      lat: results[0].geometry.location.lat,
      lng: results[0].geometry.location.lng
    }
    after[index] = profile
    console.log(`${index} - ${profile.nickname} complete.`)
    if (isStop) {
      console.log('dataConvent complete!')
      mapCallBack(data, true)
    } else {
      dataConvent(data, before, after, ++index)
    }
  })
}

function initMap () {
  const file = fs.readFileSync('assets/data.json')
  const data = JSON.parse(parser(file.toString()))
  mapCallBack(data)
}

initMap()
