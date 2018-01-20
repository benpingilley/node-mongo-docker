#! /bin/bash

apt-get -qq update && apt-get install -qq -y unzip
unzip /mongo-data/data.zip -d /mongo-data/
mongoimport --host mongodb --db datasets --collection births --type json --file /mongo-data/birthNames.json --jsonArray
mongoimport --host mongodb --db datasets --collection census --type json --file /mongo-data/census.json --jsonArray
mongoimport --host mongodb --db datasets --collection complaints --type json --file /mongo-data/complaints.json --jsonArray