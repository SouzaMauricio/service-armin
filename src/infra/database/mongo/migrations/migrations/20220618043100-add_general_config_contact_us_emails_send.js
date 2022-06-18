module.exports = {
  async up (db, client) {
    await db.collection('generalconfigs').insertOne({
      cod: 'contact-us-emails-send',
      description: 'Emaisl to send message when a person send a message.',
      config: {
        emails: [
          'maw.aws@outlook.com'
        ]
      }
    })
  },

  async down (db, client) {
    await db.collection('generalconfigs').deleteOne({ cod: 'contact-us-emails-send' })
  }
}
