# pubgit

## Prerequisites

### Install [PostgreSQL 10.0](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04)

We can not use 11 or above due to zombodb limitation!

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

### Install [zombodb](https://github.com/zombodb/zombodb/blob/master/INSTALL.md)

```bash
wget https://www.zombodb.com/releases/v10-1.0.3/zombodb_bionic_pg10-10-1.0.3_amd64.deb
sudo dpkg -i zombodb_bionic_pg10-10-1.0.3_amd64.deb
sudo sysctl -w vm.max_map_count=262144
```

And add config parameter to the end of

```bash
echo "zdb.default_elasticsearch_url = 'http://localhost:9200/'" | sudo tee -a /etc/postgresql/10/main/postgresql.conf
sudo service postgresql restart
```

### Install [elasticsearch](https://www.digitalocean.com/community/tutorials/how-to-install-elasticsearch-logstash-and-kibana-elastic-stack-on-ubuntu-18-04)

```bash
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
echo "deb https://artifacts.elastic.co/packages/6.x/apt stable main" | sudo tee -a /etc/apt/sources.list.d/elastic-6.x.list
sudo apt update
sudo apt install elasticsearch
sudo systemctl start elasticsearch
sudo systemctl enable elasticsearch
curl -X GET "localhost:9200"
```

### Install [npm](https://github.com/nodesource/distributions/blob/master/README.md)

It's recommended to install node 10 on ubuntu 18.04 as version 8 may have troubles to work with npm

```
# Using Ubuntu
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Install [yarn](https://linuxize.com/post/how-to-install-yarn-on-ubuntu-18-04/)

```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update
sudo apt install yarn
```

### Install [docker](https://docs.docker.com/v17.09/engine/installation/linux/docker-ce/ubuntu/)

```bash
sudo apt-get update
sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
sudo apt-get update
sudo apt-get install -y docker-ce
```

### Install [docker-compose](https://docs.docker.com/compose/install/)

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo apt remove -y docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

```
## Start

Install all packages in sub directories for separate dev of api\web (supposed to use docker-compose as it dynamicaly fetch changes)

```bash
npm install
```

### run api and web locally

```bash
npm run docker-dev
```

You have 4 applications running

[web http://localhost:3000](http://localhost:3000)

[feathers api http://localhost:3040](http://localhost:3040)

[postgres http://localhost:5436](http://localhost:5436)

[adminer http://localhost:4024](http://localhost:4024)

Credential for connection to DB

```.env
DB_PASSWORD=pubgit
DB_USER=pubigt
POSTGRES_PASSWORD=pubgit
DB_HOST=postgresql://localhost:5436
```
