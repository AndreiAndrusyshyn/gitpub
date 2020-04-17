#!/bin/sh

set -e

# Perform all actions as $POSTGRES_USER
export PGUSER="$POSTGRES_USER"

ZOMBODB_VERSION="${ZOMBODB_VERSION%%+*}"

# Load ZOMBODB into both template_database and $POSTGRES_DB
for DB in $POSTGRES_USER; do
    echo "Updating zombodb extensions '$DB' to $ZOMBODB_VERSION"
    psql --dbname="$DB" -c "
        -- Upgrade zombodb
        CREATE EXTENSION IF NOT EXISTS zombodb VERSION '$ZOMBODB_VERSION';
        ALTER EXTENSION zombodb  UPDATE TO '$ZOMBODB_VERSION';
    "
done
