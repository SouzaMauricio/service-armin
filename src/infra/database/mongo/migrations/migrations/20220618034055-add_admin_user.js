module.exports = {
  async up (db, client) {
    await db.collection('users').insertOne({
      name: 'Admin',
      lastName: 'Admin',
      email: 'admin@email.com',
      password: '$2a$10$368YeIo9RI5G29BPegLXi.JiI23lKrfGl.pu3r6O0QpDuTE/r7bq6', // administrador
      image: {
        path: 'https://picsum.photos/200'
      }
    })
  },

  async down (db, client) {
    await db.collection('users').deleteOne({ email: 'admin@email.com' })
  }
}
