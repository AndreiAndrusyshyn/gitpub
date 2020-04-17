#!/bin/bash

set -e

# Perform all actions as $POSTGRES_USER
export PGUSER="$POSTGRES_USER"

# Load extension into both template_database and $POSTGRES_DB
for DB in $POSTGRES_USER; do
    echo 'Loading ZomboDB extension into '"$DB"
    psql --dbname="$DB" <<-'EOSQL'
		CREATE EXTENSION IF NOT EXISTS zombodb;
EOSQL
done

##
# Add settings to postgresql.conf
#
# @see https://github.com/zombodb/zombodb/blob/master/CONFIGURATION-SETTINGS.md
#
echo "zdb.default_elasticsearch_url = 'http://elasticsearch:9200/'" >> "$PGDATA/postgresql.conf"
