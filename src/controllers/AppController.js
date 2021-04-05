
const subService = require('../services/SubService')
const { StatusCodes } = require('http-status-codes')
const enums = require('../config/enums')

module.exports.getHealth =  (req, res) => {

  return res.status(StatusCodes.OK).json(subService.getHeath())

}

module.exports.receive = (req, res) => {

  const { params: { topic }, body } = req

  const response = subService.receive(topic, body)
  
  return res.status(StatusCodes.OK).json(response)
}