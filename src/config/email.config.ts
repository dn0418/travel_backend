export default {
  transport: {
    host: process.env.GMAIL_HOST,
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSKEY
    },
  },
  defaults: {
    to: process.env.GMAIL_USER,
  }
};