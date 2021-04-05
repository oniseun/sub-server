


const pjson = require('../../package.json')
const config = require('../config/config')
const Notification = require('../models/Notification')
const RecievedResponse = require('../models/ReceivedResponse')
const dbService =  require('./DbService')
const LOG_PREFIX = 'SubService: '
const collection = 'notification' // notification collection


module.exports.getHeath = () => {
  const { name, description, version } = pjson;
  return { name, description, version, env: config.app.env, stats: dbService.getStats()}
} 

module.exports.receive = ( topic, body ) => {

  const key = `${collection}_${topic}`
  
  const { success, message, stats } = body;

  const notification = new Notification(success, topic, message, stats)

  if (!dbService.has(key)) {
    dbService.set(key, [notification])

  } else {

    const notifications = dbService.get(key)
    notifications.push(notification)
    dbService.set(key, notifications)
  }
    const info  = `New message received for topic:${topic}`
    console.info(`${LOG_PREFIX} ${info}`)

    return new RecievedResponse(info, topic, notification.stats.data)
  
}