'use strict'
const AppController = require('./controllers/AppController')

const validator = require('express-joi-validation').createValidator({ passError: true})
const receiverSchema = require('./models/validators/receiverSchema');

module.exports = function(app) {
///////////////////////
// HEALTH CHECK
///////////////////////
app.get('/', AppController.getHealth)
app.get('/health', AppController.getHealth)


/// ////////////////////////
// SERVICE ROUTES
/// ////////////////////////
app.post('/:topic',  validator.params(receiverSchema.params), validator.body(receiverSchema.body), AppController.receive)

}