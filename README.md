# service-armin
 Broker service backend

# Migrations

## create

`cd src/infra/database/mongo/migrations`

`migrate-mongo create <migration_name>`

## run

`cd src/infra/database/mongo/migrations`

`migrate-mongo up`

## delete

`cd src/infra/database/mongo/migrations`

`migrate-mongo down`