const express = require('express')
const Router = express.Router()

const client = require('@sendgrid/client');
client.setApiKey(process.env.SENDGRID_API_KEY);

const request = {
method: 'POST',
url: '/v3/mail/batch'
}

client.request(request)
.then(([response, body]) => {
  console.log(response.statusCode);
  console.log(response.body);
})

module.exports = Router