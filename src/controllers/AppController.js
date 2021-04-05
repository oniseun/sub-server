
const subService = require('../services/SubService')
const { StatusCodes } = require('http-status-codes')

module.exports.getHealth =  (req, res) => {

  return res.status(StatusCodes.OK).json(subService.getHeath())

}

module.exports.receive = (req, res) => {

  const { params: { topic }, body: { data } } = req

  const response = subService.receive(topic, data)
  
  return res.status(StatusCodes.ACCEPTED).json(response)
}