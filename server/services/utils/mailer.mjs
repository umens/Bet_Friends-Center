import chalk from 'chalk';
import {
  ConfigMailer
} from '../../config/default';
import nodemailer from 'nodemailer';

// var transporter = nodemailer.createTransport({
//   service: ConfigMailer.service,
//   auth: {
//     type: "login",
//     user: ConfigMailer.auth.username,
//     pass: ConfigMailer.auth.password
//   }
// });

const Mailer = {

  sentMailVerificationLink: async (user, token) => {
    try {
      let account = await nodemailer.createTestAccount();

      console.log('Credentials obtained, sending message...');

      // NB! Store the account object values somewhere if you want
      // to re-use the same account for future mail deliveries

      // Create a SMTP transporter object
      let transporter = nodemailer.createTransport(
        {
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass
          },
          logger: false,
          debug: false // include SMTP traffic in the logs
        },
        {
          // default message fields

          // sender info
          from: 'Viens chercher Bonheur Team 👻 <' + ConfigMailer.auth.user + '>'
        }
      );

      let mailOptions = {
        to: user.fullname + ' <' + user.email + '>', // list of receivers
        subject: 'Account Verification ✔', // Subject line
        text: 'Thanks for Registering on Bet Center\n\nPlease verify your email by clicking on the verification link below.\nhttp://localhost:3000/verify-email/' + token, // plain text body
        html: "<p>Thanks for Registering on Bet Center </p><p>Please verify your email by clicking on the verification link below.<br/><a href='http://localhost:3000/verify-email/" + token + "'>Verification Link</a></p>" // html body
      };

      return transporter.sendMail(mailOptions);
    } catch (error) {
      return error;
    }
  },

  sentMailForgotPassword: async (user, newPassword) => {
    try {
      let account = await nodemailer.createTestAccount();

      console.log('Credentials obtained, sending message...');

      // NB! Store the account object values somewhere if you want
      // to re-use the same account for future mail deliveries

      // Create a SMTP transporter object
      let transporter = nodemailer.createTransport(
        {
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass
          },
          logger: false,
          debug: false // include SMTP traffic in the logs
        },
        {
          // default message fields

          // sender info
          from: 'Viens chercher Bonheur Team 👻 <' + ConfigMailer.auth.user + '>'
        }
      );

      let mailOptions = {
        to: user.fullname + ' <' + user.email + '>', // list of receivers
        subject: 'Account password ✔', // Subject line
        text: "Your Bet Center Account Credential\n\nusername : " + user.email + " , password : " + newPassword, // plain text body
        html: "<p>Your Bet Center Account Credential</p><p>username : " + user.email + " , password : " + newPassword + "</p>" // html body
      };

      return transporter.sendMail(mailOptions);
    } catch (error) {
      return error;
    }
  }
};

export { Mailer };
