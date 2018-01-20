The API framework includes logging, lint testing, unit/integration testing, code coverage, and swagger docs wrapped in a Docker container.

## API Functionality:
* An application which answers several different questions about three different datasets listed below.
  - [Baby Names](https://catalog.data.gov/dataset/baby-names-from-social-security-card-applications-data-by-state-and-district-of-)
    - State, Sex, Name, Year (2010-2016), Occurances
  - [Census](https://www.census.gov/data/datasets/2016/demo/popest/total-cities-and-towns.html)
    - City, State, State Abbreviation, Populations (2010-2016)
  - [Customer Complaints](http://catalog.data.gov/dataset/consumer-complaint-database#topic=consumer_navigation)
    - Company, Date Received, Product, Sub Product, State, Zip Code

##### Start App
* docker-compose up

##### Swagger
* [localhost:8080/](localhost:8080/)

##### Code Coverage
* [localhost:8080/coverage/](localhost:8080/coverage/)

---------------------------------------------------------

### Examples for how to answer questions

What product has the most complaints in the State of New York?
* ```localhost:8080/api/mostComplaintsPer/state/NY/product```

How many people were born between 7/1/2014 to 6/30/2015 in each state? (We can't determine months but can do years) (Also, this is not the best dataset to answer this question due to the high computation)
* ```localhost:8080/api/birthsPerRange/state/2014/2015```

In what states did Bank of America receive a consumer complaint?
* ```localhost:8080/api/mostComplaintsPer/company/BANK%20OF%20AMERICA,%20NATIONAL%20ASSOCIATION/state```

What are the fastest growing states?
* ```localhost:8080/api/statesPopulationGrowths/2010/2016```

What states have the most complaints for payday loans?
* ```localhost:8080/api/mostComplaintsPer/product/Payday%20loan/state```

What are the most popular first names of those born between 2010 and 2016?
* ```localhost:8080/api/birthsPer/name```

How many boys and girls were born between 2010 and 2016?
* ```localhost:8080/api/birthsPer/sex```