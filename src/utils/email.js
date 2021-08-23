import nodemailer from 'nodemailer'
import config from '../../config/config.js'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.MAIL,
    pass: config.PASSWORDMAIL
  }
})
const mailOptions = (info) => ({
  from: info.from,
  to: info.to || config.PASSWORDMAIL,
  subject: info.subject,
  html: info.html
})

 const enviarmail = (info) => {
  const options = mailOptions(info)
  transporter.sendMail(options, (err, response) => {
    if (err) {
      throw err
    }

    return response
  })
}
export default enviarmail