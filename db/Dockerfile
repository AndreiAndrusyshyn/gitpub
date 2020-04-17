FROM postgres:10
LABEL Name='pubgit-db'
ENV ZDB_VERSION 10-1.0.3

RUN set -eux ; \
    apt-get update -qq --assume-yes --fix-missing ; \
    apt-get install -qq --assume-yes curl wget apt-utils apt-transport-https ; \
    rm -rf /var/lib/apt/lists/*

RUN set -eux ; \
    wget --no-check-certificate --quiet -O /tmp/zombodb.deb https://www.zombodb.com/releases/v${ZDB_VERSION}/zombodb_jessie_pg10-${ZDB_VERSION}_amd64.deb ; \
    dpkg -i /tmp/zombodb.deb ;\
    rm -rf /tmp/zombodb.deb

RUN mkdir -p /docker-entrypoint-initdb.d
COPY ./initdb-zombodb.sh /docker-entrypoint-initdb.d/zombodb.sh
COPY ./update-zombodb.sh /usr/local/bin
