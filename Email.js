const express = require('express')
const Router = express.Router()

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const emails = [
//   {
//     to: 'recipient1@example.org',
//     from: 'sender@example.org',
//     subject: 'Hello recipient 1',
//     text: 'Hello plain world!',
//     html: '<p>Hello HTML world!</p>',
//   },
//   {
//     to: 'recipient2@example.org',
//     from: 'other-sender@example.org',
//     subject: 'Hello recipient 2',
//     text: 'Hello other plain world!',
//     html: '<p>Hello other HTML world!</p>',
//   },
// ];

const myDate = Date.now();

const msg = {
  to: 'drewwperez@gmail.com',
  from: 'drewwperez@gmail.com', // Use the email address or domain you verified above
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'This message was sent from the future at ' + myDate,
  html: '<strong>more stuff</strong>',
  // To send the email in the future!
  // *********************************
  sendAt: 1596658500,
  // To delete it:
  // create Batch ID https://github.com/sendgrid/sendgrid-nodejs/blob/master/packages/client/USAGE.md#create-a-batch-id
  // batchId: 'MjFlMzYyZGMtZDc1Ny0xMWVhLTgzNDItY2FlM2NhZGFmODQxLTMxYjljMzRlOQ'
};

//ES8
(async () => {
  try {
    // send multiple individual emails to multiple recipients 
    // where they don't see each other's email addresses
    // sgMail.sendMultiple(msg);
    // await sgMail.send(msg);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  }
})();

module.exports = Router