


const pjson = require('../../package.json')
const config = require('../config/config')
const AppResponse = require('../models/AppResponse')
const dbService =  require('./DbService')
const LOG_PREFIX = 'SubService: '
const collection = 'data' // notification collection


module.exports.getHeath = () => {
  const { name, description, version } = pjson;
  return { name, description, version, env: config.app.env, stats: dbService.getStats(), keys: dbService.keys()}
} 

module.exports.receive = ( topic, data ) => {

  const key = `${collection}_${topic}`

  if (!dbService.has(key)) {

    dbService.set(key, [data])
  } else {

    const receivedDataList = dbService.get(key)
    receivedDataList.push(data)
    dbService.set(key, receivedDataList)
  }
    const info  = `New message received for topic:${topic}`
    console.info(`${LOG_PREFIX} ${info}`)

    return new AppResponse(info, topic, data)
  
}