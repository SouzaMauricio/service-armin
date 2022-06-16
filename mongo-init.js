db.createUser({
  user: process.env.ARMIN_MONGO_INITDB_ROOT_USERNAME,
  pwd: process.env.ARMIN_MONGO_INITDB_ROOT_PASSWORD,
  roles: [
    {
      role: 'dbOwner',
      db: 'application_database'
    }
  ]
})
